import React, { PureComponent } from "react";
import { intlShape, injectIntl } from "react-intl";
import {
  freeTrialFaq,
  renderFreeTrialFaqItem
} from "../../../../utilities/free-trial";
import { translate } from "../../../../utilities/locale";
import "./styles.scss";

@injectIntl
class AgentFreeTrialFaq extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  freeTrialFaqMap = freeTrialFaq({ intl: this.props.intl });

  render() {
    return (
      <div className="free-trial-faq">
        <div className="free-trial-faq-title">
          {translate(this.props.intl, "freeTrial.faq")}
        </div>
        <div className="free-trial-faq-container">
          {this.freeTrialFaqMap.map(renderFreeTrialFaqItem)}
        </div>
      </div>
    );
  }
}

export default AgentFreeTrialFaq;
