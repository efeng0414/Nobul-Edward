import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";

import PasswordField from "../../form-fields/password-field";
import PasswordConfirmField from "../../form-fields/password-confirm-field";

import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";

const FormItem = Form.Item;

@injectIntl
class ChangePassword extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    updatePassword: PropTypes.func,
    form: PropTypes.any
  };

  @bound
  handleSubmit(e) {
    const { validateFieldsAndScroll } = this.props.form;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { currentPassword, newPassword } = values;
        this.props.updatePassword(currentPassword, newPassword);
      }
    });
  }

  render() {
    const { intl, form = {} } = this.props;
    const paddedFieldLayout = getFormLayout(true);

    return (
      <div>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <PasswordField
            required
            name={"currentPassword"}
            labelKey={"currentPassword"}
            form={form}
          />

          <PasswordField
            required
            name={"newPassword"}
            labelKey={"newPassword"}
            form={form}
          />

          <PasswordConfirmField
            required
            name={"confirmNewPassword"}
            comparedFieldName={"newPassword"}
            form={form}
          />

          <FormItem {...paddedFieldLayout}>
            <Button type="primary" htmlType="submit">
              {translate(intl, "button.submit")}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ChangePassword);
