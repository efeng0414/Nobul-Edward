import React, { Component } from "react";

import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Breadcrumb, Row, Col } from "antd";
import { Link } from "react-router-dom";

import { translate } from "../../utilities/locale";
import JobServices from "../../components/job-services";
import ConsumerJobDetailsFeatures from "../../components/consumer-job-details-features";
import JobTaggedListings from "../../components/job-tagged-listings";
import ConsumerJobOffersList from "../../components/consumer-job-offers-list";
import ConsumerLearningCenterImage from "../../components/consumer-learning-center-image";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { url } from "../../routes/myNobul";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isConsumer } from "../../utilities/route-verification";
import { BUY, SELL } from "../../../core/constants/shared";
import { JOB_DELETED } from "../../../core/constants/jobs";
import { getServicesList } from "../../utilities/services";

import "./styles.scss";

@requireAuth()
@validateUser({ fn: isConsumer })
@injectIntl
class ConsumerJobDetails extends Component {
  state = {
    displayMorgageCalculator: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    match: PropTypes.object,
    getJobDetail: PropTypes.func,
    getJobOffers: PropTypes.func,
    getMultipleAgentsWithAvatar: PropTypes.func,
    jobDetail: PropTypes.object,
    buyOffers: PropTypes.object,
    sellOffers: PropTypes.object,
    isLoading: PropTypes.bool,
    services: PropTypes.object,
    getServices: PropTypes.func
  };

  static defaultProps = {
    match: {},
    jobDetail: {},
    buyOffers: {},
    sellOffers: {},
    isLoadingJobs: false,
    getJobDetail: () => {},
    getServices: () => {},
    getJobOffers: () => {},
    getMultipleAgentsWithAvatar: () => {}
  };

  getUniqueAgentIds(offers) {
    return Object.values(offers).map(offerDetail => offerDetail.agentId);
  }

  componentDidMount() {
    this.getJobDetails();

    if (!this.state.services) {
      this.setState({
        services: getServicesList({
          serviceType: this.props.match.params.jobType,
          intl: this.props.intl
        })
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.jobId !== prevProps.match.params.jobId) {
      this.getJobDetails();
    }
  }

  getJobDetails() {
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

  renderJobDetails() {
    const { match } = this.props;
    const { jobType, jobId } = match.params;
    const title =
      jobType === BUY
        ? translate(this.props.intl, "imInterestedInBuying")
        : translate(this.props.intl, "imInterestedInSelling");

    return (
      <div>
        <Row className="consumer-posting-details-grid">
          <Col sm={12} md={6}>
            <ConsumerJobDetailsFeatures
              description={this.props.jobDetail.description}
              address={this.props.jobDetail.address}
              jobType={jobType}
              {...this.props.jobDetail}
              price={{
                priceRangeLow: this.props.jobDetail.priceRangeLow,
                priceRangeHigh: this.props.jobDetail.priceRangeHigh
              }}
              intl={this.props.intl}
              isLoading={this.props.isLoading}
              title={<h6>{title}</h6>}
            />
            <JobServices
              intl={this.props.intl}
              servicesRange={this.props.jobDetail.servicesRange}
              services={this.props.jobDetail.services}
              servicesToolTips={this.props.services}
              isLoading={this.props.isLoading}
              title={
                <h6>{translate(this.props.intl, "selectedAgentServices")}</h6>
              }
              titleRange={<h5>{translate(this.props.intl, "preferences")}</h5>}
              titleServices={
                <h5>{translate(this.props.intl, "consumerServices")}</h5>
              }
              jobType={jobType}
            />
            <ConsumerLearningCenterImage
              intl={this.props.intl}
              title={<h6>{translate(this.props.intl, "learningCenter")}</h6>}
            />
          </Col>
          <Col sm={12} md={6}>
            <div>
              <ConsumerJobOffersList
                jobType={jobType}
                jobId={jobId}
                intl={this.props.intl}
                title={translate(this.props.intl, "proposalsTitle")}
                displayCount
                displayFilter
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {this.props.jobDetail.taggedListings && (
              <div className="taggedProperties">
                <h6>{translate(this.props.intl, "taggedProperties")}</h6>
                <JobTaggedListings
                  taggedListings={this.props.jobDetail.taggedListings}
                  slidesToShow={3}
                  isLoading={this.props.isLoading}
                  intl={this.props.intl}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }

  renderDeletedString() {
    return (
      <h6 className="consumer-posting-details-deleted">
        {translate(this.props.intl, "jobDeleted")}
      </h6>
    );
  }

  render() {
    const { match } = this.props;
    const { jobType } = match.params;
    const status = this.props.jobDetail.status;
    const mortgageDefaultInput =
      (this.props.jobDetail.priceRangeLow +
        this.props.jobDetail.priceRangeHigh) /
      2;

    return (
      <div className="consumer-posting-details">
        <MyDashboardMeta titleKey="helmet.myDashboard.postingDetails" />

        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to={url.jobs}>
              {translate(this.props.intl, "myPostings")}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.jobDetail.name}</Breadcrumb.Item>
        </Breadcrumb>

        {status !== JOB_DELETED
          ? this.renderJobDetails()
          : this.renderDeletedString()}
      </div>
    );
  }
}

export default ConsumerJobDetails;
