import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { Button, message } from "antd";
import Header from "../header";
import { bound } from "class-bind";

import { translate } from "../../../utilities/locale";
import { WHITE_NOBUL_LOGO } from "../../../utilities/images";
import "./styles.scss";
import "../styles.scss";
import "../../forms/common/styles.scss";
import { gtmEvent } from "../../../utilities/gtm-event";
import { AGENT_SIGN_UP_STEP3 } from "../../../utilities/google-tag-variable";

@injectIntl
class RegistrationAgentVerification extends Component {
  static propTypes = {
    resendEmailVerification: PropTypes.func.isRequired,
    verificationEmailResent: PropTypes.bool,
    currentUser: PropTypes.object,
    clearResendVerificationStatus: PropTypes.func.isRequired,
    reloadUser: PropTypes.func.isRequired,
    isEmailVerified: PropTypes.bool,
    isFirstTimeRegistration: PropTypes.bool,
    history: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    error: PropTypes.object,
    goBackToHomePage: PropTypes.func.isRequired,
    goPreviousStep: PropTypes.func.isRequired,
    hasLicenceData: PropTypes.bool.isRequired
  };

  state = {
    showResendPrompt: false
  };

  componentDidMount() {
    this.props.reloadUser();
    message.config({
      maxCount: 1
    });
  }

  @bound
  checkForVerification() {
    this.props
      .reloadUser()
      .then(
        () =>
          !this.props.isEmailVerified &&
          message.error(
            translate(this.props.intl, "consumer.resend_email_prompt")
          )
      );
  }

  componentDidUpdate(prevProps) {
    const preError = Object.keys(prevProps.error).length > 0;
    const currentError = Object.keys(this.props.error).length > 0;

    !preError &&
      currentError &&
      message.error(translate(this.props.intl, "consumer.resend_email_error"));

    if (this.props.verificationEmailResent) {
      message.destroy();
      message.success(
        translate(this.props.intl, "consumer.resend_email_success")
      ) && this.props.clearResendVerificationStatus();
    }

    if (this.props.isEmailVerified) {
      gtmEvent({
        name: AGENT_SIGN_UP_STEP3
      });
      message.destroy();
      this.props.goBackToHomePage();
    }
  }

  render() {
    return (
      <div className="agent-registration">
        <div className="agent-registration-img agent-registration-img-step3">
          <img className="agent-registration-logo" src={WHITE_NOBUL_LOGO} />
        </div>

        <div className="agent-registration-form agent-registration-form-step3 registration-container">
          <Header
            currentStep={2}
            title={translate(this.props.intl, "agent.createProfile")}
          />
          <div className="agent-registration-form-step3-copy">
            <h2>{translate(this.props.intl, "agent.verifyEmailTitle")}</h2>
            <p>{translate(this.props.intl, "agent.thankyou")}</p>
            <p>{translate(this.props.intl, "agent.verifyEmail")}</p>
            <button
              className="resend-email"
              onClick={this.props.resendEmailVerification}
            >
              {translate(this.props.intl, "consumer.resend_email")}
            </button>
          </div>
          <div className="agent-registration-form__step-3__button-container">
            {!this.props.hasLicenceData && (
              <Button
                className="agent-registration-form__step-3__button"
                type="primary"
                onClick={this.props.goPreviousStep}
              >
                {translate(this.props.intl, "button.back")}
              </Button>
            )}
            <Button
              className="agent-registration-form__step-3__button agent-registration-form__step-3__button--finish"
              type="primary"
              htmlType="submit"
              size="large"
              onClick={this.checkForVerification}
            >
              {translate(this.props.intl, "button.finish")}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationAgentVerification;
