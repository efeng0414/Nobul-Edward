import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, InputNumber } from "antd";
import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import { objectIsEmpty } from "../../../../core/utilities/misc";

class InputNumberField extends Component {
  static propTypes = {
    form: PropTypes.any,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    layout: PropTypes.object
  };

  static defaultProps = {
    form: {},
    required: false,
    layout: {}
  };

  render() {
    const { intl, form = {}, required, label, name } = this.props;
    const { getFieldDecorator } = form;
    const FormItem = Form.Item;
    const fieldLayout = objectIsEmpty(this.props.layout)
      ? this.props.layout
      : getFormLayout();
    return (
      <FormItem {...fieldLayout} label={label} hasFeedback>
        {getFieldDecorator(name, {
          rules: [
            {
              required: required,
              whitespace: true,
              message: translate(intl, `error.${name}IsRequired`)
            }
          ]
        })(<InputNumber step={0.25} />)}
      </FormItem>
    );
  }
}

export default injectIntl(InputNumberField);
