import React, { PureComponent } from "react";
import { Button } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import moment from "moment";

import { translate } from "../../utilities/locale";
import AgentFreeTrialModal from "./components/agent-free-trial-modal";
import AgentFreeTrialFaq from "./components/agent-free-trial-faq";
import AgentFreeTrialFeatures from "./components/agent-free-trial-features";
import AgentFreeTrialNotStarted from "./components/agent-free-trial-not-started";
import AgentFreeTrialStarted from "./components/agent-free-trial-started";
import AgentFreeTrialCompleted from "./components/agent-free-trial-completed";
import AgentUnsubscribeModal from "./components/agent-unsubscribe-modal";
import AgentFreeTrialAccountInfo from "./components/agent-free-trial-account-info";
import AgentMemberInfo from "./components/agent-member-info";
import ErrorBoundary from "../error-boundary";
import {
  DAYS,
  MONTH_DATE_FORMAT,
  TRIAL_PERIOD_LENGTH
} from "../../../core/constants/shared";
import { checkPropertyExist } from "../../../core/utilities/checkPropertyExist";
import { AGENT_PREMIUM_SUBSCRIPTION_START } from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";
import { checkLicenceData } from "../../utilities/check-licence-data";
import {
  CANCEL_PERIOD_END,
  START
} from "../../../core/api-transform/stripeCustomers";
import "./styles.scss";

