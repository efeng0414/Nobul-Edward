import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Menu, Icon, Checkbox, Button, message } from "antd";
import { bound } from "class-bind";
import leafletPip from "@mapbox/leaflet-pip";
import L from "leaflet";
import HireAgentCard from "../hire-agent-card";
import { translate } from "../../utilities/locale";
import { gtmEvent } from "../../utilities/gtm-event";
import { getPropertyPriceRange } from "../../../core/utilities/listings";
import {
  PROPERTY_DETAILS_POSTING_CREATED,
  ANONYMOUS_REGISTER_BROWSE_REDIRECT
} from "../../utilities/google-tag-variable";
import { createObjectFromArray } from "../../../core/utilities/array-to-object";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { BUY, CREATED_ON_WEB } from "../../../core/constants/shared";
import { JOB_OPEN, JOB } from "../../../core/constants/jobs";
import { addDefaultNameToJob } from "../../utilities/add-default-name-to-job";
import { getProvinceCode } from "../../../core/utilities/get-province-code";
import ActivityIndicator from "../activity-indicator";
import { getProvinceOrStateArray } from "./utilities";
import "./styles.scss";
import requireAuth from "../../utilities/require-auth";
import * as Routes from "../../routes/routes";

@requireAuth({ allowAnonymous: true })
@injectIntl
class TagListingDropdown extends Component {
  state = {
    taggedList: this.getTaggedList(),
    showCongratulations: false,
    showAnonymousUserModal: false,
    showLoginModal: false,
    detailsObtained: false,
    selectedServices: [],
    selectedRange: 3,
    coordinates: {}
  };

  static propTypes = {
    intl: intlShape.isRequired,
    listingId: PropTypes.string.isRequired,
    listings: PropTypes.object.isRequired,
    provinceOrState: PropTypes.string.isRequired,
    userJobs: PropTypes.object.isRequired,
    tagListingToJob: PropTypes.func.isRequired,
    removeTaggedListingFromJob: PropTypes.func.isRequired,
    getAllConsumerBuyJobs: PropTypes.func,
    getListingDetails: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func,
    cancelModal: PropTypes.func,
    setTaggedList: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    saveJob: PropTypes.func.isRequired,
    getProvincePolygons: PropTypes.func.isRequired,
    polygons: PropTypes.object.isRequired,
    isAnonymousUser: PropTypes.bool
  };

  static defaultProps = {
    onItemClick: () => {}
  };

  dummyMap = {};

