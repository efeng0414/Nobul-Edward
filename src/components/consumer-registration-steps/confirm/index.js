import React, { Component } from "react";
import { Form, Button, message } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { injectIntl, intlShape } from "react-intl";

import { translate } from "../../../utilities/locale";
import {
  CONUMER_REGISTRATION_STEP3_TITLE,
  CONUMER_REGISTRATION_STEP3_LINE1,
  CONUMER_REGISTRATION_STEP3_LINE2
} from "../../../utilities/constants";
import { WHITE_NOBUL_LOGO } from "../../../utilities/images";
import { gtmEvent } from "../../../utilities/gtm-event";
import { CONSUMER_SIGN_UP_DONE } from "../../../utilities/google-tag-variable";

@injectIntl
class ConsumerRegistrationConfirm extends Component {
  state = {};

  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object,
    goBackToHomePage: PropTypes.func.isRequired,
    resendEmailVerification: PropTypes.func.isRequired,
    verificationEmailResent: PropTypes.bool,
    error: PropTypes.object,
    currentUser: PropTypes.object,
    clearResendVerificationStatus: PropTypes.func.isRequired,
    reloadUser: PropTypes.func.isRequired,
    isEmailVerified: PropTypes.bool,
    isFirstTimeRegistration: PropTypes.bool,
    contractToBrokerage: PropTypes.bool,
    isReloadingUser: PropTypes.bool
  };

  static defaultProps = {
    isReloadingUser: false
  };

  componentDidMount() {
    if (!this.props.contractToBrokerage) this.props.reloadUser();
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

    this.props.verificationEmailResent &&
      message.success(
        translate(this.props.intl, "consumer.resend_email_success")
      ) &&
      this.props.clearResendVerificationStatus();

    if (this.props.isEmailVerified) {
      gtmEvent({
        name: CONSUMER_SIGN_UP_DONE
      });
      message.destroy();
      this.props.goBackToHomePage();
    }
  }

  @bound
  registrationDone() {
    if (this.props.contractToBrokerage) {
      this.props.goBackToHomePage();
    } else {
      this.props.reloadUser().then(authUser => {
        if (!authUser.emailVerified) {
          message.destroy();
          message.error(translate(this.props.intl, "error.userNotVerified"));
        } else {
          message.destroy();
        }
      });
    }
  }

  @bound
  chooseText() {
    if (this.props.contractToBrokerage) return 0;
    else if (this.props.isFirstTimeRegistration) return 1;
    else return 2;
  }

  render() {
    return (
      <div className="consumer-registration">
        <div className="consumer-registration-img consumer-registration-img-3">
          <img className="consumer-registration-logo" src={WHITE_NOBUL_LOGO} />
        </div>

        <div className="consumer-registration-form consumer-registration-form--step3 registration-container">
          <div className="consumer-registration-final-step-title">
            <h3 className="consumer-registration-head-title">
              {translate(
                this.props.intl,
                CONUMER_REGISTRATION_STEP3_TITLE[this.chooseText()]
              )}
            </h3>
            <p className="consumer-registration-paragraph">
              {translate(
                this.props.intl,
                CONUMER_REGISTRATION_STEP3_LINE1[this.chooseText()]
              )}
            </p>
            <p className="consumer-registration-paragraph">
              {translate(
                this.props.intl,
                CONUMER_REGISTRATION_STEP3_LINE2[this.chooseText()]
              )}
            </p>

            {this.props.contractToBrokerage && (
              <p className="consumer-registration-paragraph">
                {translate(
                  this.props.intl,
                  "consumer.contract_to_brokerage_line3"
                )}
              </p>
            )}

            {this.props.contractToBrokerage && (
              <p className="consumer-registration-paragraph">
                {translate(
                  this.props.intl,
                  "consumer.contract_to_brokerage_line4"
                )}
                <a
                  href="https://wp.nobul.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {translate(
                    this.props.intl,
                    "consumer.contract_to_brokerage_help"
                  )}
                </a>
              </p>
            )}
          </div>

          {!this.props.contractToBrokerage ? (
            <div className="consumer-registraion-resend-email-verification">
              <a
                className="consumer-registration-resend-email-link"
                onClick={this.props.resendEmailVerification}
              >
                {translate(this.props.intl, "consumer.resend_email")}
              </a>
            </div>
          ) : null}

          <div className="consumer-registration-final-button ">
            <Button
              disabled={this.props.isReloadingUser}
              onClick={this.registrationDone}
              className="consumer-registration-big-button googletag-consumer-signup-step-3"
              type="primary"
            >
              {translate(
                this.props.intl,
                this.props.contractToBrokerage ? "button.done" : "button.finish"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(ConsumerRegistrationConfirm);
