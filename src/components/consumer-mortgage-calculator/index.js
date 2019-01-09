import React, { Component } from "react";
import { InputNumber, Button, Form, Radio } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";

import { BI_WEEKLY, MONTHLY } from "../../../core/api-transform/users";
import {
  formatPriceString,
  parsePriceString,
  formatPercentString,
  parsePercentString
} from "../../../core/utilities/number-format";
import {
  LISTING_PRICE,
  DOWNPAYMENT_AMOUNT,
  MORTGAGE_AMOUNT,
  AMORIZATION_PERIOD,
  INTEREST_RATE,
  PAYMENT_FREQUENCY
} from "../../../core/constants/shared";
import { getFormLayout } from "../../utilities/forms";
import { translate } from "../../utilities/locale";
import { AmortizationOptions } from "./amortization-options";

import "./styles.scss";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

//TO-DO: Replace the href link with actual link
@injectIntl
@Form.create({})
class ConsumerMortgageCalculator extends Component {
  state = {
    result: 0,
    isLoggedIn: true,
    mortgageCalculated: false,
    mortgageAmount: 0,
    headerText: ""
  };

  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object.isRequired,
    defaultValue: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.setState({
      headerText: translate(
        this.props.intl,
        "mortgageCalculator.paymentFrequency.monthly"
      )
    });
    this.props.form.setFieldsValue({
      paymentFrequency: MONTHLY
    });
  }

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(err => {
      !err && this.calculatorPrimeInterestRate();
    });
  }

  @bound
  calculateMortgageAmount() {
    const values = this.props.form.getFieldsValue();
    const mortgageAmount = values.listingPrice - values.downpaymentAmount;
    this.setState({
      mortgageAmount: mortgageAmount
    });
  }
  //Source of formula: http://www.yorku.ca/amarshal/mortgage.htm

  @bound
  paymentsNonNegative(rule, value, callback) {
    const { listingPrice } = this.props.form.getFieldsValue();
    const newMortgageAmount = listingPrice - value;
    if (newMortgageAmount < 0) {
      callback(
        translate(this.props.intl, "mortgageCalculator.downpayment.maxError")
      );
    } else {
      callback();
    }
  }

  calculatorPrimeInterestRate() {
    const values = this.props.form.getFieldsValue();
    this.calculateMortgageAmount();
    const interestRate = values.interestRate;
    const rate = interestRate / 100;
    const exponent = 1 / 12;
    const partOne = rate / 2 + 1;

    const partTwo = Math.pow(partOne, 2);

    const partThree = Math.pow(partTwo, exponent);

    const partFour = partThree - 1;

    const PIR = partFour;
    this.calculatePayments(PIR);
  }

  calculatePayments(PIR) {
    const values = this.props.form.getFieldsValue();
    const amorizationPeriod = values.amorizationPeriod;

    const mortgageAmount = values.listingPrice - values.downpaymentAmount;
    const months = amorizationPeriod * -12;

    const partOne = mortgageAmount * PIR;
    const partTwo = 1 + PIR;
    const partThree = Math.pow(partTwo, months);
    const partFour = 1 - partThree;
    const partFive = partOne / partFour;
    const monthlyPayments = Math.round(partFive * 100) / 100;
    this.setPaymentField(monthlyPayments);
  }

  setPaymentField(monthlyPayments) {
    const values = this.props.form.getFieldsValue();
    const { paymentFrequency } = values;
    const headerKey =
      paymentFrequency === BI_WEEKLY
        ? "mortgageCalculator.paymentFrequency.biWeekly"
        : "mortgageCalculator.paymentFrequency.monthly";

    this.setState({
      headerText: translate(this.props.intl, headerKey),
      result:
        paymentFrequency === BI_WEEKLY ? monthlyPayments / 2 : monthlyPayments,
      mortgageCalculated: true
    });
  }

  @bound
  setAmorizationPeriod(amorizationPeriod) {
    this.props.form.setFieldsValue({
      [AMORIZATION_PERIOD]: amorizationPeriod
    });
  }

  render() {
    const { form = {} } = this.props;
    const { getFieldDecorator } = form;
    const fieldOptions = {
      offset: false,
      left: true,
      center: false
    };
    const fieldLayout = getFormLayout(
      fieldOptions.offset,
      fieldOptions.left,
      fieldOptions.center
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="mortgage-calculator">
          <div className="mortgage-calculator-fields">
            <div className="mortgage-calculator-payments">
              <h6>
                {this.state.headerText}
                {translate(this.props.intl, "mortgageCalculator.header")}
              </h6>
              <h1>{formatPriceString(this.state.result)}</h1>
            </div>
            <div className="mortgage-calculator-price">
              <FormItem
                label={translate(
                  this.props.intl,
                  "mortgageCalculator.listingPrice.label"
                )}
                {...fieldLayout}
              >
                {getFieldDecorator(LISTING_PRICE, {
                  initialValue: this.props.defaultValue || 0,
                  rules: [
                    {
                      required: true,
                      message: translate(
                        this.props.intl,
                        "mortgageCalculator.listingPrice.error"
                      )
                    }
                  ]
                })(
                  <InputNumber
                    placeholder={translate(
                      this.props.intl,
                      "mortgageCalculator.listingPrice.placeholder"
                    )}
                    formatter={formatPriceString}
                    parser={parsePriceString}
                    min={0}
                  />
                )}
              </FormItem>
            </div>
            <div className="mortgage-calculator-downpayment">
              <FormItem
                label={translate(
                  this.props.intl,
                  "mortgageCalculator.downpayment.label"
                )}
                {...fieldLayout}
              >
                {getFieldDecorator(DOWNPAYMENT_AMOUNT, {
                  rules: [
                    {
                      required: true,
                      message: translate(
                        this.props.intl,
                        "mortgageCalculator.downpayment.error"
                      )
                    },
                    {
                      validator: this.paymentsNonNegative
                    }
                  ]
                })(
                  <InputNumber
                    min={0}
                    formatter={formatPriceString}
                    parser={parsePriceString}
                  />
                )}
              </FormItem>
            </div>
            <div className="mortgage-calculator-amount">
              <FormItem
                label={translate(
                  this.props.intl,
                  "mortgageCalculator.mortgageAmount.label"
                )}
                {...fieldLayout}
              >
                {getFieldDecorator(MORTGAGE_AMOUNT, {})(
                  <InputNumber
                    formatter={formatPriceString}
                    parser={parsePriceString}
                    placeholder={this.state.mortgageAmount}
                    disabled
                  />
                )}
              </FormItem>
            </div>
            <div className="mortgage-calculator-amorization">
              <FormItem
                label={translate(
                  this.props.intl,
                  "mortgageCalculator.amorizationPeriod.label"
                )}
                {...fieldLayout}
              >
                {getFieldDecorator(AMORIZATION_PERIOD, {
                  rules: [
                    {
                      required: true,
                      message: translate(
                        this.props.intl,
                        "mortgageCalculator.amorizationPeriod.error"
                      )
                    }
                  ],
                  initialValue: 5
                })(
                  <AmortizationOptions
                    intl={this.props.intl}
                    parentClass="mortgage-calculator-amorization"
                    onSelectChange={this.setAmorizationPeriod}
                    defaultValue={5}
                  />
                )}
              </FormItem>
            </div>
            <div className="mortgage-calculator-frequency">
              {getFieldDecorator(PAYMENT_FREQUENCY, {
                rules: [
                  {
                    required: true,
                    message: translate(
                      this.props.intl,
                      "mortgageCalculator.paymentFrequency.error"
                    )
                  }
                ]
              })(
                <RadioGroup
                  placeholder={translate(
                    this.props.intl,
                    "mortgageCalculator.paymentFrequency.placeholder"
                  )}
                >
                  <RadioButton value={MONTHLY}>
                    {translate(
                      this.props.intl,
                      "mortgageCalculator.paymentFrequency.monthly"
                    )}
                  </RadioButton>
                  <RadioButton value={BI_WEEKLY}>
                    {translate(
                      this.props.intl,
                      "mortgageCalculator.paymentFrequency.biWeekly"
                    )}
                  </RadioButton>
                </RadioGroup>
              )}
            </div>
            <div className="mortgage-calculator-interest">
              <FormItem
                label={translate(
                  this.props.intl,
                  "mortgageCalculator.interestRate.label"
                )}
                {...fieldLayout}
              >
                {getFieldDecorator(INTEREST_RATE, {
                  rules: [
                    {
                      required: true,
                      message: translate(
                        this.props.intl,
                        "mortgageCalculator.interestRate.error"
                      )
                    }
                  ]
                })(
                  <InputNumber
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={formatPercentString}
                    parser={parsePercentString}
                  />
                )}
              </FormItem>
            </div>
          </div>
          <div className="mortgage-calculator-button">
            <Button
              type="primary"
              htmlType="submit"
              className="mortgage-calculator-calculate"
            >
              {translate(this.props.intl, "mortgageCalculator.calculate")}
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

export default ConsumerMortgageCalculator;
