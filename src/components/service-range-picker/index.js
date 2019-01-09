import React, { Component } from "react";
import { intlShape } from "react-intl";
import { Slider } from "antd";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";

import "./styles.scss";
import { bound } from "class-bind";

class ServiceRangePicker extends Component {
  state = {
    value: this.props.defaultVal
  };

  static propTypes = {
    minVal: PropTypes.number.isRequired,
    maxVal: PropTypes.number.isRequired,
    defaultVal: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    intl: intlShape.isRequired,
    labelKey: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    showMiddleLabel: PropTypes.bool
  };

  static defaultProps = {
    onChange: () => {},
    isDisabled: false,
    showMiddleLabel: true
  };

  tipFormatter = value => {
    if (value === 2 || value === 4)
      return translate(
        this.props.intl,
        `serviceRange.${this.props.labelKey}.${value}`
      );
  };

  @bound
  onChange(value) {
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }

  tipFormatterMap = {
    1: false,
    2: true,
    3: false,
    4: true,
    5: false
  };

  render() {
    const sliderClass = this.props.showMiddleLabel
      ? "service-range-picker--with-middle"
      : "";

    return (
      <div className={`service-range-picker ${sliderClass}`}>
        <Slider
          min={this.props.minVal}
          max={this.props.maxVal}
          dots={true}
          tipFormatter={
            this.tipFormatterMap[this.state.value] ? this.tipFormatter : null
          }
          marks={{
            1: {
              style: {
                marginLeft: "-5.4rem"
              },
              label: translate(
                this.props.intl,
                `serviceRange.${this.props.labelKey}.1`
              )
            },

            3: this.props.showMiddleLabel && {
              style: {
                left: "50%",
                marginLeft: "-5.2rem",
                top: "-6.9rem"
              },
              label: translate(
                this.props.intl,
                `serviceRange.${this.props.labelKey}.3`
              )
            },

            5: {
              style: {
                right: "0",
                left: "",
                marginRight: "-5.6rem"
              },
              label: translate(
                this.props.intl,
                `serviceRange.${this.props.labelKey}.5`
              )
            }
          }}
          defaultValue={this.state.value}
          onChange={this.onChange}
          included={false}
          disabled={this.props.isDisabled}
        />
      </div>
    );
  }
}

export default ServiceRangePicker;
