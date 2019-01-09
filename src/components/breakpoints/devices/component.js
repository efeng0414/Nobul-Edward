import { Component } from "react";
import PropTypes from "prop-types";

class Devices extends Component {
  static propTypes = {
    children: PropTypes.any,
    currentBreakPoint: PropTypes.string,
    sizes: PropTypes.array
  };

  render() {
    if (
      this.props.sizes.findIndex(
        device => device === this.props.currentBreakPoint
      ) !== -1
    )
      return this.props.children;
    return null;
  }
}

export default Devices;
