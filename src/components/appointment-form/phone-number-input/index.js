import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
import { intlShape, injectIntl } from "react-intl";

import { AppointmentFormFieldKeys } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import PrefixSelector from "../../prefix-selector";

class PhoneNumberInput extends Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    intl: intlShape.isRequired
  };

  render() {
    const prefixSelector = this.props.getFieldDecorator(
      AppointmentFormFieldKeys.PHONE_NUMBER_PREFIX,
      { initialValue: "1" }
    )(<PrefixSelector />);

    return (
      <Form.Item
        label={translate(this.props.intl, "appointmentForm.phoneInput.label")}
      >
        {this.props.getFieldDecorator(AppointmentFormFieldKeys.PHONE_NUMBER, {
          defaultValue: "",
          rules: [
            {
              required: true,
              message: translate(
                this.props.intl,
                "appointmentForm.phoneInput.validationMessage"
              )
            }
          ]
        })(<Input addonBefore={prefixSelector} />)}
      </Form.Item>
    );
  }
}

export default injectIntl(PhoneNumberInput);
