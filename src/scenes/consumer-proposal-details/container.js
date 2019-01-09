import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import ConsumerProposalDetailsAgentCard from "../../components/consumer-proposal-details-agent-card";
import ConsumerAcceptDeclineCard from "../../components/consumer-accept-decline-card";
import MessageFromAgentCard from "../../components/message-from-agent-card";
import ConsumerViewCommissionCard from "../../components/consumer-view-commission-card";
import ErrorBoundary from "../../components/error-boundary";

import "./styles.scss";

@injectIntl
@withRouter
class ConsumerProposalDetails extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    agentProfile: PropTypes.object,
    jobDetail: PropTypes.object,
    currentUser: PropTypes.object,
    events: PropTypes.object
  };

  static defaultProps = {
    agentProfile: {},
    jobDetail: {},
    currentUser: {},
    events: {}
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="consumer-proposal-details">
          <div className="action-cards">
            <div className="action-cards__agent-details">
              <ConsumerProposalDetailsAgentCard
                agentAvatar={"Avatar"}
                agentName={"Pierre Aubameyang"}
                agentOffice={"Office name goes here"}
                agentAbout={
                  "About stuff Office nameOffice nameOffice nameOffice name Office nameOffice nameOffice name"
                }
              />
            </div>
            <div className="action-cards__accept-decline">
              <ConsumerAcceptDeclineCard />
            </div>
          </div>
          <div className="message-card">
            <MessageFromAgentCard />
          </div>
          <div className="commission-cards">
            <div className="commission-cards__card">
              <ConsumerViewCommissionCard />
            </div>
            <div className="commission-cards__card">
              <ConsumerViewCommissionCard />
            </div>
          </div>
          <div className="services-card">SERVICES GO HERE</div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default ConsumerProposalDetails;
