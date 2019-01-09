import React from "react";
import PropTypes from "prop-types";

const ThankYou = ({ thankYouText }) => <p>{thankYouText}</p>;

ThankYou.propTypes = {
  thankYouText: PropTypes.string.isRequired
};

export default ThankYou;
