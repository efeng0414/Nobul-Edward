import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, Button, Row } from "antd";
import { bound } from "class-bind";

import { translate } from "../../../utilities/locale";
import ServiceRangePicker from "../../../components/service-range-picker";
import Services from "../../../components/services";
import {
  SERVICES_RANGE,
  SERVICES_EXACT,
  BUY
} from "../../../../core/constants/shared";
import NobulTip from "../../nobul-tip";
import { SERVICES_GROUPS } from "../../../utilities/constants";
import {
  MOBILE,
  DESKTOP,
  TABLET
} from "../../../../core/constants/breakpoints";
import Devices from "../../breakpoints/devices";

import "./styles.scss";

class CreateBuyJobStep4 extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object,
    handleNextStep: PropTypes.func.isRequired,
    handlePreviousStep: PropTypes.func.isRequired,
    currentScreen: PropTypes.number,
    fields: PropTypes.object,
    onServiceRangeChange: PropTypes.func.isRequired,
    currentBreakPoint: PropTypes.string
  };

  static defaultProps = {
    form: {}
  };

  @bound
  onNextClick(e) {
    const { handleNextStep, form } = this.props;
    const { validateFieldsAndScroll } = form;
    const fieldToValidate = [SERVICES_RANGE];
    fieldToValidate.push(SERVICES_EXACT);

    e.preventDefault();
    validateFieldsAndScroll(fieldToValidate, (err, values) => {
      if (!err) {
        handleNextStep(values);
      }
    });
  }

  @bound
  setServicesRange(value) {
    const { form } = this.props;
    form.setFieldsValue({ [SERVICES_RANGE]: value });
  }

  @bound
  setExactServices(value) {
    const { form } = this.props;
    form.setFieldsValue({ [SERVICES_EXACT]: value });
  }

  @bound
  getClassName(screen) {
    return this.props.currentScreen !== screen ? "hide" : "";
  }

  componentDidMount() {
    const { fields, form = {} } = this.props;

    form.setFieldsValue({
      [SERVICES_RANGE]: fields[SERVICES_RANGE],
      [SERVICES_EXACT]: fields[SERVICES_EXACT]
    });
  }

  render() {
    const { intl, form, handlePreviousStep, fields } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;

    return (
      <div className="buy-job-step4">
        <Form onSubmit={this.onNextClick}>
          <Row>
            <div className={this.getClassName(1)}>
              <h1>{translate(intl, "createBuyJob.servicesRange")}</h1>
              <div className="service-range-container">
                <FormItem>
                  {getFieldDecorator(SERVICES_RANGE)(
                    <ServiceRangePicker
                      minVal={1}
                      maxVal={5}
                      defaultVal={fields[SERVICES_RANGE] || 3}
                      onChange={this.setServicesRange}
                      intl={this.props.intl}
                      showMiddleLabel={false}
                      labelKey={"buyer"}
                    />
                  )}
                </FormItem>
              </div>
            </div>
            <div className={this.getClassName(2)}>
              <h1>{translate(intl, "createBuyJob.exactServices")}</h1>
              <FormItem>
                {getFieldDecorator(SERVICES_EXACT, {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Services
                    serviceType={BUY}
                    layout={SERVICES_GROUPS}
                    selectedServices={fields[SERVICES_EXACT]}
                    onServiceClick={this.setExactServices}
                    className="creating-job-services"
                  />
                )}
              </FormItem>
            </div>
          </Row>
          {this.props.currentScreen === 1 && (
            <Devices sizes={[DESKTOP, TABLET]}>
              <NobulTip
                message={translate(this.props.intl, "toolTipTitle")}
                description={translate(
                  this.props.intl,
                  "createBuyJob.propertyServicesRangeTip"
                )}
                visible={true}
              />
            </Devices>
          )}
          <div className="buy-job-step4-footer">
            <FormItem>
              <div
                className={
                  this.props.currentScreen === 1
                    ? "buy-job-step4-buttons step-one"
                    : "buy-job-step4-buttons"
                }
              >
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
                <Button type="primary" size="large" htmlType="submit">
                  {translate(intl, "button.next")}
                </Button>
              </div>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(CreateBuyJobStep4);
