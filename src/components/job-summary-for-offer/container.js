import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Card, Avatar } from "antd";
import { intlShape } from "react-intl";
import { getAgentProposalUrl } from "../../routes/myNobul";

import ActivityIndicator from "../../components/activity-indicator";
import AgentOfferForm from "../../components/agent-offer-form";
import AgentOfferCongratulations from "../../components/agent-offer-congratulations";
import AgentOfferStatus from "../agent-offer-status";
import { translate } from "../../utilities/locale";
import {
  BUY,
  BUYER,
  SELLER,
  PROMOTE_OFFER
} from "../../../core/constants/shared";
import { bound } from "class-bind";
import moment from "moment";
import requireAuth from "../../utilities/require-auth";
import PaymentModal from "../payment-modal";
import { formatCurrency } from "../../utilities/locale";
import ErrorBoundary from "../error-boundary";
import {
  AGENT_CREATE_PROPOSAL_START,
  AGENT_CREATE_PROPOSAL_SUBMIT
} from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";

import "./styles.scss";

@requireAuth()
class JobSummaryForOffer extends Component {
  state = {
    displayModal: false,
    currentStep: 1,
    paymentModal: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    stripeCards: PropTypes.array,
    saveSellOffer: PropTypes.func.isRequired,
    saveBuyOffer: PropTypes.func.isRequired,
    jobDetail: PropTypes.object,
    agentOffers: PropTypes.array,
    isLoading: PropTypes.bool,
    history: PropTypes.object,
    consumerCity: PropTypes.string,
    authentication: PropTypes.object,
    getStripeCards: PropTypes.func.isRequired,
    authUserId: PropTypes.string.isRequired,
    createStripeSingleChargeAsync: PropTypes.func.isRequired,
    consumerMortgage: PropTypes.number,
    newOffer: PropTypes.object
  };

  static defaultProps = {
    jobDetail: {},
    isLoading: false,
    consumerCity: "",
    authentication: {},
    stripeCards: [],
    getAgentAverageRating: () => {},
    consumerMortgage: 0
  };

  componentDidMount() {
    this.props.getStripeCards(this.props.authUserId);
  }

  @bound
  onNext() {
    this.state.currentStep === 3 &&
      this.setState({
        displayModal: false,
        paymentModal: true
      });
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  @bound
  getModalTitle() {
    if (this.state.currentStep === 2) return undefined;
    if (this.state.currentStep === 1) {
      return translate(this.props.intl, "offer.createTitle", {
        userType: this.props.jobDetail.jobType === BUY ? BUYER : SELLER
      });
    } else {
      return translate(this.props.intl, "offer.promoteTitle");
    }
  }

  @bound
  clickPostingButton() {
    // GTM event
    gtmEvent({ name: AGENT_CREATE_PROPOSAL_START });

    this.toggleModal();
  }

  @bound
  toggleModal() {
    if (this.state.currentStep > 1) {
      // Go to posting page.
      this.props.history.push(
        getAgentProposalUrl({
          offerId: this.props.newOffer.offerId,
          jobType: this.props.newOffer.jobType
        })
      );
    } else {
      this.setState({ displayModal: !this.state.displayModal });
    }
  }

  @bound
  togglePaymentModal() {
    this.setState({
      paymentModal: true,
      displayModal: false,
      currentStep: this.state.currentStep + 1
    });
  }

  @bound
  saveBuyOffer(args) {
    // Pass through all args
    // GTM event
    gtmEvent({ name: AGENT_CREATE_PROPOSAL_SUBMIT });
    return this.props.saveBuyOffer(args);
  }

  @bound
  saveSellOffer(args) {
    // Pass through all args
    // GTM event
    gtmEvent({ name: AGENT_CREATE_PROPOSAL_SUBMIT });
    return this.props.saveSellOffer(args);
  }

  handleSubscribe() {
    // TODO
    // open premium page
  }

  render() {
    return (
      <div className="job-summary">
        <Card bordered={false}>
          <ActivityIndicator
            spinning={this.props.isLoading}
            type={translate(this.props.intl, "loading")}
          >
            <Card.Meta
              avatar={<Avatar icon={"user"} />}
              title={translate(this.props.intl, "agentJobDetail.consumerFrom", {
                userType: this.props.jobDetail.jobType === BUY ? BUYER : SELLER,
                city:
                  this.props.consumerCity && this.props.consumerCity.length
                    ? ` from ${this.props.consumerCity}`
                    : ""
              })}
              description={
                <div>
                  {translate(this.props.intl, "agentJobDetail.jobPosted", {
                    date: moment(this.props.jobDetail.createdAt).format("LL")
                  })}
                  {this.props.consumerMortgage > 0 && (
                    <span>
                      {translate(this.props.intl, "offer.approvedMortgage", {
                        userType:
                          this.props.jobDetail.jobType === BUY ? BUYER : SELLER,
                        mortgage: formatCurrency(this.props.consumerMortgage)
                      })}
                    </span>
                  )}
                </div>
              }
            />

            <AgentOfferStatus
              authUserId={this.props.authUserId}
              agents={this.props.jobDetail.agents}
              isPremium={this.props.isPremium}
              jobStatus={this.props.jobDetail.status}
              jobType={this.props.jobDetail.jobType}
              handleCreateEditClick={this.clickPostingButton}
              handleSubscribe={this.handleSubscribe}
              intl={this.props.intl}
              offerStatus={
                this.props.agentOffers[0] &&
                this.props.agentOffers[0].offerStatus
              }
            />

            <Modal
              visible={this.state.displayModal}
              onCancel={this.toggleModal}
              title={this.getModalTitle()}
              footer={null}
              wrapClassName="job-summary-modal"
            >
              {this.state.currentStep === 1 && (
                <ErrorBoundary>
                  <AgentOfferForm
                    intl={this.props.intl}
                    jobDetail={this.props.jobDetail}
                    authentication={this.props.authentication}
                    saveBuyOffer={this.saveBuyOffer}
                    saveSellOffer={this.saveSellOffer}
                    onNext={this.onNext}
                  />
                </ErrorBoundary>
              )}
              {this.state.currentStep === 2 && (
                <AgentOfferCongratulations
                  intl={this.props.intl}
                  onNext={this.togglePaymentModal}
                />
              )}
            </Modal>
          </ActivityIndicator>
        </Card>
        {this.state.currentStep === 3 && (
          <PaymentModal
            transactionNeeded
            typeofPayment={PROMOTE_OFFER}
            userId={this.props.authUserId}
            toggleVisibility={this.togglePaymentModal}
            visibility={this.state.paymentModal}
            jobDetail={this.props.jobDetail}
            offerId={this.props.agentOffers[0].offerId}
          />
        )}
      </div>
    );
  }
}

export default JobSummaryForOffer;
