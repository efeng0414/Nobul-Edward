import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, Input } from "antd";
import { bound } from "class-bind";
import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import { objectIsEmpty } from "../../../../core/utilities/misc";
import { checkIfEmailExists } from "../../../../core/firebase/users";

const FormItem = Form.Item;
class EmailField extends Component {
  timer = false;
  validationCallback = false;

  static propTypes = {
    form: PropTypes.any,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.object,
    checkIfEmailUnique: PropTypes.bool
  };

  static defaultProps = {
    form: {},
    required: false,
    name: "email",
    label: "email",
    layout: {},
    checkIfEmailUnique: false
  };

  @bound
  checkIfEmailUnique(rule, value, callback) {
    if (!value || !this.props.checkIfEmailUnique) {
      callback();
      return;
    }

    this.validationCallback = callback;

    checkIfEmailExists(value).then(e => {
      if (e.length > 0) {
        callback(translate(this.props.intl, "error.emailNotUnique"));
        return;
      }
      callback();
    });
  }

  @bound
  setShowError() {
    this.validationCallback && this.validationCallback();
  }

  @bound
  keypress() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.setShowError, 1000);
  }

  render() {
    const fieldLayout = objectIsEmpty(this.props.layout)
      ? this.props.layout
      : getFormLayout();
    return (
      <FormItem
        {...fieldLayout}
        label={translate(this.props.intl, this.props.label)}
        hasFeedback
      >
        {this.props.form.getFieldDecorator(this.props.name, {
          normalize: value => value && value.replace(" ", ""),
          rules: [
            {
              type: "email",
              message: translate(this.props.intl, "error.emailIsInvalid")
            },
            {
              required: this.props.required,
              message: translate(this.props.intl, "error.emailIsRequired")
            },
            {
              validator: this.checkIfEmailUnique
            }
          ]
        })(<Input onKeyDown={this.keypress} />)}
      </FormItem>
    );
  }
}

export default injectIntl(EmailField);
