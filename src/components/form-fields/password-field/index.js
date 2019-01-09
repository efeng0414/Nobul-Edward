import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, Input, Icon } from "antd";
import { bound } from "class-bind";
import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import {
  minPasswordLength,
  maxPasswordLength
} from "../../../utilities/constants";
import { objectIsEmpty } from "../../../../core/utilities/misc";

const FormItem = Form.Item;

class PasswordField extends Component {
  state = {
    isDirty: false,
    showPassword: false,
    value: ""
  };

  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    layout: PropTypes.object,
    name: PropTypes.string,
    labelKey: PropTypes.string,
    messageKey: PropTypes.string,
    comparedFieldName: PropTypes.string,
    withoutConfirm: PropTypes.bool
  };

  static defaultProps = {
    form: {},
    layout: {},
    name: "password",
    labelKey: "password",
    messageKey: "password",
    comparedFieldName: "passwordConfirm",
    withoutConfirm: false
  };

  @bound
  showPassword() {
    const showPassword = !this.state.showPassword;
    this.setState({ showPassword });
  }

  @bound
  handleOnBlur() {
    this.setState({
      isDirty: true
    });
  }

  @bound
  handleChange(e) {
    e.target.value &&
      this.setState({
        value: e.target.value
      });
  }

  @bound
  validationTrigger() {
    if (this.state.value && !this.state.isDirty) return "onBlur";
    if (this.state.value || this.state.isDirty) return "onInput";
    return "onBlur";
  }

  @bound
  validateConfirm(rule, value, callback) {
    if (!this.props.withoutConfirm) {
      const comparedFieldValue = this.props.form.getFieldValue(
        this.props.comparedFieldName
      );

      if (value && value.length > 0 && value.length < minPasswordLength) {
        callback(
          translate(this.props.intl, `error.${this.props.messageKey}LengthMin`)
        );
      } else if (value && value.length > maxPasswordLength) {
        callback(
          translate(this.props.intl, `error.${this.props.messageKey}LengthMax`)
        );
      } else if (value && comparedFieldValue && value !== comparedFieldValue) {
        callback(
          translate(this.props.intl, `error.${this.props.messageKey}Unmatch`)
        );
      } else {
        this.props.form.setFields({
          [this.props.comparedFieldName]: {
            value: comparedFieldValue,
            errors: null
          }
        });
      }
    }

    callback();
  }

  render() {
    const { intl, form = {} } = this.props;
    const { getFieldDecorator } = form;
    const fieldLayout = objectIsEmpty(this.props.layout)
      ? this.props.layout
      : getFormLayout();
    const inputType = this.state.showPassword ? "text" : "password";
    return (
      <FormItem
        {...fieldLayout}
        label={translate(intl, this.props.labelKey)}
        hasFeedback={false}
      >
        {getFieldDecorator(this.props.name, {
          initialValue: null,
          validateTrigger: this.validationTrigger(),
          rules: [
            {
              required: true,
              whitespace: true,
              message: translate(
                intl,
                `error.${this.props.messageKey}IsRequired`
              )
            },
            {
              min: minPasswordLength,
              max: maxPasswordLength,
              validator: this.validateConfirm
            }
          ]
        })(
          <Input
            type={inputType}
            suffix={<Icon type="eye" onClick={this.showPassword} />}
            onBlur={this.handleOnBlur}
            onChange={this.handleChange}
          />
        )}
      </FormItem>
    );
  }
}

export default injectIntl(PasswordField);
