import React, { Component } from "react";
import { Select } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";

import { translate } from "../../utilities/locale";
import { PRICE, DATE } from "../../../core/constants/shared";
import { listingSortMap } from "../../utilities/listings";
import ListingCard from "../listing-card";

import "./styles.scss";
const { Option } = Select;

class ListingCardGroup extends Component {
  state = {
    orderedBy: DATE
  };

  static propTypes = {
    intl: intlShape,
    groupName: PropTypes.string.isRequired,
    listings: PropTypes.array,
    usersFavorites: PropTypes.object,
    getUsersFavoriteListings: PropTypes.func,
    currentUser: PropTypes.object,
    usersJobs: PropTypes.object,
    getAllConsumerBuyJobs: PropTypes.func
  };

  static defaultProps = {
    listings: [],
    usersFavorites: {},
    getUsersFavoriteListings: () => {},
    currentUser: {
      uid: ""
    },
    usersJobs: {},
    getAllConsumerBuyJobs: () => {}
  };

  componentDidMount() {
    const userId = this.props.currentUser.uid;
    this.props.getUsersFavoriteListings({ userId });
    this.props.getAllConsumerBuyJobs({ userId });
  }

  @bound
  handleChange(value) {
    this.setState({ orderedBy: value });
  }

  render() {
    const { intl, groupName, usersFavorites } = this.props;

    const isListingFavorite = ({ listingId }) =>
      !!usersFavorites && Object.keys(usersFavorites).includes(listingId);

    const isTaggedListing = ({ listingId }) =>
      Object.values(this.props.usersJobs).some(({ taggedListings = {} }) =>
        Object.keys(taggedListings).includes(listingId)
      );

    const renderListingCard = listingData =>
      !!listingData && (
        <div className="listing-card-grid-item" key={listingData.uid}>
          <ListingCard
            {...listingData}
            isFavorite={isListingFavorite({ listingId: listingData.uid })}
            isTagged={isTaggedListing({ listingId: listingData.uid })}
          />
        </div>
      );

    const selectedSort = listingSortMap[this.state.orderedBy];
    const filterOption = (input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return (
      <div>
        <div className="listing-card-group-header">
          <h6>{groupName}</h6>
          <Select
            className="listing-card-group-select"
            showSearch
            placeholder={translate(intl, "sortBy")}
            optionFilterProp="children"
            defaultValue={DATE}
            onChange={this.handleChange}
            filterOption={filterOption}
          >
            <Option value={PRICE}>{translate(intl, "price")}</Option>
            <Option value={DATE}>{translate(intl, "date")}</Option>
          </Select>
        </div>
        <div className="listing-card-group-card-list">
          {this.props.listings.sort(selectedSort).map(renderListingCard)}
        </div>
      </div>
    );
  }
}

export default injectIntl(ListingCardGroup);
