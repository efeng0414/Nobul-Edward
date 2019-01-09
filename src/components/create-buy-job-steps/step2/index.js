import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, message } from "antd";
import { bound } from "class-bind";
import leafletPip from "@mapbox/leaflet-pip";
import L from "leaflet";

import { translate } from "../../../utilities/locale";
import { getProvinceOrStateFromPlaces } from "../../../../core/utilities/parse-places-result";
import {
  toggleSelectedNeighborhoodsHelper,
  showCityCheckbox,
  allNeighborhoodsSelected
} from "../../../components/city-select-checkbox/utilities";

import { BUY, REGIONS_FIELD } from "../../../../core/constants/shared";
import CreatePolygonMap from "../../create-polygon-map";
import Devices from "../../breakpoints/devices";
import { TABLET, MOBILE } from "../../../../core/constants/breakpoints";
import "./styles.scss";
import { getProvinceOrStateCoordinates } from "../../../../core/utilities/get-province-code";

const TORONTO_LATLNG = { lat: 43.6567919, lng: -79.4609302 };
@injectIntl
@Form.create({})
class CreateBuyJobStep2 extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object,
    currentScreen: PropTypes.number,
    handleNextStep: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
    polygons: PropTypes.object.isRequired,
    selectedPolygons: PropTypes.object.isRequired,
    onRemoveRegion: PropTypes.func,
    onPolygonClick: PropTypes.func,
    setSelectedPolygons: PropTypes.func,
    getPolygonBoundaries: PropTypes.func.isRequired,
    defaultAddress: PropTypes.string,
    currentBreakPoint: PropTypes.string,
    handlePolygonMouseOver: PropTypes.func,
    isPolygonSelected: PropTypes.bool,
    currentUserProfile: PropTypes.object
  };

  state = {
    provinceOrState: "",
    defaultCenter: TORONTO_LATLNG,
    placesResult: {
      latlng: {},
      result: {}
    },
    defaultAddress: "",
    defaultLat: 0,
    defaultLong: 0,
    selectedPolygons: {},
    address: "",
    isMapLoading: false,
    showSelectCity: false
  };

  static defaultProps = {
    form: {},
    isPolygonSelected: false,
    currentUserProfile: {}
  };

  componentDidMount() {
    const provinceOrState =
      this.props.currentUserProfile &&
      this.props.currentUserProfile.profile.provinceOrState;

    if (provinceOrState) {
      const getCoordinates = getProvinceOrStateCoordinates({ provinceOrState });
      const { lat, lng } = getCoordinates;
      this.map.panTo([lat, lng]);

      if (!this.props.polygons.boundaries[provinceOrState]) {
        this.props.getPolygonBoundaries({ provinceOrState }).then(() => {
          this.setState({
            isMapLoading: true,
            provinceOrState
          });
        });
      }
    }
  }

  @bound
  onNextClick(e) {
    const { handleNextStep, form } = this.props;
    const { validateFieldsAndScroll } = form;

    e.preventDefault();
    validateFieldsAndScroll({ force: true }, (error, values) => {
      if (!error) {
        !Object.keys(values[REGIONS_FIELD]).length
          ? message.error(
              translate(this.props.intl, "error.selectNeighbourhoods")
            )
          : handleNextStep(values);
      }
    });
  }

  @bound
  setMapData(map) {
    this.map = map;
  }

  @bound
  handleLocationInputChange(result, latLng) {
    this.setState({ isMapLoading: true });
    const provinceOrState = getProvinceOrStateFromPlaces(result);
    if (!this.props.polygons.boundaries[provinceOrState]) {
      this.props.getPolygonBoundaries({ provinceOrState }).then(() => {
        this.setState({ isMapLoading: false, provinceOrState });
        this.loadLocationOnMap({ result, latLng });
      });
    } else {
      this.setState({
        isMapLoading: false,
        provinceOrState
      });
      this.loadLocationOnMap({ result, latLng });
    }

    this.setState({
      result,
      latLng,
      showSelectCity: showCityCheckbox({ placesApiResult: result })
    });
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
        this.setState({ selectedPolygons: {}, address: "" });
      }
    }
  }

  @bound
  toggleNeighborhoods(e) {
    const selectAll = e.currentTarget.checked;
    const mapPolygons = this.props.polygons.boundaries[
      this.state.provinceOrState
    ];
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
    const mapPolygons = this.props.polygons.boundaries[
      this.state.provinceOrState
    ];

    return allNeighborhoodsSelected({
      mapPolygons,
      currentPolygons: this.props.selectedPolygons
    });
  }

  render() {
    return (
      <div className="buy-job-step2">
        <Form onSubmit={this.onNextClick}>
          <Devices sizes={[TABLET]}>
            <h1>
              {translate(this.props.intl, "createBuyJob.chooseNeighborhood")}
            </h1>
          </Devices>
          <Devices sizes={[MOBILE]}>
            <h1>
              {translate(
                this.props.intl,
                "createBuyJob.chooseNeighborhoodMobile"
              )}
            </h1>
          </Devices>
          <CreatePolygonMap
            form={this.props.form}
            jobType={BUY}
            intl={this.props.intl}
            polygons={this.props.polygons}
            selectedPolygons={this.props.selectedPolygons}
            onPolygonClick={this.props.onPolygonClick}
            setMapData={this.setMapData}
            provinceOrState={this.state.provinceOrState}
            onRemoveRegion={this.props.onRemoveRegion}
            setSelectedPolygons={this.props.setSelectedPolygons}
            showSelectCity={this.state.showSelectCity}
            handlePolygonMouseOver={this.props.handlePolygonMouseOver}
            isPolygonSelected={this.props.isPolygonSelected}
            defaultAddress={this.props.defaultAddress}
            handleLocationInputChange={this.handleLocationInputChange}
            handlePreviousStep={this.props.handlePreviousStep}
            handleSubmit={this.onNextClick}
            currentBreakPoint={this.props.currentBreakPoint}
            toggleNeighborhoods={this.toggleNeighborhoods}
            isCityCheckboxChecked={this.isCityCheckboxChecked()}
            autosize
          />
        </Form>
      </div>
    );
  }
}

export default CreateBuyJobStep2;