@injectIntl
class AgentFreeTrial extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    isPremium: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    deleteCardAsync: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    createStripeSubscriptionCharge: PropTypes.func.isRequired,
    unsubscribeFromStripePlanAsync: PropTypes.func.isRequired,
    subscriptionId: PropTypes.string.isRequired,
    getStripeUserSubscriptionDataAsync: PropTypes.func.isRequired,
    subscriptionData: PropTypes.object,
    getStripeMonthlySubscriptionsDataAsync: PropTypes.func.isRequired,
    monthlySubscriptionData: PropTypes.object.isRequired,
    updateFreeTrialSubscribeStatusAsync: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    verification: PropTypes.object.isRequired,
    firstName: PropTypes.string
  };

  static defaultProps = {
    endDate: "",
    firstName: "",
    subscriptionData: {}
  };

  state = {
    paymentModalVisible: false,
    unsubscribeModalVisible: false,
    createdAtDate: "",
    countdownDays: 0,
    unsubscribeModalSteps: 1,
    startDate: "",
    endDate: "",
    trialCompleted: false,
    hasSubscriptionPreviouslyBeenCanceled: false
  };

  componentDidMount() {
    this.props
      .getStripeUserSubscriptionDataAsync({
        userId: this.props.userId
      })
      .then(() => this.setInitialValueOfSubscription());
  }

  @bound
  setInitialValueOfSubscription() {
    if (this.doesCancelAtPeriodEndNodeExist()) {
      const currentFreeTrialData = Object.values(
        this.props.subscriptionData
      )[0];
      const hasSubscriptionPreviouslyBeenCanceled =
        currentFreeTrialData[CANCEL_PERIOD_END];

      const trialEnd = moment
        .unix(currentFreeTrialData.start)
        .add(TRIAL_PERIOD_LENGTH, DAYS);
      const trialEndDate = trialEnd.format(MONTH_DATE_FORMAT);
      const trialCompleted = trialEnd.valueOf() < moment().valueOf();

      this.setState({
        trialCompleted,
        endDate: trialEndDate,
        hasSubscriptionPreviouslyBeenCanceled,
        unsubscribeModalSteps: hasSubscriptionPreviouslyBeenCanceled ? 2 : 1
      });
    } else {
      const startDate = moment().format(MONTH_DATE_FORMAT);
      const endDate = moment()
        .add(TRIAL_PERIOD_LENGTH, DAYS)
        .format(MONTH_DATE_FORMAT);

      this.setState({ startDate, endDate });
    }
  }

  @bound
  doesCancelAtPeriodEndNodeExist() {
    return checkPropertyExist(this.props.subscriptionData, CANCEL_PERIOD_END);
  }

  @bound
  getTrialEndTime() {
    const currentFreeTrialData = this.doesCancelAtPeriodEndNodeExist()
      ? Object.values(this.props.subscriptionData)[0]
      : [];

    return checkPropertyExist(currentFreeTrialData, START)
      ? moment
          .unix(currentFreeTrialData.start)
          .add(TRIAL_PERIOD_LENGTH, DAYS)
          .format(MONTH_DATE_FORMAT)
      : null;
  }

  @bound
  cancelMembership() {
    this.props.updateFreeTrialSubscribeStatusAsync({
      userId: this.props.userId,
      subscriptionId: this.props.subscriptionId,
      cancelAfterTrial: true
    });

    this.setState({
      unsubscribeModalSteps: 2,
      hasSubscriptionPreviouslyBeenCanceled: true
    });
  }

  @bound
  keepMembership() {
    this.props.updateFreeTrialSubscribeStatusAsync({
      userId: this.props.userId,
      subscriptionId: this.props.subscriptionId,
      cancelAfterTrial: false
    });

    this.setState({
      unsubscribeModalSteps: 3,
      hasSubscriptionPreviouslyBeenCanceled: false
    });
  }

  @bound
  toggleModalVisibility() {
    if (!this.state.paymentModalVisible) {
      // GTM event is we are opening the modal
      gtmEvent({ name: AGENT_PREMIUM_SUBSCRIPTION_START });
    }

    this.setState({
      paymentModalVisible: !this.state.paymentModalVisible
    });
  }

  @bound
  toggleUnsubscribeModalVisibility() {
    this.setState({
      unsubscribeModalVisible: !this.state.unsubscribeModalVisible
    });

    this.state.unsubscribeModalSteps === 3 &&
      this.setState({ unsubscribeModalSteps: 1 });
  }

  @bound
  renderTrialStarted() {
    const unsubscribe = this.state.unsubscribeModalSteps === 2;

    return (
      <AgentFreeTrialStarted
        endDate={this.state.endDate}
        unsubscribe={unsubscribe}
        subscriptionData={this.props.subscriptionData}
      />
    );
  }

  @bound
  renderTrialCompleted() {
    return (
      <AgentFreeTrialCompleted
        intl={this.props.intl}
        firstName={this.props.firstName}
      />
    );
  }

  @bound
  renderTrialNotStarted() {
    return (
      <AgentFreeTrialNotStarted
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        intl={this.props.intl}
      />
    );
  }

  @bound
  renderAccountInfo() {
    return (
      <AgentFreeTrialAccountInfo
        firstName={this.props.firstName}
        trialCompleted={this.state.trialCompleted}
      />
    );
  }

  @bound
  renderMemberInfo() {
    if (!this.props.isPremium && this.state.trialCompleted) {
      return <AgentMemberInfo intl={this.props.intl} />;
    }
  }

  @bound
  renderCancelMembership() {
    if (
      this.props.isPremium &&
      !this.state.trialCompleted &&
      this.state.unsubscribeModalSteps === 1
    ) {
      return (
        <div className="free-trial-info-button">
          <Button onClick={this.toggleUnsubscribeModalVisibility}>
            {translate(this.props.intl, "subscriptions.cancelMembership")}
          </Button>
        </div>
      );
    }
  }

  render() {
    const hasLicenceData = checkLicenceData({
      verification: this.props.verification
    });

    return (
      <div className="free-trial">
        <div className="free-trial-info">
          <div className="free-trial-info-container">
            <ErrorBoundary>
              <AgentFreeTrialModal
                intl={this.props.intl}
                visible={this.state.paymentModalVisible}
                onCancel={this.toggleModalVisibility}
                userId={this.props.userId}
                deleteCard={this.props.deleteCardAsync}
                cards={this.props.cards}
                createStripeSubscriptionCharge={
                  this.props.createStripeSubscriptionCharge
                }
                getStripeMonthlySubscriptionsDataAsync={
                  this.props.getStripeMonthlySubscriptionsDataAsync
                }
                monthlySubscriptionData={this.props.monthlySubscriptionData}
                isLoading={this.props.isLoading}
                hasLicenceData={hasLicenceData}
                isPremium={this.props.isPremium}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <AgentUnsubscribeModal
                visibility={this.state.unsubscribeModalVisible}
                toggleVisibility={this.toggleUnsubscribeModalVisibility}
                firstName={this.props.firstName}
                cancelMembership={this.cancelMembership}
                keepMembership={this.keepMembership}
                currentStep={this.state.unsubscribeModalSteps}
                intl={this.props.intl}
                endDate={this.getTrialEndTime()}
              />
            </ErrorBoundary>
            {this.props.isPremium && this.renderTrialStarted()}
            {!this.props.isPremium &&
              (this.state.trialCompleted
                ? this.renderTrialCompleted()
                : this.renderTrialNotStarted())}
            {(this.props.isPremium || this.state.trialCompleted) &&
              this.state.unsubscribeModalSteps === 2 && (
                <div className="free-trial-info-button-left">
                  <Button onClick={this.toggleUnsubscribeModalVisibility}>
                    {translate(
                      this.props.intl,
                      "subscriptions.continueMembership"
                    )}
                  </Button>
                </div>
              )}
            {this.props.isPremium && this.renderAccountInfo()}
            <AgentFreeTrialFeatures
              intl={this.props.intl}
              isPremium={this.props.isPremium}
            />
            {this.renderMemberInfo()}
            {!this.props.isPremium && (
              <div className="free-trial-info-button-free-trial">
                <Button onClick={this.toggleModalVisibility}>
                  {translate(
                    this.props.intl,
                    this.state.trialCompleted
                      ? "subscriptions.reactivateMembership"
                      : "freeTrial.button"
                  )}
                </Button>
              </div>
            )}
            {this.renderCancelMembership()}
          </div>
        </div>
        <AgentFreeTrialFaq intl={this.props.intl} />
      </div>
    );
  }
}

export default AgentFreeTrial;
