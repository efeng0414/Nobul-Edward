import React, { PureComponent } from "react";
import { injectIntl, intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import ConsumerProposalDetailsButtonContainer from "../consumer-proposal-details-button-container";

import "./styles.scss";

@injectIntl
class ConsumerAcceptDeclineCard extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="consumer-card">
        <div className="consumer-card__header">
          <div className="consumer-card__title">
            {translate(intl, "proposalDetails.doYouWantToAccept")}
          </div>
        </div>
        <div className="consumer-card__body">
          <div className="consumer-card__text-container">
            <div className="consumer-card__text">
              {translate(intl, "proposalDetails.disclaimer")}
            </div>
          </div>
          <div className="consumer-card__buttons">
            <ConsumerProposalDetailsButtonContainer
              intl={intl}
              handleProposalAcceptClick={() => {}}
              handleProposalDeclineClick={() => {}}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConsumerAcceptDeclineCard;
