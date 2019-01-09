import React, { Component } from "react";
import { DatePicker } from "antd";
import { DISPLAY_DATE_FORMAT } from "../../../core/constants/shared";
import { bound } from "../../../node_modules/class-bind";

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: null
    };
  }

  @bound
  onChange(date, dateString) {
    this.setState({
      dateString
    });
  }

  render() {
    return (
      <div>
        <DatePicker
          placeholder="Select Date"
          format={DISPLAY_DATE_FORMAT}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Date;
