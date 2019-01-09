import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import { Button } from "antd";

import "./styles.scss";

class ConsumerProposalDetailsButtonContainer extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    handleProposalAcceptClick: PropTypes.func.isRequired,
    handleProposalDeclineClick: PropTypes.func.isRequired
  };

  render() {
    const { intl } = this.props;

    return (
      <div className="accept-decline-buttons">
        <div className="accept-decline-buttons__accept">
          <Button
            size="large"
            onClick={this.props.handleProposalDeclineClick}
            className="decline-button"
          >
            {translate(intl, "button.decline")}
          </Button>
        </div>
        <div className="accept-decline-buttons__decline">
          <Button
            size="large"
            type="primary"
            onClick={this.props.handleProposalAcceptClick}
            className="accept-button"
          >
            {translate(intl, "button.accept")}
          </Button>
        </div>
      </div>
    );
  }
}

export default ConsumerProposalDetailsButtonContainer;
