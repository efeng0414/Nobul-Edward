import React, { PureComponent } from "react";
import { injectIntl } from "react-intl";

import "./styles.scss";

@injectIntl
class ConsumerViewCommissionCard extends PureComponent {
  state = {};
  render() {
    return <div className="commission-card">I AM A COMMISION CARD</div>;
  }
}

export default ConsumerViewCommissionCard;
