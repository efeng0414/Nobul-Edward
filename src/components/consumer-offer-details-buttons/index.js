import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import { Button } from "antd";
import { bound } from "class-bind";

import { ACCEPT_OFFER, REJECT_OFFER } from "../../../core/constants/offers";
import "./styles.scss";

class ConsumerOfferDetailsButtons extends PureComponent {
  static propTypes = {
    intl: PropTypes.any,
    buttonClickHandle: PropTypes.func
  };

  static defaultProps = {
    buttonClickHandle: () => {}
  };

  @bound
  clickHandle(e) {
    const action = e.target.getAttribute("action");
    this.props.buttonClickHandle({ action });
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="accept-decline-buttons">
        <Button
          size="large"
          onClick={this.clickHandle}
          action={REJECT_OFFER}
          className="decline-button"
        >
          {translate(intl, "declineOffer")}
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={this.clickHandle}
          action={ACCEPT_OFFER}
          className="accept-button"
        >
          {translate(intl, "acceptOffer")}
        </Button>
      </div>
    );
  }
}

export default ConsumerOfferDetailsButtons;
