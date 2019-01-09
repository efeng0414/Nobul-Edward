import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import { url } from "../../routes/routes";

import "./styles.scss";

@injectIntl
class ConsumerLandingType extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div className="consumer-landing-type">
        <div className="consumer-landing-type__link-wrapper consumer-landing-type__link-wrapper--buyer">
          <Link
            to={url.createBuyJob}
            className="consumer-landing-type__link consumer-landing-type__link--buyer"
          >
            {translate(this.props.intl, "landing.type.buy")}
          </Link>
        </div>
        <div className="consumer-landing-type__gap" />
        <div className="consumer-landing-type__link-wrapper consumer-landing-type__link-wrapper--seller">
          <Link
            to={url.createSellJob}
            className="consumer-landing-type__link consumer-landing-type__link--seller"
          >
            {translate(this.props.intl, "landing.type.sell")}
          </Link>
        </div>
      </div>
    );
  }
}

export default ConsumerLandingType;
