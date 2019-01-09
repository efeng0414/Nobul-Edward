import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Breadcrumb, Row, Col } from "antd";
import { Link } from "react-router-dom";

import { translate } from "../../utilities/locale";
import ConsumerLearningCenter from "../../components/consumer-learning-center";
import ConsumerStories from "../../components/consumer-stories";
import ConsumerJobOffersList from "../../components/consumer-job-offers-list";
import MyDashboardMeta from "../../components/my-dashboard-meta";

import { url } from "../../routes/myNobul";
import { getUserPostingUrl } from "../../routes/myNobul";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isConsumer } from "../../utilities/route-verification";
import { BUY } from "../../../core/constants/shared";

import "./styles.scss";

@requireAuth()
@validateUser({ fn: isConsumer })
@injectIntl
class ConsumerJobOffers extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    match: PropTypes.object,
    jobDetails: PropTypes.object,
    buyOffers: PropTypes.object,
    sellOffers: PropTypes.object,
    getJobDetail: PropTypes.func,
    getJobOffers: PropTypes.func,
    getMultipleAgentsWithAvatar: PropTypes.func
  };

  static defaultProps = {
    match: {},
    getJobDetail: () => {},
    getJobOffers: () => {},
    getMultipleAgentsWithAvatar: () => {},
    jobDetails: {},
    buyOffers: {},
    sellOffers: {}
  };

  getUniqueAgentIds(offers) {
    return Object.values(offers).map(offerDetail => offerDetail.agentId);
  }

  componentDidMount() {
    if (this.props.match.params.jobType && this.props.match.params.jobId) {
      const jobObj = {
        jobType: this.props.match.params.jobType,
        jobId: this.props.match.params.jobId
      };
      this.props.getJobDetail(jobObj);

      const didGetJobOffers = this.props.getJobOffers(jobObj);
      didGetJobOffers.then(() => {
        const offers =
          this.props.match.params.jobType === BUY
            ? this.props.buyOffers
            : this.props.sellOffers;
        this.uniqueAgentIds = this.getUniqueAgentIds(offers);
        this.props.getMultipleAgentsWithAvatar({
          agentIdArray: this.uniqueAgentIds
        });
      });
    }
  }

  render() {
    return (
      <div className="consumer-job-offers">
        <MyDashboardMeta titleKey="helmet.myDashboard.allProposals" />

        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to={url.jobs}>
              {translate(this.props.intl, "myPostings")}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={getUserPostingUrl({
                jobType: this.props.match.params.jobType,
                jobId: this.props.match.params.jobId
              })}
            >
              {this.props.jobDetails.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {translate(this.props.intl, "proposals")}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="consumer-job-offers-grid">
          <div className="consumer-job-offers-grid-ad">
            <ConsumerLearningCenter
              intl={this.props.intl}
              title={<h6>{translate(this.props.intl, "learningCenter")}</h6>}
            />
            <ConsumerStories intl={this.props.intl} />
          </div>
          <div className="consumer-job-offers-grid-offers">
            <ConsumerJobOffersList
              jobType={this.props.match.params.jobType}
              jobId={this.props.match.params.jobId}
              intl={this.props.intl}
              title={translate(this.props.intl, "proposalsTitle")}
              displayCount
              displayFilter
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConsumerJobOffers;
