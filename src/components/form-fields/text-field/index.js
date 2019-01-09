import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { injectIntl, intlShape } from "react-intl";
import { Form, Input } from "antd";
import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import { objectIsEmpty } from "../../../../core/utilities/misc";

class TextField extends Component {
  static propTypes = {
    form: PropTypes.any,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    label: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    layout: PropTypes.object,
    hasFeedback: PropTypes.bool,
    initialValue: PropTypes.string,
    className: PropTypes.string,
    whiteSpace: PropTypes.bool
  };

  static defaultProps = {
    form: {},
    required: false,
    layout: {},
    hasFeedback: true,
    initialValue: "",
    className: "",
    whiteSpace: true
  };

  @bound
  normalize(value, preValue, allValues) {
    if (!this.props.whiteSpace && preValue && !preValue.trim().length) {
      return preValue.trim();
    }

    return value;
  }

  render() {
    const { intl, form = {}, required, label, name, hasFeedback } = this.props;
    const { getFieldDecorator } = form;
    const FormItem = Form.Item;
    const fieldLayout = objectIsEmpty(this.props.layout)
      ? this.props.layout
      : getFormLayout();
    return (
      <FormItem
        {...fieldLayout}
        label={label}
        hasFeedback={hasFeedback}
        className={this.props.className}
      >
        {getFieldDecorator(name, {
          initialValue: this.props.initialValue,
          normalize: this.normalize,
          rules: [
            {
              required: required,
              whitespace: true,
              message: translate(intl, `error.${name}IsRequired`)
            }
          ]
        })(<Input />)}
      </FormItem>
    );
  }
}

export default injectIntl(TextField);
