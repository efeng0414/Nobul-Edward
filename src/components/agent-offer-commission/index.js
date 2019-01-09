import React, { PureComponent } from "react";
import { InputNumber, Button } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { intlShape } from "react-intl";

import calculateCommision from "../../../core/utilities/calculate-commission";
import { translate } from "../../utilities/locale";
import Currency from "../currency";

import "./styles.scss";

class AgentOfferCommission extends PureComponent {
  state = {
    commission: parseFloat(this.props.value),
    calculatedLow: calculateCommision(this.props.priceLow, this.props.value),
    calculatedHigh: calculateCommision(this.props.priceHigh, this.props.value)
  };

  static propTypes = {
    value: PropTypes.any,
    priceLow: PropTypes.number,
    priceHigh: PropTypes.number,
    intl: intlShape.isRequired,
    commissionType: PropTypes.string,
    onChange: PropTypes.func,
    country: PropTypes.string
  };

  @bound
  calculateRange() {
    this.setState({
      calculatedLow: calculateCommision(
        this.props.priceLow,
        this.state.commission
      ),
      calculatedHigh: calculateCommision(
        this.props.priceHigh,
        this.state.commission
      )
    });
  }

  @bound
  handleCommissionChange(commission) {
    this.setState({ commission });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(commission);
    }
  }

  render() {
    return (
      <div className="offer-commission">
        <div className="offer-commission__values">
          <InputNumber
            defaultValue={this.state.commission}
            onChange={this.handleCommissionChange}
            step={0.25}
          />
          <span className="offer-commission__divider">%</span>
          <div className="offer-commission__range">
            {this.state.calculatedLow}
          </div>
          <span className="offer-commission__divider">-</span>
          <div className="offer-commission__range">
            {this.state.calculatedHigh}
          </div>
          <span className="offer-commission__divider">
            <Currency currency={this.props.country} />
          </span>
        </div>
        <Button
          type="primary"
          className="offer-commission__button"
          onClick={this.calculateRange}
        >
          {translate(this.props.intl, "offer.calculate")}
        </Button>
      </div>
    );
  }
}

export default AgentOfferCommission;
