import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ActivityIndicator from "../../components/activity-indicator";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { url } from "../../routes/routes";
import HighlightedDetails from "../../components/listing-card/highlighted-details";
import FeatureCount from "../../components/listing-card/feature-count";
import { GEO_GREY_MINI_ICON } from "../../utilities/images";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { DEFAULT_LISTING_IMAGE } from "../../utilities/images";
import { CONSUMER_SEARCH_REAL_ESTATE_CLICK_HOVER_CARD } from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";
import { bound } from "class-bind";

import "./styles.scss";

class ListingMapPreviewCard extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    listing: PropTypes.object,
    provinceOrState: PropTypes.string.isRequired
  };

  static defaultProps = {
    isLoading: false,
    listing: {}
  };

  @bound
  trackCardClick() {
    gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_CLICK_HOVER_CARD });
  }

  render() {
    return (
      <ActivityIndicator spinning={this.props.isLoading} type="Loading">
        {!objectIsEmpty(this.props.listing) && (
          <Card bordered={false}>
            <Link
              to={{
                pathname: url.listingDetails.replace(
                  ":listingId",
                  this.props.listing.uid
                ),
                search: this.props.provinceOrState,
                state: { listingId: this.props.listing.uid }
              }}
              target="_blank"
              className="preview-card"
              onClick={this.trackCardClick}
            >
              <div className="preview-card-image">
                <img
                  src={
                    this.props.listing.featureImageUrl || DEFAULT_LISTING_IMAGE
                  }
                />
              </div>
              <div className="preview-card-details">
                <HighlightedDetails
                  address={this.props.listing.address}
                  price={this.props.listing.price}
                />
                <div className="preview-card-details-location-and-feature">
                  <div className="location">
                    <img src={GEO_GREY_MINI_ICON} />
                    <span>{this.props.listing.city},</span>
                    <span>{this.props.provinceOrState}</span>
                  </div>
                  <FeatureCount
                    bedrooms={this.props.listing.bedrooms}
                    bathrooms={this.props.listing.bathrooms}
                    iconColorGrey={false}
                  />
                </div>
              </div>
            </Link>
          </Card>
        )}
      </ActivityIndicator>
    );
  }
}

export default ListingMapPreviewCard;
