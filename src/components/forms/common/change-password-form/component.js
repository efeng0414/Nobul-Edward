import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";

import PasswordField from "../../../form-fields/password-field";
import PasswordConfirmField from "../../../form-fields/password-confirm-field";

import { translate } from "../../../../utilities/locale";
import "./styles.scss";

const FormItem = Form.Item;

@injectIntl
@Form.create({})
class ChangePasswordForm extends Component {
  state = {
    invalidCurrentPassword: false,
    passwordUpdated: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    updatePassword: PropTypes.func.isRequired,
    onDoneClick: PropTypes.func.isRequired,
    userError: PropTypes.object.isRequired,
    form: PropTypes.any
  };

  static defaultProps = {
    form: {}
  };

  @bound
  setInvalidCurrentPassword(isValid) {
    this.setState({
      invalidCurrentPassword: isValid
    });
  }

  @bound
  handleSubmit() {
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { currentPassword, newPassword } = values;
        this.props.updatePassword(currentPassword, newPassword).then(() => {
          const errorMessage = this.props.userError.message;

          if (errorMessage) {
            this.setInvalidCurrentPassword(true);
          } else {
            this.setInvalidCurrentPassword(false);
            this.setState({
              passwordUpdated: true
            });
          }
        });
      }
    });
  }

  @bound
  handleDoneClick() {
    this.setState({ passwordUpdated: false }, () => {
      this.props.onDoneClick();
    });
  }

  render() {
    return (
      <div>
        {!this.state.passwordUpdated && (
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {this.state.invalidCurrentPassword && (
              <Row className="error-message">Invalid current password</Row>
            )}
            <PasswordField
              required
              name={"currentPassword"}
              labelKey={"currentPassword"}
              form={this.props.form}
            />

            <PasswordField
              required
              name={"newPassword"}
              labelKey={"newPassword"}
              form={this.props.form}
              comparedFieldName={"confirmNewPassword"}
            />

            <PasswordConfirmField
              required
              name={"confirmNewPassword"}
              comparedFieldName={"newPassword"}
              form={this.props.form}
            />

            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>
                {translate(this.props.intl, "change")}
              </Button>
            </FormItem>
          </Form>
        )}
        {this.state.passwordUpdated && (
          <div>
            <p>You have successfully changed your password.</p>
            <Button type="primary" onClick={this.handleDoneClick}>
              {translate(this.props.intl, "button.done")}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ChangePasswordForm;
