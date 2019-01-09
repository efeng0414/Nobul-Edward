import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";

import { translate } from "../../../../utilities/locale";

@injectIntl
class AgentFreeTrialNotStarted extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <div className="free-trial-info-title">
          {translate(this.props.intl, "freeTrial.title")}
        </div>
        <div className="free-trial-info-title2">
          {translate(this.props.intl, "freeTrial.title2")}
          <div className="free-trial-info-title2-sub">
            {translate(this.props.intl, "freeTrial.title2.sub")}
          </div>
        </div>
        <div className="free-trial-info-subtitle">
          {translate(this.props.intl, "freeTrial.subtitle-1")}
          <span className="free-trial-info-subtitle-highlight">
            {this.props.startDate}
          </span>
          {translate(this.props.intl, "freeTrial.subtitle-2")}
          <span className="free-trial-info-subtitle-highlight">
            {this.props.endDate}
          </span>
          {translate(this.props.intl, "freeTrial.subtitle-3")}
          <span className="free-trial-info-subtitle-highlight">
            {this.props.endDate}
          </span>
          {translate(this.props.intl, "freeTrial.subtitle-4")}
          <span className="free-trial-info-subtitle-highlight">
            {translate(this.props.intl, "freeTrial.emailReminderDays")}
          </span>
          {translate(this.props.intl, "freeTrial.subtitle-5")}
        </div>
      </div>
    );
  }
}

export default AgentFreeTrialNotStarted;
