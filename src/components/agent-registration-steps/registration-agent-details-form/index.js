import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import Header from "../header";

import { translate } from "../../../utilities/locale";
import { WHITE_NOBUL_LOGO } from "../../../utilities/images";
import Desktop from "../../../components/breakpoints/desktop";

import RegistrationPersonalDetailsForm from "../../forms/common/registration-personal-details-form";

import "./styles.scss";
import "../styles.scss";
import "../../forms/common/styles.scss";
import { AGENT_SIGN_UP_STEP1 } from "../../../utilities/google-tag-variable";

@injectIntl
class RegistrationAgentDetailsForm extends Component {
  static propTypes = {
    form: PropTypes.any,
    setFields: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    signUpValues: PropTypes.object,
    hasLicenceData: PropTypes.bool.isRequired,
    goNextStep: PropTypes.func.isRequired
  };

  static defaultProps = {
    form: {},
    signUpValues: {}
  };

  @bound
  onValidSubmit(values) {
    this.props.setFields({ profile: values }, this.props.handleSubmit);
  }

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

  render() {
    return (
      <div className="agent-registration">
        <Desktop>
          <div className="agent-registration-img agent-registration-img-step1">
            <img className="agent-registration-logo" src={WHITE_NOBUL_LOGO} />
          </div>
        </Desktop>
        <div className="agent-registration-form agent-registration-form-step1 registration-container">
          <Header
            currentStep={0}
            title={translate(this.props.intl, "agent.createProfile")}
          />
          <RegistrationPersonalDetailsForm
            onValidSubmit={this.onValidSubmit}
            signUpValues={this.props.signUpValues.profile}
            googleEvent={AGENT_SIGN_UP_STEP1}
          />
        </div>
      </div>
    );
  }
}

export default RegistrationAgentDetailsForm;
