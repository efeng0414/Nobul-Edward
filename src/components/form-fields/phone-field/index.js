import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { injectIntl, intlShape } from "react-intl";
import { Form, Input } from "antd";
import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import { objectIsEmpty } from "../../../../core/utilities/misc";
import PrefixSelector from "../../prefix-selector";

import {
  PHONE_PATTERN,
  PHONE_MASK,
  DEFAULT_PREFIX
} from "../../../../core/constants/shared";

const FormItem = Form.Item;
class PhoneField extends Component {
  state = {
    prefix: DEFAULT_PREFIX
  };

  static propTypes = {
    form: PropTypes.any,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.object,
    initialValue: PropTypes.string
  };

  static defaultProps = {
    form: {},
    required: false,
    label: "",
    name: "phone",
    layout: {},
    initialValue: ""
  };

  @bound
  getPrefix(prefix) {
    this.setState({ prefix });
  }

  @bound
  addMask(value, prevValue, allValues) {
    const mask = PHONE_MASK[this.state.prefix];
    const maskedValue = [];
    if (!value || value.length === 0) return value;
    const inputValue = value.replace(/[^0-9]/g, "");
    for (let i = 0, j = 0; i < inputValue.length && j < mask.length; i++, j++) {
      let chatAtValue = inputValue.charAt(i);
      let charAtMask = mask.charAt(j);
      if (charAtMask === " ") {
        maskedValue.push(chatAtValue);
      } else {
        j++;
        maskedValue.push(charAtMask);
        j !== mask.length && maskedValue.push(chatAtValue);
      }
    }
    return maskedValue.toString().replace(/,/g, "");
  }

  render() {
    const { intl, form = {}, required, name, label } = this.props;
    const { getFieldDecorator } = form;
    const fieldLayout = objectIsEmpty(this.props.layout)
      ? this.props.layout
      : getFormLayout();

    const prefixSelector = getFieldDecorator("phonePrefix", {
      initialValue: "1"
    })(<PrefixSelector getPrefix={this.getPrefix} />);

    return (
      <FormItem {...fieldLayout} label={label} hasFeedback>
        {getFieldDecorator(name, {
          initialValue: this.props.initialValue,
          normalize: this.addMask,
          rules: [
            {
              required: required,
              message: translate(intl, "error.phoneIsRequired")
            },
            {
              pattern: PHONE_PATTERN[this.state.prefix],
              message: translate(intl, "error.phoneIsInvalid")
            }
          ]
        })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
      </FormItem>
    );
  }
}

export default injectIntl(PhoneField);
