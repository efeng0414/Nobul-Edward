import React, { Component } from "react";
import Helmet from "react-helmet";
import { Layout, Select, Drawer, message, Form } from "antd";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import FilterIcon from "react-icons/lib/fa/sliders";
import leafletPip from "@mapbox/leaflet-pip";
import L from "leaflet";
import searchLocationIcon from "../../assets/images/search-pin.svg";

import { translate } from "../../utilities/locale";
import JobList from "../../components/job-list";
import JobsFilter from "../../components/jobs-filter";
import BoxCollapsible from "../../components/box-collapsible";
import {
  toggleSelectedNeighborhoodsHelper,
  showCityCheckbox,
  allNeighborhoodsSelected
} from "../../components/city-select-checkbox/utilities";

import { PROPERTY_TYPES } from "../../../core/data/propertyData";
import { ONTARIO } from "../../../core/constants/regions";

import {
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  NEW_TO_OLD,
  OLD_TO_NEW,
  ALL
} from "../../../core/constants/shared";
import "./styles.scss";
import { getProvinceOrStateFromPlaces } from "../../../core/utilities/parse-places-result";

import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { PROVINCES } from "../../../core/data/provinces";

import AuthenticationLoader from "../../components/authentication-loader";
import Devices from "../../components/breakpoints/devices";
import Desktop from "../../components/breakpoints/desktop";
import { MOBILE, TABLET } from "../../../core/constants/breakpoints";
import FiltersSummary from "../../components/filters-summary";
import userLocation from "../../utilities/user-location";

import { gtmEvent } from "../../utilities/gtm-event";
import {
  AGENT_MARKETPLACE_SEARCH_QUERY,
  AGENT_MARKETPLACE_SEARCH_MAP_CLICK,
  AGENT_MARKETPLACE_MINIMAP_CLICK,
  AGENT_MARKETPLACE_FILTER_PROPERTY_HEADER
} from "../../utilities/google-tag-variable";
import CreatePolygonMap from "../../components/create-polygon-map";

import "./styles.scss";

const LAZY_LOAD_BATCH_SIZE = 12;
@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
@userLocation
@Form.create({})
class MarketPlace extends Component {
  state = {
    modalVisible: false,
    jobType: null,
    drawerVisible: false,
    provinceOrState: "",
    selectedPolygonsOnBigMap: {},
    showSelectCity: false,
    isPolygonSelected: false,
    togglePageNumberResetState: false
  };

  static propTypes = {
    authUserId: PropTypes.string,
    users: PropTypes.object,
    intl: intlShape.isRequired,
    filters: PropTypes.object,
    polygons: PropTypes.object.isRequired,
    filterJobs: PropTypes.func,
    jobsIsLoading: PropTypes.bool.isRequired,
    getAllRegionJobs: PropTypes.func,
    getMultipleConsumersAsync: PropTypes.func,
    getPolygonBoundaries: PropTypes.func.isRequired,
    getMultipleMarketplaceJobs: PropTypes.func.isRequired,
    setMarketplaceJobFilters: PropTypes.func.isRequired,
    jobsToLazyLoad: PropTypes.array,
    unfilteredRegionJobs: PropTypes.array,
    marketplaceJobs: PropTypes.array,
    type: PropTypes.string,
    history: PropTypes.object,
    consumers: PropTypes.object,
    userLocation: PropTypes.object.isRequired,
    agentLocations: PropTypes.object,
    form: PropTypes.object
  };

  static defaultProps = {
    authUserId: "",
    users: {
      currentUser: {},
      services: {},
      defaultCommissions: {},
      profile: {}
    },
    filters: {},
    unfilteredRegionJobs: [],
    consumers: {},
    getAllRegionJobs: () => {},
    getMultipleConsumersAsync: () => {}
  };

  @bound
  setFiltersSummary(...args) {
    gtmEvent({ name: AGENT_MARKETPLACE_FILTER_PROPERTY_HEADER });
    this.setFilters(...args);
  }

