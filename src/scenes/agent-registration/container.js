import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { Icon } from "antd";
import { bound } from "class-bind";

import * as Routes from "../../routes/routes";

import { AGENT_USER_TYPE } from "../../../core/constants/users";
import { AGENT_REGISTRATION_STEPS } from "../../../core/constants/agents";

import ActivityIndicator from "../../components/activity-indicator";
import { translate } from "../../utilities/locale";

import RegistrationAgentDetailsForm from "../../components/agent-registration-steps/registration-agent-details-form";
import RegistrationAgentLicence from "../../components/agent-registration-steps/registration-agent-licence";
import RegistrationAgentVerification from "../../components/agent-registration-steps/registration-agent-verification";
import Desktop from "../../components/breakpoints/desktop";
import userLocation, {
  createLocationClasses
} from "../../utilities/user-location";
import { checkLicenceData } from "../../utilities/check-licence-data";

import "./styles.scss";

@injectIntl
@userLocation
class AgentRegistration extends Component {
  constructor(props) {
    super();
    const { state = {} } = props.history.location;
    const { step = 0 } = state;

    this.state = {
      confirmDirty: false,
      signUpValues: {},
      currentStep: step
    };
  }

  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.any,
    verification: PropTypes.object,
    history: PropTypes.object,
    signUpUser: PropTypes.func,
    userType: PropTypes.string,
    resendEmailVerification: PropTypes.func.isRequired,
    verificationEmailResent: PropTypes.bool,
    error: PropTypes.object,
    currentUser: PropTypes.object,
    clearResendVerificationStatus: PropTypes.func.isRequired,
    reloadUser: PropTypes.func.isRequired,
    isEmailVerified: PropTypes.bool,
    isFirstTimeRegistration: PropTypes.bool,
    isLoading: PropTypes.bool,
    userLocation: PropTypes.object.isRequired
  };

  @bound
  setFields(stepFields, callback = () => {}) {
    this.setState(
      {
        signUpValues: { ...this.state.signUpValues, ...stepFields },
        currentStep:
          this.state.currentStep < AGENT_REGISTRATION_STEPS.length - 1
            ? this.state.currentStep + 1
            : this.state.currentStep
      },
      callback
    );
    window.scroll(0, 0);
  }

  @bound
  submitFields() {
    const { signUpValues = {} } = this.state;
    const { profile = {} } = signUpValues;

    this.props.signUpUser(profile, AGENT_USER_TYPE, {
      ...signUpValues
    });
  }

  @bound
  goPreviousStep() {
    if (this.state.currentStep > 0) {
      this.setState({
        currentStep: this.state.currentStep - 1
      });
    }
    window.scroll(0, 0);
  }

  @bound
  goNextStep() {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
    window.scroll(0, 0);
  }

  @bound
  goBackToHomePage() {
    this.props.history.push(Routes.url.home);
  }

  componentDidUpdate() {
    if (this.props.currentUser.emailVerified) {
      this.props.history.push(Routes.url.home);
    }
  }

  render() {
    const { intl } = this.props;
    const { currentStep, signUpValues } = this.state;
    const locationClasses = createLocationClasses(this.props.userLocation);

    let Component = null;
    switch (currentStep) {
      case 0:
        Component = RegistrationAgentDetailsForm;
        break;
      case 1:
        Component = RegistrationAgentLicence;
        break;
      case 2:
        Component = RegistrationAgentVerification;
        break;
      default:
        Component = RegistrationAgentDetailsForm;
    }

    return (
      <ActivityIndicator spinning={this.props.isLoading} type="saving">
        <div className={`registration ${locationClasses.join(" ")}`}>
          <Helmet>
            <title>{translate(intl, "helmet.agentRegistration")}</title>
            <meta
              name="description"
              content={translate(intl, "helmet.agentRegistrationDescription")}
            />
          </Helmet>
          <Desktop>
            <Icon
              className="agent-registration-close"
              type="close"
              onClick={this.goBackToHomePage}
            />
          </Desktop>
          <div className="steps-content">
            <Component
              intl={intl}
              setFields={this.setFields}
              goPreviousStep={this.goPreviousStep}
              goNextStep={this.goNextStep}
              handleSubmit={this.submitFields}
              signUpValues={signUpValues}
              error={this.props.error}
              history={this.props.history}
              resendEmailVerification={this.props.resendEmailVerification}
              verificationEmailResent={this.props.verificationEmailResent}
              clearResendVerificationStatus={
                this.props.clearResendVerificationStatus
              }
              isEmailVerified={this.props.isEmailVerified}
              reloadUser={this.props.reloadUser}
              isFirstTimeRegistration={this.props.isFirstTimeRegistration}
              goBackToHomePage={this.goBackToHomePage}
              hasLicenceData={checkLicenceData({
                verification: this.props.verification
              })}
            />
          </div>
        </div>
      </ActivityIndicator>
    );
  }
}

export default AgentRegistration;
