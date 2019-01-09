import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Button, Form, Checkbox } from "antd";
import { bound } from "class-bind";

import PersonalForm from "../personal-form";

import { translate } from "../../../../utilities/locale";
import { gtmEvent } from "../../../../utilities/gtm-event";

import TermsAndConditions from "../../../signup-terms-and-conditions";
import ConsentForNews from "../../../consent-for-news";

import "./styles.scss";
import { Row, Col } from "antd";
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

@injectIntl
@Form.create({})
class RegistrationPersonalDetailsForm extends Component {
  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    onValidSubmit: PropTypes.func.isRequired,
    nextPage: PropTypes.func,
    signUpValues: PropTypes.object,
    googleEvent: PropTypes.string.isRequired,
    shortForm: PropTypes.bool
  };

  static defaultProps = {
    form: {},
    shortForm: false,
    googleEvent: ""
  };

  componentDidMount() {
    const { form = {}, signUpValues = {} } = this.props;
    const {
      email = "",
      firstName = "",
      lastName = "",
      password = "",
      passwordConfirm = "",
      phone = "",
      phonePrefix = ""
    } = signUpValues;
    form.setFieldsValue({
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phonePrefix: phonePrefix || "",
      phone: phone || "",
      password: password || "",
      passwordConfirm: passwordConfirm || ""
    });
  }

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        gtmEvent({
          name: this.props.googleEvent
        });
        this.props.onValidSubmit(values);
      }
    });
  }

  @bound
  checkCheckBox(rule, value, callback) {
    if (!value || value.indexOf("agreeToTerms") === -1) {
      callback(translate(this.props.intl, "error.agreeTermsOfUse"));
    } else {
      callback();
    }
  }

  render() {
    return (
      <Form
        className="registration-form"
        layout="horizontal"
        onSubmit={this.handleSubmit}
      >
        <PersonalForm
          intl={this.props.intl}
          form={this.props.form}
          signUpValues={this.props.signUpValues}
        />

        <div className="registration-marketing">
          <FormItem className="registration-marketing__form">
            {this.props.form.getFieldDecorator("marketingArrayOfValues", {
              valuePropName: "checked",
              rules: [{ validator: this.checkCheckBox }]
            })(
              <CheckboxGroup className="registration-marketing__form-terms-consent">
                <Checkbox value="agreeToTerms">
                  <TermsAndConditions intl={this.props.intl} />
                </Checkbox>
                <Checkbox value="consentForNews">
                  <ConsentForNews intl={this.props.intl} />
                </Checkbox>
              </CheckboxGroup>
            )}
          </FormItem>
        </div>
        <FormItem>
          <Row type="flex" justify="center">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="registration-form__continue-button"
              >
                {translate(this.props.intl, "button.signUp")}
              </Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default RegistrationPersonalDetailsForm;
