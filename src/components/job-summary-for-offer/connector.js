import { connect } from "react-redux";
import JobSummaryForOffer from "./container";
import { saveSellOffer, saveBuyOffer } from "../../../core/thunk/offers";
import { getCustomerCardsAsync } from "../../../core/thunk/stripeCustomers";
import { createStripeSingleChargeAsync } from "../../../core/thunk/stripeCustomers";
import { jobOfferByAgentId } from "../../../core/selectors";

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    isLoading: state.users.isLoading,
    newOffer: state.offers.newOffer,
    consumerCity: state.users.consumerProfile.city,
    consumerMortgage: parseFloat(
      state.users.consumerProfile.preApprovedMortgage
    ),
    jobDetail: state.jobs.jobDetail,
    stripeCards: state.stripeCustomers.cards,
    agentOffers: jobOfferByAgentId(state),
    isPremium: true // REMOVE_PREMIUM state.authentication.isPremium
  };
};

const mapDispatchToProps = dispatch => ({
  saveSellOffer: ({ jobType, offer }) =>
    dispatch(saveSellOffer({ jobType, offer })),
  saveBuyOffer: ({ jobType, offer }) =>
    dispatch(saveBuyOffer({ jobType, offer })),
  getStripeCards: userId => dispatch(getCustomerCardsAsync({ userId })),
  createStripeSingleChargeAsync: ({ userId, charge }) =>
    dispatch(createStripeSingleChargeAsync({ userId, charge }))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobSummaryForOffer);