  componentDidMount() {
    !Object.keys(this.props.userJobs).length &&
      !objectIsEmpty(this.props.currentUser) &&
      this.props
        .getAllConsumerBuyJobs({
          userId: this.props.currentUser.uid
        })
        .then(() => {
          this.setState({
            taggedList: this.getTaggedList()
          });
        });

    this.props
      .getListingDetails({
        listingId: this.props.listingId,
        browseLocation: this.props.provinceOrState
      })
      .then(() => {
        this.setState({
          detailsObtained: true
        });
        this.props.listings.masterlist.length &&
          !Object.keys(this.state.coordinates).length &&
          this.setListingCoordinates(this.props.listingId);
      });
    this.getPolygonsForCurrentListing();
  }

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
  getPolygonsForCurrentListing() {
    try {
      this.props
        .getProvincePolygons({
          provinceOrState: this.props.provinceOrState
        })
        .then(this.createDummyMap);
    } catch (error) {
      console.error(error);
    }
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
  updateTaggedListingStatus({ isListingTagged, jobId, listingId }) {
    const didTaggedListingUpdate = isListingTagged
      ? this.props.removeTaggedListingFromJob({ jobId, listingId })
      : this.props.tagListingToJob({ jobId, listingId });

    didTaggedListingUpdate.then(() => {
      this.props.getAllConsumerBuyJobs({
        userId: this.props.currentUser.uid
      });
    });
  }

  @bound
  getTaggedList() {
    return Object.keys(this.props.userJobs).reduce((job, key) => {
      const { taggedListings, name = "" } = this.props.userJobs[key];
      const provinceOrStateArray = getProvinceOrStateArray({
        regionsObject: this.props.userJobs[key].regions || []
      });
      const hasListingId =
        taggedListings && !!taggedListings[this.props.listingId];
      return {
        ...job,
        [key]: { jobName: name, isTagged: hasListingId, provinceOrStateArray }
      };
    }, {});
  }

  @bound
  onItemClick({ key: jobId }) {
    this.props.onItemClick({ jobId });
    const { listingId } = this.props;
    const hasTaggedListings = this.props.userJobs[jobId].taggedListings;

    const isListingTagged =
      hasTaggedListings &&
      Object.keys(this.props.userJobs[jobId].taggedListings).includes(
        listingId
      );

    this.updateTaggedListingStatus({ isListingTagged, jobId, listingId });
  }

  @bound
  onCheckBoxChange({ target: { checked: isChecked, field: jobId } }) {
    let { taggedList } = this.state;
    taggedList[jobId].isTagged = isChecked;

    this.setState({ taggedList });
  }

  @bound
  submitTaggedList() {
    const { uid: userId } = this.props.currentUser;

    this.props
      .setTaggedList({
        taggedList: this.state.taggedList,
        listing: [
          this.props.listingId,
          getProvinceCode({ provinceOrState: this.props.provinceOrState })
        ],
        uid: userId
      })
      .then(() => {
        return this.props.getAllConsumerBuyJobs({
          userId
        });
      })
      .then(() => {
        this.props.cancelModal();
      });
  }

  @bound
  isPostingInCorrectProvince([, { provinceOrStateArray }]) {
    return provinceOrStateArray.includes(
      getProvinceCode({ provinceOrState: this.props.provinceOrState })
    );
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
      state: { jobParams }
    });
    gtmEvent({
      name: ANONYMOUS_REGISTER_BROWSE_REDIRECT
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
    const listingId = this.props.listingId;
    const browseLocation = this.props.provinceOrState;
    let includedPolygons;

    if (coordinates.lat && coordinates.lng) {
      includedPolygons = leafletPip.pointInLayer(
        [coordinates.lng, coordinates.lat],
        this.dummyMap
      );
    }

    let regions = {};
    if (includedPolygons.length) {
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

    if (!currentListing) return;
    if (!includedPolygons.length) {
      message.error(
        translate(this.props.intl, "listingDetails.noSupportForLocation")
      );
      return false;
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
            intl: this.props.intl,
            jobs: this.props.userJobs,
            job: jobParams
          })
        })
      )
      .then(() => {
        this.openCongratulationsModal();
        this.props.getAllConsumerBuyJobs({
          userId: currentUser.uid
        });
        gtmEvent({
          name: PROPERTY_DETAILS_POSTING_CREATED
        });
      });
  }

  @bound
  onCongratulationsClose() {
    this.setState({
      showCongratulations: false
    });
    this.props.cancelModal();
  }

  @bound
  openCongratulationsModal() {
    this.setState({
      showCongratulations: true
    });
  }

  @bound
  isTaggedListChecked(list) {
    return Object.values(list).some(({ isTagged }) => isTagged === true);
  }

  render() {
    const { currentListing = {} } = this.props.listings;

    const postingList = Object.entries(this.state.taggedList).filter(
      this.isPostingInCorrectProvince
    );
    const renderTagPropertyMenuItem = ([id, { isTagged, jobName }]) => {
      return (
        <Menu.Item key={id} className="tag-listing-item">
          <Checkbox
            checked={isTagged}
            onChange={this.onCheckBoxChange}
            field={id}
          >
            <span className="job-name">{jobName}</span>
          </Checkbox>
        </Menu.Item>
      );
    };

    const buyJobMenu = (
      <Menu className="tag-listing-menu">
        {postingList.map(renderTagPropertyMenuItem)}
      </Menu>
    );

    const emptyList = objectIsEmpty(postingList);
    const disableButton = !this.isTaggedListChecked(this.state.taggedList);

    return (
      <ActivityIndicator spinning={this.props.isLoading}>
        <div
          className={`tag-listing-modal ${
            !emptyList ? "tag-listing-modal-with-jobs" : ""
          }`}
        >
          <div>
            {!emptyList && (
              <h2 className="title">
                {translate(this.props.intl, "tagListingModal.title")}
              </h2>
            )}
            {!emptyList && (
              <p>
                {translate(
                  this.props.intl,
                  "tagListingModal.provinceOrStateInfo"
                )}
              </p>
            )}
            {this.props.isLoading && <Icon type="loading" />}
          </div>
          {this.state.detailsObtained &&
            emptyList && (
              <HireAgentCard
                listingId={this.props.listingId}
                intl={this.props.intl}
                history={this.props.history}
                onServicesChange={this.onServicesChange}
                onServicesRangeChange={this.onServicesRangeChange}
                submitPostingJob={this.submitPostingJob}
                HireAgentCardInformation={currentListing}
                currentUser={this.props.currentUser}
                showCongratulations={this.state.showCongratulations}
                onCongratulationsClose={this.onCongratulationsClose}
                showAnonymousUserModal={this.state.showAnonymousUserModal}
                handleAnonymousModalClose={this.handleAnonymousModalClose}
                redirectToLogin={this.redirectToLogin}
                showLoginModal={this.state.showLoginModal}
                toggleLoginModal={this.toggleLoginModal}
                onLogin={this.onLogin}
                redirectToRegister={this.redirectToRegister}
              />
            )}
          {buyJobMenu}
          {!emptyList && (
            <Button
              className="confirm-button"
              type="primary"
              onClick={this.submitTaggedList}
              disabled={disableButton}
            >
              {translate(this.props.intl, "button.confirm")}
            </Button>
          )}
        </div>
      </ActivityIndicator>
    );
  }
}

export default TagListingDropdown;
