import React, { PureComponent } from "react";
import { Form, Radio, Switch, Checkbox } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import FullScreenIcon from "react-icons/lib/md/fullscreen";
import FullScreenExit from "react-icons/lib/md/fullscreen-exit";

import { translate } from "../../utilities/locale";
import PolygonMap from "../polygon-map";
import {
  BUY,
  SELL,
  PRICE,
  DATE,
  ALL,
  PRICE_RANGE_FIELD
} from "../../../core/constants/shared";
import {
  PROPERTY_TYPES,
  PROPERTY_PRICE_RANGE
} from "../../../core/data/propertyData";
import LocationSearch from "../../components/location-search";
import { PRICE_RANGE_SELECTOR_CLASS_NAME } from "../../utilities/constants";

import CitySelectCheckbox from "../../components/city-select-checkbox";
import NeighborhoodsList from "../../components/neighborhoods-list";
import {
  toggleSelectedNeighborhoodsHelper,
  allNeighborhoodsSelected
} from "../../components/city-select-checkbox/utilities";

import "./styles.scss";
import PriceRangeSlider from "../price-range-slider";

import { gtmEvent } from "../../utilities/gtm-event";

import {
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  RECREATIONAL,
  COMMERCIAL,
  OTHER
} from "../../../core/constants/listings";

import {
  AGENT_MARKETPLACE_FILTER_BY_ALL,
  AGENT_MARKETPLACE_FILTER_BY_BUY,
  AGENT_MARKETPLACE_FILTER_BY_SELL,
  AGENT_MARKETPLACE_FILTER_PROPERTY_ALL,
  AGENT_MARKETPLACE_FILTER_PROPERTY_HOUSE,
  AGENT_MARKETPLACE_FILTER_PROPERTY_CONDO,
  AGENT_MARKETPLACE_FILTER_PROPERTY_RECREATIONAL,
  AGENT_MARKETPLACE_FILTER_PROPERTY_COMMERCIAL,
  AGENT_MARKETPLACE_FILTER_PROPERTY_OTHER,
  AGENT_MARKETPLACE_LOCATION_SEARCH_BOX,
  AGENT_MARKETPLACE_PRICE_RANGE
} from "../../utilities/google-tag-variable";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const propertyTypeValues = PROPERTY_TYPES.map(el => el.value);
const MAP_FULLSCREEN_ICON_SIZE = 30;

const setGtmEventForValue = ({ value, cases }) => {
  gtmEvent({ name: cases[value] });
};

