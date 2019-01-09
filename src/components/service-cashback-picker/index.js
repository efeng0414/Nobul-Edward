import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import { Radio, Form } from "antd";
import { intlShape } from "react-intl";
import { BUY, SELL } from "../../../core/constants/shared";
import "./styles.scss";
import { bound } from "class-bind";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class ServiceCashbackPicker extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    onServicesRangeChange: PropTypes.func,
    selectedRange: PropTypes.number,
    getFieldDecorator: PropTypes.any,
    jobType: PropTypes.string.isRequired
  };

  static defaultProps = {
    selectedRange: 3,
    onServicesRangeChange: () => {}
  };

  @bound
  renderSellServices() {
    return (
      <div className="services-container">
        <div>
          <span>{translate(this.props.intl, "lowestCost")}</span>
          <br />
          <span>{translate(this.props.intl, "possible")}</span>
        </div>

        <div>{translate(this.props.intl, "aBalance")}</div>

        <div>
          <span>{translate(this.props.intl, "mostServices")}</span>
          <br />
          <span>{translate(this.props.intl, "possible")}</span>
        </div>
      </div>
    );
  }

  @bound
  renderBuyServices() {
    return (
      <div className="services-container">
        <div>
          <span>{translate(this.props.intl, "highestRebate")}</span>
          <br />
          <span>{translate(this.props.intl, "possible")}</span>
        </div>

        <div>{translate(this.props.intl, "aBalance")}</div>

        <div>
          <span>{translate(this.props.intl, "mostServices")}</span>
          <br />
          <span>{translate(this.props.intl, "possible")}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <FormItem>
        <div className="services-range">
          <RadioGroup
            onChange={this.props.onServicesRangeChange}
            defaultValue={this.props.selectedRange}
            className="services-range-input"
          >
            <Radio value={1} />
            <Radio value={2} />
            <Radio value={3} />
            <Radio value={4} />
            <Radio value={5} />
          </RadioGroup>
          {this.props.jobType === BUY && this.renderBuyServices()}
          {this.props.jobType === SELL && this.renderSellServices()}
        </div>
      </FormItem>
    );
  }
}

export default ServiceCashbackPicker;
