import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import moment from "moment";

import { translate } from "../../../../utilities/locale";
import { objectIsEmpty } from "../../../../../core/utilities/misc";
import {
  DAYS,
  STANDARD_DATE_FORMAT,
  TRIAL_PERIOD_LENGTH
} from "../../../../../core/constants/shared";

@injectIntl
class AgentFreeTrialStarted extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    subscriptionData: PropTypes.object.isRequired,
    endDate: PropTypes.string.isRequired,
    unsubscribe: PropTypes.bool.isRequired
  };

  state = {
    countdownDateObject: {},
    createdAtDate: "",
    countdownDays: 0,
    trialCompleted: true
  };

  @bound
  renderFreeTrialExpiryCount() {
    this.setState({
      countdownDateObject: this.props.subscriptionData
    });

    //Get the timestamp that the subscription started
    const countdownDateObjectTimeStamp =
      this.state.countdownDateObject[
        Object.keys(this.state.countdownDateObject)[0]
      ] || "";

    //Convert it to a date object
    !objectIsEmpty(countdownDateObjectTimeStamp) &&
      this.setState({
        createdAtDate: moment
          .unix(countdownDateObjectTimeStamp.start)
          .format(STANDARD_DATE_FORMAT)
      });

    const trialEndDate = moment(this.state.createdAtDate)
      .add(TRIAL_PERIOD_LENGTH, DAYS)
      .format(STANDARD_DATE_FORMAT);

    const trialStartDateFormatted = moment(this.state.startDate);
    const trialEndDateFormatted = moment(trialEndDate);

    //Find the difference between the trial start date and current date
    const trialDaysLeft = trialEndDateFormatted.diff(
      trialStartDateFormatted,
      DAYS
    );

    this.setState({
      countdownDays: isNaN(trialDaysLeft)
        ? TRIAL_PERIOD_LENGTH
        : trialDaysLeft + 1,
      trialCompleted: trialDaysLeft === 0
    });
  }

  render() {
    return (
      <div className="free-trial-info-title">
        {this.renderFreeTrialExpiryCount()}
        {this.state.trialCompleted && (
          <div>
            {translate(this.props.intl, "freeTrial.yourSubscription")}
            <div className="free-trial-info-countdown">
              {translate(this.props.intl, "freeTrial.nobulPremium")}
            </div>
          </div>
        )}
        {!this.state.trialCompleted && (
          <div>
            <div className="free-trial-started__member-continue">
              {translate(
                this.props.intl,
                !this.props.unsubscribe
                  ? "subscriptions.memberContinueAfterTrial"
                  : "subscriptions.memberEndAfterTrial",
                { endDate: this.props.endDate }
              )}
            </div>
            <div className="free-trial-started__will-be-charged">
              {translate(
                this.props.intl,
                !this.props.unsubscribe
                  ? "subscriptions.Charged"
                  : "subscriptions.NotBeChargedLossBenefits"
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AgentFreeTrialStarted;
