import React, { PureComponent } from "react";
import { Form, Button } from "antd";
import { translate } from "../../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";

import TextAreaField from "../../form-fields/textarea-field";
import { MOBILE } from "../../../../core/constants/breakpoints";
import { DESCRIPTION } from "../../../../core/constants/shared";
import "./styles.scss";

class CreateBuyJobStep5 extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    handleNextStep: PropTypes.func,
    handlePreviousStep: PropTypes.func,
    intl: intlShape.isRequired,
    gtmClassName: PropTypes.string.isRequired,
    currentBreakPoint: PropTypes.string
  };

  static defaultProps = {
    form: {},
    handleNextStep: () => {},
    handlePreviousStep: () => {}
  };

  @bound
  onNextClick(e) {
    const { handleNextStep, form } = this.props;
    const { validateFieldsAndScroll } = form;
    const fieldToValidate = [DESCRIPTION];
    fieldToValidate.push(DESCRIPTION);

    e.preventDefault();
    validateFieldsAndScroll(fieldToValidate, (err, values) => {
      if (!err) {
        handleNextStep(values);
      }
    });
  }

  render() {
    const { intl, form, handlePreviousStep } = this.props;
    const FormItem = Form.Item;
    return (
      <div className="buy-job-step5">
        <h1>{translate(intl, "createBuyJob.anythingElse.title")}</h1>
        <Form onSubmit={this.onNextClick}>
          <TextAreaField
            form={form}
            intl={intl}
            id={DESCRIPTION}
            rows={7}
            isRequired={false}
            isTextArea
          />
          <FormItem>
            <div className="buy-job-step5-buttons">
              <Button
                size={
                  this.props.currentBreakPoint === MOBILE ? "large" : undefined
                }
                onClick={handlePreviousStep}
              >
                {translate(intl, "button.back")}
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className={this.props.gtmClassName}
              >
                {translate(intl, "button.save")}
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(injectIntl(CreateBuyJobStep5));
