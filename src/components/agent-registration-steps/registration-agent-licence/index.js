import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import Header from "../header";
import { translate } from "../../../utilities/locale";
import { WHITE_NOBUL_LOGO } from "../../../utilities/images";

import LicenceForm from "../../forms/agent/licence-form";
import { AGENT_SIGN_UP_STEP2 } from "../../../utilities/google-tag-variable";
import * as Routes from "../../../routes/routes";

import "./styles.scss";

@injectIntl
@withRouter
class RegistrationAgentLicence extends Component {
  state = {
    isLoading: false
  };

  static propTypes = {
    setFields: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    goNextStep: PropTypes.func.isRequired,
    hasLicenceData: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    reloadUser: PropTypes.func.isRequired
  };

  checkVerificationStatusAndRedirect() {
    if (this.props.hasLicenceData) {
      this.props.goNextStep();
      return false;
    }

    return true;
  }

  componentDidMount() {
    this.checkVerificationStatusAndRedirect();
  }

  componentDidUpdate(prevProps) {
    prevProps.hasLicenceData !== this.props.hasLicenceData &&
      this.checkVerificationStatusAndRedirect();
  }

  @bound
  handleSuccessfulSubmit() {
    this.props.reloadUser().then(() => {
      this.props.history.push(Routes.url.home);
    });
  }

  render() {
    return (
      <div className="agent-registration">
        <div className="agent-registration-img agent-registration-img-step2">
          <img
            className="agent-registration-logo"
            alt="Nobul"
            src={WHITE_NOBUL_LOGO}
          />
        </div>

        <div className="agent-registration-form registration-container">
          <Header
            currentStep={1}
            title={translate(this.props.intl, "agent.createProfile")}
          />

          <LicenceForm
            afterSubmit={this.handleSuccessfulSubmit}
            GTM_EVENT={AGENT_SIGN_UP_STEP2}
            submitButtonText={translate(this.props.intl, "button.finish")}
            backButtonText={translate(this.props.intl, "button.skip")}
            backButtonFunction={this.props.goNextStep}
          />
        </div>
      </div>
    );
  }
}

export default RegistrationAgentLicence;
