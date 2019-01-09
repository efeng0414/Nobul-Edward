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
class PasswordConfirmField extends Component {
  state = {
    showPassword: false
  };

  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    layout: PropTypes.object,
    name: PropTypes.string,
    labelKey: PropTypes.string,
    messageKey: PropTypes.string,
    comparedFieldName: PropTypes.string
  };

  static defaultProps = {
    form: {},
    layout: {},
    name: "passwordConfirm",
    comparedFieldName: "password",
    labelKey: "password",
    messageKey: "password"
  };

  @bound
  showPassword() {
    const showPassword = !this.state.showPassword;
    this.setState({ showPassword });
  }

  @bound
  validateConfirm(rule, value, callback) {
    const comparedFieldValue = this.props.form.getFieldValue(
      this.props.comparedFieldName
    );

    if (value && comparedFieldValue && value !== comparedFieldValue) {
      callback(
        translate(this.props.intl, `error.${this.props.messageKey}Unmatch`)
      );
    } else if (
      value &&
      value === comparedFieldValue &&
      value.length >= minPasswordLength &&
      value.length <= maxPasswordLength
    ) {
      this.props.form.setFields({
        [this.props.comparedFieldName]: {
          value: comparedFieldValue,
          errors: null
        }
      });
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
        label={translate(intl, "passwordConfirm")}
        validateFirst
      >
        {getFieldDecorator(this.props.name, {
          rules: [
            {
              required: true,
              whitespace: true,
              message: translate(
                this.props.intl,
                `error.${this.props.messageKey}Unmatch`
              )
            },
            {
              validator: this.validateConfirm
            }
          ]
        })(
          <Input
            type={inputType}
            suffix={<Icon type="eye" onClick={this.showPassword} />}
          />
        )}
      </FormItem>
    );
  }
}

export default injectIntl(PasswordConfirmField);
