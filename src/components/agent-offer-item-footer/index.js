import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { Button, Modal } from "antd";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import {
  OFFER_NOT_ACCEPTED,
  OFFER_REJECTED,
  OFFER_OPEN
} from "../../../core/constants/offers";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";
import WithdrawOfferModal from "../withdraw-offer-modal";
import * as Routes from "../../routes/myNobul";
import { WEBFORM } from "../../../core/constants/shared";
import AgentOfferForm from "../agent-offer-form";
import ErrorBoundary from "../../components/error-boundary";

import { AGENT_DASHBOARD_WITHDRAW_PROPOSAL } from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";

import "./styles.scss";

@withRouter
class AgentOfferItemFooter extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    offerDetail: PropTypes.object,
    promoteOffer: PropTypes.func,
    withdrawOffer: PropTypes.func,
    jobType: PropTypes.string,
    getWinningOffer: PropTypes.func,
    isPremium: PropTypes.bool,
    history: PropTypes.object,
    currentUser: PropTypes.object,
    createStripeSingleCharge: PropTypes.func,
    jobDetail: PropTypes.object,
    stripeCards: PropTypes.array,
    authentication: PropTypes.object,
    updateBuyOffer: PropTypes.func,
    updateSellOffer: PropTypes.func
  };

  static defaultProps = {
    isPremium: false,
    jobDetail: {},
    offerDetail: {},
    currentUser: {},
    stripeCards: [],
    promoteOffer: () => {},
    withdrawOffer: () => {},
    getWinningOffer: () => {},
    createStripeSingleCharge: () => {}
  };

  state = {
    withdrawProposalVisibility: false,
    showWithdraw: false,
    showButtons: false,
    promoteOfferModalVisibility: false,
    displayWinningOffer: false,
    editOfferModal: false
  };

  componentDidMount() {
    (this.props.offerDetail.status === OFFER_NOT_ACCEPTED &&
      this.props.isPremium) ||
      (this.props.offerDetail.status === OFFER_REJECTED &&
        this.props.isPremium &&
        this.setState({ showWithdraw: true }));
    this.props.offerDetail.status === OFFER_OPEN &&
      this.setState({
        showButtons: true
      });
  }

  @bound
  toggleWithdrawProposalVisibility() {
    // GTM event only when opened.
    if (!this.state.withdrawProposalVisibility) {
      gtmEvent({ name: AGENT_DASHBOARD_WITHDRAW_PROPOSAL });
    }

    this.setState({
      withdrawProposalVisibility: !this.state.withdrawProposalVisibility
    });
  }

  @bound
  goToGenerateContracts() {
    this.props.history.push(
      Routes.url.generateAgreement
        .replace(":format?", WEBFORM)
        .replace(":formType?", this.props.jobType)
        .replace(":offerId?", this.props.offerDetail.id)
    );
  }

  @bound
  togglePromoteOfferModal() {
    this.setState({
      promoteOfferModalVisibility: !this.state.promoteOfferModalVisibility
    });
  }

  @bound
  toogleDisplayWinningOffer() {
    this.setState({
      displayWinningOffer: !this.state.displayWinningOffer
    });
  }

  @bound
  getWinningOffer() {
    const obj = {
      jobType: this.props.jobDetail.jobType,
      jobId: this.props.offerDetail.jobId
    };

    this.props.getWinningOffer(obj).then(() => {
      this.toogleDisplayWinningOffer();
    });
  }

  @bound
  togglePremiumEdit() {
    this.setState({
      editOfferModal: !this.state.editOfferModal
    });
  }

  render() {
    return (
      <div>
        {/* // REMOVE_PROMOTED
        {this.state.showWithdraw && (
          <div>
            <div className="footer-container">
              <div className="footer-container-item">
                <Button onClick={this.getWinningOffer}>
                  {translate(this.props.intl, "button.winningOffer")}
                </Button>
              </div>
            </div>
            <Modal
              visible={this.state.displayWinningOffer}
              footer={null}
              onCancel={this.toogleDisplayWinningOffer}
            >
              <AgentWinningOffer
                intl={this.props.intl}
                jobId={this.props.jobDetail.jobId}
                jobType={this.props.jobDetail.jobType}
                callThunk={false}
                displayBackground={false}
              />
            </Modal>
          </div>
        )} */}
        {this.state.showButtons && (
          <div className="footer-container">
            {/* // REMOVE_PROMOTED
            {this.props.isPremium &&
              !this.props.offerDetail.isPromoted && (
                <div className="footer-container-item">
                  <Button onClick={this.togglePromoteOfferModal}>
                    {translate(this.props.intl, "button.promote")}
                  </Button>

                  {this.state.promoteOfferModalVisibility && (
                    <PaymentModal
                      transactionNeeded
                      typeofPayment={PROMOTE_OFFER}
                      userId={this.props.currentUser.uid}
                      toggleVisibility={this.togglePromoteOfferModal}
                      visibility={this.state.promoteOfferModalVisibility}
                      jobDetail={this.props.jobDetail}
                      offerId={this.props.offerDetail.id}
                    />
                  )}
                </div>
              )} */}
            {this.props.isPremium && (
              <div className="footer-container-item">
                <Button onClick={this.togglePremiumEdit}>
                  {translate(this.props.intl, "button.update")}
                </Button>
                <Modal
                  visible={this.state.editOfferModal}
                  onCancel={this.togglePremiumEdit}
                  footer={null}
                  wrap
                >
                  <ErrorBoundary>
                    <AgentOfferForm
                      intl={this.props.intl}
                      offerDetail={this.props.offerDetail}
                      offerId={this.props.offerDetail.id}
                      jobDetail={this.props.jobDetail}
                      authentication={this.props.authentication}
                      saveBuyOffer={this.props.updateBuyOffer}
                      saveSellOffer={this.props.updateSellOffer}
                      onNext={this.togglePremiumEdit}
                    />
                  </ErrorBoundary>
                </Modal>
              </div>
            )}
            <div className="footer-container-item">
              <Button onClick={this.toggleWithdrawProposalVisibility}>
                {translate(this.props.intl, "button.withdraw")}
              </Button>
              <WithdrawOfferModal
                intl={this.props.intl}
                visibility={this.state.withdrawProposalVisibility}
                onClose={this.toggleWithdrawProposalVisibility}
                withdrawOffer={this.props.withdrawOffer}
                jobType={this.props.jobType}
                offerId={this.props.offerDetail.id}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(AgentOfferItemFooter);
