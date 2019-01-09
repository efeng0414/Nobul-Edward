import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, Button, Row } from "antd";
import { bound } from "class-bind";

import Desktop from "../../breakpoints/desktop";
import Devices from "../../breakpoints/devices";
import { MOBILE, TABLET } from "../../../../core/constants/breakpoints";
import { translate } from "../../../utilities/locale";
import ServiceRangePicker from "../../../components/service-range-picker";
import Services from "../../../components/services";
import {
  SERVICES_RANGE,
  SERVICES_EXACT,
  SELL
} from "../../../../core/constants/shared";
import NobulTip from "../../nobul-tip";
import { SERVICES_GROUPS } from "../../../utilities/constants";

import "./styles.scss";

const FormItem = Form.Item;

class CreateSellJobStep4 extends PureComponent {
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
    const fieldToValidate = [SERVICES_RANGE, SERVICES_EXACT];

    e.preventDefault();
    validateFieldsAndScroll(fieldToValidate, (err, values) => {
      !err && handleNextStep(values);
    });
  }

  @bound
  setServicesRange(value) {
    this.props.form.setFieldsValue({ [SERVICES_RANGE]: value });
  }

  @bound
  setExactServices(value) {
    this.props.form.setFieldsValue({ [SERVICES_EXACT]: value });
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
    const { intl, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="sell-job-step4">
        <Form onSubmit={this.onNextClick}>
          <Row>
            <div className={this.getClassName(1)}>
              <h1>{translate(intl, "sell.servicesRange")}</h1>
              <div className="service-range-container">
                <FormItem>
                  {getFieldDecorator(SERVICES_RANGE)(
                    <ServiceRangePicker
                      minVal={1}
                      maxVal={5}
                      defaultVal={this.props.fields[SERVICES_RANGE] || 3}
                      onChange={this.setServicesRange}
                      intl={this.props.intl}
                      showMiddleLabel={false}
                      labelKey={"seller"}
                    />
                  )}
                </FormItem>
              </div>
            </div>
            <Desktop>
              <div className={this.getClassName(2)}>
                <h1>{translate(intl, "sell.exactServices")}</h1>
                <FormItem>
                  {this.props.form.getFieldDecorator(SERVICES_EXACT, {
                    rules: [
                      {
                        required: false
                      }
                    ]
                  })(
                    <Services
                      serviceType={SELL}
                      layout={SERVICES_GROUPS}
                      selectedServices={this.props.fields[SERVICES_EXACT]}
                      onServiceClick={this.setExactServices}
                      className="creating-job-services"
                    />
                  )}
                </FormItem>
              </div>
            </Desktop>
          </Row>
          {this.props.currentScreen === 1 && (
            <NobulTip
              message={translate(intl, "toolTipTitle")}
              description={[
                translate(intl, "createBuyJob.propertyServicesRangeTip")
              ]}
              visible
            />
          )}
          <Devices sizes={[MOBILE, TABLET]}>
            <div className={this.getClassName(2)}>
              <div>
                <h1>{translate(intl, "sell.exactServices")}</h1>
                <FormItem>
                  {this.props.form.getFieldDecorator(SERVICES_EXACT, {
                    rules: [
                      {
                        required: false
                      }
                    ]
                  })(
                    <Services
                      serviceType={SELL}
                      layout={SERVICES_GROUPS}
                      selectedServices={this.props.fields[SERVICES_EXACT]}
                      onServiceClick={this.setExactServices}
                      className="creating-job-services"
                    />
                  )}
                </FormItem>
              </div>
            </div>
          </Devices>
          <FormItem>
            <div
              className={
                this.props.currentScreen === 1
                  ? "sell-job-step4-buttons step-one"
                  : "sell-job-step4-buttons"
              }
            >
              <Button
                size={
                  this.props.currentBreakPoint === MOBILE ? "large" : undefined
                }
                onClick={this.props.handlePreviousStep}
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

export default Form.create()(CreateSellJobStep4);
