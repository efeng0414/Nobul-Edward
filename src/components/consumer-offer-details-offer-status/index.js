import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import {
  ACCEPT_OFFER,
  REJECT_OFFER,
  OFFER_ACCEPTED,
  OFFER_REJECTED
} from "../../../core/constants/offers";
import "./styles.scss";

class ConsumerOfferDetailsOfferStatus extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    offerStatus: PropTypes.string,
    updatedOfferStatus: PropTypes.string
  };

  static defaultProps = {
    offerStatus: "",
    updatedOfferStatus: ""
  };

  render() {
    const { intl, offerStatus, updatedOfferStatus } = this.props;

    return (
      <div className="offer-status">
        {(offerStatus === OFFER_ACCEPTED ||
          updatedOfferStatus === ACCEPT_OFFER) && (
          <div className="offer-status-wrapper">
            <span className="offer-status-wrapper-accepted">
              {translate(intl, "offerAccepted")}
            </span>
            <span className="offer-status-wrapper-check">{"\u2713"}</span>
          </div>
        )}
        {(offerStatus === OFFER_REJECTED ||
          updatedOfferStatus === REJECT_OFFER) && (
          <div className="offer-status-wrapper">
            <span className="offer-status-wrapper-rejected">
              {translate(intl, "offerRejected")}
            </span>
            <span className="offer-status-wrapper-cross">{"\u2715"}</span>
          </div>
        )}
      </div>
    );
  }
}

export default ConsumerOfferDetailsOfferStatus;
