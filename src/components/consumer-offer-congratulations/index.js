import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import { ACCEPT_OFFER } from "../../../core/constants/offers";
import CongratulationsIcon from "../../assets/images/congratulations_icon.svg";
import DeclineIcon from "../../assets/images/decline_icon.svg";
import "./styles.scss";

class ConsumerOfferCongratulations extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    offerStatus: PropTypes.string
  };

  static defaultProps = {
    offerStatus: ""
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="congratulations">
        <div className="congratulations-image">
          {this.props.offerStatus === ACCEPT_OFFER ? (
            <img
              src={CongratulationsIcon}
              alt={translate(intl, "offer.congratulations")}
            />
          ) : (
            <img src={DeclineIcon} alt={translate(intl, "offer.sorry")} />
          )}
        </div>
        <div className="congratulations-text">
          <p className="congratulations-text-title">
            {this.props.offerStatus === ACCEPT_OFFER
              ? translate(intl, "offer.congratulations")
              : translate(intl, "offer.declined")}
          </p>
          <p className="congratulations-text-content">
            {this.props.offerStatus === ACCEPT_OFFER
              ? translate(intl, "offer.acceptOffer")
              : translate(intl, "offer.declineOffer")}
          </p>
          <p className="congratulations-text-content">
            {this.props.offerStatus === ACCEPT_OFFER
              ? translate(intl, "offer.agentContact")
              : translate(intl, "offer.agentReceiveUpdates")}
          </p>
          {this.props.offerStatus !== ACCEPT_OFFER && (
            <p className="congratulations-text-content">
              {translate(intl, "offer.agentProposalStatus")}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default ConsumerOfferCongratulations;
