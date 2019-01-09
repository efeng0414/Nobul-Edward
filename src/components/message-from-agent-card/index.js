import React, { PureComponent } from "react";
import { injectIntl } from "react-intl";

import "./styles.scss";

@injectIntl
class MessageFromAgentCard extends PureComponent {
  state = {};
  render() {
    return <div>I AM AGENT CARD</div>;
  }
}

export default MessageFromAgentCard;
