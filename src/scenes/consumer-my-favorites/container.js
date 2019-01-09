import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import ActivityIndicator from "../../components/activity-indicator";
import ListingCardGroup from "../../components/listing-card-group";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { translate } from "../../utilities/locale";

import "./styles.scss";

class ConsumerMyFavorites extends Component {
  state = {
    favoritePropertiesGroup: {},
    listingIds: []
  };

  static propTypes = {
    favoriteListings: PropTypes.object,
    favoriteProperties: PropTypes.array,
    getMultipleListings: PropTypes.func,
    currentUser: PropTypes.object,
    isListingsLoading: PropTypes.bool,
    isUserLoading: PropTypes.bool,
    intl: intlShape
  };

  static defaultProps = {
    isUserLoading: false,
    isListingsLoading: false,
    currentUser: {},
    getMultipleListings: () => {},
    favoriteListings: {},
    favoriteProperties: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.favoriteListings) {
      return { listingIds: [], favoritePropertiesGroup: {} };
    }
    const newListingIds = Object.keys(nextProps.favoriteListings);
    const oldListingIds = prevState.listingIds;
    const listingsHaveUpdated = newListingIds.length !== oldListingIds.length;

    listingsHaveUpdated &&
      nextProps.getMultipleListings(Object.entries(nextProps.favoriteListings));

    if (nextProps.favoriteProperties.length > 0) {
      const favorProp = nextProps.favoriteProperties;
      const favorGroup = {};

      favorProp.forEach(property => {
        const city = property.city;
        if (favorGroup.hasOwnProperty(city)) {
          favorGroup[city].push(property);
        } else {
          favorGroup[city] = [property];
        }
      });
      return { favoritePropertiesGroup: favorGroup, listingIds: newListingIds };
    } else {
      return { listingIds: newListingIds };
    }
  }

  componentDidMount() {
    const { favoriteListings, getMultipleListings } = this.props;

    favoriteListings &&
      Object.keys(favoriteListings).length > 0 &&
      getMultipleListings(Object.entries(favoriteListings));
  }

  @bound
  renderListingCardGroup(city) {
    return (
      <ListingCardGroup
        key={city}
        groupName={city}
        currentUser={this.props.currentUser}
        listings={this.state.favoritePropertiesGroup[city]}
      />
    );
  }

  render() {
    const cities = [...Object.keys({ ...this.state.favoritePropertiesGroup })];

    return (
      <div className="consumer-favorites">
        <ActivityIndicator
          spinning={this.props.isListingsLoading}
          type="loading"
        >
          <MyDashboardMeta titleKey="helmet.myDashboard.favourites" />
          {cities.map(this.renderListingCardGroup)}
          {!this.props.isUserLoading &&
            !this.state.listingIds.length &&
            translate(this.props.intl, "noFavoriteListings")}
        </ActivityIndicator>
      </div>
    );
  }
}

export default injectIntl(ConsumerMyFavorites);
