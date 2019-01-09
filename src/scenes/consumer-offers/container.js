import React, { Component } from "react";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { bound } from "class-bind";
import SuitecaseIcon from "react-icons/lib/ti/briefcase";

import { translate } from "../../utilities/locale";
import ConsumerJobOffersList from "../../components/consumer-job-offers-list";
import { url } from "../../routes/myNobul";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isConsumer } from "../../utilities/route-verification";
import { BUY } from "../../../core/api-transform/jobs";
import { isForJob } from "./utilities";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { TABLET, MOBILE } from "../../../core/constants/breakpoints";
import Desktop from "../../components/breakpoints/desktop";
import Devices from "../../components/breakpoints/devices";

import "./styles.scss";

const TabPane = Tabs.TabPane;

@requireAuth()
@validateUser({ fn: isConsumer })
@injectIntl
class ConsumerOffers extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    buyJobs: PropTypes.object,
    sellJobs: PropTypes.object,
    buyOffers: PropTypes.object,
    sellOffers: PropTypes.object,
    isLoading: PropTypes.bool,
    authUserId: PropTypes.string.isRequired,
    getConsumerJobs: PropTypes.func,
    getMultipleAgentsWithAvatar: PropTypes.func,
    getConsumerOffers: PropTypes.func
  };

  static defaultProps = {
    buyJobs: {},
    sellJobs: {},
    buyOffers: {},
    sellOffers: {},
    isLoading: false,
    getConsumerJobs: () => {},
    getMultipleAgentsWithAvatar: () => {},
    getConsumerOffers: () => {}
  };

  getUniqueAgentIds() {
    const agentsIdsBuyOffers = Object.values(this.props.buyOffers).map(
      offerDetail => offerDetail.agentId
    );
    const agentsIdsSellOffers = Object.values(this.props.sellOffers).map(
      offerDetail => offerDetail.agentId
    );
    return [...agentsIdsBuyOffers, ...agentsIdsSellOffers];
  }

  componentDidMount() {
    this.props.getConsumerJobs({
      userId: this.props.authUserId
    });

    const didGetOffers = this.props.getConsumerOffers({
      consumerId: this.props.authUserId
    });
    didGetOffers.then(() => {
      this.uniqueAgentIds = this.getUniqueAgentIds();
      this.props.getMultipleAgentsWithAvatar({
        agentIdArray: this.uniqueAgentIds
      });
    });
  }

  @bound
  shouldRenderViewAll({ jobType, jobId: inputJobId }) {
    return jobType === BUY
      ? Object.values(this.props.buyOffers).some(isForJob({ inputJobId }))
      : Object.values(this.props.sellOffers).some(isForJob({ inputJobId }));
  }

  @bound
  displayJobList([jobId, jobDetail]) {
    const jobOffersUrl = url.consumerJobOffers
      .replace(":jobType", jobDetail.jobType)
      .replace(":jobId", jobId);

    return (
      <div className="consumer-offers-list" key={jobId}>
        <MyDashboardMeta titleKey="helmet.myDashboard.proposals" />
        <div className="consumer-offers-item">
          <h6>
            <SuitecaseIcon size="20" />
            {jobDetail.name}
          </h6>
          <Desktop>
            {this.shouldRenderViewAll({
              jobType: jobDetail.jobType,
              jobId: jobId
            }) && (
              <Link className="viewAllProposalsLink" to={jobOffersUrl}>
                {translate(this.props.intl, "viewAllProposals")}
              </Link>
            )}
          </Desktop>
        </div>
        <ConsumerJobOffersList
          jobType={jobDetail.jobType}
          jobId={jobId}
          intl={this.props.intl}
          layout="horizontal"
          limit={6}
        />
        <Devices sizes={[MOBILE, TABLET]}>
          {this.shouldRenderViewAll({
            jobType: jobDetail.jobType,
            jobId: jobId
          }) && (
            <Link className="viewAllProposalsLink" to={jobOffersUrl}>
              {translate(this.props.intl, "viewAllProposals")}
            </Link>
          )}
        </Devices>
      </div>
    );
  }

  render() {
    return (
      <div className="consumer-offers">
        <Helmet
          title={translate(this.props.intl, "helmet.consumerJobOffers")}
        />
        <Tabs className="consumer-offers-tabs" defaultActiveKey="1">
          <TabPane
            tab={translate(this.props.intl, "proposalsTitleBuy")}
            key="1"
          >
            {Object.entries(this.props.buyJobs).map(this.displayJobList)}
          </TabPane>
          <TabPane
            tab={translate(this.props.intl, "proposalsTitleSell")}
            key="2"
          >
            {Object.entries(this.props.sellJobs).map(this.displayJobList)}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ConsumerOffers;
