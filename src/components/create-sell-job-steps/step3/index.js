import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, Button, Row } from "antd";
import { bound } from "class-bind";
import { SELL } from "../../../../core/api-transform/jobs";

import { translate } from "../../../utilities/locale";
import PropertyFeatures from "../../property-features";
import PropertyBedrooms from "../../property-bedrooms";
import PropertyBathrooms from "../../property-bathrooms";
import {
  PROPERTY_FEATURES,
  PROPERTY_BEDROOMS,
  PROPERTY_BATHROOMS
} from "../../../../core/constants/shared";
import {
  MOBILE,
  DESKTOP,
  TABLET
} from "../../../../core/constants/breakpoints";
import Mobile from "../../breakpoints/mobile";
import Devices from "../../breakpoints/devices";

import "./styles.scss";

class CreateSellJobStep3 extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object,
    handleNextStep: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
    currentScreen: PropTypes.number,
    selectedPropertyClass: PropTypes.string,
    fields: PropTypes.object,
    currentBreakPoint: PropTypes.string
  };

  static defaultProps = {
    form: {},
    handleNextStep: () => {},
    handlePreviousStep: () => {},
    currentScreen: 0,
    selectedPropertyClass: "",
    fields: {}
  };

  state = {
    bedroomSelected: false
  };

  @bound
  onNextClick(e) {
    const { handleNextStep, form, currentScreen } = this.props;
    const { validateFieldsAndScroll } = form;
    let fieldToValidate = [PROPERTY_FEATURES];
    if (currentScreen === 2) fieldToValidate.push(PROPERTY_BEDROOMS);
    if (currentScreen === 2) fieldToValidate.push(PROPERTY_BATHROOMS);

    e.preventDefault();
    validateFieldsAndScroll(fieldToValidate, (err, values) => {
      if (!err) {
        handleNextStep(values);
      }
    });
  }

  @bound
  setPropertyFeatures(value) {
    this.props.form.setFieldsValue({ [PROPERTY_FEATURES]: value });
  }

  @bound
  setPropertyBedrooms(value) {
    this.setState({
      bedroomSelected: true
    });
    this.props.form.setFieldsValue({ [PROPERTY_BEDROOMS]: value });
  }

  @bound
  setPropertyBathrooms(value) {
    this.props.form.setFieldsValue({ [PROPERTY_BATHROOMS]: value });
  }

  componentDidMount() {
    const { fields, form = {} } = this.props;
    window.scrollTo(0, 0);
    form.setFieldsValue({
      [PROPERTY_FEATURES]: fields[PROPERTY_FEATURES],
      [PROPERTY_BEDROOMS]: fields[PROPERTY_BEDROOMS],
      [PROPERTY_BATHROOMS]: fields[PROPERTY_BATHROOMS]
    });
  }

  @bound
  getClassName(screen) {
    return this.props.currentScreen !== screen ? "hide" : "";
  }

  render() {
    const {
      intl,
      form,
      handlePreviousStep,
      selectedPropertyClass,
      fields
    } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;

    return (
      <div className="sell-job-step3">
        <Form onSubmit={this.onNextClick}>
          <Row>
            <div className={this.getClassName(1)}>
              <Mobile>
                <h1>{translate(intl, "sellBedrooms")}</h1>
              </Mobile>
              <Devices sizes={[TABLET, DESKTOP]}>
                <h1>{translate(intl, "sellBedroomsAndBathrooms")}</h1>
              </Devices>
              <div className="sell-job-step3-icon-group">
                <div className="sell-job-step3-icon-item">
                  <FormItem>
                    {getFieldDecorator(PROPERTY_BEDROOMS, {})(
                      <PropertyBedrooms
                        onBedroomsChange={this.setPropertyBedrooms}
                        selectedBedrooms={fields[PROPERTY_BEDROOMS]}
                        bedroomSelected={this.state.bedroom}
                        jobType={SELL}
                      />
                    )}
                  </FormItem>
                </div>
                <Mobile>
                  <h1 className="sell-job-step3-icon-group--title">
                    {translate(intl, "sellBathrooms")}
                  </h1>
                </Mobile>
                <div className="sell-job-step3-icon-item">
                  <FormItem>
                    {getFieldDecorator(PROPERTY_BATHROOMS, {})(
                      <PropertyBathrooms
                        onBathroomsChange={this.setPropertyBathrooms}
                        selectedBathrooms={fields[PROPERTY_BATHROOMS]}
                        jobType={SELL}
                      />
                    )}
                  </FormItem>
                </div>
              </div>
            </div>
          </Row>

          <div className={this.getClassName(2)}>
            <h1>{translate(intl, "sellFeatures")}</h1>
            <FormItem>
              {getFieldDecorator("propertyFeatures", {
                rules: [
                  {
                    required: false
                  }
                ]
              })(
                <PropertyFeatures
                  jobType={SELL}
                  selectedFeatures={fields[PROPERTY_FEATURES]}
                  selectedPropertyClass={selectedPropertyClass}
                  onFeaturesChange={this.setPropertyFeatures}
                />
              )}
            </FormItem>
          </div>

          <FormItem>
            <div className="sell-job-step3-buttons">
              <Button
                size={
                  this.props.currentBreakPoint === MOBILE ? "large" : undefined
                }
                onClick={handlePreviousStep}
              >
                {translate(intl, "button.back")}
              </Button>
              <Button type="primary" size="large" htmlType="submit">
                {translate(intl, "button.next")}
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(CreateSellJobStep3);