  @bound
  setFilters(field, formFilters) {
    const { filters } = this.props;
    filters[field] = formFilters;

    this.setState({
      togglePageNumberResetState: !this.state.togglePageNumberResetState
    });

    this.props.filterJobs(filters).then(() => this.fetchJobsByPage(0));
  }

  @bound
  setSelectedPolygons(selectedPolygons) {
    this.setState({
      selectedPolygonsOnBigMap: selectedPolygons
    });
  }

  @bound
  deletePolygon(polygonId) {
    const { filters = {} } = this.props;
    let selectedPolygons = { ...filters.selectedPolygons };
    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    }

    filters.selectedPolygons = selectedPolygons;
    this.fetchRegionJobsThenFirstPage({ regions: selectedPolygons });
  }

  @bound
  fillValueForSelectedPolygons(e, selectedPolygons) {
    const polygonId = e.layer.feature.properties["polygonId"];
    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    } else {
      selectedPolygons[polygonId] = {
        name: e.layer.feature.properties.name,
        provinceOrState: e.layer.feature.properties.provinceOrState,
        country: e.layer.feature.properties.country
      };
    }
    return selectedPolygons;
  }

  @bound
  removePolygonFromBigMapClick(e) {
    this.removePolygonsFromBigMap({ polygonIds: [e.currentTarget.value] });
  }

  @bound
  removePolygonFromFilterMapClick(e) {
    const polygonId = e.currentTarget.value;
    let selectedPolygons = { ...this.props.filters.selectedPolygons };
    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    }

    this.setFilters("selectedPolygons", selectedPolygons);
  }

  removePolygonsFromBigMap({ polygonIds = [] }) {
    const selectedPolygonsOnBigMap = { ...this.state.selectedPolygonsOnBigMap };
    polygonIds.map(polygonId => delete selectedPolygonsOnBigMap[polygonId]);
    this.setState({ selectedPolygonsOnBigMap });
  }

  @bound
  handlePolygonClickOnBigMap(e) {
    const selectedPolygons = this.state.selectedPolygonsOnBigMap;

    this.setState({
      selectedPolygonsOnBigMap: this.fillValueForSelectedPolygons(
        e,
        selectedPolygons
      ),
      isPolygonSelected: !this.state.isPolygonSelected
    });

    // Set GTM event
    gtmEvent({ name: AGENT_MARKETPLACE_SEARCH_MAP_CLICK });
  }

  @bound
  handlePolygonClickOnFilterMap(e) {
    const selectedPolygons = { ...this.props.filters.selectedPolygons };

    this.setFilters(
      "selectedPolygons",
      this.fillValueForSelectedPolygons(e, selectedPolygons)
    );

    // Set GTM event
    gtmEvent({ name: AGENT_MARKETPLACE_MINIMAP_CLICK });
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
      currentPolygons: this.state.selectedPolygonsOnBigMap,
      setPolygons: selectedPolygons =>
        this.setState({
          selectedPolygonsOnBigMap: selectedPolygons
        })
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
      currentPolygons: this.state.selectedPolygonsOnBigMap
    });
  }

  @bound
  setFilterPolygons(selectedPolygons) {
    this.fetchRegionJobsThenFirstPage({ regions: selectedPolygons });
  }

  @bound
  handleFirstTimePolygonSelect() {
    if (Object.keys(this.state.selectedPolygonsOnBigMap).length) {
      const filters = {
        ...this.props.filters,
        selectedPolygons: this.state.selectedPolygonsOnBigMap
      };
      this.props.setMarketplaceJobFilters({ filters });
      this.setState({
        selectedPolygonsOnBigMap: {}
      });

      this.fetchRegionJobsThenFirstPage({ regions: filters.selectedPolygons });
    } else {
      message.error(translate(this.props.intl, "error.propertyAreaIsRequired"));
    }
  }

  @bound
  handlePolygonMouseOver(polygonId) {
    let isPolygonSelected = false;

    if (this.state.selectedPolygons) {
      isPolygonSelected = Object.keys(this.state.selectedPolygons).some(
        selectedPolygonId => selectedPolygonId === polygonId
      );
    }

    this.setState({
      isPolygonSelected
    });
  }

  getUniqueConsumerIds({ jobs }) {
    return Object.values(jobs).map(job => job.consumerId);
  }

  @bound
  setDefaultPolygons() {
    const selectedPolygons =
      this.props.filters.selectedPolygons || this.props.agentLocations || {};

    const filters = {
      ...this.props.filters,
      selectedPolygons
    };

    this.props.setMarketplaceJobFilters({ filters });

    this.fetchRegionJobsThenFirstPage({ regions: selectedPolygons });
  }

  fetchRegionJobsThenFirstPage({ regions }) {
    const allRegionJobsPromise = this.props.getAllRegionJobs({
      regions: Object.keys(regions),
      agentId: this.props.users.currentUser.uid
    });

    allRegionJobsPromise.then(() => {
      const uniqueConsumerIds = this.getUniqueConsumerIds({
        jobs: this.props.unfilteredRegionJobs
      });
      this.props.getMultipleConsumersAsync({
        consumerIdArray: uniqueConsumerIds
      });

      this.fetchJobsByPage(0);
    });

    this.props.filters.selectedPolygons = regions;
  }

  @bound
  fetchJobsByPage(pageNumber) {
    const index = pageNumber * LAZY_LOAD_BATCH_SIZE;

    const jobsToFetch = this.props.jobsToLazyLoad
      .slice(index, index + LAZY_LOAD_BATCH_SIZE)
      .map(job => ({ jobId: job.key, jobType: job.jobType }));

    jobsToFetch.length &&
      this.props.getMultipleMarketplaceJobs({
        jobIdsAndTypes: jobsToFetch,
        currentAgentId: this.props.authUserId
      });
  }

  @bound
  showModal(selectedJobId, selectedJob) {
    const jobType = selectedJob.jobType;
    this.setState({
      selectedJobId,
      selectedJob,
      modalVisible: true,
      jobType
    });
  }

  @bound
  closeModal() {
    this.setState({
      modalVisible: false
    });
  }

  @bound
  changeSort(value) {
    this.setFilters("sort", value);
  }

  @bound
  showDrawer() {
    this.setState({ drawerVisible: true });
  }

  @bound
  hideDrawer() {
    this.setState({ drawerVisible: false });
  }

  getProvinceOrState() {
    return this.props.users.profile.provinceOrState ||
      this.props.userLocation.isRegionSupported
      ? this.props.userLocation.state
      : ONTARIO;
  }

  componentDidUpdate(prevProps) {
    const { currentUser = {} } = this.props.users;
    // The user has logged in
    const userLoggedIn =
      currentUser.uid &&
      prevProps.users &&
      currentUser.uid !== prevProps.users.currentUser.uid;
    if (userLoggedIn) {
      this.setPolygonBoundaries();
    }

    if (prevProps.unfilteredRegionJobs !== this.props.unfilteredRegionJobs) {
      this.props.filterJobs(this.props.filters);
    }

    if (
      !this.props.users.profile.provinceOrState &&
      this.props.userLocation.state !== prevProps.userLocation.state &&
      this.props.userLocation.isRegionSupported
    ) {
      this.setPolygonBoundaries();
    }
  }

  setPolygonBoundaries() {
    // Set their default polygons.
    this.setDefaultPolygons();
    const provinceOrState = this.getProvinceOrState();
    this.setState({ provinceOrState });
    if (provinceOrState && !this.props.polygons.boundaries[provinceOrState]) {
      this.props.getPolygonBoundaries({ provinceOrState });
    }
  }

  componentDidMount() {
    message.config({
      maxCount: 1
    });

    this.searchLocationPin = L.icon({
      iconUrl: searchLocationIcon,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
    if (this.props.users.currentUser.uid) {
      this.setPolygonBoundaries();
    }

    if (this.props.unfilteredRegionJobs) {
      this.props.filterJobs(this.props.filters);
    }

    // Set all on first load.
    !this.props.filters.propertyType &&
      this.setFilters("propertyType", [
        ...PROPERTY_TYPES.map(el => el.value),
        ALL
      ]);
  }

  @bound
  handleLocationInputChange(result, latLng) {
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
      this.props.users.profile.provinceOrState &&
      provinceOrState !== this.props.users.profile.provinceOrState
    ) {
      message.error(
        translate(this.props.intl, "marketplaceNotAgentProvinceOrStateError")
      );
    } else {
      if (!this.props.polygons.boundaries[provinceOrState]) {
        this.props.getPolygonBoundaries({ provinceOrState }).then(() => {
          this.setState({ isMapLoading: false, provinceOrState });
          this.loadLocationOnMap({ latLng });
        });
      } else {
        this.setState({
          isMapLoading: false,
          provinceOrState
        });
        this.loadLocationOnMap({ latLng });
      }
    }

    this.setState({
      showSelectCity: showCityCheckbox({ placesApiResult: result })
    });

    // Set GTM event
    gtmEvent({ name: AGENT_MARKETPLACE_SEARCH_QUERY });
  }

  @bound
  setMapData(map) {
    this.map = map;
  }

  @bound
  loadLocationOnMap({ latLng }) {
    if (this.map) {
      const { lat, lng } = latLng;
      const includedPolygons = leafletPip.pointInLayer([lng, lat], this.map);
      if (includedPolygons.length) {
        const polygon = includedPolygons[0];
        const bounds = L.featureGroup([polygon]).getBounds();
        this.map.flyToBounds([bounds]);
      } else {
        this.setState({ selectedPolygons: {} });
      }
    }
  }

  render() {
    const { Content } = Layout;
    const Option = Select.Option;
    const hasDefaultLocations =
      !objectIsEmpty(this.props.agentLocations) ||
      !objectIsEmpty(this.props.filters.selectedPolygons);
    const polygonLayers =
      this.props.polygons.boundaries[this.state.provinceOrState] || {};

    return (
      <div className="marketplace">
        <Helmet title={translate(this.props.intl, "helmet.marketPlace")} />
        {this.props.users.isLoading ? (
          <AuthenticationLoader />
        ) : (
          <Content>
            {/* If no locations are set, show big map! */}
            {!hasDefaultLocations && (
              <div className="marketplace__map">
                <div className="marketplace__map-title">
                  <h1>
                    {translate(this.props.intl, "marketplaceChooseFirstRegion")}
                  </h1>
                </div>
                <CreatePolygonMap
                  form={this.props.form}
                  jobType={ALL}
                  intl={this.props.intl}
                  polygons={this.props.polygons}
                  selectedPolygons={this.state.selectedPolygonsOnBigMap}
                  onPolygonClick={this.handlePolygonClickOnBigMap}
                  setMapData={this.setMapData}
                  provinceOrState={this.state.provinceOrState}
                  onRemoveRegion={this.removePolygonFromBigMapClick}
                  setSelectedPolygons={this.setSelectedPolygons}
                  showSelectCity={this.state.showSelectCity}
                  handlePolygonMouseOver={this.handlePolygonMouseOver}
                  isPolygonSelected={this.state.isPolygonSelected}
                  handleLocationInputChange={this.handleLocationInputChange}
                  handleSubmit={this.handleFirstTimePolygonSelect}
                  polygonLayers={polygonLayers}
                  toggleNeighborhoods={this.toggleNeighborhoods}
                  hidePreviousStepButton
                  isCityCheckboxChecked={this.isCityCheckboxChecked()}
                  autosize
                />
              </div>
            )}
            {/* If we have locations, show normal screen. */}
            {hasDefaultLocations && (
              <div>
                <Devices sizes={[MOBILE, TABLET]}>
                  <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.hideDrawer}
                    visible={this.state.drawerVisible}
                    className={"marketplace__drawer"}
                  >
                    <JobsFilter
                      intl={this.props.intl}
                      jobsFilters={this.props.filters}
                      setFilters={this.setFilters}
                      handlePolygonClick={this.handlePolygonClickOnFilterMap}
                      handleLocationInputChange={this.handleLocationInputChange}
                      sendMapDataToParent={this.setMapData}
                      polygonLayers={
                        this.props.polygons.boundaries[
                          this.state.provinceOrState
                        ] || {}
                      }
                      mapTitle={translate(
                        this.props.intl,
                        "regionsWhereYouWork"
                      )}
                      setPolygons={this.setFilterPolygons}
                      showSelectCity={this.state.showSelectCity}
                      onRemoveRegion={this.removePolygonFromFilterMapClick}
                    />
                  </Drawer>
                </Devices>

                <Desktop>
                  <BoxCollapsible
                    className="marketplace__filters-holder"
                    isOpenByDefault
                  >
                    <JobsFilter
                      intl={this.props.intl}
                      jobsFilters={this.props.filters}
                      setFilters={this.setFilters}
                      handlePolygonClick={this.handlePolygonClickOnFilterMap}
                      polygonLayers={
                        this.props.polygons.boundaries[
                          this.state.provinceOrState
                        ] || {}
                      }
                      handleLocationInputChange={this.handleLocationInputChange}
                      sendMapDataToParent={this.setMapData}
                      mapTitle={translate(
                        this.props.intl,
                        "regionsWhereYouWork"
                      )}
                      setPolygons={this.setFilterPolygons}
                      showSelectCity={this.state.showSelectCity}
                      onRemoveRegion={this.removePolygonFromFilterMapClick}
                    />
                  </BoxCollapsible>
                </Desktop>

                <div className="marketplace__header">
                  <div className="marketplace__title">
                    {translate(this.props.intl, "marketPlace")}
                  </div>

                  <div className="marketplace__summary">
                    <FiltersSummary
                      propertyType={this.props.filters.propertyType}
                      setFilters={this.setFiltersSummary}
                    />
                  </div>

                  <div className="marketplace__filter">
                    <Select
                      placeholder={translate(this.props.intl, "sortBy")}
                      onChange={this.changeSort}
                    >
                      <Option value={NEW_TO_OLD}>
                        {translate(this.props.intl, "newToOld")}
                      </Option>
                      <Option value={OLD_TO_NEW}>
                        {translate(this.props.intl, "oldToNew")}
                      </Option>
                      <Option value={HIGH_TO_LOW}>
                        {translate(this.props.intl, "highToLow")}
                      </Option>
                      <Option value={LOW_TO_HIGH}>
                        {translate(this.props.intl, "lowToHigh")}
                      </Option>
                    </Select>
                    <Devices sizes={[MOBILE, TABLET]}>
                      <div
                        className="marketplace__icon"
                        onClick={this.showDrawer}
                      >
                        <FilterIcon size={20} />
                      </div>
                    </Devices>
                  </div>
                </div>

                <JobList
                  jobs={this.props.marketplaceJobs}
                  isLoading={this.props.jobsIsLoading}
                  loadMore={this.fetchJobsByPage}
                  hasMore={
                    this.props.marketplaceJobs.length <
                    this.props.jobsToLazyLoad.length - 1
                  }
                  showModal={this.showModal}
                  history={this.props.history}
                  currentUser={this.props.users.currentUser}
                  consumers={this.props.consumers}
                  shouldResetPageNumber={this.state.togglePageNumberResetState} // The page number reset of InfiniteScroll is trigged by this state, either true or false will trigger update.
                />
              </div>
            )}
          </Content>
        )}
      </div>
    );
  }
}

export default MarketPlace;
