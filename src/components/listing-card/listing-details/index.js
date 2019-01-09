import React from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../utilities/locale";

const ListingDetails = ({ location, MLS, brokerage, intl }) => (
  <div className="listing-details-table">
    <div>
      <div className="label">{translate(intl, "listingCard.location")}:</div>
      <div className="location">{location}</div>
    </div>
    <div>
      <div className="label">{translate(intl, "listingCard.MLS")}:</div>
      <div>{MLS}</div>
    </div>
    <div className="brokerage-label">
      <div className="label">{translate(intl, "listingCard.brokerage")}:</div>
      <div className="listing-details-table-brokerage">
        {brokerage.toLowerCase()}
      </div>
    </div>
  </div>
);

ListingDetails.propTypes = {
  location: PropTypes.string.isRequired,
  MLS: PropTypes.string.isRequired,
  brokerage: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(ListingDetails);
