import React, { Component } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import { bound } from "class-bind";
import classnames from "classnames";
import { translate } from "../../../utilities/locale";
import PropertyCheckboxGroup from "../../../components/property-checkbox-group";
import PriceRangeSlider from "../../../components/price-range-slider";
import {
  PRICE_RANGE_FIELD,
  PROPERTY_TYPE_FIELD
} from "../../../../core/constants/shared";
import { CREATE_PROPERTY_TYPES } from "../../../utilities/property-data-web";
import { BUY } from "../../../../core/api-transform/jobs";

import { gtmEvent } from "../../../utilities/gtm-event";
import { create_job_filter } from "../../../utilities/filters";
import { BUY_REAL_ESTATE_START } from "../../../utilities/google-tag-variable";
import Devices from "../../breakpoints/desktop";
import {
  MOBILE,
  DESKTOP,
  TABLET
} from "../../../../core/constants/breakpoints";
import "./styles.scss";

const FormItem = Form.Item;

class CreateBuyJobStep1 extends Component {
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
    isAnonymousUser: true
  };

  @bound
  onNextClick(e) {
    const { handleNextStep, form, currentScreen } = this.props;
    const { validateFieldsAndScroll } = form;
    let fieldToValidate = [PROPERTY_TYPE_FIELD];
    if (currentScreen === 2) fieldToValidate.push(PRICE_RANGE_FIELD);

    e.preventDefault();
    validateFieldsAndScroll(
      fieldToValidate,
      (err, values) => !err && handleNextStep(values)
    );
  }

  @bound
  setPropertyType(value) {
    const { form } = this.props;
    form.setFieldsValue({ [PROPERTY_TYPE_FIELD]: value });

    const property = CREATE_PROPERTY_TYPES.find(property => {
      return create_job_filter(property, value);
    });

    this.setState({ propertyIcon: property[BUY] });
  }

  @bound
  setPriceRange(value) {
    const { form } = this.props;
    form.setFieldsValue({ [PRICE_RANGE_FIELD]: value });
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
  getClassName(screen) {
    return this.props.currentScreen !== screen ? "hide" : "";
  }

  @bound
  getPropertyIcon(propertyType) {
    const property = CREATE_PROPERTY_TYPES.find(property => {
      return create_job_filter(property, propertyType);
    });

    return property[BUY];
  }

  componentDidMount() {
    const { fields, form = {} } = this.props;

    this.setPriceRange(this.state.priceRangeDefaultValue);

    if (fields[PROPERTY_TYPE_FIELD]) {
      const property = CREATE_PROPERTY_TYPES.find(property => {
        return create_job_filter(
          property,
          this.props.fields[PROPERTY_TYPE_FIELD]
        );
      });
      form.setFieldsValue({
        [PROPERTY_TYPE_FIELD]: fields[PROPERTY_TYPE_FIELD]
      });
      this.setState({ propertyIcon: property[BUY] });
    }
    !this.props.isAnonymousUser &&
      gtmEvent({
        name: BUY_REAL_ESTATE_START
      });
  }

  render() {
    const { intl, form, currentScreen, handlePreviousStep } = this.props;
    const { getFieldDecorator } = form;
    const buttonClassName = classnames({
      "googletag-consumer-buy-real-estate-start": currentScreen <= 1
    });

    return (
      <div className="buy-job-step1">
        <Form onSubmit={this.onNextClick}>
          <div className={this.getClassName(1)}>
            <h1>{translate(intl, "createBuyJob.lookingToBuy")}</h1>
            <FormItem>
              {getFieldDecorator(PROPERTY_TYPE_FIELD, {
                rules: [
                  {
                    required: true,
                    message: translate(intl, "error.propertyTypeIsRequired")
                  }
                ]
              })(
                <div className="property-types">
                  <PropertyCheckboxGroup
                    type={BUY}
                    selectedPropertyType={
                      this.props.fields[PROPERTY_TYPE_FIELD]
                    }
                    onPropertyTypeChange={this.setPropertyType}
                  />
                </div>
              )}
            </FormItem>
          </div>

          <div className={this.getClassName(2)}>
            <h1>{translate(intl, "createBuyJob.budget")}</h1>
            <FormItem>
              <div className="buy-job-step1-icon-slider-group">
                <Devices sizes={[DESKTOP, TABLET]}>
                  <img
                    src={this.state.propertyIcon}
                    alt={translate(intl, "createBuyJob.budget")}
                  />
                </Devices>
                <div className="buy-job-step1-price-slider">
                  {getFieldDecorator(PRICE_RANGE_FIELD, {
                    rules: [
                      {
                        validator: this.checkPriceRange
                      }
                    ]
                  })(
                    <PriceRangeSlider
                      isForPosting
                      value={this.props.fields[PRICE_RANGE_FIELD]}
                      onPriceRangeChange={this.setPriceRange}
                      defaultValue={this.state.priceRangeDefaultValue}
                    />
                  )}
                </div>
              </div>
            </FormItem>
          </div>

          <FormItem>
            <div
              className={`buy-job-step1-buttons ${this.currentScreen === 1 &&
                "step-one"}`}
            >
              {currentScreen > 1 && (
                <Button
                  size={
                    this.props.currentBreakPoint === MOBILE
                      ? "large"
                      : "default"
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
                className={buttonClassName}
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

export default Form.create()(CreateBuyJobStep1);
