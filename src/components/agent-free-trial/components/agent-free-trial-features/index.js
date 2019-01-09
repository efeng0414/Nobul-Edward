import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../../utilities/locale";
import {
  renderFreeTrialFeatures,
  freeTrialFeatures
} from "../../../../utilities/free-trial";
import "./styles.scss";

@injectIntl
class AgentFreeTrialFeatures extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    isPremium: PropTypes.bool.isRequired
  };

  freeTrialFeaturesMap = freeTrialFeatures({ intl: this.props.intl });

  render() {
    return (
      <div className="free-trial-info-features">
        {translate(
          this.props.intl,
          this.props.isPremium
            ? "freeTrial.features"
            : "subscriptions.enjoyFeatures"
        )}
        <div className="free-trial-info-grid">
          {this.freeTrialFeaturesMap.map(renderFreeTrialFeatures)}
        </div>
      </div>
    );
  }
}

export default AgentFreeTrialFeatures;
