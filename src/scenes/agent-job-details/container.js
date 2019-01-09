import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Breadcrumb, Card } from "antd";
import { Link } from "react-router-dom";

import { translate } from "../../utilities/locale";
import { url } from "../../routes/routes";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import JobServices from "../../components/job-services";
import JobFeatures from "../../components/job-features";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import JobTypePriceLocation from "../../components/job-type-price-location";
import JobTaggedListings from "../../components/job-tagged-listings";
import { BUYER, SELLER, BUY, SELL } from "../../../core/constants/shared";
import JobSummaryForOffer from "../../components/job-summary-for-offer";

import "./styles.scss";

@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
class AgentJobDetails extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    match: PropTypes.object,
    getJobDetail: PropTypes.func,
    getConsumerProfileAsync: PropTypes.func,
    getAgentAverageRating: PropTypes.func,
    getJobOffers: PropTypes.func,
    jobDetail: PropTypes.object,
    isLoading: PropTypes.bool,
    authUserId: PropTypes.string.isRequired,
    consumerCity: PropTypes.string
  };

  static defaultProps = {
    match: {},
    jobDetail: {},
    isLoading: false,
    consumerCity: "",
    getJobDetail: () => {},
    getConsumerProfileAsync: () => {},
    getAgentAverageRating: () => {},
    getJobOffers: () => {}
  };

  componentDidMount() {
    if (this.props.match.params.jobType && this.props.match.params.jobId) {
      const jobObj = {
        jobType: this.props.match.params.jobType,
        jobId: this.props.match.params.jobId
      };

      this.props.getAgentAverageRating({
        agentId: this.props.authUserId
      });

      const didGetJobDetails = this.props.getJobDetail(jobObj);
      didGetJobDetails.then(() => {
        this.props.getJobOffers(jobObj);
        this.props.getConsumerProfileAsync({
          consumerId: this.props.jobDetail.consumerId
        });
      });
    }
  }

  render() {
    const userType = this.props.jobDetail.jobType === BUY ? BUYER : SELLER;
    return (
      <div className="posting-details">
        <MyDashboardMeta titleKey="helmet.myDashboard.postingDetails" />

        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to={url.marketPlace}>
              {translate(this.props.intl, "marketPlace")}
            </Link>
          </Breadcrumb.Item>
          {this.props.consumerCity && (
            <Breadcrumb.Item>
              {translate(
                this.props.intl,
                `agentJobDetail.${this.props.jobDetail.jobType}erFrom`,
                {
                  consumerCity: this.props.consumerCity
                }
              )}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        <div className="posting-details-grid-container">
          <div className="posting-details-grid-item summary">
            <JobSummaryForOffer intl={this.props.intl} />
          </div>
        </div>

        <div className="posting-details-grid-container">
          <div className="posting-details-grid-left">
            <div className="posting-details-grid-item">
              <div className="posting-details-interested-in">
                <h6>
                  {translate(
                    this.props.intl,
                    `agentJobDetail.${
                      this.props.jobDetail.jobType
                    }erInterestedIn`
                  )}
                </h6>
                <Card bordered={false}>
                  <JobTypePriceLocation
                    {...this.props.jobDetail}
                    price={{
                      priceRangeLow: this.props.jobDetail.priceRangeLow,
                      priceRangeHigh: this.props.jobDetail.priceRangeHigh
                    }}
                    intl={this.props.intl}
                    regions={this.props.jobDetail.regions}
                  />
                </Card>
              </div>
            </div>
            <div className="posting-details-grid-item">
              <div className="posting-details-features">
                <h6>
                  {translate(
                    this.props.intl,
                    `agentJobDetail.${
                      this.props.jobDetail.jobType
                    }erWantsFollowingFeatures`
                  )}
                </h6>
                <Card bordered={false}>
                  <JobFeatures
                    {...this.props.jobDetail}
                    intl={this.props.intl}
                    displayTitle={false}
                  />
                </Card>
              </div>
            </div>
            {this.props.jobDetail.description && (
              <div className="posting-details-grid-item">
                <div className="posting-details-message">
                  <h6>
                    {translate(
                      this.props.intl,
                      "agentJobDetail.moreAboutThisConsumer",
                      {
                        userType
                      }
                    )}
                  </h6>
                  <Card bordered={false}>
                    <h5>
                      {translate(
                        this.props.intl,
                        "agentJobDetail.consumerMessage",
                        {
                          userType
                        }
                      )}
                    </h5>
                    {this.props.jobDetail.description}
                  </Card>
                </div>
              </div>
            )}
          </div>
          <div className="posting-details-grid-right">
            <div className="posting-details-grid-item">
              <div className="posting-details-services">
                <JobServices
                  intl={this.props.intl}
                  servicesRange={this.props.jobDetail.servicesRange}
                  services={this.props.jobDetail.services}
                  isLoading={this.props.isLoading}
                  title={
                    <h6>
                      {translate(
                        this.props.intl,
                        `agentJobDetail.this${this.props.jobDetail.jobType}er`
                      )}
                    </h6>
                  }
                  titleRange={
                    <h5>
                      {translate(this.props.intl, "agentJobDetail.prefers")}
                    </h5>
                  }
                  titleServices={
                    <h5>
                      {this.props.jobDetail.jobType === BUY &&
                        translate(
                          this.props.intl,
                          "agentJobDetail.wantsFollowingServicesBuy"
                        )}
                      {this.props.jobDetail.jobType === SELL &&
                        translate(
                          this.props.intl,
                          "agentJobDetail.wantsFollowingServicesSell"
                        )}
                    </h5>
                  }
                  jobType={this.props.jobDetail.jobType}
                />
              </div>
            </div>
            {this.props.jobDetail.taggedListings && (
              <div className="posting-details-grid-item">
                <div className="posting-details-tagged-listings">
                  <h6>
                    {translate(
                      this.props.intl,
                      "agentJobDetail.buyerHasTaggedTheseProperties",
                      {
                        userType
                      }
                    )}
                  </h6>
                  <JobTaggedListings
                    taggedListings={this.props.jobDetail.taggedListings}
                    slidesToShow={3}
                    isLoading={this.props.isLoading}
                    intl={this.props.intl}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AgentJobDetails;
