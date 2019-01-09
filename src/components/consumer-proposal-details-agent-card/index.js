import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Avatar } from "antd";

import { translate } from "../../utilities/locale";
import PhoneIcon from "../../assets/images/phone-icon.svg";

import "./styles.scss";

@injectIntl
class ConsumerProposalDetailsAgentCard extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    agentAvatar: PropTypes.any.isRequired,
    agentName: PropTypes.string.isRequired,
    agentOffice: PropTypes.string.isRequired,
    agentAbout: PropTypes.string.isRequired
  };

  AGENT_AVATAR_SIZE = 150;

  render() {
    const { intl } = this.props;
    return (
      <div className="agent-card">
        <div className="agent-card__body">
          <div className="agent-card__avatar">
            <Avatar
              size={this.AGENT_AVATAR_SIZE}
              src={this.props.agentAvatar}
            />
          </div>
          <div className="agent-card__agent-name">{this.props.agentName}</div>
          <div className="agent-card__agent-office">
            {this.props.agentOffice}
          </div>
          <div className="agent-card__agent-about">{this.props.agentAbout}</div>
        </div>

        <div className="agent-card__footer">
          <div className="footer__icon">
            <div className="footer__image-container">
              <img
                src={PhoneIcon}
                alt={translate(intl, "alt.phoneIcon")}
                className="footer__image"
              />
            </div>
          </div>
          <div className="footer__action-content">
            <div className="footer__title">
              {translate(intl, "proposalDetails.contactTheAgent")}
            </div>
            <div className="footer__text">
              {translate(intl, "proposalDetails.contactAgentExplanation")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConsumerProposalDetailsAgentCard;
