import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

@withRouter
class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  };

  componentDidUpdate(prevProps) {
    prevProps.location !== this.props.location && window.scroll(0, 0);
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
