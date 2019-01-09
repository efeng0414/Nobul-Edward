import React, { Component } from "react";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { Input, Form } from "antd";
import { bound } from "class-bind";
import Filter from "bad-words";

import { translate } from "../../../utilities/locale";
import { CONSTRAINTS } from "./constraints";

const filter = new Filter();
const FormItem = Form.Item;

@injectIntl
class TextAreaField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    className: PropTypes.string,
    initialValue: PropTypes.any,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    rows: PropTypes.number,
    maxLength: PropTypes.number,
    child: PropTypes.any,
    form: PropTypes.any.isRequired,
    isTextArea: PropTypes.bool,
    isRequired: PropTypes.bool,
    fieldLayout: PropTypes.object
  };

  static defaultProps = {
    className: "",
    initialValue: null,
    id: "",
    label: "",
    rows: 4,
    maxLength: 100,
    form: {},
    isTextArea: true,
    isRequired: true,
    fieldLayout: {}
  };

  @bound
  checkCustomConstraints(rule, value, callback) {
    for (let index in CONSTRAINTS) {
      const comparingRegrex = new RegExp(CONSTRAINTS[index].regrex);

      if (value.match(comparingRegrex)) {
        return callback(translate(this.props.intl, CONSTRAINTS[index].locale));
      }
    }

    callback();
  }

  @bound
  checkBadWords(rule, value, callback) {
    const cleanContent = filter.clean(value);

    this.props.form.setFieldsValue({ [this.props.id]: cleanContent });

    callback();
  }

  render() {
    const {
      label,
      className,
      form,
      id,
      initialValue,
      intl,
      maxLength,
      rows,
      child,
      isTextArea,
      isRequired,
      fieldLayout
    } = this.props;

    const getFieldDecoratorOptions = {
      initialValue: initialValue,
      validateTrigger: ["onBlur"],
      validateFirst: true,
      rules: [
        {
          validator: this.checkCustomConstraints
        },
        {
          validator: this.checkBadWords
        }
      ]
    };

    if (isRequired) {
      getFieldDecoratorOptions.rules.push({
        required: true,
        whitespace: true,
        message: translate(intl, `error.${id}IsRequired`)
      });
    }

    return (
      <FormItem
        {...fieldLayout}
        colon={false}
        label={label}
        className={className}
      >
        {isTextArea
          ? form.getFieldDecorator(id, getFieldDecoratorOptions)(
              <Input.TextArea maxLength={maxLength} rows={rows} />
            )
          : form.getFieldDecorator(id, getFieldDecoratorOptions)(
              <Input maxLength={maxLength} />
            )}
        {child}
      </FormItem>
    );
  }
}

export default TextAreaField;
