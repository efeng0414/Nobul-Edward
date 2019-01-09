import React from "react";
import { PropTypes } from "prop-types";
import Background from "../background";

import "./styles.scss";

const HomepageWrapper = props => (
  <Background
    image={props.backgroundImage}
    className={`home-page ${props.className ? props.className : ""}`}
  >
    {props.children}
  </Background>
);

HomepageWrapper.propTypes = {
  children: PropTypes.any,
  backgroundImage: PropTypes.any,
  className: PropTypes.string
};

export default HomepageWrapper;
