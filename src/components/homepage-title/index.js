import React from "react";
import { PropTypes } from "prop-types";

import "./styles.scss";

const HomepageTitle = props => (
  <h1 className="homepage-title">{props.title}</h1>
);

HomepageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default HomepageTitle;
