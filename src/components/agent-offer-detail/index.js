import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import SelectedServices from "../selected-services";
import { translate } from "../../utilities/locale";
import AgentOfferStatus from "../agent-offer-status";
import { BUY, BUYER, SELLER } from "../../../core/constants/shared";

import "./styles.scss";

const AgentOfferDetail = ({
  jobType,
  commissions,
  services,
  message,
  intl,
  authUserId,
  agents,
  isPremium,
  jobStatus,
  offerStatus,
  handleCreateEditClick,
  handleSubscribe,
  handlePremium
}) => {
  const renderCommissions =
    jobType === BUY ? (
      <div>
        <h5>
          {translate(intl, "offerDetail.rebate", {
            userType: jobType === BUY ? BUYER : SELLER
          })}
        </h5>
        <p>{`${commissions.rebateCommission}%`}</p>
      </div>
    ) : (
      <div>
        <div>
          <h5>{translate(intl, "offerDetail.listing")}</h5>
          <p>{`${commissions.listingCommission}%`}</p>
        </div>
        <div>
          <h5>{translate(intl, "offerDetail.cooperating")}</h5>
          <p>{`${commissions.cooperatingCommission}%`}</p>
        </div>
      </div>
    );

  return (
    <Card className="agent-offer-detail">
      <AgentOfferStatus
        authUserId={authUserId}
        agents={agents}
        isPremium={isPremium}
        jobStatus={jobStatus}
        offerStatus={offerStatus}
        jobType={jobType}
        handleCreateEditClick={handleCreateEditClick}
        handleSubscribe={handleSubscribe}
        handlePremium={handlePremium}
        intl={intl}
        displayBackground={false}
      />

      <div className="agent-offer-detail-body">
        {renderCommissions}

        <h5>{translate(intl, "offerDetail.servicesOffered")}</h5>
        <SelectedServices
          intl={intl}
          selectedServices={Object.keys(services || [])}
        />

        <h5>{translate(intl, "offerDetail.messageToClients")}</h5>
        <p>{message}</p>
      </div>
    </Card>
  );
};

AgentOfferDetail.propTypes = {
  offerStatus: PropTypes.string,
  jobType: PropTypes.string,
  commissions: PropTypes.object,
  services: PropTypes.object,
  message: PropTypes.string,
  intl: intlShape.isRequired,
  authUserId: PropTypes.string.isRequired,
  agents: PropTypes.object,
  isPremium: PropTypes.bool,
  jobStatus: PropTypes.string,
  offerStatus: PropTypes.string,
  handleCreateEditClick: PropTypes.func,
  handleSubscribe: PropTypes.func,
  handlePremium: PropTypes.func
};

AgentOfferDetail.defaultProps = {
  commissions: {},
  services: {},
  agents: {},
  isPremium: false,
  handleCreateEditClick: () => {},
  handleSubscribe: () => {}
};

export default AgentOfferDetail;
