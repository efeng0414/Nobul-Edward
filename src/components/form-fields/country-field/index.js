import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, Select } from "antd";
import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import { objectIsEmpty } from "../../../../core/utilities/misc";

import { COUNTRIES } from "../../../../core/data/countries";

const FormItem = Form.Item;
const Option = Select.Option;
class CountryField extends Component {
  static propTypes = {
    form: PropTypes.any,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    layout: PropTypes.object,
    name: PropTypes.string,
    initialValue: PropTypes.string,
    labelKey: PropTypes.string,
    messageKey: PropTypes.string
  };

  static defaultProps = {
    form: {},
    required: false,
    layout: {},
    name: "country",
    labelKey: "country",
    messageKey: "country",
    initialValue: ""
  };

  render() {
    const fieldLayout = objectIsEmpty(this.props.layout)
      ? this.props.layout
      : getFormLayout();
    return (
      <FormItem
        {...fieldLayout}
        label={translate(this.props.intl, this.props.labelKey)}
        hasFeedback
      >
        {this.props.form.getFieldDecorator(this.props.name, {
          initialValue: this.props.initialValue,
          rules: [
            {
              required: this.props.required,
              message: translate(
                this.props.intl,
                `error.${this.props.messageKey}IsRequired`
              )
            }
          ]
        })(
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {COUNTRIES.map(country => (
              <Option key={country.code} value={country.code}>
                {country.label}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default injectIntl(CountryField);
