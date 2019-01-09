import React, { Component } from "react";
import { InputNumber } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import {
  BATHROOM_BUY,
  BATHROOM_SELL,
  BATHROOM_GREY
} from "../../../src/utilities/images";
import { SELL } from "../../../core/api-transform/jobs";
import "./styles.scss";

class PropertyBathrooms extends Component {
  state = {
    mouseHover: false
  };

  static propTypes = {
    onBathroomsChange: PropTypes.func,
    selectedBathrooms: PropTypes.number,
    intl: intlShape.isRequired,
    jobType: PropTypes.string
  };

  static defaultProps = {
    selectedBathrooms: 0
  };

  @bound
  onMouseleave() {
    this.setState({ mouseHover: false });
  }

  @bound
  onMouseenter() {
    this.setState({ mouseHover: true });
  }

  @bound
  getBathroomsIcon(mouseHover) {
    if (this.props.jobType === SELL) {
      return mouseHover ? BATHROOM_SELL : BATHROOM_GREY;
    }
    return mouseHover ? BATHROOM_BUY : BATHROOM_GREY;
  }

  render() {
    return (
      <div
        className="property-bathrooms"
        onMouseOver={this.onMouseenter}
        onMouseOut={this.onMouseleave}
      >
        <div className="property-bathrooms-parent">
          <img
            className="property-bathrooms-icon"
            src={this.getBathroomsIcon(this.state.mouseHover)}
          />
          <div className={`property-bathrooms-container-${this.props.jobType}`}>
            <InputNumber
              className="property-bathrooms-input"
              defaultValue={this.props.selectedBathrooms}
              min={0}
              max={99}
              onChange={this.props.onBathroomsChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(PropertyBathrooms);
