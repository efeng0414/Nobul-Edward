import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";

import { translate } from "../../utilities/locale";
import * as Routes from "../../routes/routes";
import { RegistrationStepMap } from "../../utilities/constants";
import { JOB_PENDING_CONFIRMATION } from "../../../core/constants/jobs";
import { objectIsEmpty } from "../../../core/utilities/misc";

import "./styles.scss";
import userLocation, {
  createLocationClasses
} from "../../utilities/user-location";
import Desktop from "../../components/breakpoints/desktop";
import { Icon } from "antd";
import { gtmEvent } from "../../utilities/gtm-event";
import {
  BUY_POSTING_CREATED_ANONYMOUS_POSTING_FLOW,
  SELL_POSTING_CREATED_ANONYMOUS_POSTING_FLOW,
  BUY_POSTING_CREATED_ANONYMOUS_PROPERTY_DETAILS
} from "../../utilities/google-tag-variable";

@injectIntl
@userLocation
class ConsumerRegistration extends Component {
  constructor(props) {
    super();

    const { state = {} } = props.history.location;
    const { step = 0 } = state;

    this.state = {
      step: step,
      totalStep: 2,
      signUpValues: {},
      contractToBrokerage: false,
      jobParams: state.jobParams,
      isJobSaved: false
    };
  }

  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object,
    signUpUser: PropTypes.func.isRequired,
    userType: PropTypes.string,
    error: PropTypes.object,
    location: PropTypes.object,
    resendEmailVerification: PropTypes.func.isRequired,
    verificationEmailResent: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    clearResendVerificationStatus: PropTypes.func.isRequired,
    reloadUser: PropTypes.func.isRequired,
    isEmailVerified: PropTypes.bool,
    isFirstTimeRegistration: PropTypes.bool,
    scroll: PropTypes.func,
    saveJob: PropTypes.func,
    userLocation: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    jobs: PropTypes.object
  };

  static defaultProps = {
    scroll: window.scroll
  };

  @bound
  onValidSubmit(value) {
    this.setState({ signUpValues: { ...this.state.signUpValues, ...value } });
    this.nextPage();
  }

  @bound
  nextPage({ scroll = this.props.scroll } = {}) {
    const step = (this.state.step + 1) % this.state.totalStep;
    this.setState({ step });
    scroll(0, 0);
  }

  @bound
  previousPage(value, { scroll = this.props.scroll } = {}) {
    const step =
      (this.state.step + this.state.totalStep - 1) % this.state.totalStep;
    this.setState({
      step,
      signUpValues: { ...this.state.signUpValues, ...value }
    });
    scroll(0, 0);
  }

  @bound
  goBackToHomePage() {
    this.props.history.push(Routes.url.home);
  }

  @bound
  hasContractToBrokerage() {
    this.setState({ contractToBrokerage: true });
  }

  @bound
  shouldCreateJob() {
    return (
      !objectIsEmpty(this.props.currentUser) &&
      !objectIsEmpty(this.state.jobParams) &&
      !this.state.isJobSaved
    );
  }

  @bound
  createJob() {
    const job = {
      ...this.state.jobParams,
      name: `${translate(this.props.intl, "postingDefaultName")}1`,
      status: JOB_PENDING_CONFIRMATION,
      consumerId: this.props.currentUser.uid
    };
    this.props.saveJob(job.jobType, job);
    this.setState({ isJobSaved: true });
  }

  componentDidUpdate(prevProps) {
    if (this.shouldCreateJob()) {
      this.createJob();
    }

    if (
      Object.keys(this.props.jobs.sell).length >
      Object.keys(prevProps.jobs.sell).length
    ) {
      gtmEvent({ name: SELL_POSTING_CREATED_ANONYMOUS_POSTING_FLOW });
    }
    if (
      Object.keys(this.props.jobs.buy).length >
      Object.keys(prevProps.jobs.buy).length
    ) {
      const { state = {} } = this.props.location;

      if (state.prevPath === Routes.url.listingDetails) {
        gtmEvent({ name: BUY_POSTING_CREATED_ANONYMOUS_PROPERTY_DETAILS });
      } else {
        gtmEvent({ name: BUY_POSTING_CREATED_ANONYMOUS_POSTING_FLOW });
      }
    }

    if (this.props.currentUser.emailVerified) {
      this.props.history.push(Routes.url.home);
    }
  }

  render() {
    const { intl } = this.props;
    const RegistrationStep =
      this.state.step < this.state.totalStep
        ? RegistrationStepMap[this.state.step]
        : RegistrationStepMap[this.state.totalStep - 1];
    const locationClasses = createLocationClasses(this.props.userLocation);

    return (
      <div
        className={`consumer-registration-container ${locationClasses.join(
          " "
        )}`}
      >
        <Helmet>
          <title>{translate(intl, "helmet.consumerRegistration")}</title>
          <meta
            name="description"
            content={translate(intl, "helmet.consumerRegistrationDescription")}
          />
        </Helmet>
        <Desktop>
          <Icon
            className="consumer-registration-close"
            type="close"
            onClick={this.goBackToHomePage}
          />
        </Desktop>
        <RegistrationStep
          signUpValues={this.state.signUpValues}
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          onValidSubmit={this.onValidSubmit}
          signUpUser={this.props.signUpUser}
          goBackToHomePage={this.goBackToHomePage}
          error={this.props.error}
          resendEmailVerification={this.props.resendEmailVerification}
          verificationEmailResent={this.props.verificationEmailResent}
          currentUser={this.props.currentUser}
          clearResendVerificationStatus={
            this.props.clearResendVerificationStatus
          }
          isEmailVerified={this.props.isEmailVerified}
          isReloadingUser={this.props.isLoading}
          reloadUser={this.props.reloadUser}
          isFirstTimeRegistration={this.props.isFirstTimeRegistration}
          contractToBrokerage={this.state.contractToBrokerage}
          hasContractToBrokerage={this.hasContractToBrokerage}
          hasJobToSave={!objectIsEmpty(this.state.jobParams)}
        />
      </div>
    );
  }
}

export default ConsumerRegistration;
