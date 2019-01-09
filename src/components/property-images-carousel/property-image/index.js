import React from "react";
import PropTypes from "prop-types";

const PropertyImage = ({ index, setImage, defaultImagePosition, photo }) => (
  <div onClick={setImage} data-index={index} className="image-slide">
    <img
      className={index === defaultImagePosition ? "image-selected" : ""}
      src={photo}
    />
  </div>
);

PropertyImage.propTypes = {
  setImage: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  defaultImagePosition: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired
};

export default PropertyImage;
