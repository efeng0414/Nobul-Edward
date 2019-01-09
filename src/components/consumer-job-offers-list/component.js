import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { withRouter } from "react-router";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";

import { translate } from "../../utilities/locale";
import ActivityIndicator from "../../components/activity-indicator";
import ConsumerJobOffersItem from "../../components/consumer-job-offers-item";
import ConsumerOfferFilter from "../../components/consumer-offer-filter";
import { AGENT_ID, STATUS } from "../../../core/api-transform/offers";
import { url } from "../../routes/myNobul";
import { BUY } from "../../../core/constants/shared";
import { CREATED_AT } from "../../../core/api-transform/jobs";
import { CONSUMER_HAS_READ, JOB_ID } from "../../../core/api-transform/offers";
import {
  OFFER_ACCEPTED,
  OFFER_PENDING_VERIFICATION_REJECTED
} from "../../../core/constants/offers";
import Desktop from "../breakpoints/desktop";

import "./styles.scss";

@withRouter
class ConsumerJobOffersList extends Component {
  state = {
    jobOffers: {}
  };

  static propTypes = {
    jobType: PropTypes.string,
    jobId: PropTypes.string,
    intl: intlShape.isRequired,
    title: PropTypes.string,
    displayViewAllLink: PropTypes.bool,
    displayCount: PropTypes.bool,
    displayFilter: PropTypes.bool,
    limit: PropTypes.number,
    layout: PropTypes.oneOf(["horizontal", "vertical"]),
    buyOffers: PropTypes.array,
    sellOffers: PropTypes.array,
    agents: PropTypes.object,
    filters: PropTypes.object,
    isLoading: PropTypes.bool,
    history: PropTypes.object,
    getMultipleAgentsWithAvatar: PropTypes.func,
    setOffersFilters: PropTypes.func,
    setOfferHasBeenRead: PropTypes.func
  };

  static defaultProps = {
    buyOffers: [],
    sellOffers: [],
    agents: {},
    layout: "vertical",
    isLoading: false,
    displayCount: false,
    displayFilter: false,
    displayViewAllLink: false,
    setOfferHasBeenRead: () => {},
    limit: undefined
  };

  @bound
  onFilterChange({ filter }) {
    this.props.setOffersFilters({
      filters: {
        ...this.props.filters,
        filterBy: filter
      }
    });
  }

  @bound
  handleClick({ offerId, readStatus }) {
    const consumerOfferDetailsURL = url.offerDetails
      .replace(":jobType", this.props.jobType)
      .replace(":offerId", offerId);

    if (readStatus) {
      this.props.setOfferHasBeenRead({
        jobType: this.props.jobType,
        offerId
      });
    }
    this.props.history.push(consumerOfferDetailsURL);
  }

  getJobOffers() {
    const offers =
      this.props.jobType === BUY ? this.props.buyOffers : this.props.sellOffers;

    const readOffers = offers
      .filter(
        offer =>
          offer[1][JOB_ID] === this.props.jobId && offer[1][CONSUMER_HAS_READ]
      )
      .sort((a, b) => b[1][CREATED_AT] - a[1][CREATED_AT]);

    const unreadOffers = offers
      .filter(
        offer =>
          offer[1][JOB_ID] === this.props.jobId && !offer[1][CONSUMER_HAS_READ]
      )
      .sort((a, b) => b[1][CREATED_AT] - a[1][CREATED_AT]);

    // Show unread first, followed by read (but accepted on top)
    return [...unreadOffers, ...readOffers].sort(
      a => -(a[1][STATUS] === OFFER_ACCEPTED)
    );
  }

  getHeader() {
    const offersCount = this.offers.length || 0;
    const filter = this.props.displayFilter && (
      <ConsumerOfferFilter
        intl={this.props.intl}
        onFilterChange={this.onFilterChange}
      />
    );
    return (
      <div className="job-offer-list-header">
        <h6>
          {this.props.title} {this.props.displayCount && `(${offersCount})`}
        </h6>
        <Desktop>{this.getAllProposalsLink()}</Desktop>
        {filter}
      </div>
    );
  }

  getAllProposalsLink() {
    const shouldDisplayViewAllLink =
      this.props.displayViewAllLink &&
      this.jobOffersUrl &&
      this.offers.length > 0;
    if (!shouldDisplayViewAllLink) return false;

    return (
      <Link className="link" to={this.jobOffersUrl}>
        {translate(this.props.intl, "viewAllProposals")}
      </Link>
    );
  }

  componentDidMount() {
    this.jobOffersUrl = url.consumerJobOffers
      .replace(":jobType", this.props.jobType)
      .replace(":jobId", this.props.jobId);
  }

  render() {
    this.offers = this.getJobOffers();
    const hasOffers = !!this.offers.length;
    const hasAgents = !!Object.keys(this.props.agents).length;

    return (
      <div className="job-offer-list">
        <ActivityIndicator
          spinning={this.props.isLoading}
          type={translate(this.props.intl, "loading")}
        >
          {this.getHeader()}
          <div
            className={
              this.props.layout === "horizontal"
                ? "job-offer-list-horizontal"
                : ""
            }
          >
            {hasOffers &&
              hasAgents &&
              this.offers
                .filter(
                  ([_, offerDetail]) =>
                    offerDetail[STATUS] !== OFFER_PENDING_VERIFICATION_REJECTED
                )
                .slice(0, this.props.limit)
                .map(([key, offerDetail]) => (
                  <ConsumerJobOffersItem
                    key={key}
                    offerID={key}
                    offerDetail={offerDetail}
                    agentData={this.props.agents[offerDetail[AGENT_ID]]}
                    onClick={this.handleClick}
                  />
                ))}
            {!hasOffers && (
              <div className="no-offers">
                {translate(this.props.intl, "noProposals")}
              </div>
            )}
          </div>
        </ActivityIndicator>
      </div>
    );
  }
}

export default ConsumerJobOffersList;
