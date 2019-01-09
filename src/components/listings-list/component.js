import React, { Component } from "react";
import PropTypes from "prop-types";
import HorizontalInfiniteScroll from "../../components/horizontal-infinite-scroll";
import InfiniteScroll from "react-infinite-scroller";
import { List, Select } from "antd";
import ActivityIndicator from "../../components/activity-indicator";
import ListingCard from "../../components/listing-card";
import Devices from "../../components/breakpoints/devices";
import { TABLET, MOBILE, DESKTOP } from "../../../core/constants/breakpoints";
import { LISTING_SORT_OPTIONS } from "../../../core/constants/listings";
import requireAuth from "../../utilities/require-auth";
import { translate } from "../../utilities/locale";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";

@injectIntl
@requireAuth({ allowAnonymous: true })
class ListingsList extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    isLoading: PropTypes.bool,
    listings: PropTypes.array,
    onListingsLoad: PropTypes.func,
    height: PropTypes.any,
    hasMore: PropTypes.bool,
    authUserId: PropTypes.string.isRequired,
    isAnonymousUser: PropTypes.bool.isRequired,
    getFavoriteListings: PropTypes.func,
    getAllConsumerBuyJobs: PropTypes.func,
    usersFavorites: PropTypes.object,
    usersJobs: PropTypes.object,
    history: PropTypes.object,
    googleTagShareProperty: PropTypes.func,
    googleTagFavoriteProperty: PropTypes.func,
    googleTagTagProperty: PropTypes.func,
    googleTagClickProperty: PropTypes.func,
    onSortChange: PropTypes.func,
    errorMessage: PropTypes.string
  };

  static defaultProps = {
    authUserId: "",
    isAnonymousUser: true,
    onListingsLoad: () => {},
    getFavoriteListings: () => {},
    getAllConsumerBuyJobs: () => {},
    googleTagShareProperty: () => {},
    googleTagFavoriteProperty: () => {},
    googleTagTagProperty: () => {},
    googleTagClickProperty: () => {},
    usersFavorites: {},
    usersJobs: {},
    errorMessage: ""
  };

  componentDidMount() {
    if (!this.props.isAnonymousUser) {
      this.props.getFavoriteListings({ userId: this.props.authUserId });
      this.props.getAllConsumerBuyJobs({ userId: this.props.authUserId });
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.listings.length || nextProps.errorMessage;
  }

  @bound
  createSortOption(option) {
    return (
      <Select.Option value={option} key={option}>
        {translate(this.props.intl, `sort.${option}`)}
      </Select.Option>
    );
  }

  sortDropdown() {
    return (
      <Select
        onChange={this.props.onSortChange}
        defaultValue={LISTING_SORT_OPTIONS[0]}
      >
        {LISTING_SORT_OPTIONS.map(this.createSortOption)}
      </Select>
    );
  }

  render() {
    const {
      listings = [],
      isLoading,
      onListingsLoad,
      height,
      hasMore,
      usersFavorites,
      history
    } = this.props;

    const isListingFavorite = ({ listingId }) =>
      !!usersFavorites && Object.keys(usersFavorites).includes(listingId);

    const isTaggedListing = ({ listingId }) =>
      Object.values(this.props.usersJobs).some(({ taggedListings = {} }) =>
        Object.keys(taggedListings).includes(listingId)
      );

    const listStyle = {
      overflow: "auto"
    };
    listStyle.height = height ? `${height}px` : null;

    return (
      <div className="listing-list-view" style={listStyle}>
        {this.props.onSortChange && this.sortDropdown()}

        {this.props.errorMessage ? (
          <span className="listing-list-error">{this.props.errorMessage}</span>
        ) : null}

        <Devices sizes={[DESKTOP, TABLET]}>
          <InfiniteScroll
            initialLoad={false}
            hasMore={!this.props.errorMessage && !isLoading && hasMore}
            pageStart={0}
            loadMore={onListingsLoad}
            useWindow={false}
            threshold={500}
          >
            <List
              grid={{ gutter: 0, xs: 4, sm: 4, md: 1, lg: 1, xl: 1, xxl: 1 }}
              dataSource={listings}
              locale={{ emptyText: "" }}
              renderItem={item => (
                <List.Item key={item.uid}>
                  <ListingCard
                    {...item}
                    isFavorite={isListingFavorite({
                      listingId: item.uid
                    })}
                    isTagged={isTaggedListing({ listingId: item.uid })}
                    history={history}
                    googleTagShareProperty={this.props.googleTagShareProperty}
                    googleTagFavoriteProperty={
                      this.props.googleTagFavoriteProperty
                    }
                    googleTagTagProperty={this.props.googleTagTagProperty}
                    googleTagClickProperty={this.props.googleTagClickProperty}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Devices>
        <Devices sizes={[MOBILE, TABLET]}>
          <HorizontalInfiniteScroll
            hasMore={!isLoading && hasMore}
            isLoading={isLoading}
            pageStart={0}
            loadMore={onListingsLoad}
            threshold={700}
            listings={listings}
            renderItem={(item, i) => (
              <ListingCard
                {...item}
                isFavorite={isListingFavorite({
                  listingId: item.uid
                })}
                isTagged={isTaggedListing({ listingId: item.uid })}
                history={history}
                key={i}
                googleTagShareProperty={this.googleTagShareProperty}
                googleTagFavoriteProperty={this.googleTagFavoriteProperty}
                googleTagTagProperty={this.googleTagTagProperty}
                googleTagClickProperty={this.googleTagClickProperty}
              />
            )}
          />
        </Devices>
        {isLoading && (
          <div className="listing-list-view-spinner">
            <ActivityIndicator spinning type="Loading" />
          </div>
        )}
      </div>
    );
  }
}

export default ListingsList;
