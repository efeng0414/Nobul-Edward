import React, { Component } from "react";
import { Card, message, Modal } from "antd";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import L from "leaflet";
import leafletPip from "@mapbox/leaflet-pip";
import { bound } from "class-bind";

import { fetchSingleListingDetails } from "../../../core/firebase/listings";
import { createObjectFromArray } from "../../../core/utilities/array-to-object";
import {
  mapToResidentialOrCommercial,
  getPropertyPriceRange
} from "../../../core/utilities/listings";

import PropertyOverviewCard from "../../components/property-overview-card";
import PropertyFeaturesCard from "../../components/property-features-card";
import PropertyDescriptionCard from "../../components/property-description-card";
import PropertyImagesCarousel from "../../components/property-images-carousel";
import HireAgentCard from "../../components/hire-agent-card";
import ShareListingModal from "../../components/share-listing-modal";
import TagListingDropdown from "../../components/tag-listing-dropdown";
import { BUY, CREATED_ON_WEB } from "../../../core/constants/shared";
import { url } from "../../routes/routes";
import * as Routes from "../../routes/routes";
import * as MyNobulRoutes from "../../routes/myNobul";
import { JOB_OPEN, JOB } from "../../../core/constants/jobs";
import { getHumanReadableNameKey } from "./utilties";
import ActivityIndicator from "../../components/activity-indicator";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { translate } from "../../utilities/locale";
import BreadCrumbs from "./breadcrumbs";
import { getProvinceCode } from "../../../core/utilities/get-province-code";

import ErrorBoundary from "../../components/error-boundary";
import catchSceneError from "../../utilities/catch-scene-error";
import { gtmEvent } from "../../utilities/gtm-event";
import {
  PROPERTY_DETAILS_SLIDER_SELECTED,
  PROPERTY_DETAILS_POSTING_CREATED,
  ANONYMOUS_REGISTER_BROWSE_DETAILS_REDIRECT,
  BUY_POSTING_CREATED_LOGGED_IN_PROPERTY_DETAILS,
  BUY_POSTING_CREATED_ANONYMOUS_PROPERTY_DETAILS
} from "../../utilities/google-tag-variable";
import requireAuth from "../../utilities/require-auth";
import { addDefaultNameToJob } from "../../utilities/add-default-name-to-job";
import { getLocation } from "../../utilities/url";

import { supportedProvinces } from "../../../core/constants/regions";
import { DEFAULT_REGION } from "../../../core/constants/shared";
import { CONSUMER_USER_TYPE } from "../../../core/constants/users";
import "./styles.scss";

@injectIntl
@withRouter
@requireAuth({ allowAnonymous: true })
@catchSceneError
class ListingDetails extends Component {
  state = {
    isSaving: true,
    detailsObtained: false,
    selectedServices: [],
    selectedRange: 3,
    coordinates: {},
    isPolygonsLoading: true,
    isFavorite: false,
    isShareListingModalVisible: false,
    isTagged: false,
    isTagListingModalVisible: false,
    displayMortgageCalculator: false,
    showCongratulations: false,
    showAnonymousUserModal: false,
    showLoginModal: false,
    fromAnonymousUser: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    getListingDetails: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    userType: PropTypes.string.isRequired,
    listings: PropTypes.object.isRequired,
    getMasterlist: PropTypes.func,
    saveJob: PropTypes.func,
    match: PropTypes.object.isRequired,
    listingId: PropTypes.string,
    browseLocation: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    defaultValue: PropTypes.number,
    getAllConsumerBuyJobs: PropTypes.func.isRequired,
    jobs: PropTypes.object.isRequired,
    getProvincePolygons: PropTypes.func.isRequired,
    polygons: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    usersFavorites: PropTypes.object,
    getUsersFavoriteListings: PropTypes.func.isRequired,
    setPropertyAsFavorite: PropTypes.func.isRequired,
    removePropertyAsFavorite: PropTypes.func.isRequired,
    triggerLogin: PropTypes.func.isRequired,
    favoriteList: PropTypes.object.isRequired,
    setFavorite: PropTypes.func.isRequired,
    isAnonymousUser: PropTypes.bool
  };

