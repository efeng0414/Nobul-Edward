import React, { PureComponent } from "react";
import { Button, Icon } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import {
  EDIT_PREMIUM,
  EDIT_SUBSCRIBE,
  CREATE,
  ACCEPTED_IN_PROGRESS,
  ACCEPTED_IN_CONTRACT,
  OPEN_IN_REVIEW,
  DECLINED_ACCEPTED_IN_CONTRACT,
  DECLINED_BY_CLIENT,
  DECLINED_JOB_DELETED,
  DECLINED_JOB_EXPIRED,
  WITHDRAWN_BY_AGENT
} from "../../../core/constants/offers";
import { getOfferStatus } from "../../../core/utilities/offer-status";
import { BUY, BUYER, SELLER, SELL } from "../../../core/constants/shared";
import { translate } from "../../utilities/locale";
import { url } from "../../routes/myNobul";
import { Link } from "react-router-dom";

import "./styles.scss";

class AgentOfferStatus extends PureComponent {
  static propTypes = {
    agents: PropTypes.object,
    jobType: PropTypes.string,
    jobStatus: PropTypes.string,
    offerStatus: PropTypes.string,
    isPremium: PropTypes.bool,
    authUserId: PropTypes.string.isRequired,
    handleCreateEditClick: PropTypes.func,
    handleSubscribe: PropTypes.func,
    handlePremium: PropTypes.func,
    intl: intlShape.isRequired,
    displayBackground: PropTypes.bool
  };

  static defaultProps = {
    agents: {},
    isPremium: false,
    handleCreateEditClick: () => {},
    handleSubscribe: () => {},
    handlePremium: () => {},
    displayBackground: true
  };

  render() {
    const userType = this.props.jobType === BUY ? BUYER : SELLER;
    const offerStatus = getOfferStatus({
      agentOffers: this.props.agents,
      agentId: this.props.authUserId,
      jobStatus: this.props.jobStatus,
      offerStatus: this.props.offerStatus
      // isPremium: this.props.isPremium
    });

    const classNameContainer = this.props.displayBackground
      ? "displayBackground"
      : "displayBorder";

    return (
      <div className={`agent-offer-status ${classNameContainer}`}>
        {offerStatus === EDIT_PREMIUM && (
          <div>
            <span>
              {translate(this.props.intl, "offer.editPremiumText", {
                jobType: this.props.jobType
              })}
            </span>
            <Button type="primary" onClick={this.props.handlePremium}>
              {translate(this.props.intl, "offer.editButton")}
            </Button>
          </div>
        )}

        {offerStatus === EDIT_SUBSCRIBE && (
          <div>
            <span>{translate(this.props.intl, "offer.subscribeText")}</span>
            <Button type="primary" onClick={this.props.handleSubscribe}>
              <Link to={url.subscriptions}>
                {translate(this.props.intl, "offer.subscribeButton")}
              </Link>
            </Button>
          </div>
        )}

        {offerStatus === ACCEPTED_IN_PROGRESS && (
          <div className="proposal-accepted">
            <p className="proposal-accepted__text">
              {translate(this.props.intl, "offer.acceptedInProgressText")}
            </p>
            <div className="proposal-accepted__status">
              <div className="proposal-accepted__status--accepted">
                {translate(this.props.intl, "offerAccepted")}
                <Icon type="check" />
              </div>
              <div className="proposal-accepted__status--progress">
                {translate(this.props.intl, "offer.acceptedInProgressStatus")}
              </div>
            </div>
          </div>
        )}

        {offerStatus === OPEN_IN_REVIEW && (
          <div>
            <span>
              {translate(this.props.intl, "offer.acceptedReviewingText", {
                userType
              })}
            </span>
            <span className="warning">
              {translate(this.props.intl, "offer.declined")}
            </span>
          </div>
        )}

        {offerStatus === ACCEPTED_IN_CONTRACT && (
          <div>
            <span>
              {translate(this.props.intl, "offer.acceptedInContractText")}
            </span>
            <span>
              {translate(this.props.intl, "offer.acceptedInContractStatus")}
            </span>
          </div>
        )}

        {offerStatus === DECLINED_ACCEPTED_IN_CONTRACT && (
          <div>
            <span>
              {translate(this.props.intl, "offer.acceptedOtherOfferText")}
            </span>
            <span>
              {translate(this.props.intl, "offer.acceptedOtherOfferStatus", {
                userType
              })}
            </span>
          </div>
        )}

        {offerStatus === DECLINED_BY_CLIENT && (
          <div>
            <span>
              {translate(this.props.intl, "offer.rejectedText", { userType })}
            </span>
          </div>
        )}

        {offerStatus === DECLINED_JOB_DELETED && (
          <div>
            <span>
              {translate(this.props.intl, "offer.jobDeletedText", { userType })}
            </span>
          </div>
        )}

        {offerStatus === DECLINED_JOB_EXPIRED && (
          <div>
            <span>{translate(this.props.intl, "offer.jobExpiredText")}</span>
          </div>
        )}

        {offerStatus === WITHDRAWN_BY_AGENT && (
          <div>
            <span>
              {translate(
                this.props.intl,
                "offerDetail.jobWithdrawnByAgentText"
              )}
            </span>
          </div>
        )}

        {offerStatus === CREATE && (
          <div>
            <span>
              {this.props.jobType === BUY &&
                translate(this.props.intl, "offer.createTextBuy")}
              {this.props.jobType === SELL &&
                translate(this.props.intl, "offer.createTextSell")}
            </span>
            <Button type="primary" onClick={this.props.handleCreateEditClick}>
              {translate(this.props.intl, "offer.createButton")}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default AgentOfferStatus;
