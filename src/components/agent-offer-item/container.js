import React, { Component } from "react";
import { Card, Avatar, Icon } from "antd";
import { BUY, SELL, WEBFORM } from "../../../core/constants/shared";
import { OFFER_ACCEPTED } from "../../../core/constants/offers";
import { REBATE_COMMISSION } from "../../../core/api-transform/offers";
import { translate } from "../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import PropertyCriteria from "../property-criteria";
import PropertyFeaturesIconList from "../property-features-icon-list";
import AgentOfferItemFooter from "../agent-offer-item-footer";
import { bound } from "class-bind";
import moment from "moment";
import SelectedServices from "../selected-services";
import { Link } from "react-router-dom";
import { url } from "../../routes/myNobul";
import { TAG_MAP } from "./utilities";
import * as Routes from "../../routes/myNobul";
import { PROPERTY_MAP } from "../../utilities/constants";

import Desktop from "../breakpoints/desktop";
import Currency from "../currency";

import "./styles.scss";
import { getCountryFromJob } from "../../../core/utilities/location";
import {
  MAX_CURRENT_LISTING_PRICE,
  MAX_DISPLAY_PRICE
} from "../../../core/constants/shared";

import { AGENT_DASHBOARD_VIEW_PROPOSAL } from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";

class AgentOfferItem extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    jobType: PropTypes.string,
    isPremium: PropTypes.bool,
    currentUser: PropTypes.object,
    offerDetail: PropTypes.object,
    buyJobs: PropTypes.object,
    sellJobs: PropTypes.object,
    stripeCards: PropTypes.array,
    appendJobDetail: PropTypes.func,
    withdrawOffer: PropTypes.func,
    promoteOffer: PropTypes.func,
    getWinningOffer: PropTypes.func,
    createStripeSingleChargeAsync: PropTypes.func,
    authentication: PropTypes.object.isRequired,
    updateSellOffer: PropTypes.func.isRequired,
    updateBuyOffer: PropTypes.func.isRequired,
    preventLoad: PropTypes.bool
  };

  static defaultProps = {
    isPremium: false,
    preventLoad: false,
    currentUser: {},
    offerDetail: {},
    buyJobs: {},
    sellJobs: {},
    stripeCards: [],
    appendJobDetail: () => {},
    withdrawOffer: () => {},
    promoteOffer: () => {},
    getWinningOffer: () => {},
    createStripeSingleChargeAsync: () => {}
  };

  state = {
    toggleProposalDetails: false,
    withdrawProposalVisibility: false,
    jobDetail: {}
  };

  componentDidMount() {
    !this.props.preventLoad &&
      this.props.appendJobDetail({
        jobType: this.props.jobType,
        jobId: this.props.offerDetail.jobId
      });
  }

  @bound
  toggleProposalDetails() {
    this.setState(prevState => ({
      toggleProposalDetails: !prevState.toggleProposalDetails
    }));
  }

  @bound
  shouldRenderTag({ condition, jsx }) {
    const correspondingJob =
      this.props.buyJobs[this.props.offerDetail.jobId] ||
      this.props.sellJobs[this.props.offerDetail.jobId];

    return correspondingJob &&
      condition({
        correspondingJob,
        offerDetail: this.props.offerDetail,
        withdraw: this.state.offerWithdrawn
      })
      ? jsx({ intl: this.props.intl })
      : null;
  }

  @bound
  renderOfferStatus() {
    return (
      <div className="agent-offer__status-container">
        {Object.values(TAG_MAP).map(this.shouldRenderTag)}
      </div>
    );
  }

  @bound
  renderJobDetails() {
    const jobDetail = this.getJobDetail();
    if (!jobDetail || Object.keys(jobDetail).length === 0) return;

    const country = getCountryFromJob({ jobDetail });

    const isHighestPrice =
      jobDetail.priceRangeHigh === MAX_CURRENT_LISTING_PRICE;

    return (
      <div className="agent-offer__job-detail">
        <div className="agent-offer__job-detail-price">
          {translate(this.props.intl, "offer.isLookingFor", {
            userType:
              jobDetail.jobType === BUY
                ? translate(this.props.intl, "buyer")
                : translate(this.props.intl, "seller")
          })}
          <span className="agent-offer__job-pricerange">
            <Currency value={jobDetail.priceRangeLow} currency={country} /> -{" "}
            <Currency
              value={
                isHighestPrice ? MAX_DISPLAY_PRICE : jobDetail.priceRangeHigh
              }
              currency={country}
            />
            {isHighestPrice ? "+" : ""}
          </span>
        </div>
        <Desktop>
          <div className="agent-offer__row">
            <PropertyCriteria job={jobDetail} intl={this.props.intl} />
          </div>
          <div className="agent-offer__row">
            <PropertyFeaturesIconList
              showMaximum={4}
              propertyFeatures={jobDetail.propertyFeatures}
              intl={this.props.intl}
            />
          </div>
        </Desktop>
      </div>
    );
  }

  // This component needs a massive refactor, putting this here
  // to get things working. Data got lost on screen resize.
  getJobDetail() {
    const jobList =
      this.props.jobType === BUY ? this.props.buyJobs : this.props.sellJobs;

    return Object.keys(jobList)
      .filter(key => key === this.props.offerDetail.jobId)
      .reduce((obj, key) => {
        return jobList[key];
      }, {});
  }

  @bound
  trackLinkClick() {
    gtmEvent({ name: AGENT_DASHBOARD_VIEW_PROPOSAL });
  }

  @bound
  handleWithdrawOffer({ jobType, offerId }) {
    this.props.withdrawOffer({ jobType, offerId });
    this.setState({
      offerWithdrawn: true
    });
  }

  render() {
    const title =
      this.props.jobType === BUY
        ? translate(this.props.intl, "buyer")
        : translate(this.props.intl, "seller");

    return (
      <div className="agent-offer">
        <Card className="agent-offer__card">
          <div className="agent-offer__row">
            <div className="agent-offer__date">
              {moment(this.props.offerDetail.createdAt).format("MMM DD, YYYY")}
            </div>
            {this.renderOfferStatus()}
          </div>
          <div className="agent-offer__row">
            <div className="agent-offer__avatar">
              <Avatar
                className="agent-offer__avatar-icon"
                src={
                  this.props.jobType === BUY
                    ? PROPERTY_MAP[BUY][this.getJobDetail().propertyType]
                    : PROPERTY_MAP[SELL][this.getJobDetail().propertyType]
                }
              />
            </div>
            <div className="agent-offer__description">
              <p className="agent-offer__title">{title}</p>
              <p className="agent-offer__body">
                {this.props.offerDetail.personalizedMessage}
              </p>
            </div>
            <div className="agent-offer__down">
              <button onClick={this.toggleProposalDetails}>
                <Icon type="down" />
              </button>
            </div>
          </div>
          {this.state.toggleProposalDetails && (
            <div className="agent-offer__details">
              {this.props.jobType === BUY ? (
                <div className="agent-offer__row">
                  <div className="agent-offer__commision-container">
                    <p className="agent-offer__header">
                      {translate(this.props.intl, "proposal.rebateTitle")}
                    </p>
                    <p className="agent-offer__body">
                      {this.props.offerDetail[REBATE_COMMISSION]}%
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="agent-offer__row">
                    <div className="agent-offer__commision-container">
                      <p className="agent-offer__header">
                        {translate(
                          this.props.intl,
                          "proposal.cooperatingTitle"
                        )}
                      </p>
                      <p className="agent-offer__body">
                        {this.props.offerDetail.cooperatingCommission}%
                      </p>
                    </div>
                  </div>
                  <div className="agent-offer__row">
                    <div className="agent-offer__commision-container">
                      <p className="agent-offer__header">
                        {translate(this.props.intl, "proposal.listingTitle")}
                      </p>
                      <p className="agent-offer__body">
                        {this.props.offerDetail.listingCommission}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="agent-offer__row">
                <div className="agent-offer__services-container">
                  <p className="agent-offer__header">
                    {translate(this.props.intl, "proposal.services")}
                  </p>
                  <SelectedServices
                    intl={this.props.intl}
                    selectedServices={Object.keys(
                      this.props.offerDetail.services || []
                    )}
                    displayCheckbox={false}
                  />
                </div>
              </div>
            </div>
          )}

          {this.renderJobDetails()}
          <Desktop>
            <Link
              className="agent-offer__link agent-offer__link-details"
              onClick={this.trackLinkClick}
              to={url.offerDetails
                .replace(":jobType", this.props.jobType)
                .replace(":offerId", this.props.offerDetail.id)}
            >
              {translate(this.props.intl, "proposal.viewProposalDetails")}
            </Link>
          </Desktop>
          {this.props.offerDetail.isPromoted && (
            <div className="agent-offer__promoted">
              {translate(this.props.intl, "proposal.promoted")}
            </div>
          )}

          {this.props.offerDetail.agentId === this.props.currentUser.uid &&
            this.props.offerDetail.status === OFFER_ACCEPTED && (
              <Link
                className="agent-offer__link agent-offer__link-contracts"
                to={Routes.url.generateAgreement
                  .replace(":format?", WEBFORM)
                  .replace(":formType?", this.props.jobType)
                  .replace(":offerId?", this.props.offerDetail.id)}
              >
                + {translate(this.props.intl, "addDocuments")}
              </Link>
            )}

          {!this.state.offerWithdrawn && (
            <AgentOfferItemFooter
              isPremium={this.props.isPremium}
              offerDetail={this.props.offerDetail}
              jobType={this.props.jobType}
              promoteOffer={this.props.promoteOffer}
              withdrawOffer={this.handleWithdrawOffer}
              getWinningOffer={this.props.getWinningOffer}
              intl={this.props.intl}
              currentUser={this.props.currentUser}
              createStripeSingleCharge={
                this.props.createStripeSingleChargeAsync
              }
              jobDetail={this.getJobDetail()}
              stripeCards={this.props.stripeCards}
              authentication={this.props.authentication}
              updateBuyOffer={this.props.updateBuyOffer}
              updateSellOffer={this.props.updateSellOffer}
            />
          )}
        </Card>
      </div>
    );
  }
}

export default injectIntl(AgentOfferItem);
