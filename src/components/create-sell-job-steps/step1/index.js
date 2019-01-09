import React, { Component } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import { bound } from "class-bind";

import { translate } from "../../../utilities/locale";
import PropertyCheckboxGroup from "../../../components/property-checkbox-group";
import PriceRangeSlider from "../../../components/price-range-slider";
import classnames from "classnames";
import NobulTip from "../../../components/nobul-tip";
import {
  PRICE_RANGE_FIELD,
  PROPERTY_TYPE_FIELD
} from "../../../../core/constants/shared";
import { CREATE_PROPERTY_TYPES } from "../../../utilities/property-data-web";
import { SELL } from "../../../../core/api-transform/jobs";

import "./styles.scss";
import { gtmEvent } from "../../../utilities/gtm-event";
import { SELL_REAL_ESTATE_START } from "../../../utilities/google-tag-variable";
import { create_job_filter } from "../../../utilities/filters";
import Devices from "../../../components/breakpoints/devices";
import {
  MOBILE,
  DESKTOP,
  TABLET
} from "../../../../core/constants/breakpoints";

class CreateSellJobStep1 extends Component {
  state = {
    propertyIcon: "",
    priceRangeDefaultValue: [1, 3]
  };

  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object,
    handleNextStep: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
    currentScreen: PropTypes.number,
    fields: PropTypes.object,
    currentBreakPoint: PropTypes.string,
    isAnonymousUser: PropTypes.bool
  };

  static defaultProps = {
    form: {},
    handleNextStep: () => {},
    handlePreviousStep: () => {},
    currentScreen: 0,
    fields: {},
    isAnonymousUser: true
  };

  @bound
  onNextClick(e) {
    let fieldToValidate = [PROPERTY_TYPE_FIELD];
    if (this.props.currentScreen === 2) fieldToValidate.push(PRICE_RANGE_FIELD);

    e.preventDefault();
    this.props.form.validateFieldsAndScroll(
      fieldToValidate,
      (err, values) => !err && this.props.handleNextStep(values)
    );
  }

  @bound
  setPropertyType(value) {
    this.props.form.setFieldsValue({ [PROPERTY_TYPE_FIELD]: value });

    const property = CREATE_PROPERTY_TYPES.find(property => {
      return create_job_filter(property, value);
    });

    this.setState({ propertyIcon: property[SELL] });
  }

  @bound
  setPriceRange(value) {
    this.props.form.setFieldsValue({ [PRICE_RANGE_FIELD]: value });
  }

  @bound
  getClassName(screen) {
    return this.props.currentScreen !== screen ? "hide" : "";
  }

  @bound
  checkPriceRange(rule, value, callback) {
    if (!value || value[1] === 0) {
      callback(translate(this.props.intl, "error.priceRangeIsRequired"));
    } else {
      callback();
    }
  }

  @bound
  getPropertyIcon(propertyType) {
    const property = CREATE_PROPERTY_TYPES.find(property => {
      return create_job_filter(property, propertyType);
    });

    return property[SELL];
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      [PROPERTY_TYPE_FIELD]: this.props.fields[PROPERTY_TYPE_FIELD],
      [PRICE_RANGE_FIELD]: this.props.fields[PRICE_RANGE_FIELD]
    });

    this.setPriceRange(this.state.priceRangeDefaultValue);

    if (this.props.fields[PROPERTY_TYPE_FIELD]) {
      const property = CREATE_PROPERTY_TYPES.find(property => {
        return create_job_filter(
          property,
          this.props.fields[PROPERTY_TYPE_FIELD]
        );
      });
      this.setState({ propertyIcon: property[SELL] });
    }

    !this.props.isAnonymousUser &&
      gtmEvent({
        name: SELL_REAL_ESTATE_START
      });
  }

  render() {
    const { intl, form, handlePreviousStep } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    const nextButtonClassNames = classnames({
      "googletag-consumer-sell-real-estate-start": this.props.currentScreen <= 1
    });
    return (
      <div className="sell-job-step1">
        <Form onSubmit={this.onNextClick}>
          <div className={`${this.getClassName(1)}`}>
            <h1>{translate(intl, "lookingToSell")}</h1>
            <FormItem>
              {getFieldDecorator(PROPERTY_TYPE_FIELD, {
                rules: [
                  {
                    required: true,
                    message: translate(intl, "error.propertyTypeIsRequired")
                  }
                ]
              })(
                <PropertyCheckboxGroup
                  type={SELL}
                  selectedPropertyType={this.props.fields[PROPERTY_TYPE_FIELD]}
                  onPropertyTypeChange={this.setPropertyType}
                />
              )}
            </FormItem>
          </div>

          <div className={this.getClassName(2)}>
            <h1>{translate(intl, "sell.propertyWorth")}</h1>
            <FormItem>
              <div className="sell-job-step1-icon-slider-group">
                <Devices sizes={[DESKTOP, TABLET]}>
                  <img
                    src={this.state.propertyIcon}
                    alt={translate(intl, "sell.propertyWorth")}
                  />
                </Devices>
                <div className="sell-job-step1-price-slider">
                  {getFieldDecorator(PRICE_RANGE_FIELD, {
                    rules: [
                      {
                        validator: this.checkPriceRange
                      }
                    ]
                  })(
                    <PriceRangeSlider
                      isForPosting={true}
                      value={this.props.fields[PRICE_RANGE_FIELD]}
                      onPriceRangeChange={this.setPriceRange}
                      defaultValue={this.state.priceRangeDefaultValue}
                    />
                  )}
                </div>
              </div>
            </FormItem>
            <Devices sizes={[DESKTOP, TABLET]}>
              <NobulTip
                message={translate(intl, "toolTipTitle")}
                description={translate(intl, "toolTipPriceDescription")}
                visible={true}
              />
            </Devices>
          </div>

          <FormItem>
            <div className="sell-job-step1-buttons">
              {this.props.currentScreen > 1 && (
                <Button
                  size={
                    this.props.currentBreakPoint === MOBILE
                      ? "large"
                      : undefined
                  }
                  onClick={handlePreviousStep}
                >
                  {translate(intl, "button.back")}
                </Button>
              )}
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className={nextButtonClassNames}
              >
                {translate(intl, "button.next")}
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(CreateSellJobStep1);
