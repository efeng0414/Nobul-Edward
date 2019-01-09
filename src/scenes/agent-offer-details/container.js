import React, { Component } from "react";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Card, Row, Col, Modal } from "antd";

import { translate } from "../../utilities/locale";
import JobServices from "../../components/job-services";
import JobFeatures from "../../components/job-features";
import MarketingGetStarted from "../../components/marketing-get-started";
import AgentOfferDetail from "../../components/agent-offer-detail";
import AgentOfferForm from "../../components/agent-offer-form";
import JobTypePriceLocation from "../../components/job-type-price-location";
import JobTaggedListings from "../../components/job-tagged-listings";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import { BUY, BUYER, SELLER } from "../../../core/constants/shared";
import { getOfferStatus } from "../../../core/utilities/offer-status";
import { ACCEPTED_IN_PROGRESS } from "../../../core/constants/offers";

import { bound } from "class-bind";
import ErrorBoundary from "../../components/error-boundary";

import { AGENT_DASHBOARD_EDIT_PROPOSAL } from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";

// REMOVE_PREMIUM
// import { Link } from "react-router-dom";
// import AgentWinningOffer from "../../components/agent-winning-offer";
// import { url } from "../../routes/myNobul";
// import BannerAgentGetPremium from "../../assets/images/banner-agent-get-premium.svg";

import "./styles.scss";

@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
class AgentOfferDetails extends Component {
  state = {
    displayModal: false,
    editOfferModal: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    match: PropTypes.object,
    jobDetail: PropTypes.object,
    offerDetail: PropTypes.object,
    getOfferDetail: PropTypes.func.isRequired,
    getJobDetail: PropTypes.func.isRequired,
    authUserId: PropTypes.string.isRequired,
    isPremium: PropTypes.bool,
    authentication: PropTypes.object,
    updateSellOffer: PropTypes.func.isRequired,
    updateBuyOffer: PropTypes.func.isRequired
  };

  static defaultProps = {
    match: {},
    jobDetail: {},
    offerDetail: {},
    isPremium: false
  };

  componentDidMount() {
    this.getOfferDetails();
  }

  @bound
  getOfferDetails() {
    if (this.props.match.params.jobType && this.props.match.params.offerId) {
      const didGetOfferDetail = this.props.getOfferDetail({
        jobType: this.props.match.params.jobType,
        offerId: this.props.match.params.offerId
      });
      didGetOfferDetail.then(() => {
        this.props.getJobDetail({
          jobType: this.props.match.params.jobType,
          jobId: this.props.offerDetail.jobId
        });
      });
    }
  }

  getCommission() {
    if (this.props.jobDetail.jobType === BUY)
      return { rebateCommission: this.props.offerDetail.rebateCommission };
    return {
      listingCommission: this.props.offerDetail.listingCommission,
      cooperatingCommission: this.props.offerDetail.cooperatingCommission
    };
  }

  @bound
  toggleModal() {
    // TODO
    // add the modal for edit offer
    this.setState({ displayModal: !this.state.displayModal });

    // GTM event
    gtmEvent({ name: AGENT_DASHBOARD_EDIT_PROPOSAL });
  }

  handleSubscribe() {
    // TODO
    // open premium page
  }

  @bound
  handlePremium() {
    this.setState({ editOfferModal: true });
  }

  @bound
  cancelPremiumEdit() {
    this.setState({ editOfferModal: false });
  }

  getMarketingAsset() {
    const offerStatus = getOfferStatus({
      agentOffers: this.props.jobDetail.agents,
      agentId: this.props.authUserId,
      jobStatus: this.props.jobDetail.status,
      offerStatus: this.props.offerDetail.status,
      isPremium: this.props.isPremium
    });

    if (offerStatus === ACCEPTED_IN_PROGRESS) {
      return <MarketingGetStarted intl={this.props.intl} />;
    }
    // REMOVE_PREMIUM
    // if (
    //   (offerStatus === DECLINED_ACCEPTED_IN_CONTRACT ||
    //     offerStatus === OPEN_IN_REVIEW) &&
    //   this.props.isPremium
    // ) {
    //   return (
    //     <AgentWinningOffer
    //       intl={this.props.intl}
    //       jobId={this.props.jobDetail.jobId}
    //       jobType={this.props.jobDetail.jobType}
    //     />
    //   );
    // }
    // if (!this.props.isPremium) {
    //   return (
    //     <div className="agent-offer-details-get-premium">
    //       <Card>
    //         <Link to={url.subscriptions}>
    //           <img src={BannerAgentGetPremium} alt="" />
    //         </Link>
    //       </Card>
    //     </div>
    //   );
    // }
    return null;
  }

