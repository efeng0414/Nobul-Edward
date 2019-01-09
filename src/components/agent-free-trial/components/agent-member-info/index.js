import React, { PureComponent } from "react";
import { intlShape, injectIntl } from "react-intl";

import { translate } from "../../../../utilities/locale";

@injectIntl
class AgentMemberInfo extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div className="free-trial-membership-info">
        <div className="free-trial-membership-info__title">
          {translate(this.props.intl, "subscriptions.membershipInfo")}
        </div>
        <div className="free-trial-membership-info__subtitle">
          {translate(this.props.intl, "subscriptions.noLongerPremium")}
          <div className="free-trial-membership-info__subtitle-reactivate">
            {translate(this.props.intl, "subscriptions.reactiveFor")}
            <span className="free-trial-membership-info__subtitle-reactivate-price">
              {translate(this.props.intl, "subscriptions.premiumPrice")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AgentMemberInfo;
