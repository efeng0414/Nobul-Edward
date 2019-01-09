import React, { Component } from "react";
import { Layout, Drawer } from "antd";
import PropTypes from "prop-types";
import L from "leaflet";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import {
  PROPERTY_TYPES,
  DEFAULT_PROPERTY_TYPES,
  BROWSE_PRICE_STEPS
} from "../../../core/data/propertyData";
import {
  COMMERCIAL,
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  RECREATIONAL,
  OTHER
} from "../../../core/constants/listings";

import ListingsMap from "../../components/listings-map";
import ListingsList from "../../components/listings-list";
import ListingsFilter from "../../components/listings-filter";
import BoxCollapsible from "../../components/box-collapsible";
import SingleUsePopup from "../../components/single-use-popup";
import { fetchMultipleDetailsAndFeatureImages } from "../../../core/firebase/listings";
import { translate } from "../../utilities/locale";
import {
  checkForSessionItem,
  saveSessionItem
} from "../../utilities/cache-handler";
import requireAuth from "../../utilities/require-auth";
import Devices from "../../components/breakpoints/devices";
import { TABLET, DESKTOP } from "../../../core/constants/breakpoints";
import Mobile from "../../components/breakpoints/mobile";
import searchLocationIcon from "../../assets/images/search-pin.svg";
import "leaflet/dist/leaflet.css";
import "./styles.scss";
import { getProvinceOrStateFromPlaces } from "../../../core/utilities/parse-places-result";
import {
  LISTVIEW_SIDER_WIDTH,
  getPopupContentKey,
  getDistance
} from "./utilities";
import { supportedProvinces } from "../../../core/constants/regions";

import FilterIcon from "react-icons/lib/fa/sliders";
import leafletPip from "@mapbox/leaflet-pip";
import { objectIsEmpty } from "../../../core/utilities/misc";
import {
  CONSUMER_SEARCH_REAL_ESTATE_LOCATION,
  CONSUMER_SEARCH_REAL_ESTATE_BEDROOMS,
  CONSUMER_SEARCH_REAL_ESTATE_BATHROOMS,
  CONSUMER_SEARCH_REAL_ESTATE_PARKING,
  CONSUMER_SEARCH_REAL_ESTATE_PRICE,
  CONSUMER_SEARCH_REAL_ESTATE_HOUSE,
  CONSUMER_SEARCH_REAL_ESTATE_CONDO,
  CONSUMER_SEARCH_REAL_ESTATE_RECREATIONAL,
  CONSUMER_SEARCH_REAL_ESTATE_COMMERCIAL,
  CONSUMER_SEARCH_REAL_ESTATE_OTHER,
  CONSUMER_SEARCH_REAL_ESTATE_SHARE_PROPERTY,
  CONSUMER_SEARCH_REAL_ESTATE_FAVORITE_PROPERTY,
  CONSUMER_SEARCH_REAL_ESTATE_TAG_PROPERTY,
  CONSUMER_SEARCH_REAL_ESTATE_CLICK_TO_PROPERTY
} from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";
import ErrorBoundary from "../../components/error-boundary";
import { getLocation } from "../../utilities/url";
import { COUNTRY_FROM_STATE } from "../../../core/data/provinces";
import {
  SEEN_CREA_POPUP,
  DEFAULT_REGION
} from "../../../core/constants/shared";
import makeCancelablePromise from "../../utilities/make-cancelable-promise";

const { Content, Sider } = Layout;
const BATCH_SIZE = 20;
const TORONTO_LATLNG = {
  lat: 43.653908,
  lng: -79.384293
};

@requireAuth({ allowAnonymous: true })
class BrowseListingsMap extends Component {
  provinceOrState = getLocation(this.props.location);

  state = {
    listingsOnMap: [],
    initialLoad: true,
    isMapView: true,
    isListLoading: false,
    clusterListings: [],
    checkBoxState: DEFAULT_PROPERTY_TYPES.map(property => property.value),
    filters: {
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      propertyTypes: DEFAULT_PROPERTY_TYPES.map(property => property.value),
      priceMin: 0,
      priceMax: BROWSE_PRICE_STEPS.length - 1
    },
    locationPinCoords: {},
    drawerVisible: false,
    bounds: { latTop: null, latBottom: null, lngLeft: null, lngRight: null },
    listingListIsLoading: true,
    sortBy: ""
  };

