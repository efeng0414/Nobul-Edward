import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, InputNumber } from "antd";
import { translate } from "../../../utilities/locale";
import "./styles.scss";
import { bound } from "class-bind";

class Commission extends Component {
  static propTypes = {
    form: PropTypes.any,
    description: PropTypes.string,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    layout: PropTypes.object,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
  };

  static defaultProps = {
    form: {},
    required: false,
    layout: {},
    step: 0.1,
    min: 0,
    max: 9.9
  };

  @bound
  checkCheckBox(_, commission, callback) {
    if (
      commission === undefined ||
      commission === null ||
      commission < this.props.min ||
      commission > this.props.max
    ) {
      const { intl } = this.props;
      callback(
        translate(intl, `error.enterValueBetween`, {
          min: this.props.min,
          max: this.props.max
        })
      );
    } else {
      callback();
    }
  }

  render() {
    const { form = {}, label, name, description, step, min, max } = this.props;
    const { getFieldDecorator } = form;
    const FormItem = Form.Item;
    return (
      <FormItem label={label} extra={description}>
        {getFieldDecorator(name, {
          rules: [{ validator: this.checkCheckBox }]
        })(
          <InputNumber
            min={min}
            max={max}
            step={step}
            formatter={value => `${value}%`}
            parser={value => value.replace("%", "")}
            className="form-field-commission"
          />
        )}
      </FormItem>
    );
  }
}

export default injectIntl(Commission);
