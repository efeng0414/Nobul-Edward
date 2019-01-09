import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../../utilities/locale";

@injectIntl
class AgentFreeTrialAccountInfo extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    firstName: PropTypes.string.isRequired,
    trialCompleted: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className="free-trial-account-info">
        <div className="free-trial-account-info__hello">
          {translate(this.props.intl, "subscriptions.hello", {
            User: this.props.firstName
          })}
        </div>
        <div className="free-trial-account-info__membership">
          {translate(this.props.intl, "subscriptions.membership")}
        </div>
        <div className="free-trial-account-info__membership__type">
          {translate(this.props.intl, "subscriptions.nobulPremiumFreeTrial")}
          <span className="free-trial-account-info__membership__freeTrial">
            {!this.props.trialCompleted &&
              ` (${translate(this.props.intl, "freeTrial.title2")})`}
          </span>
        </div>
      </div>
    );
  }
}

export default AgentFreeTrialAccountInfo;