const propertyTypeBoxClick = e => {
  // Set GTM event
  setGtmEventForValue({
    value: e.target.value,
    cases: {
      [HOUSE_TOWNHOUSE]: AGENT_MARKETPLACE_FILTER_PROPERTY_HOUSE,
      [CONDO_APARTMENT]: AGENT_MARKETPLACE_FILTER_PROPERTY_CONDO,
      [RECREATIONAL]: AGENT_MARKETPLACE_FILTER_PROPERTY_RECREATIONAL,
      [COMMERCIAL]: AGENT_MARKETPLACE_FILTER_PROPERTY_COMMERCIAL,
      [OTHER]: AGENT_MARKETPLACE_FILTER_PROPERTY_OTHER
    }
  });
};
@Form.create({})
class JobsFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMapFullScreen: false
    };
    this.rootMapRef = React.createRef();
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

  componentDidMount() {
    this.registerFullScreenChangeListeners();
  }

  componentWillUnmount() {
    this.removeFullScreenChangeListeners();
  }

  @bound
  handleLocationInputChange(result, latLng) {
    this.props.handleLocationInputChange(result, latLng);
    gtmEvent({ name: AGENT_MARKETPLACE_LOCATION_SEARCH_BOX });
  }

  @bound
  handleTypeOnChange(e) {
    const { value = [] } = e.target;
    const jobType = value === ALL ? [BUY, SELL] : [value];
    this.props.setFilters("jobType", jobType);

    // Set GTM event
    setGtmEventForValue({
      value,
      cases: {
        [ALL]: AGENT_MARKETPLACE_FILTER_BY_ALL,
        [SELL]: AGENT_MARKETPLACE_FILTER_BY_SELL,
        [BUY]: AGENT_MARKETPLACE_FILTER_BY_BUY
      }
    });
  }

  @bound
  handleSortOnChange(e) {
    this.props.setFilters("sort", e.target.value);
  }

  @bound
  handleSortAscOnChange(e) {
    this.props.setFilters("asc", e);
  }

  @bound
  handleSelectAllPropertyType({ remove }) {
    // Set all filters
    const newFilters = remove ? [] : [...propertyTypeValues, ALL];
    this.props.setFilters("propertyType", newFilters);
  }

  @bound
  handleChangeAll(el) {
    this.handleSelectAllPropertyType({
      remove: !el.target.checked
    });
  }

  @bound
  handlePriceRangeChange(value) {
    this.props.form.setFieldsValue({ [PRICE_RANGE_FIELD]: value });
    this.props.setFilters(PRICE_RANGE_FIELD, value);

    // Set GTM event
    gtmEvent({ name: AGENT_MARKETPLACE_PRICE_RANGE });
  }

  @bound
  handleChangeProperty(selectedValues) {
    if (selectedValues.includes(ALL)) {
      selectedValues.length < propertyTypeValues.length + 1 &&
        selectedValues.splice(selectedValues.indexOf(ALL), 1);

      // Set GTM event
      gtmEvent({ name: AGENT_MARKETPLACE_FILTER_PROPERTY_ALL });
    } else {
      selectedValues.length === propertyTypeValues.length &&
        selectedValues.push(ALL);
    }

    this.props.setFilters("propertyType", selectedValues);
  }

  @bound
  toggleNeighborhoods(e) {
    const selectAll = e.currentTarget.checked;
    const mapPolygons = this.props.polygonLayers;

    toggleSelectedNeighborhoodsHelper({
      selectAll,
      mapPolygons,
      currentPolygons: this.props.jobsFilters.selectedPolygons,
      setPolygons: this.props.setPolygons
    });
  }

  @bound
  isCityCheckboxChecked() {
    // No need to do anything if we can't see the checkbox.
    if (!this.props.showSelectCity) {
      return false;
    }

    return allNeighborhoodsSelected({
      mapPolygons: this.props.polygonLayers,
      currentPolygons: this.props.jobsFilters.selectedPolygons
    });
  }

  render() {
    const selectedPolygons = this.props.jobsFilters.selectedPolygons || {};
    const propertyType = this.props.jobsFilters.propertyType || [];

    return (
      <div className="jobs-filter">
        <span className="jobs-filter__title">
          {translate(this.props.intl, "filterBy")}
        </span>
        <Form layout="horizontal">
          <FormItem>
            {this.props.form.getFieldDecorator("type", {
              initialValue: ALL
            })(
              <RadioGroup onChange={this.handleTypeOnChange}>
                <Radio value={ALL}>{translate(this.props.intl, ALL)}</Radio>
                <Radio value={BUY}>{translate(this.props.intl, "buy")}</Radio>
                <Radio value={SELL}>{translate(this.props.intl, "sell")}</Radio>
              </RadioGroup>
            )}
          </FormItem>

          {this.props.enableSort ? (
            <div>
              <p>{translate(this.props.intl, "sortBy")}</p>
              <div>
                <FormItem>
                  {this.props.form.getFieldDecorator("sort", {
                    initialValue: DATE
                  })(
                    <Radio.Group onChange={this.handleSortOnChange}>
                      <Radio value={DATE}>
                        {translate(this.props.intl, "date")}
                      </Radio>
                      <Radio value={PRICE}>
                        {translate(this.props.intl, "price")}
                      </Radio>
                    </Radio.Group>
                  )}
                  <Switch
                    onChange={this.handleSortAscOnChange}
                    checkedChildren={translate(this.props.intl, "asc")}
                    unCheckedChildren={translate(this.props.intl, "asc")}
                    defaultChecked
                  />
                </FormItem>
              </div>
            </div>
          ) : null}

          <FormItem
            label={translate(this.props.intl, "selectPropertyType")}
            className="jobs-filter__property-types"
            colon={false}
          >
            <Checkbox
              value={ALL}
              onChange={this.handleChangeAll}
              checked={propertyType.includes(ALL)}
            >
              {translate(this.props.intl, ALL)}
            </Checkbox>

            <CheckboxGroup
              onChange={this.handleChangeProperty}
              value={propertyType}
            >
              {propertyTypeValues.map(value => (
                <Checkbox
                  key={value}
                  value={value}
                  className="jobs-filter__property-type"
                  onClick={propertyTypeBoxClick}
                >
                  {translate(this.props.intl, value)}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </FormItem>

          <FormItem
            label={translate(this.props.intl, "selectPriceRange")}
            colon={false}
            className={`${PRICE_RANGE_SELECTOR_CLASS_NAME} jobs-filter__price-range`}
          >
            {this.props.form.getFieldDecorator(PRICE_RANGE_FIELD)(
              <PriceRangeSlider
                isForPosting
                onPriceRangeChange={this.handlePriceRangeChange}
                defaultValue={[0, PROPERTY_PRICE_RANGE.length - 1]}
              />
            )}
          </FormItem>

          {this.props.mapTitle && <h6>{this.props.mapTitle}</h6>}

          <LocationSearch
            placeholder={translate(
              this.props.intl,
              "marketplaceLocationSearchBar"
            )}
            onLocationSelect={this.handleLocationInputChange}
            searchOptions={{
              componentRestrictions: { country: ["ca", "us"] }
            }}
            autosize
          />

          <div className="jobs-filter__map" ref={this.rootMapRef}>
            <div className="jobs-filter__map__fullscreen">
              {!this.state.isMapFullScreen ? (
                <FullScreenIcon
                  size={MAP_FULLSCREEN_ICON_SIZE}
                  onClick={this.handleMapFullScreen}
                />
              ) : (
                <FullScreenExit
                  size={MAP_FULLSCREEN_ICON_SIZE}
                  onClick={this.handleMapFullScreenExit}
                />
              )}
            </div>
            <PolygonMap
              mapId={"jobFilterMap"}
              defaultCenter={{ lat: 43.6567919, lng: -79.4609302 }}
              defaultZoom={8}
              polygonLayers={this.props.polygonLayers}
              selectedPolygons={selectedPolygons}
              setBoundsFromSelected
              onPolygonClick={this.props.handlePolygonClick}
              sendMapDataToParent={this.props.sendMapDataToParent}
              isMapFullScreen={this.state.isMapFullScreen}
            />

            {this.props.showSelectCity && (
              <CitySelectCheckbox
                onClick={this.toggleNeighborhoods}
                isChecked={this.isCityCheckboxChecked()}
              />
            )}
            <NeighborhoodsList
              selectedPolygons={selectedPolygons}
              onRemoveRegion={this.props.onRemoveRegion}
            />
          </div>
        </Form>
      </div>
    );
  }
}

JobsFilter.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.object,
  jobsFilters: PropTypes.object,
  setFilters: PropTypes.func,
  displayMap: PropTypes.bool,
  setDisplayMap: PropTypes.func,
  handlePolygonClick: PropTypes.func,
  handleLocationInputChange: PropTypes.func.isRequired,
  sendMapDataToParent: PropTypes.func.isRequired,
  polygonLayers: PropTypes.object.isRequired,
  enableSort: PropTypes.bool,
  mapTitle: PropTypes.string,
  setPolygons: PropTypes.func,
  showSelectCity: PropTypes.bool,
  onRemoveRegion: PropTypes.func
};

export default JobsFilter;
