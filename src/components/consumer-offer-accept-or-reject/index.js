import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { translate } from "../../utilities/locale";
import { bound } from "class-bind";
import { Button } from "antd";
import { ACCEPT_OFFER } from "../../../core/constants/offers";
import "./styles.scss";
import { gtmEvent } from "../../utilities/gtm-event";
import {
  ACCEPT_PROPOSAL,
  DECLINE_PROPOSAL
} from "../../utilities/google-tag-variable";

class ConsumerOfferAcceptOrReject extends PureComponent {
  static propTypes = {
    intl: PropTypes.any,
    jobType: PropTypes.string,
    offerId: PropTypes.string,
    action: PropTypes.string,
    acceptOffer: PropTypes.func,
    rejectOffer: PropTypes.func,
    offerHandle: PropTypes.func
  };

  static defaultProps = {
    jobType: "",
    offerId: "",
    action: "",
    acceptOffer: () => {},
    rejectOffer: () => {},
    offerHandle: () => {}
  };

  @bound
  clickHandle() {
    const { jobType, offerId, action } = this.props;
    action === ACCEPT_OFFER
      ? this.acceptOffer({ jobType, offerId })
      : this.rejectOffer({ jobType, offerId });

    this.props.offerHandle(action);
  }

  @bound
  acceptOffer({ jobType, offerId }) {
    this.props.acceptOffer({ jobType, offerId });
    gtmEvent({
      name: ACCEPT_PROPOSAL
    });
  }

  rejectOffer({ jobType, offerId }) {
    this.props.rejectOffer({ jobType, offerId });
    gtmEvent({
      name: DECLINE_PROPOSAL
    });
  }

  render() {
    const { intl } = this.props;
    const buttonClassNames = classnames(
      {
        "googletag-consumer-accept-proposal": this.props.action === ACCEPT_OFFER
      },
      {
        "googletag-consumer-decline-proposal":
          this.props.action !== ACCEPT_OFFER
      }
    );
    return (
      <div className="modal-confirm">
        <div className="modal-confirm-text">
          {this.props.action === ACCEPT_OFFER ? (
            <p>{translate(intl, "offer.confirmAccept")}</p>
          ) : (
            <p>{translate(intl, "offer.confirmDecline")}</p>
          )}
          <p>{translate(intl, "offer.confirmProceed")}</p>
        </div>
        <div className="modal-confirm-button">
          <Button
            type="primary"
            onClick={this.clickHandle}
            className={buttonClassNames}
          >
            {translate(intl, "button.confirm")}
          </Button>
        </div>
      </div>
    );
  }
}

export default ConsumerOfferAcceptOrReject;
