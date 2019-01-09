import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Icon } from "antd";
import Desktop from "../../breakpoints/desktop";
import { BUY } from "../../../../core/constants/shared";
import { GOLD, WATER_BLUE } from "../../../utilities/constants";
import "./styles.scss";


class Service extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    value: PropTypes.string.isRequired,
    serviceType: PropTypes.string.isRequired
  };

  static defaultProp = {
    tooltip: ""
  };

  render() {
    return (
      <Checkbox value={this.props.value} className="service">
        {this.props.label}
        <span className="service-icon">
          <Icon type="info-circle" theme="outlined" />
        </span>
        <Desktop>
          <div className={`tip tip-${this.props.serviceType}`}>
            <div className="tool-tip">
              <Icon
                type="info-circle-o"
                style={{
                  color: this.props.serviceType === BUY ? WATER_BLUE : GOLD
                }}
              />
              {this.props.tooltip}
            </div>
          </div>
        </Desktop>
      </Checkbox>
    );
  }
}

export default Service;
