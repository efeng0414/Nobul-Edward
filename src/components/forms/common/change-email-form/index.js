import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, Button, message } from "antd";
import { bound } from "class-bind";
import { translate } from "../../../../utilities/locale";
import EmailField from "../../../form-fields/email-field";
import PasswordField from "../../../form-fields/password-field";
import { formFields } from "./utilities";
import "./styles.scss";

@injectIntl
@Form.create({})
class ChangeEmailForm extends Component {
  static propTypes = {
    updateEmail: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    onDoneClick: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  @bound
  handleSubmit() {
    this.props.form.validateFieldsAndScroll((error, values) => {
      !error &&
        this.props
          .updateEmail({
            email: values[formFields.EMAIL],
            password: values[formFields.PASSWORD]
          })
          .then(() => {
            this.props.error.message
              ? message.error(this.props.error.message)
              : this.props.onDoneClick();
          });
    });
  }

  render() {
    return (
      <div className="change-email-form">
        <p className="change-email-form__prompt">
          {translate(this.props.intl, "changeEmailForm.prompt")}
        </p>
        <EmailField
          form={this.props.form}
          name={formFields.EMAIL}
          label="changeEmailForm.emailLabel"
          checkIfEmailUnique
          required
        />
        <PasswordField form={this.props.form} name={formFields.PASSWORD} />
        <div className="change-email-form__button-container">
          <Button type="primary" onClick={this.handleSubmit}>
            {translate(this.props.intl, "changeEmailForm.button")}
          </Button>
        </div>
      </div>
    );
  }
}

export default ChangeEmailForm;
