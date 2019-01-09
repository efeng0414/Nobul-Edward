import React, { Component } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, message } from "antd";
import { bound } from "class-bind";
import searchLocationIcon from "../../../assets/images/search-pin.svg";
import leafletPip from "@mapbox/leaflet-pip";
import L from "leaflet";
import { getProvinceOrStateFromPlaces } from "../../../../core/utilities/parse-places-result";

delete L.Icon.Default.prototype._getIconUrl;
import Devices from "../../breakpoints/devices";
import { MOBILE, TABLET } from "../../../../core/constants/breakpoints";
import { translate } from "../../../utilities/locale";
import { ADDRESS_FIELD, SELL } from "../../../../core/constants/shared";
import { objectIsEmpty } from "../../../../core/utilities/misc";
import CreatePolygonMap from "../../create-polygon-map";

import "./styles.scss";

@Form.create({})
class CreateSellJobStep2 extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object,
    handleNextStep: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
    polygonLayers: PropTypes.object,
    currentScreen: PropTypes.number,
    selectedPolygons: PropTypes.object,
    address: PropTypes.any,
    onRemoveRegion: PropTypes.func,
    setSelectedPolygons: PropTypes.func.isRequired,
    onAddressSelect: PropTypes.func.isRequired,
    getPolygonBoundaries: PropTypes.func.isRequired,
    polygons: PropTypes.object.isRequired,
    currentBreakPoint: PropTypes.string.isRequired
  };

  state = {
    defaultLat: 0,
    defaultLong: 0,
    isMapLoading: false
  };

  searchLocationPin = {};
  previousMarkerLocation = null;

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentScreen !== this.props.currentScreen &&
      this.props.currentScreen === 2 &&
      this.props.currentBreakPoint === MOBILE
    ) {
      this.loadLocationOnMap({
        result: this.state.result,
        latLng: this.state.latLng
      });
    }
  }
  componentDidMount() {
    this.searchLocationPin = L.icon({
      iconUrl: searchLocationIcon,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
    message.config({
      maxCount: 1
    });
  }

  static defaultProps = {
    form: {},
    handleNextStep: () => {},
    handlePreviousStep: () => {},
    polygonLayers: {},
    currentScreen: 0,
    selectedPolygons: {},
    address: "",
    onRemoveRegion: () => {},
    setSelectedPolygons: () => {},
    onAddressSelect: () => {}
  };

  @bound
  onNextClick(e) {
    const { handleNextStep, form } = this.props;
    const { validateFieldsAndScroll } = form;

    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (
        this.props.currentScreen === 1 &&
        this.props.currentBreakPoint === MOBILE &&
        !objectIsEmpty(values.address)
      ) {
        handleNextStep(values);
      } else {
        const validPolygonSelected = !!Object.keys(this.props.selectedPolygons)
          .length;
        !validPolygonSelected &&
          message.error(translate(this.props.intl, "createSellJob.noPolygon"));
        !err && validPolygonSelected && handleNextStep(values);
      }
    });
  }

  @bound
  getClassName(screen) {
    return this.props.currentScreen !== screen ? "hide" : "";
  }

  @bound
  setMapData(map) {
    this.map = map;
  }

  @bound
  loadLocationOnMap({ result, latLng }) {
    if (this.map) {
      const { form, setSelectedPolygons, onAddressSelect } = this.props;
      const { lat, lng } = latLng;
      this.previousMarkerLocation && this.previousMarkerLocation.remove();
      this.previousMarkerLocation = L.marker([lat, lng], {
        icon: this.searchLocationPin
      }).addTo(this.map);
      const includedPolygons = leafletPip.pointInLayer([lng, lat], this.map);
      if (includedPolygons.length) {
        const polygon = includedPolygons[0];
        const bounds = L.featureGroup([polygon]).getBounds();
        this.map.flyToBounds([bounds]);
        const selectedPolygons = {
          [polygon.feature.properties["polygonId"]]: {
            name: polygon.feature.properties.name,
            country: polygon.feature.properties.country,
            province: polygon.feature.properties.provinceOrState
          }
        };
        setSelectedPolygons(selectedPolygons);
        onAddressSelect(result.formatted_address);
        form.setFieldsValue({
          [ADDRESS_FIELD]: result.formatted_address
        });
      } else {
        setSelectedPolygons({});
      }
    }
  }

  @bound
  handleLocationInputChange(result, latLng) {
    this.setState({ isMapLoading: true, result, latLng });
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
  }

  render() {
    return (
      <div className="sell-job-step2">
        <Form onSubmit={this.onNextClick}>
          <Devices sizes={[TABLET]}>
            <h1>{translate(this.props.intl, "sellAddress")}</h1>
          </Devices>
          <Devices sizes={[MOBILE]}>
            <h1>{translate(this.props.intl, "sellAddressMobile")}</h1>
          </Devices>
          <CreatePolygonMap
            form={this.props.form}
            jobType={SELL}
            intl={this.props.intl}
            polygons={this.props.polygons}
            selectedPolygons={this.props.selectedPolygons}
            setMapData={this.setMapData}
            provinceOrState={this.state.provinceOrState}
            setSelectedPolygons={this.props.setSelectedPolygons}
            handleLocationInputChange={this.handleLocationInputChange}
            handlePreviousStep={this.props.handlePreviousStep}
            handleSubmit={this.onNextClick}
            defaultAddress={this.props.address}
            currentBreakPoint={this.props.currentBreakPoint}
            autosize
          />
        </Form>
      </div>
    );
  }
}

export default CreateSellJobStep2;
