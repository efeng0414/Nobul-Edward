import React, { Component } from "react";
import { withRouter } from "react-router";
import { Form, message } from "antd";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import leafletPip from "@mapbox/leaflet-pip";
import L from "leaflet";

import { getProvinceOrStateFromPlaces } from "../../../../core/utilities/parse-places-result";
import { translate } from "../../../utilities/locale";
import CreatePolygonMap from "../../create-polygon-map";
import { PROVINCES } from "../../../../core/data/provinces";
import {
  toggleSelectedNeighborhoodsHelper,
  showCityCheckbox,
  allNeighborhoodsSelected
} from "../../city-select-checkbox/utilities";
import { ALL } from "../../../../core/constants/shared";
import "../styles.scss";

@injectIntl
@withRouter
@Form.create({})
class Step2 extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    goPreviousStep: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    polygons: PropTypes.object.isRequired,
    selectedPolygons: PropTypes.object,
    setSelectedPolygons: PropTypes.func.isRequired,
    onRemoveRegion: PropTypes.func,
    handlePolygonClick: PropTypes.func.isRequired,
    getPolygonBoundaries: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    goNextStep: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    resetLocation: PropTypes.func.isRequired,
    currentBreakPoint: PropTypes.string,
    cachedProposalFields: PropTypes.object,
    agentProvinceOrState: PropTypes.string,
    handlePolygonMouseOver: PropTypes.func,
    isPolygonSelected: PropTypes.bool,
    defaultAddress: PropTypes.string
  };

  static defaultProps = {
    isPolygonSelected: false,
    defaultAddress: ""
  };

  state = {
    defaultBounds: null,
    userLocationError: false,
    showMap: false,
    provinceOrState: "",
    placesResult: {
      latLng: {},
      result: {}
    },
    showSelectCity: false,
    selectedPolygons: {}
  };

  componentDidMount() {
    this.setMapData();

    if (this.props.cachedProposalFields) {
      this.setState({
        placesResult: this.props.cachedProposalFields.address,
        provinceOrState: this.props.cachedProposalFields.state
      });
    }
  }

  @bound
  onLocationInputChange(result, latLng) {
    this.setState({ isMapLoading: true });
    const provinceOrState = getProvinceOrStateFromPlaces(result);
    const supportedProvince = PROVINCES.find(
      province =>
        province.code.toLowerCase() === provinceOrState.toLowerCase() ||
        province.label.toLowerCase() === provinceOrState.toLowerCase()
    );

    if (!supportedProvince) {
      message.error(
        translate(this.props.intl, "marketplace.noSupportForLocation")
      );
    } else if (
      this.props.agentProvinceOrState &&
      provinceOrState !== this.props.agentProvinceOrState
    ) {
      return message.error(
        translate(this.props.intl, "marketplaceNotAgentProvinceOrStateError")
      );
    } else {
      if (!this.props.polygons.boundaries[provinceOrState]) {
        this.props.getPolygonBoundaries({ provinceOrState }).then(() => {
          this.setState({ isMapLoading: false, provinceOrState });
          this.loadLocationOnMap({ result, latLng });
        });
      } else {
        this.setState({
          result,
          latLng,
          provinceOrState
        });
        this.loadLocationOnMap({ result, latLng });
      }
    }

    this.setState({
      showSelectCity: showCityCheckbox({ placesApiResult: result })
    });
  }

  @bound
  setMapData(map) {
    this.map = map;
  }

  @bound
  loadLocationOnMap({ latLng, result }) {
    if (this.map) {
      const { setSelectedPolygons, form } = this.props;
      const { lat, lng } = latLng;
      const includedPolygons = leafletPip.pointInLayer([lng, lat], this.map);
      if (includedPolygons.length) {
        form.setFieldsValue({ locationInput: result });
        const polygon = includedPolygons[0];
        const bounds = L.featureGroup([polygon]).getBounds();
        this.map.flyToBounds([bounds]);
      } else {
        setSelectedPolygons({});
        this.setState({ selectedPolygons: {} });
      }
    }
  }

  @bound
  onNextClick(e) {
    const { goNextStep, form } = this.props;
    const { validateFieldsAndScroll } = form;

    e.preventDefault();
    validateFieldsAndScroll({ force: true }, (error, values) => {
      if (!error) {
        !Object.keys(this.props.selectedPolygons).length
          ? message.error(
              translate(this.props.intl, "error.selectNeighbourhoods")
            )
          : goNextStep(values);
      }
    });
  }

  @bound
  toggleNeighborhoods(e) {
    const selectAll = e.currentTarget.checked;
    const mapPolygons = this.state.provinceOrState
      ? this.props.polygons.boundaries[this.state.provinceOrState]
      : null;

    toggleSelectedNeighborhoodsHelper({
      selectAll,
      mapPolygons,
      currentPolygons: this.props.selectedPolygons,
      setPolygons: this.props.setSelectedPolygons
    });
  }

  @bound
  isCityCheckboxChecked() {
    // No need to do anything if we can't see the checkbox.
    if (!this.state.showSelectCity) {
      return false;
    }
    const mapPolygons = this.state.provinceOrState
      ? this.props.polygons.boundaries[this.state.provinceOrState]
      : null;

    return allNeighborhoodsSelected({
      mapPolygons,
      currentPolygons: this.props.selectedPolygons
    });
  }

  render() {
    const polygonLayers =
      this.props.polygons.boundaries[this.state.provinceOrState] || {};

    return (
      <div className="creat-standard-proposal-step2">
        <Form onSubmit={this.props.goNextStep}>
          <CreatePolygonMap
            form={this.props.form}
            jobType={ALL}
            intl={this.props.intl}
            polygons={this.props.polygons}
            selectedPolygons={this.props.selectedPolygons}
            onPolygonClick={this.props.handlePolygonClick}
            setMapData={this.setMapData}
            provinceOrState={this.state.provinceOrState}
            onRemoveRegion={this.props.onRemoveRegion}
            setSelectedPolygons={this.props.setSelectedPolygons}
            showSelectCity={this.state.showSelectCity}
            handlePolygonMouseOver={this.props.handlePolygonMouseOver}
            isPolygonSelected={this.props.isPolygonSelected}
            handleLocationInputChange={this.onLocationInputChange}
            handlePreviousStep={this.props.goPreviousStep}
            handleSubmit={this.onNextClick}
            currentBreakPoint={this.props.currentBreakPoint}
            toggleNeighborhoods={this.toggleNeighborhoods}
            onCancel={this.props.onCancel}
            polygonLayers={polygonLayers}
            autosize
            showPreviousStepButton
            showCancelButton
            isCityCheckboxChecked={this.isCityCheckboxChecked()}
            defaultAddress={this.props.defaultAddress}
          />
        </Form>
      </div>
    );
  }
}

export default Step2;
