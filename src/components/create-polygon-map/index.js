import React, { Component } from "react";
import { Form, Button } from "antd";
import { bound } from "class-bind";
import { intlShape } from "react-intl";

import PropTypes from "prop-types";

import ActivityIndicator from "../activity-indicator";
import {
  REGIONS_FIELD,
  ADDRESS_FIELD,
  BUY,
  SELL,
  ALL,
  DEFAULT_LAT,
  DEFAULT_LON
} from "../../../core/constants/shared";
import { MOBILE } from "../../../core/constants/breakpoints";
import PolygonMap from "../polygon-map";
import NeighborhoodsList from "../neighborhoods-list";
import HoverPolygonMessage from "../hover-polygon-message";
import CitySelectCheckbox from "../city-select-checkbox";
import LocationSearch from "../../components/location-search";
import { locationSearchFilterOutTypes } from "../../utilities/constants";
import { translate } from "../../utilities/locale";

import "./styles.scss";
import FullScreenIcon from "react-icons/lib/md/fullscreen";
import FullScreenExit from "react-icons/lib/md/fullscreen-exit";

const FormItem = Form.Item;
const MAP_FULLSCREEN_ICON_SIZE = 30;
class CreatePolygonMap extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    jobType: PropTypes.string.isRequired,
    polygons: PropTypes.object.isRequired,
    selectedPolygons: PropTypes.object,
    onPolygonClick: PropTypes.func,
    setMapData: PropTypes.func.isRequired,
    provinceOrState: PropTypes.string,
    onRemoveRegion: PropTypes.func,
    setSelectedPolygons: PropTypes.func,
    showSelectCity: PropTypes.bool,
    handlePolygonMouseOver: PropTypes.func,
    isPolygonSelected: PropTypes.bool,
    defaultAddress: PropTypes.any,
    handleLocationInputChange: PropTypes.func,
    handlePreviousStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    currentBreakPoint: PropTypes.string,
    polygonLayers: PropTypes.object,
    toggleNeighborhoods: PropTypes.func,
    autosize: PropTypes.bool,
    hidePreviousStepButton: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    onCancel: PropTypes.func,
    isCityCheckboxChecked: PropTypes.bool,
    isAgentSettingButton: PropTypes.bool,
    notAgentProvinceOrStateError: PropTypes.bool
  };

  static defaultProps = {
    selectedPolygons: {},
    setSelectedPolygons: () => {},
    handlePolygonMouseOver: () => {},
    showSelectCity: false,
    defaultAddress: "",
    provinceOrState: "",
    polygonLayers: {},
    autosize: false,
    hidePreviousStepButton: false,
    showCancelButton: false,
    isCityCheckboxChecked: false,
    isAgentSettingButton: false,
    notAgentProvinceOrStateError: false
  };

  constructor(props) {
    super(props);

    this.state = {
      hoveredPolygonName: "",
      isMapFullScreen: false
    };

    this.rootMapRef = React.createRef();
  }

  @bound
  handleHoveredPolygon(e) {
    const { name, polygonId } = e.layer.feature.properties;
    this.props.handlePolygonMouseOver(polygonId);
    this.setState({
      hoveredPolygonName: name
    });
  }

  @bound
  getPolygonLayers() {
    return this.props.jobType === ALL
      ? this.props.polygonLayers
      : this.props.provinceOrState
        ? this.props.polygons.boundaries[this.props.provinceOrState]
        : {};
  }

  componentDidMount() {
    this.registerFullScreenChangeListeners();
  }

  @bound
  handleMapFullScreen() {
    const docElm = this.rootMapRef.current;

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      document.body.msRequestFullscreen();
    }
  }

  @bound
  handleMapFullScreenExit() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  @bound
  handleMapFullScreenToggle() {
    const fullScreenElement =
      document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;

    this.setState({ isMapFullScreen: !!fullScreenElement });
  }

  @bound
  registerFullScreenChangeListeners() {
    document.addEventListener(
      "fullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
    document.addEventListener(
      "webkitfullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
    document.addEventListener(
      "mozfullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
    document.addEventListener(
      "msfullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
  }

  @bound
  removeFullScreenChangeListeners() {
    document.removeEventListener(
      "fullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
    document.removeEventListener(
      "webkitfullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
    document.removeEventListener(
      "mozfullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
    document.removeEventListener(
      "msfullscreenchange",
      this.handleMapFullScreenToggle,
      false
    );
  }

  componentWillUnmount() {
    this.removeFullScreenChangeListeners();
  }
  render() {
    const polygonLayers = this.getPolygonLayers();
    const { getFieldDecorator } = this.props.form;
    const showHoveredPolygon = !!this.state.hoveredPolygonName;
    const buttonSize =
      this.props.currentBreakPoint === MOBILE ? "large" : "default";

    return (
      <div ref={this.rootMapRef} className="create-polygon-map">
        <ActivityIndicator>
          {(this.props.jobType === BUY || this.props.jobType === ALL) && (
            <div className="create-polygon-map__selector-and-filter-wrapper">
              <div className="create-polygon-map__location-selector">
                <FormItem>
                  {getFieldDecorator("locationInput", {
                    validateTrigger: "onLocationSelect"
                  })(
                    <LocationSearch
                      onLocationSelect={this.props.handleLocationInputChange}
                      typesToBeRemoved={locationSearchFilterOutTypes}
                      defaultAddress={this.props.defaultAddress}
                      searchOptions={{
                        componentRestrictions: {
                          country: ["ca", "us"]
                        }
                      }}
                      autosize={this.props.autosize}
                    />
                  )}
                </FormItem>
                {this.props.notAgentProvinceOrStateError && (
                  <span className="create-polygon-map__error">
                    {translate(
                      this.props.intl,
                      "offerSettings.editRegionsSearchError"
                    )}
                  </span>
                )}
              </div>
              {(this.props.showSelectCity || showHoveredPolygon) && (
                <div className="create-polygon-map__filter">
                  <h5>
                    {translate(
                      this.props.intl,
                      "createBuyJob.selectedNeighborhood.title"
                    )}
                  </h5>
                  <HoverPolygonMessage
                    hoveredPolygonName={this.state.hoveredPolygonName}
                    isPolygonSelected={this.props.isPolygonSelected}
                    showHoveredPolygon={showHoveredPolygon}
                  />
                  {this.props.showSelectCity && (
                    <CitySelectCheckbox
                      onClick={this.props.toggleNeighborhoods}
                      isChecked={this.props.isCityCheckboxChecked}
                    />
                  )}
                  <NeighborhoodsList
                    selectedPolygons={this.props.selectedPolygons}
                    onRemoveRegion={this.props.onRemoveRegion}
                  />
                </div>
              )}
            </div>
          )}
          {this.props.jobType === SELL && (
            <div className="create-polygon-map__selector-and-filter-wrapper">
              <div className="create-polygon-map__location-selector">
                <FormItem>
                  {getFieldDecorator(ADDRESS_FIELD, {
                    initialValue: {},
                    rules: [
                      {
                        required: true,
                        message: translate(
                          this.props.intl,
                          "error.addressIsRequired"
                        )
                      }
                    ]
                  })(
                    <LocationSearch
                      placeholder={translate(
                        this.props.intl,
                        "locationSearchBar"
                      )}
                      onLocationSelect={this.props.handleLocationInputChange}
                      defaultAddress={this.props.defaultAddress}
                      searchOptions={{
                        types: ["address"],
                        componentRestrictions: { country: ["ca", "us"] }
                      }}
                      autosize
                    />
                  )}
                </FormItem>
              </div>
            </div>
          )}

          {/* TODO: Move full screen code to correct file */}

          <FormItem>
            {this.props.form.getFieldDecorator(REGIONS_FIELD, {
              initialValue: {}
            })(
              <PolygonMap
                mapId="polygonMap"
                defaultCenter={{ lat: DEFAULT_LAT, lng: DEFAULT_LON }}
                defaultZoom={8}
                polygonLayers={polygonLayers}
                selectedPolygons={this.props.selectedPolygons}
                onPolygonClick={
                  this.props.jobType === SELL
                    ? () => {}
                    : this.props.onPolygonClick
                }
                form={this.props.form}
                formFieldName={REGIONS_FIELD}
                sendMapDataToParent={this.props.setMapData}
                handlePolygonMouseOver={this.handleHoveredPolygon}
                isMapFullScreen={this.state.isMapFullScreen}
              />
            )}
          </FormItem>
          <div
            className={
              this.props.showCancelButton
                ? "create-polygon-map__button-holder create-polygon-map__button-holder--reverse"
                : "create-polygon-map__button-holder"
            }
          >
            {this.props.showCancelButton && (
              <Button
                size={buttonSize}
                onClick={this.props.onCancel}
                className="create-polygon-map__button create-polygon-map__button--cancel"
              >
                {translate(this.props.intl, "button.cancel")}
              </Button>
            )}
            {!this.props.hidePreviousStepButton && (
              <Button
                size={buttonSize}
                onClick={this.props.handlePreviousStep}
                className="create-polygon-map__button"
              >
                {translate(this.props.intl, "button.back")}
              </Button>
            )}
            <Button
              type="primary"
              size="large"
              onClick={this.props.handleSubmit}
              className="create-polygon-map__button"
            >
              {this.props.isAgentSettingButton
                ? translate(this.props.intl, "offerSettings.editRegionsDone")
                : translate(this.props.intl, "button.next")}
            </Button>
          </div>
        </ActivityIndicator>
      </div>
    );
  }
}

export default CreatePolygonMap;
