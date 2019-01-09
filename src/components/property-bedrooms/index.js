import React, { Component } from "react";
import { InputNumber } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import {
  BEDROOM_BUY,
  BEDROOM_SELL,
  BEDROOM_GREY
} from "../../../src/utilities/images";
import { SELL } from "../../../core/api-transform/jobs";
import "./styles.scss";

class PropertyBedrooms extends Component {
  state = {
    mouseHover: false
  };

  static propTypes = {
    onBedroomsChange: PropTypes.func,
    selectedBedrooms: PropTypes.number,
    intl: intlShape.isRequired,
    props: PropTypes.any,
    jobType: PropTypes.string
  };

  static defaultProps = {
    selectedBedrooms: 0
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
  getBedroomsIcon(mouseHover) {
    if (this.props.jobType === SELL) {
      return mouseHover ? BEDROOM_SELL : BEDROOM_GREY;
    }
    return mouseHover ? BEDROOM_BUY : BEDROOM_GREY;
  }

  render() {
    return (
      <div
        className="property-bedrooms"
        onMouseOver={this.onMouseenter}
        onMouseOut={this.onMouseleave}
      >
        <div className="property-bedrooms-parent">
          <img
            className="property-bedrooms-icon"
            src={this.getBedroomsIcon(this.state.mouseHover)}
          />
          <div className={`property-bedrooms-container-${this.props.jobType}`}>
            <InputNumber
              className="property-bedrooms-input"
              defaultValue={this.props.selectedBedrooms}
              min={0}
              max={99}
              onChange={this.props.onBedroomsChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(PropertyBedrooms);