  render() {
    return (
      <div className="agent-offer-details">
        <Helmet
          title={translate(this.props.intl, "helmet.agentOfferDetails")}
        />

        <Row className="agent-offer-details-grid">
          <Col sm={12} md={6}>
            <h6>{translate(this.props.intl, "offerDetail.offerDetails")}</h6>
            <AgentOfferDetail
              jobType={this.props.match.params.jobType}
              commissions={this.getCommission()}
              services={this.props.offerDetail.services}
              message={this.props.offerDetail.personalizedMessage}
              intl={this.props.intl}
              authUserId={this.props.authUserId}
              isPremium={this.props.isPremium}
              agents={this.props.jobDetail.agents}
              jobStatus={this.props.jobDetail.status}
              offerStatus={this.props.offerDetail.status}
              handleCreateEditClick={this.toggleModal}
              handleSubscribe={this.handleSubscribe}
              handlePremium={this.handlePremium}
            />

            <h6>
              {translate(this.props.intl, "offerDetail.interestedIn", {
                userType: this.props.jobDetail.jobType === BUY ? BUYER : SELLER
              })}
            </h6>
            <Card className="agent-offer-details-card">
              <JobTypePriceLocation
                jobType={this.props.jobDetail.jobType}
                propertyType={this.props.jobDetail.propertyType}
                price={{
                  priceRangeLow: this.props.jobDetail.priceRangeLow,
                  priceRangeHigh: this.props.jobDetail.priceRangeHigh
                }}
                intl={this.props.intl}
                address={this.props.jobDetail.address}
                regions={this.props.jobDetail.regions}
              />
            </Card>

            <h6>
              {translate(this.props.intl, "offerDetail.wantsFeatures", {
                userType: this.props.jobDetail.jobType === BUY ? BUYER : SELLER
              })}
            </h6>
            <Card className="agent-offer-details-card">
              <JobFeatures
                bedrooms={this.props.jobDetail.bedrooms}
                bathrooms={this.props.jobDetail.bathrooms}
                propertyFeatures={this.props.jobDetail.propertyFeatures}
                intl={this.props.intl}
              />
            </Card>

            {this.props.jobDetail.description && (
              <div>
                <h6>
                  {translate(this.props.intl, "offerDetail.moreAbout", {
                    userType:
                      this.props.jobDetail.jobType === BUY ? BUYER : SELLER
                  })}
                </h6>
                <Card className="agent-offer-details-card">
                  <h5>
                    {translate(this.props.intl, "offerDetail.message", {
                      userType:
                        this.props.jobDetail.jobType === BUY ? BUYER : SELLER
                    })}
                  </h5>
                  <p>{this.props.jobDetail.description}</p>
                </Card>
              </div>
            )}
          </Col>
          <Col sm={12} md={6}>
            {this.getMarketingAsset()}

            {this.props.jobDetail.jobType && (
              <JobServices
                intl={this.props.intl}
                servicesRange={this.props.jobDetail.servicesRange}
                services={this.props.jobDetail.services}
                isLoading={false}
                title={
                  <h6>
                    {translate(this.props.intl, "offerDetail.thisUser", {
                      userType:
                        this.props.jobDetail.jobType === BUY ? BUYER : SELLER
                    })}
                  </h6>
                }
                titleRange={
                  <h5>{translate(this.props.intl, "offerDetail.prefers")}</h5>
                }
                titleServices={
                  <h5>
                    {translate(this.props.intl, "offerDetail.wantsServices")}
                  </h5>
                }
                jobType={this.props.jobDetail.jobType}
              />
            )}

            {this.props.jobDetail.taggedListings && (
              <div>
                <h6>{translate(this.props.intl, "taggedProperties")}</h6>
                <JobTaggedListings
                  taggedListings={this.props.jobDetail.taggedListings}
                  slidesToShow={3}
                  isLoading={false}
                  intl={this.props.intl}
                />
              </div>
            )}
          </Col>
        </Row>

        <Modal
          visible={this.state.editOfferModal}
          onCancel={this.cancelPremiumEdit}
          footer={null}
          wrapClassName="job-summary-modal"
        >
          <ErrorBoundary>
            <AgentOfferForm
              intl={this.props.intl}
              offerDetail={this.props.offerDetail}
              offerId={this.props.match.params.offerId}
              jobDetail={this.props.jobDetail}
              authentication={this.props.authentication}
              saveBuyOffer={this.props.updateBuyOffer}
              saveSellOffer={this.props.updateSellOffer}
              refreshOffer={this.getOfferDetails}
              onNext={this.cancelPremiumEdit}
            />
          </ErrorBoundary>
        </Modal>
      </div>
    );
  }
}

export default AgentOfferDetails;