  static defaultProps = {
    defaultValue: 0,
    usersFavorites: {}
  };

  dummyMap = {};

  @bound
  getPolygonsForCurrentListing() {
    try {
      this.props
        .getProvincePolygons({
          provinceOrState: this.props.listings.currentListing.provinceOrState
        })
        .then(this.createDummyMap);
    } catch (error) {
      console.error(error);
    }
  }

  @bound
  handleGetListingDetailsSuccess() {
    this.props
      .getListingDetails({
        listingId: this.props.match.params.listingId,
        browseLocation: getLocation(this.props.location)
      })
      .then(this.getPolygonsForCurrentListing);
    this.setState({
      isSaving: false,
      detailsObtained: true
    });
  }

  @bound
  handleGetListingDetailsFailure() {
    this.setState({
      isSaving: false
    });
  }

  @bound
  getSupportedProvinceOrState() {
    const provinceOrState = getLocation(this.props.location);

    return supportedProvinces[provinceOrState]
      ? provinceOrState
      : DEFAULT_REGION;
  }

  componentDidMount() {
    const { listingId } = this.props.match.params;
    const browseLocation = getLocation(this.props.location);

    const hasLoadedMasterList =
      !!this.props.listings.masterlist.length &&
      this.getSupportedProvinceOrState() ===
        this.props.listings.masterListProvinceOrState;
    !hasLoadedMasterList &&
      this.props.getMasterlist({
        provinceOrState: this.getSupportedProvinceOrState()
      });

    if (this.props.isAnonymousUser) {
      this.setState({ fromAnonymousUser: true });
    }

    fetchSingleListingDetails(listingId, browseLocation)
      .then(this.handleGetListingDetailsSuccess)
      .catch(this.handleGetListingDetailsFailure);

    this.isListingFavorite({ listingId });
    this.isTaggedListing({ listingId });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.jobs.newJob && this.props.jobs.newJob) {
      gtmEvent({ name: BUY_POSTING_CREATED_LOGGED_IN_PROPERTY_DETAILS });
    }

