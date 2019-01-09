import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";

import {
  OFFER_LANDING,
  OFFER_STANDARD_BUYER,
  OFFER_STANDARD_SELLER,
  OFFER_AUTOBID_BUYER,
  OFFER_AUTOBID_SELLER
} from "../../../../../core/constants/offers";
import { BUY, SELL } from "../../../../../core/constants/shared";
import StandardOfferSettingsForm from "../../../forms/agent/standard-offer-settings-form";
import OfferSettingsLanding from "../offer-settings-landing";
import { AgentRequestSetStandardProposal } from "../../../agent-request-set-standard-proposal";

@injectIntl
@withRouter
class OfferSettings extends Component {
  state = {
    stage: OFFER_LANDING
  };

  static propTypes = {
    intl: intlShape.isRequired,
    isPremium: PropTypes.bool,
    authUserId: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    businessProfileCreated: PropTypes.bool.isRequired,
    autoBidBuyPriceRange: PropTypes.array.isRequired,
    autoBidSellPriceRange: PropTypes.array.isRequired,

    isLoading: PropTypes.bool,
    autoBidStatusForBuyers: PropTypes.string,
    autoBidStatusForSellers: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    changeAutoBidStatus: PropTypes.func.isRequired,
    unsubscribeFromStripePlanAsync: PropTypes.func.isRequired,
    checkUserHasStripeAsync: PropTypes.func.isRequired,
    getAutoBidStatusAsync: PropTypes.func.isRequired,
    subscriptionId: PropTypes.string,
    hasLicenceData: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isPremium: false
  };

  @bound
  onClick({ stage }) {
    [
      OFFER_STANDARD_BUYER,
      OFFER_STANDARD_SELLER,
      OFFER_AUTOBID_BUYER,
      OFFER_AUTOBID_SELLER
    ].includes(stage) && !this.props.businessProfileCreated
      ? AgentRequestSetStandardProposal({
          history: this.props.history,
          intl: this.props.intl,
          errorText: "agentSettings.offer.createStandardProposalError"
        })
      : this.setState({ stage });
  }

  @bound
  getStageComponent() {
    const { state = {} } = this.props.history.location;
    const { afterSubscribeAutobid = false } = state;

    switch (this.state.stage) {
      case OFFER_LANDING:
        return (
          <OfferSettingsLanding
            intl={this.props.intl}
            isPremium={this.props.isPremium}
            onClick={this.onClick}
            afterSubscribeAutobid={afterSubscribeAutobid}
            authUserId={this.props.authUserId}
            isLoading={this.props.isLoading}
            autoBidStatusForBuyers={this.props.autoBidStatusForBuyers}
            autoBidStatusForSellers={this.props.autoBidStatusForSellers}
            currentUser={this.props.currentUser}
            changeAutoBidStatus={this.props.changeAutoBidStatus}
            unsubscribeFromStripePlanAsync={
              this.props.unsubscribeFromStripePlanAsync
            }
            checkUserHasStripeAsync={this.props.checkUserHasStripeAsync}
            getAutoBidStatusAsync={this.props.checkUserHasStripeAsync}
            subscriptionId={this.props.subscriptionId}
            hasLicenceData={this.props.hasLicenceData}
            businessProfileCreated={this.props.businessProfileCreated}
            history={this.props.history}
          />
        );
      case OFFER_STANDARD_BUYER:
        return (
          <StandardOfferSettingsForm
            intl={this.props.intl}
            jobType={BUY}
            onClick={this.onClick}
          />
        );
      case OFFER_STANDARD_SELLER:
        return (
          <StandardOfferSettingsForm
            intl={this.props.intl}
            jobType={SELL}
            onClick={this.onClick}
          />
        );
      case OFFER_AUTOBID_BUYER:
        return (
          <StandardOfferSettingsForm
            intl={this.props.intl}
            jobType={BUY}
            onClick={this.onClick}
            autoBidSettings
            autoBidBuyPriceRange={this.props.autoBidBuyPriceRange}
          />
        );
      case OFFER_AUTOBID_SELLER:
        return (
          <StandardOfferSettingsForm
            intl={this.props.intl}
            jobType={SELL}
            onClick={this.onClick}
            autoBidSettings
            autoBidSellPriceRange={this.props.autoBidSellPriceRange}
          />
        );
      default:
        return (
          <StandardOfferSettingsForm
            intl={this.props.intl}
            jobType={SELL}
            isAutobid={true}
            onClick={this.onClick}
          />
        );
    }
  }

  render() {
    return <div className="proposal-settings">{this.getStageComponent()}</div>;
  }
}

export default OfferSettings;