  _mounted = false;
  map = {};
  clusterIndex = {};
  checkValue = {};
  searchLocationPin = {};
  searchLocationLayer = {};
  supportedBrowsePolygons = null;

  static propTypes = {
    intl: intlShape.isRequired,
    listings: PropTypes.object,
    users: PropTypes.object,
    getListingDetails: PropTypes.func,
    filterListings: PropTypes.func,
    getMasterlist: PropTypes.func,
    history: PropTypes.object,
    supportedBrowsePolygons: PropTypes.object.isRequired,
    location: PropTypes.any.isRequired,
    browseLocation: PropTypes.string.isRequired,
    cachedListingList: PropTypes.array.isRequired,
    cacheListingList: PropTypes.func.isRequired,
    getSupportedBrowseRegions: PropTypes.func.isRequired,
    currentBreakPoint: PropTypes.string,
    buyJobs: PropTypes.object,
    address: PropTypes.string.isRequired,
    sortingActive: PropTypes.bool
  };

  static defaultProps = {
    address: ""
  };

  componentDidMount() {
    this._mounted = true;
    const hasLoadedMasterList =
      !!this.props.listings.masterlist.length &&
      this.getSupportedProvinceOrState() ===
        this.props.listings.masterListProvinceOrState;
    !hasLoadedMasterList &&
      this.props.getMasterlist({
        provinceOrState: this.getSupportedProvinceOrState()
      });
    this.searchLocationPin = L.icon({
      iconUrl: searchLocationIcon,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    PROPERTY_TYPES.map(propertyType => { // eslint-disable-line
      this.checkValue[translate(this.props.intl, propertyType.value)] =
        propertyType.value;
    });

    if (objectIsEmpty(this.props.supportedBrowsePolygons)) {
      this.props.getSupportedBrowseRegions();
    } else {
      this.supportedBrowsePolygons = L.geoJSON(
        this.props.supportedBrowsePolygons
      );
    }

    this.filterAndSortListings();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.listingListIsLoading &&
      (!this.state.isListLoading || !this.props.listings.masterlistIsLoading)
    ) {
      this.setState({ listingListIsLoading: false });
    }

    if (
      !prevProps.listings.masterlist.length &&
      this.props.listings.masterlist.length
    ) {
      this.filterAndSortListings();
    }

    if (
      objectIsEmpty(prevProps.supportedBrowsePolygons) &&
      !objectIsEmpty(this.props.supportedBrowsePolygons)
    ) {
      this.supportedBrowsePolygons = L.geoJSON(
        this.props.supportedBrowsePolygons
      );
    }
    if (
      prevState.clusterListings.length === 0 &&
      this.state.clusterListings.length !== 0
    ) {
      if (this.map) {
        this.map.invalidateSize();
      }
    }
    if (this.props.location.search !== prevProps.location.search) {
      this.provinceOrState = getLocation(this.props.location);
      const hasLoadedMasterList =
        !!this.props.listings.masterlist.length &&
        this.getSupportedProvinceOrState() ===
          this.props.listings.masterListProvinceOrState;
      !hasLoadedMasterList &&
        this.props.getMasterlist({
          provinceOrState: this.getSupportedProvinceOrState()
        });
    }

    if (
      prevProps.listings.sortedListingIds !==
      this.props.listings.sortedListingIds
    ) {
      this.getListingData(this.props.listings.sortedListingIds);
    }
  }

  @bound
  googleTagLocation() {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_LOCATION });
  }

  @bound
  googleTagShareProperty() {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_SHARE_PROPERTY });
  }

  @bound
  googleTagFavoriteProperty() {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_FAVORITE_PROPERTY });
  }

  @bound
  googleTagTagProperty() {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_TAG_PROPERTY });
  }

  @bound
  googleTagClickProperty() {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_CLICK_TO_PROPERTY });
  }

  distanceSortFunction = (a, b) => {
    const { lat, lng } = this.map.getCenter();
    const primaryLat = this.state.locationPinCoords.lat || lat;
    const primaryLng = this.state.locationPinCoords.lng || lng;

    return (
      getDistance({
        x1: primaryLat,
        y1: primaryLng,
        x2: a.geometry.coordinates[1],
        y2: a.geometry.coordinates[0]
      }) -
      getDistance({
        x1: primaryLat,
        y1: primaryLng,
        x2: b.geometry.coordinates[1],
        y2: b.geometry.coordinates[0]
      })
    );
  };

  mapMoveSortApi() {
    const { lat, lng } = this.map.getCenter();

    this.storeMapBounds();

    if (this.supportedBrowsePolygons) {
      const mapProvinceOrState = leafletPip.pointInLayer(
        [lng, lat],
        this.supportedBrowsePolygons
      )[0];
      if (mapProvinceOrState) {
        const { provinceOrState } = mapProvinceOrState.feature.properties;
        this.provinceOrState = provinceOrState;
        this.props.history.push({
          search: provinceOrState
        });
        this.setState({ clusterListings: [] });
      }
    }

    this.props.listings.filteredListings.length && this.filterAndSortListings();
  }

  mapMoveLocal = (e, clusterIndex) => {
    let listingsOnMap = [];
    let listingsOnMapIds = [];
    e.target.eachLayer(layer => {
      const { feature } = layer;
      if (feature) {
        const { properties = {} } = feature;
        if (properties.cluster) {
          const children = clusterIndex.getLeaves(
            properties.cluster_id,
            Infinity
          );
          for (let i = 0; i < children.length; i++) {
            listingsOnMap.push(children[i]);
          }
        } else {
          listingsOnMap.push(feature);
        }
      }
    });

    this.storeMapBounds();

    const { lat, lng } = this.map.getCenter();

    // Get listingIds for map
    listingsOnMapIds = listingsOnMap
      .sort(this.distanceSortFunction)
      .map(listing => listing.properties.listingId);

    if (this.supportedBrowsePolygons) {
      const mapProvinceOrState = leafletPip.pointInLayer(
        [lng, lat],
        this.supportedBrowsePolygons
      )[0];
      if (mapProvinceOrState) {
        const { provinceOrState } = mapProvinceOrState.feature.properties;
        this.provinceOrState = provinceOrState;
        this.props.history.push({
          search: provinceOrState
        });
        this.setState({ clusterListings: [] });
      }
    }

    this.setState({ listingsOnMap: listingsOnMapIds });
    this.props.listings.filteredListings.length && this.filterAndSortListings();
    this.getListingData(listingsOnMapIds);
  };

  handleMapMove = (e, clusterIndex) => {
    if (this.props.sortingActive) {
      this.mapMoveSortApi();
    } else {
      this.mapMoveLocal(e, clusterIndex);
    }
  };

  storeMapBounds(callback) {
    const bounds = this.map.getBounds();
    const boundsToCache = {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest()
    };

    saveSessionItem("browseListingSearchLocation", boundsToCache);

    this.setState(
      {
        bounds: {
          latTop: boundsToCache.north,
          latBottom: boundsToCache.south,
          lngLeft: boundsToCache.west,
          lngRight: boundsToCache.east
        }
      },
      callback ? callback : () => {}
    );
  }

  setMapData = (mapData, clusterIndex) => {
    this.map = mapData;
    this.clusterIndex = clusterIndex;

    let listingsOnMapIds = [];
    this.map.eachLayer(layer => {
      const { feature } = layer;
      if (feature) {
        const { properties = {} } = feature;
        if (properties.cluster) {
          const children = clusterIndex.getLeaves(
            properties.cluster_id,
            Infinity
          );
          for (let i = 0; i < children.length; i++) {
            listingsOnMapIds.push(children[i].properties.listingId);
          }
        } else {
          listingsOnMapIds.push(properties.listingId);
        }
      }
    });

    this.state.initialLoad && this.storeMapBounds(this.filterAndSortListings);

    if (!this.props.sortingActive) {
      this.state.initialLoad &&
        !Object.keys(this.props.cachedListingList).length &&
        this.getListingData(listingsOnMapIds);
      !this.state.initialLoad &&
        this.props.listings.filteredListings.length &&
        this.getListingData(listingsOnMapIds);
      this.setState({
        listingsOnMap: listingsOnMapIds
      });
    }

    this.setState({
      initialLoad: false
    });
  };

  handleBathroomChange = e => {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_BATHROOMS });
    let filters = { ...this.state.filters };
    filters.bathrooms = e.target.value;
    this.setState({ filters });
  };

  handleBedroomChange = e => {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_BEDROOMS });
    let filters = { ...this.state.filters };
    filters.bedrooms = e.target.value;
    this.setState({ filters });
  };

  handleParkingChange = e => {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_PARKING });
    let filters = { ...this.state.filters };
    filters.parking = e.target.value;
    this.setState({ filters });
  };

  handlePropertyTypeChange = values => {
    let filters = { ...this.state.filters };
    filters.propertyTypes = values;
    this.setState({ filters });
  };

  handlePriceRangeChange = event => {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_PRICE });
    let filters = { ...this.state.filters };
    const [priceMin, priceMax] = event;
    filters.priceMin = priceMin;
    filters.priceMax = priceMax;
    this.setState({ filters });
  };

  handleFilterSubmit = event => {
    event.preventDefault();
    this.filterAndSortListings();
  };

  handleLocationInputChange = (result, latlng) => {
    const northEast = result.geometry.viewport.getNorthEast();
    const southWest = result.geometry.viewport.getSouthWest();
    const bounds = [
      [northEast.lat(), northEast.lng()],
      [southWest.lat(), southWest.lng()]
    ];
    const provinceOrState = getProvinceOrStateFromPlaces(result);
    this.props.history.push({
      search: provinceOrState
    });
    this.provinceOrState = provinceOrState;
    if (this.map) {
      saveSessionItem("browseListingSearchLocation", result.geometry.viewport);
      this.setState({ clusterListings: [] });
      const { lat, lng } = latlng;
      this.setState({ locationPinCoords: { lat, lng } });
      this.map.removeLayer(this.searchLocationLayer);
      this.map.flyToBounds(bounds);
      this.searchLocationLayer = L.marker([lat, lng], {
        icon: this.searchLocationPin
      }).addTo(this.map);
    }
  };

  @bound
  getListingData(clusterListings) {
    this.setState({
      isListLoading: true,
      clusterListings
    });

    const page1 = clusterListings.slice(0, BATCH_SIZE);

    this.fetchDetails && this.fetchDetails.cancel();
    const fetchDetails = makeCancelablePromise(
      fetchMultipleDetailsAndFeatureImages(page1, this.provinceOrState)
    );
    fetchDetails.promise
      .then(data => {
        if (this._mounted) {
          this.setState({
            isListLoading: false
          });
          this.props.cacheListingList({ listingList: data });
        }
      })
      .catch(console.error);
  }

  @bound
  handleListingsLoad(pageNum) {
    this.setState({ isListLoading: true });

    const index = pageNum * BATCH_SIZE;
    const nextPage = this.state.clusterListings.slice(
      index,
      index + BATCH_SIZE
    );
    fetchMultipleDetailsAndFeatureImages(nextPage, this.provinceOrState).then(
      data => {
        const mergedListings = [...this.props.cachedListingList, ...data];
        this.setState({
          isListLoading: false
        });
        this.props.cacheListingList({ listingList: mergedListings });
      }
    );
  }

  @bound
  onCheckBoxChange(list) {
    const { filters, checkBoxState } = this.state;

    const longPropertyList =
      list.length > checkBoxState.length ? list : checkBoxState;
    const shortPropertyList =
      list.length > checkBoxState.length ? checkBoxState : list;

    for (const property of longPropertyList) {
      if (!shortPropertyList.includes(property)) {
        (item => {
          switch (item) {
            case HOUSE_TOWNHOUSE:
              gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_HOUSE });
              break;
            case COMMERCIAL:
              gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_COMMERCIAL });
              break;
            case CONDO_APARTMENT:
              gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_CONDO });
              break;
            case RECREATIONAL:
              gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_RECREATIONAL });
              break;
            case OTHER:
              gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_OTHER });
              break;
            default:
              break;
          }
        })(property);
        break;
      }
    }

    const newFilters = {
      ...filters,
      propertyTypes: list.map(val => this.checkValue[val])
    };
    this.setState({ checkBoxState: list, filters: newFilters });
  }

  getMapInitialBounds() {
    if (this.props.location && this.props.location.state) {
      //Setting map based on search location
      const { location } = this.props.location.state;
      return [
        [location.getSouthWest().lat(), location.getSouthWest().lng()],
        [location.getNorthEast().lat(), location.getNorthEast().lng()]
      ];
    } else if (checkForSessionItem("browseListingSearchLocation")) {
      //Setting map based on cached search location
      const location = checkForSessionItem("browseListingSearchLocation");
      return [[location.south, location.west], [location.north, location.east]];
    } else if (checkForSessionItem("userGeoLocation")) {
      //Setting map based on cached user location
      const userLocation = checkForSessionItem("userGeoLocation");
      const userLocationOffset = 0.01;
      const SW = {
        lat: userLocation.lat + userLocationOffset,
        lng: userLocation.lng + userLocationOffset
      };
      const NE = {
        lat: userLocation.lat - userLocationOffset,
        lng: userLocation.lng - userLocationOffset
      };
      return [[SW.lat, SW.lng], [NE.lat, NE.lng]];
    } else {
      //If all else fails, set map based on Toronto lat lng
      const torontoOffset = 0.05;
      const SW = {
        lat: TORONTO_LATLNG.lat + torontoOffset,
        lng: TORONTO_LATLNG.lng + torontoOffset
      };
      const NE = {
        lat: TORONTO_LATLNG.lat - torontoOffset,
        lng: TORONTO_LATLNG.lng - torontoOffset
      };
      return [[SW.lat, SW.lng], [NE.lat, NE.lng]];
    }
  }

  @bound
  sortChange(sortBy) {
    this.setState({ sortBy }, this.filterAndSortListings);
  }

  @bound
  showDrawer() {
    this.setState({ drawerVisible: true });
  }

  @bound
  hideDrawer() {
    this.setState({ drawerVisible: false });
  }

  @bound
  getSupportedProvinceOrState() {
    return supportedProvinces[this.provinceOrState]
      ? this.provinceOrState
      : DEFAULT_REGION;
  }

  @bound
  filterAndSortListings() {
    this.props.filterListings({
      filters: this.state.filters,
      sortBy: this.state.sortBy,
      skipSorting: !this.props.sortingActive,
      ...this.state.bounds
    });
  }

  render() {
    const country =
      this.provinceOrState && COUNTRY_FROM_STATE[this.provinceOrState];
    const provinceOrState = this.getSupportedProvinceOrState();
    const popupContentKey = getPopupContentKey(provinceOrState);

    const defaultBounds = this.getMapInitialBounds();
    const { filters, clusterListings, checkBoxState } = this.state;
    const { history, listings } = this.props;
    const { masterlistIsLoading, filteredListings } = listings;
    const address = this.props.location.state
      ? this.props.location.state.address
      : "";

    const googleTagFilterEvent = {
      googleTagLocation: this.googleTagLocation
    };

    const listingsForMap = filteredListings;

    return (
      <div>
        <Layout className="browse-listing-map">
          {/* If a browse popup message exists, we can show the popup. */}
          {this.props.intl.messages[popupContentKey] && (
            <SingleUsePopup
              title={translate(this.props.intl, "button.termsAndConditions")}
              buttonText={translate(this.props.intl, "consumer.accept_terms")}
              name={`${SEEN_CREA_POPUP}_${provinceOrState}`}
            >
              <div
                // We're in control of content and it's not going to be dangerous.
                dangerouslySetInnerHTML={{
                  __html: translate(this.props.intl, popupContentKey)
                }}
              />
            </SingleUsePopup>
          )}
          <ErrorBoundary>
            <Sider
              className="browse-listing-map-list"
              width={LISTVIEW_SIDER_WIDTH}
            >
              <ListingsList
                isLoading={this.state.listingListIsLoading}
                hasMore={
                  this.props.cachedListingList.length !== clusterListings.length
                }
                listings={
                  !this.state.isListLoading ? this.props.cachedListingList : []
                }
                onListingsLoad={this.handleListingsLoad}
                history={history}
                googleTagShareProperty={this.googleTagShareProperty}
                googleTagFavoriteProperty={this.googleTagFavoriteProperty}
                googleTagTagProperty={this.googleTagTagProperty}
                googleTagClickProperty={this.googleTagClickProperty}
                onSortChange={this.props.sortingActive ? this.sortChange : null}
              />
            </Sider>
          </ErrorBoundary>
          <Content>
            <ErrorBoundary>
              <div
                className="browse-listing-map-filter"
                onClick={this.showDrawer}
              >
                <FilterIcon size={20} />
              </div>
              <ListingsMap
                mapId="browseListingsMap"
                listings={
                  masterlistIsLoading || this.state.isMapLoading
                    ? []
                    : listingsForMap
                }
                defaultBounds={defaultBounds}
                isLoading={masterlistIsLoading}
                onMapMove={this.handleMapMove}
                history={history}
                sendMapDataToParent={this.setMapData}
                getListingData={this.getListingData}
                currentUser={this.props.users.currentUser}
                buyJobs={this.props.buyJobs}
                provinceOrState={getLocation(this.props.location)}
              />
            </ErrorBoundary>
          </Content>

          <Mobile>
            <ErrorBoundary>
              <Drawer
                placement="right"
                closable={false}
                onClose={this.hideDrawer}
                visible={this.state.drawerVisible}
                className={"browse-listing-map-drawer"}
              >
                <ListingsFilter
                  filters={filters}
                  defaultAddress={address}
                  onToggleFilters={this.handleToggleFilter}
                  onBathroomChange={this.handleBathroomChange}
                  onBedroomChange={this.handleBedroomChange}
                  onParkingChange={this.handleParkingChange}
                  onPropertyTypeChange={this.handlePropertyTypeChange}
                  onPriceRangeChange={this.handlePriceRangeChange}
                  onFilterSubmit={this.handleFilterSubmit}
                  onLocationSelect={this.handleLocationInputChange}
                  onCheckBoxChange={this.onCheckBoxChange}
                  checkBoxState={checkBoxState}
                  googleTagFilterEvent={googleTagFilterEvent}
                  country={country}
                />
              </Drawer>
            </ErrorBoundary>
          </Mobile>

          <Devices sizes={[DESKTOP, TABLET]}>
            <ErrorBoundary>
              <BoxCollapsible isOpenByDefault={true}>
                <ListingsFilter
                  filters={filters}
                  defaultAddress={address}
                  onToggleFilters={this.handleToggleFilter}
                  onBathroomChange={this.handleBathroomChange}
                  onBedroomChange={this.handleBedroomChange}
                  onParkingChange={this.handleParkingChange}
                  onPropertyTypeChange={this.handlePropertyTypeChange}
                  onPriceRangeChange={this.handlePriceRangeChange}
                  onFilterSubmit={this.handleFilterSubmit}
                  onLocationSelect={this.handleLocationInputChange}
                  onCheckBoxChange={this.onCheckBoxChange}
                  checkBoxState={checkBoxState}
                  googleTagFilterEvent={googleTagFilterEvent}
                  country={country}
                />
              </BoxCollapsible>
            </ErrorBoundary>
          </Devices>
        </Layout>
      </div>
    );
  }
}

export default injectIntl(BrowseListingsMap);
