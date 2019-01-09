import React, { PureComponent } from "react";
import { Slider } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";

import {
  PROPERTY_PRICE_RANGE,
  BROWSE_PRICE_STEPS
} from "../../../core/data/propertyData";

import "./styles.scss";

const createMarks = ({ isForPosting }) => {
  let marks = {};
  const ranges = isForPosting ? PROPERTY_PRICE_RANGE : BROWSE_PRICE_STEPS;
  ranges.forEach(step => {
    marks[step.value] = step.label;
  });
  return marks;
};

class PriceRangeSlider extends PureComponent {
  // Check that the price range selectors do not select the same price.
  @bound
  onPriceRangeChange(value) {
    const ranges = this.props.isForPosting
      ? PROPERTY_PRICE_RANGE
      : BROWSE_PRICE_STEPS;
    const max = parseInt(ranges[ranges.length - 1].value);

    // If we have the same value
    if (typeof value[1] !== "undefined" && value[0] === value[1]) {
      if (value[1] < max) {
        // Add 1 to the max, if it is not at the max
        value[1]++;
      } else {
        // Else, remove 1 from the min
        value[0]--;
      }
    }

    this.props.onPriceRangeChange(value);
  }

  render() {
    const marks = createMarks({
      isForPosting: this.props.isForPosting
    });
    const max = Object.keys(marks).length - 1;

    const sliderMarks = this.props.value
      ? {
          [this.props.value[0]]: marks[this.props.value[0]],
          [this.props.value[1]]: marks[this.props.value[1]]
        }
      : {
          [this.props.defaultValue[0]]: marks[this.props.defaultValue[0]],
          [this.props.defaultValue[1]]: marks[this.props.defaultValue[1]]
        };

    return (
      <div
        className={
          this.props.defaultValue[1] === 30
            ? "unlimited-price-range"
            : "dual-price-range"
        }
      >
        <Slider
          range
          defaultValue={this.props.defaultValue}
          marks={sliderMarks}
          tipFormatter={null}
          min={0}
          max={max}
          onChange={this.onPriceRangeChange}
          value={
            this.props.value && this.props.value.length
              ? this.props.value
              : this.props.defaultValue
          }
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

PriceRangeSlider.propTypes = {
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  onPriceRangeChange: PropTypes.func,
  disabled: PropTypes.bool,
  isForPosting: PropTypes.bool
};

PriceRangeSlider.defaultProps = {
  disabled: false,
  isForPosting: false
};

export default PriceRangeSlider;
