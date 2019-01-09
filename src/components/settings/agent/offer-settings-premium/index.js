import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { url } from "../../../../routes/myNobul";

import "./styles.scss";
import { translate } from "../../../../utilities/locale";

class OfferSettingsPremium extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  @bound
  handleClick(e) {
    e.preventDefault();

    // TODO
    // add premium
  }

  render() {
    return (
      <div className="offer-premium">
        <span className="offer-premium-highlight">
          {translate(this.props.intl, "offerSettings.premium")}
        </span>
        <p>
          {translate(this.props.intl, "offerSettings.getMore")}
          <span className="offer-premium__nobul">
            {translate(this.props.intl, "offerSettings.nobul")}
          </span>.
        </p>
        <p>
          {translate(this.props.intl, "offerSettings.withPremiumLine1")}
          <br />
          {translate(this.props.intl, "offerSettings.withPremiumLine2")}
        </p>
        <Link to={url.subscriptions} className="ant-btn upgrade-link">
          {translate(this.props.intl, "offerSettings.upgrade")}
        </Link>
      </div>
    );
  }
}

export default OfferSettingsPremium;
