import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, Input } from "antd";
import { getFormLayout } from "../../../utilities/forms";
import { objectIsEmpty } from "../../../../core/utilities/misc";
import { translate } from "../../../utilities/locale";
import {
  CA_POSTALCODE_PATTERN,
  US_ZIPCODE_PATTERN
} from "../../../../core/constants/shared";

const FormItem = Form.Item;
class PostalField extends Component {
  static propTypes = {
    form: PropTypes.any,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    country: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    layout: PropTypes.object
  };

  static defaultProps = {
    form: {},
    required: false,
    country: "",
    initialValue: "",
    layout: {}
  };

  state = {
    validPattern: CA_POSTALCODE_PATTERN,
    labelKey: "postalCode"
  };

  static getDerivedStateFromProps(props, state) {
    return {
      validPattern:
        props.country === "CA" || props.country === ""
          ? CA_POSTALCODE_PATTERN
          : US_ZIPCODE_PATTERN,
      labelKey:
        props.country === ""
          ? "postalOrZipCode"
          : props.country === "CA"
            ? "postalCode"
            : "zipCode"
    };
  }

  render() {
    const { intl, form = {}, required } = this.props;
    const { getFieldDecorator } = form;
    const fieldLayout = objectIsEmpty(this.props.layout)
      ? this.props.layout
      : getFormLayout();
    return (
      <FormItem
        {...fieldLayout}
        label={translate(intl, this.state.labelKey)}
        hasFeedback
      >
        {getFieldDecorator("postalOrZipCode", {
          initialValue: this.props.initialValue,
          rules: [
            {
              transform: value => value && value.replace(/\W+/g, "")
            },
            {
              required: required,
              message: translate(intl, `error.${this.state.labelKey}IsRequired`)
            },
            {
              pattern: this.state.validPattern,
              message: translate(intl, `error.${this.state.labelKey}IsInvalid`)
            }
          ]
        })(<Input />)}
      </FormItem>
    );
  }
}

export default injectIntl(PostalField);
