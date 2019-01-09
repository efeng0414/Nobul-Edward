import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import PropTypes from "prop-types";

import {
  SELL_PROPOSAL,
  BUY_PROPOSAL,
  AUTO_BID_BUY,
  AUTO_BID_SELL
} from "../../../../utilities/images";
import {
  SELL_PROPOSAL_ICON,
  BUY_PROPOSAL_ICON,
  AUTO_BID_BUY_ICON,
  AUTO_BID_SELL_ICON
} from "../../../../../core/constants/agents";
import "./styles.scss";
import { translate } from "../../../../utilities/locale";

class OfferSettingsIcon extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    displayPremium: PropTypes.bool,
    icon: PropTypes.string.isRequired
  };

  static defaultProps = {
    onClick: () => {},
    data: "",
    displayPremium: false
  };

  @bound
  handleClick(e) {
    const stage = e.currentTarget.getAttribute("data-stage");
    if (stage) {
      this.props.onClick({ stage });
    }
  }

  @bound
  getIcon({ iconType }) {
    let icon = "";

    switch (iconType) {
      case SELL_PROPOSAL_ICON:
        icon = SELL_PROPOSAL;
        break;
      case BUY_PROPOSAL_ICON:
        icon = BUY_PROPOSAL;
        break;
      case AUTO_BID_BUY_ICON:
        icon = AUTO_BID_BUY;
        break;
      case AUTO_BID_SELL_ICON:
        icon = AUTO_BID_SELL;
        break;
    }

    return icon;
  }

  render() {
    return (
      <div className="offer-links">
        <div
          className="offer-links-icon"
          data-stage={this.props.data}
          onClick={this.handleClick}
        >
          <img src={this.getIcon({ iconType: this.props.icon })} />
          {this.props.displayPremium && (
            <span className="offer-links-icon-premium">
              {translate(this.props.intl, "offerSettings.premium")}
            </span>
          )}
        </div>

        <span>{this.props.text}</span>
      </div>
    );
  }
}

export default OfferSettingsIcon;
