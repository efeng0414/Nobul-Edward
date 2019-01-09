import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../../utilities/locale";
import { PROMOTE_OFFER } from "../../../../../core/constants/shared";
import CongratulationsIcon from "../../../../assets/images/congratulations_icon.svg";

import "./styles.scss";

@injectIntl
class PaymentStepThree extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    toggleModal: PropTypes.func.isRequired,
    typeofPayment: PropTypes.string.isRequired
  };

  static defaultProps = {
    toggleModal: () => {},
    typeofPayment: ""
  };

  render() {
    return (
      <div className="payment-congratulations">
        <img
          className="payment-congratulations__image"
          src={CongratulationsIcon}
          alt={translate(this.props.intl, "jobListing.congratulations")}
        />
        {this.props.typeofPayment === PROMOTE_OFFER ? (
          <div className="payment-congratulations__container">
            <p className="payment-congratulations__title">
              {translate(this.props.intl, "offer.confirmer")}
            </p>
            <p className="payment-congratulations__subtitle">
              {translate(this.props.intl, "success.promoteOfferSuccess")}
            </p>
          </div>
        ) : (
          <div className="payment-congratulations__container">
            <p className="payment-congratulations__title">
              {translate(this.props.intl, "subscriptions.congratulationsTitle")}
            </p>
            <p className="payment-congratulations__subtitle">
              <span>
                {translate(
                  this.props.intl,
                  "subscriptions.congratulationsSubtitleBold"
                )}
              </span>
              {translate(
                this.props.intl,
                "subscriptions.congratulationsSubtitle"
              )}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default PaymentStepThree;
