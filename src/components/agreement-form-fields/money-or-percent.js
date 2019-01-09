import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
import { intlShape, injectIntl } from "react-intl";

import { getFormLayout } from "../../utilities/forms";

class MoneyOrPercent extends Component {
  state = {
    moneyValue: this.props.moneyValue,
    percentageValue: this.props.percentageValue
  };

  updateMoney = event => {
    this.setState({ moneyValue: event.target.value });
  };

  updatePercentage = event => {
    this.setState({ percentageValue: event.target.value });
  };

  render() {
    const {
      moneyName,
      moneyValue,
      percentageName,
      percentageValue,
      form
    } = this.props;

    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    const fieldLayout = getFormLayout();

    return (
      <div>
        <FormItem {...fieldLayout} hasFeedback>
          {getFieldDecorator(moneyName, {
            initialValue: moneyValue,
            onChange: this.updateMoney
          })(<Input addonBefore="$" disabled={!!this.state.percentageValue} />)}
        </FormItem>
        <FormItem {...fieldLayout} hasFeedback>
          {getFieldDecorator(percentageName, {
            initialValue: percentageValue,
            onChange: this.updatePercentage
          })(<Input addonAfter="%" disabled={!!this.state.moneyValue} />)}
        </FormItem>
      </div>
    );
  }
}

MoneyOrPercent.propTypes = {
  intl: intlShape.isRequired,
  moneyName: PropTypes.string,
  percentageName: PropTypes.string,
  moneyValue: PropTypes.number,
  percentageValue: PropTypes.number,
  form: PropTypes.any
};

export default injectIntl(MoneyOrPercent);