    this.props.listings.masterlist.length &&
      !Object.keys(this.state.coordinates).length &&
      this.setListingCoordinates(this.props.match.params.listingId);
  }

  // Create a leaflet map object including polygon layers
  // in order to determine which polygon region this listing is in.
  // The map will never be rendered to the dom.

  @bound
  createDummyMap() {
    const div = document.createElement("div");
    this.dummyMap = L.map(div, {
      center: [43.6567919, -79],
      zoom: 12
    });
    Object.values(this.props.polygons).map(provinceObject =>
      Object.values(provinceObject).map(polygonObject =>
        L.geoJSON(polygonObject).addTo(this.dummyMap)
      )
    );
    this.setState({ isPolygonsLoading: false });
  }

  @bound
  setListingCoordinates(listingId) {
    const { masterlist = [] } = this.props.listings;
    const masterlistItem = masterlist.find(item => {
      return item.properties.listingId === listingId;
    });

    if (masterlistItem) {
      const [lng, lat] = masterlistItem.geometry.coordinates;
      const coordinates = { lat, lng };
      this.setState({ coordinates });
    }
  }

  @bound
  onServicesChange(selectedServices) {
    this.setState({
      selectedServices
    });
  }

  @bound
  onServicesRangeChange(value) {
    this.setState({
      selectedRange: value
    });
    gtmEvent({
      name: PROPERTY_DETAILS_SLIDER_SELECTED
    });
  }

  @bound
  onCongratulationsClose() {
    if (this.props.jobs.newJob) {
      this.state.fromAnonymousUser &&
        gtmEvent({
          name: BUY_POSTING_CREATED_ANONYMOUS_PROPERTY_DETAILS
        });

      this.props.history.push(
        MyNobulRoutes.url.consumerJobDetails
          .replace(":jobType", this.props.jobs.newJob.jobType)
          .replace(":jobId", this.props.jobs.newJob.jobId)
      );
    }
  }

  @bound
  openCongratulationsModal() {
    this.setState({
      showCongratulations: true
    });
  }

  @bound
  redirectToLogin() {
    this.toggleShowAnonymousUserModal();
    this.toggleLoginModal();
  }

  @bound
  redirectToRegister() {
    const jobParams = this.state.jobParams;
    this.props.history.push({
      pathname: Routes.url.consumerRegistration,
      state: { jobParams, prevPath: url.listingDetails }
    });
    gtmEvent({
      name: ANONYMOUS_REGISTER_BROWSE_DETAILS_REDIRECT
    });
  }

  @bound
  toggleLoginModal() {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    });
  }

  @bound
  onLogin() {
    this.submitPostingJob({ isDraft: false });
    this.toggleLoginModal();
  }

  @bound
  handleAnonymousModalClose() {
    this.toggleShowAnonymousUserModal();
    this.props.history.push({
      pathname: Routes.url.home
    });
  }

  @bound
  toggleShowAnonymousUserModal() {
    this.setState({
      showAnonymousUserModal: !this.state.showAnonymousUserModal
    });
  }

  @bound
  submitPostingJob({ text }) {
    const { listings, currentUser } = this.props;
    const { currentListing = {} } = listings;
    const { propertyType, price, bedrooms, bathrooms } = currentListing;
    const { selectedServices, selectedRange, coordinates } = this.state;
    const listingId = this.props.match.params.listingId;
    const browseLocation = getLocation(this.props.location);
    let includedPolygons;

    if (coordinates.lat && coordinates.lng) {
      includedPolygons = leafletPip.pointInLayer(
        [coordinates.lng, coordinates.lat],
        this.dummyMap
      );
    }

    let regions = {};

    if (!currentListing) return;
    if (!includedPolygons || !includedPolygons.length) {
      message.error(
        translate(this.props.intl, "listingDetails.noSupportForLocation")
      );
      return false;
    } else {
      const selectedRegion = includedPolygons[0];
      const regionDetails = selectedRegion.feature.properties;
      regions = {
        [regionDetails["polygonId"]]: {
          name: regionDetails.name,
          country: regionDetails.country,
          province: regionDetails.provinceOrState
        }
      };
    }

    const priceRange = getPropertyPriceRange(parseFloat(price));

    const jobParams = {
      createdOn: CREATED_ON_WEB,
      jobType: BUY,
      propertyType,
      propertyFeatures: {}, // TODO: Confirm with product team, what kind of features need to be stored
      bathrooms,
      bedrooms,
      priceRangeLow: priceRange.low,
      priceRangeHigh: priceRange.high,
      regions,
      status: JOB_OPEN,
      consumerId: currentUser.uid,
      servicesRange: selectedRange,
      services: createObjectFromArray(selectedServices),
      description: text ? (text.description ? text.description : "") : "",
      taggedListings: { [listingId]: browseLocation },
      name: JOB
    };
    if (this.props.isAnonymousUser) {
      this.setState({
        showAnonymousUserModal: true,
        jobParams: jobParams
      });
      return;
    }

    this.props
      .getAllConsumerBuyJobs({
        userId: currentUser.uid
      })
      .then(() =>
        this.props.saveJob({
          jobType: BUY,
          job: addDefaultNameToJob({
            job: jobParams,
            intl: this.props.intl,
            jobs: this.props.jobs.buy
          })
        })
      )
      .then(() => {
        this.openCongratulationsModal();
        gtmEvent({
          name: PROPERTY_DETAILS_POSTING_CREATED
        });
      });
  }

  @bound
  isListingFavorite({ listingId }) {
    const isUserLogged = !!this.props.currentUser.uid;

    const isFavorite = isUserLogged
      ? !!this.props.usersFavorites &&
        Object.keys(this.props.usersFavorites).includes(listingId)
      : this.props.favoriteList.hasOwnProperty(
          this.props.match.params.listingId
        );

    this.setState({
      isFavorite
    });
  }

  @bound
  onFavoriteOutlineClick(event) {
    event.stopPropagation();
    const isUserLogged = !!this.props.currentUser.uid;

    if (isUserLogged) {
      this.props.setPropertyAsFavorite({
        uid: this.props.currentUser.uid,
        listing: [
          this.props.match.params.listingId,
          getProvinceCode({
            provinceOrState: getLocation(this.props.location)
          })
        ]
      });
    } else {
      const favoriteList = this.props.favoriteList;
      !this.props.favoriteList.hasOwnProperty(
        this.props.match.params.listingId
      ) &&
        (this.props.favoriteList[this.props.match.params.listingId] = true) &&
        this.props.setFavorite({ favoriteList });
      this.props.triggerLogin({ trigger: true });
    }

    this.setState({
      isFavorite: true
    });
  }

  @bound
  onFavoriteFillClick(event) {
    event.stopPropagation();
    const isUserLogged = !!this.props.currentUser.uid;

    if (isUserLogged) {
      this.props.removePropertyAsFavorite({
        uid: this.props.currentUser.uid,
        creaId: this.props.match.params.listingId
      });
    } else {
      const favoriteList = this.props.favoriteList;
      favoriteList.hasOwnProperty(this.props.match.params.listingId) &&
        delete favoriteList[this.props.match.params.listingId] &&
        this.props.setFavorite({ favoriteList });
    }

    this.setState({
      isFavorite: false
    });
  }

  @bound
  toggleShareListingModal() {
    this.setState({
      isShareListingModalVisible: !this.state.isShareListingModalVisible
    });
  }

  @bound
  constructListingDetailsUrl() {
    return `${process.env.BASE_DOMAIN}${url.listingDetails}`.replace(
      ":listingId",
      this.props.match.params.listingId
    );
  }

  @bound
  isTaggedListing({ listingId }) {
    const isUserLogged = !!this.props.currentUser.uid;

    const isTagged = isUserLogged
      ? Object.values(this.props.jobs.buy).some(({ taggedListings = {} }) =>
          Object.keys(taggedListings).includes(listingId)
        )
      : isUserLogged;

    this.setState({
      isTagged
    });
  }

  @bound
  toggleTagListingModal() {
    const isUserLogged = !!this.props.currentUser.uid;

    if (isUserLogged) {
      const isTagListingModalVisible = !this.state.isTagListingModalVisible;
      this.setState({ isTagListingModalVisible });
    } else {
      this.props.triggerLogin({ trigger: true });
    }
  }

  @bound
  toggleIsTagged() {
    const isTagged = !this.state.isTagged;
    this.setState({ isTagged });
  }

  @bound
  toggleDisplayMortgageCalculator() {
    this.setState({
      displayMortgageCalculator: !this.state.displayMortgageCalculator
    });
  }

  render() {
    const { isSaving, detailsObtained } = this.state;
    const { listings, intl } = this.props;
    const { currentListing = {} } = listings;
    const { propertyType, photoCount } = currentListing;
    const featureCardType = mapToResidentialOrCommercial(propertyType);
    const listingId = this.props.match.params.listingId;
    const browseLocation = getLocation(this.props.location);

    const {
      publicRemarks,
      amenitiesNearBy: amenities = [],
      utilitiesAvailable: utilities = []
    } = currentListing;

    const amenitiesExist = amenities.some(value => !!value);
    const utilitiesExist = utilities.some(value => !!value);

    //TODO: Handle this situation better
    if (!objectIsEmpty(this.props.listings.error)) {
      return <div>Something went wrong. Please try again later</div>;
    }

    const shouldShowBreadcrumbs =
      this.props.location.state && this.props.location.state.prevHref;

    return (
      <ActivityIndicator spinning={isSaving} type="saving">
        <div className="listing-details-container">
          <Helmet title={translate(intl, "helmet.listingDetails")} />
          <ShareListingModal
            isVisible={this.state.isShareListingModalVisible}
            toggleModal={this.toggleShareListingModal}
            link={this.constructListingDetailsUrl()}
          />
          <Modal
            footer={<div />}
            visible={this.state.isTagListingModalVisible}
            maskClosable={true}
            destroyOnClose={true}
            onCancel={this.toggleTagListingModal}
          >
            <TagListingDropdown
              history={this.props.history}
              cancelModal={this.toggleTagListingModal}
              listingId={listingId}
              onItemClick={this.toggleIsTagged}
              provinceOrState={browseLocation}
            />
          </Modal>

          {shouldShowBreadcrumbs && (
            <div className="breadcrumbs-container">
              <BreadCrumbs
                {...this.props.location.state}
                prevHref={`${
                  this.props.location.state.prevHref
                }?${browseLocation}`}
                prevHrefReadable={translate(
                  this.props.intl,
                  getHumanReadableNameKey({
                    prevHref: this.props.location.state.prevHref
                  })
                )}
              />
            </div>
          )}
          <div className="listing-details-left">
            <div className="card-container">
              <Card className="listing-details-container-top">
                <PropertyImagesCarousel
                  className="property-images-carousel"
                  photoCount={photoCount}
                  listingId={listingId}
                  provinceOrState={browseLocation}
                  isFavorite={this.state.isFavorite}
                  onFavoriteOutlineClick={this.onFavoriteOutlineClick}
                  onFavoriteFillClick={this.onFavoriteFillClick}
                  onShareIconClick={this.toggleShareListingModal}
                  tagListingOnClick={this.toggleTagListingModal}
                  isTagged={this.state.isTagged}
                  userType={this.props.userType}
                />
              </Card>
            </div>
            <div className="card-container">
              <h6 className="card-title">
                {translate(intl, "listingDetails.overviewTitle")}
              </h6>
              <PropertyOverviewCard
                propertyDetailsCardInformation={
                  detailsObtained ? currentListing : undefined
                }
                intl={intl}
                masterlist={this.props.listings.masterlist}
              />
            </div>
            <div className="card-container">
              <h6 className="card-title">
                {translate(intl, "listingDetails.featuresTitle")}
              </h6>
              <Card className="property-features-card">
                <PropertyFeaturesCard
                  propertyDetailsCardInformation={
                    detailsObtained ? currentListing : {}
                  }
                  featureCardType={featureCardType}
                  intl={intl}
                />
              </Card>
            </div>
            {detailsObtained &&
              (publicRemarks || amenitiesExist || utilitiesExist) && (
                <div className="card-container">
                  <h6 className="card-title">
                    {translate(intl, "listingDetails.descriptionTitle")}
                  </h6>
                  <Card className="property-description-card">
                    <PropertyDescriptionCard
                      propertyDetailsCardInformation={
                        detailsObtained ? currentListing : {}
                      }
                      intl={intl}
                    />
                  </Card>
                </div>
              )}
          </div>
          <div className="listing-details-right">
            <div className="hire-agent-card">
              {detailsObtained &&
                (this.props.userType === CONSUMER_USER_TYPE ||
                  !this.props.userType) && (
                  <ErrorBoundary>
                    <ActivityIndicator spinning={this.state.isPolygonsLoading}>
                      <HireAgentCard
                        listingId={listingId}
                        intl={intl}
                        history={this.props.history}
                        onServicesChange={this.onServicesChange}
                        onServicesRangeChange={this.onServicesRangeChange}
                        submitPostingJob={this.submitPostingJob}
                        isSavingJob={this.props.isSavingJob}
                        HireAgentCardInformation={
                          detailsObtained ? currentListing : {}
                        }
                        currentUser={this.props.currentUser}
                        showCongratulations={this.state.showCongratulations}
                        onCongratulationsClose={this.onCongratulationsClose}
                        showAnonymousUserModal={
                          this.state.showAnonymousUserModal
                        }
                        handleAnonymousModalClose={
                          this.handleAnonymousModalClose
                        }
                        redirectToLogin={this.redirectToLogin}
                        showLoginModal={this.state.showLoginModal}
                        toggleLoginModal={this.toggleLoginModal}
                        onLogin={this.onLogin}
                        redirectToRegister={this.redirectToRegister}
                      />
                    </ActivityIndicator>
                  </ErrorBoundary>
                )}
            </div>
          </div>
        </div>
      </ActivityIndicator>
    );
  }
}

export default ListingDetails;
