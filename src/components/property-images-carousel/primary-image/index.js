import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_LISTING_IMAGE } from "../../../utilities/images";
import ListingOptions from "../../listing-card/listing-options";

const PrimaryImage = ({
  hasImagesSuccessfullyLoaded,
  defaultImagePosition,
  photoUrls,
  ...props
}) => (
  <div className="property-images-image">
    <div
      className="image-display"
      style={{
        backgroundImage: `url(${photoUrls[defaultImagePosition] ||
          DEFAULT_LISTING_IMAGE})`,
        backgroundPosition: !hasImagesSuccessfullyLoaded && "center"
      }}
    />
    <ListingOptions {...props} />
  </div>
);

PrimaryImage.propTypes = {
  hasImagesSuccessfullyLoaded: PropTypes.bool,
  defaultImagePosition: PropTypes.number.isRequired,
  photoUrls: PropTypes.array.isRequired,
  userType: PropTypes.string
};

PrimaryImage.defaultProps = {
  hasImagesSuccessfullyLoaded: false
};

export default PrimaryImage;
