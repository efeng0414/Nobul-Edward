import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import "./styles.scss";

class AgentSummary extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    averageRating: PropTypes.number,
    brokerageName: PropTypes.string
  };

  static defaultProps = {
    avatarUrl: undefined,
    firstName: "",
    lastName: "",
    averageRating: 0,
    brokerageName: ""
  };

  render() {
    return (
      <div className="agent">
        <Avatar size="large" src={this.props.avatarUrl} />
        <div className="agent-summary">
          <div className="agent-summary-rating">
            <div className="agent-summary-name">
              {this.props.firstName} {this.props.lastName}
            </div>
          </div>
          <div className="agent-summary-brokerage">
            {this.props.brokerageName}
          </div>
        </div>
      </div>
    );
  }
}

export default AgentSummary;
