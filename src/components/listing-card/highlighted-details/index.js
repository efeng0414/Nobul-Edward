import React from "react";
import PropTypes from "prop-types";
import PageCurrency from "../../currency/page";

const HighlightedDetails = ({ address, price }) => (
  <div className="highlighted-details">
    <h3 className="address">{address}</h3>
    <h2 className="price">
      <PageCurrency value={price} />
    </h2>
  </div>
);

HighlightedDetails.propTypes = {
  address: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default HighlightedDetails;
