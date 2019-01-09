import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../../utilities/locale";

@injectIntl
class AgentFreeTrialCompleted extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    firstName: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <div className="free-trial-info-title">
          {translate(this.props.intl, "subscriptions.hello", {
            User: this.props.firstName
          })}
        </div>
        <div className="free-trial-info-completed-title">
          {translate(this.props.intl, "subscriptions.noLongerPremium")}
        </div>
      </div>
    );
  }
}

export default AgentFreeTrialCompleted;
