import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CoverImage = ({
  featureImageUrl,
  googleTagClickProperty,
  listingUrl
}) => (
  <Link
    to={listingUrl}
    target="_blank"
    onClick={googleTagClickProperty}
    className="cover-image-container"
  >
    <img alt="example" src={featureImageUrl} className="cover-image" />
  </Link>
);

CoverImage.propTypes = {
  featureImageUrl: PropTypes.string.isRequired,
  listingId: PropTypes.string.isRequired,
  googleTagClickProperty: PropTypes.func.isRequired,
  listingUrl: PropTypes.object.isRequired
};

export default CoverImage;
