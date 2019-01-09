import React, { Component } from "react";
import PropTypes from "prop-types";
import ListingCardGroup from "../../components/listing-card-group";
import ActivityIndicator from "../../components/activity-indicator";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { intlShape, injectIntl } from "react-intl";

import "./styles.scss";
import { translate } from "../../utilities/locale";

class ConsumerViewTaggedListings extends Component {
  static propTypes = {
    getAllConsumerBuyJobs: PropTypes.func,
    currentUser: PropTypes.object,
    userJobs: PropTypes.object,
    listings: PropTypes.array,
    getTaggedListingsDetails: PropTypes.func,
    isListingsLoading: PropTypes.bool,
    intl: intlShape
  };

  static defaultProps = {
    getAllConsumerBuyJobs: () => {},
    currentUser: {
      uid: ""
    },
    userJobs: {
      taggedListings: {}
    },
    listings: [],
    getTaggedListingsDetails: () => {},
    isListingsLoading: false
  };

  componentDidUpdate(prevProps) {
    const { taggedListings: prevTaggedListings = {} } = prevProps.userJobs;
    const { taggedListings: newTaggedListings = {} } = this.props.userJobs;

    const hasTaggedListingsChanged =
      Object.keys(prevTaggedListings).length !==
      Object.keys(newTaggedListings).length;

    hasTaggedListingsChanged && this.getListingData();
  }

  getListingData() {
    const usersJobsArray = Object.values(this.props.userJobs);
    const listingIdArray = usersJobsArray.reduce(
      (accum, { taggedListings }) =>
        taggedListings ? [...accum, ...Object.entries(taggedListings)] : accum,
      []
    );

    this.props.getTaggedListingsDetails({ listingIdArray });
  }

  getTaggedListingData() {
    const didGetJobs = this.props.getAllConsumerBuyJobs({
      userId: this.props.currentUser.uid
    });

    didGetJobs.then(() => {
      this.getListingData();
    });
  }

  componentDidMount() {
    this.getTaggedListingData();
  }

  render() {
    const jobsWithTaggedListings = Object.entries(this.props.userJobs).filter(
      ([, { taggedListings }]) => taggedListings
    );

    const renderListingCardGroup = ([jobId, { name, taggedListings }]) => {
      const taggedListingsArray = Object.keys(taggedListings);
      const listExist = this.props.listings.length > 0;

      const listingData = !listExist
        ? []
        : taggedListingsArray
            .map(listingID =>
              [...this.props.listings].find(
                listing => listing.uid === listingID
              )
            )
            .filter(taggedListing => taggedListing !== undefined);

      return (
        <ListingCardGroup
          key={jobId}
          groupName={name}
          currentUser={this.props.currentUser}
          listings={listingData}
        />
      );
    };

    return (
      <div className="tagged-listings">
        <ActivityIndicator
          spinning={this.props.isListingsLoading}
          type="loading"
        >
          <MyDashboardMeta titleKey="helmet.myDashboard.taggedProperties" />
          {jobsWithTaggedListings.map(renderListingCardGroup)}
          {!this.props.isListingsLoading &&
            !jobsWithTaggedListings.length &&
            translate(this.props.intl, "noTaggedListig")}
        </ActivityIndicator>
      </div>
    );
  }
}

export default injectIntl(ConsumerViewTaggedListings);
