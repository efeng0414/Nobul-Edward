import { connect } from "react-redux";
import OfferSettingsLandingSummary from "./container";

import { getAgentRating } from "../../../../../core/thunk/agentRatings";
import {
  getAgentBuyOffers,
  getAgentSellOffers,
  getAgentAutobidOffers
} from "../../../../../core/thunk/offers";
import {
  OFFER_ACCEPTED,
  OFFER_ACCEPTED_CONFIRMED
} from "../../../../../core/constants/offers";
import { getOfferStatusCount } from "./utilities";

const mapStateToProps = state => ({
  agentRatings: state.agentRatings,
  totalAcceptedOffers: getOfferStatusCount({
    buyOffers: state.offers.buy,
    sellOffers: state.offers.sell,
    autoBidOffers: state.offers.autoBid,
    offerStatus: OFFER_ACCEPTED
  }),
  totalAcceptedConfirmedOffers: getOfferStatusCount({
    buyOffers: state.offers.buy,
    sellOffers: state.offers.sell,
    autoBidOffers: state.offers.autoBid,
    offerStatus: OFFER_ACCEPTED_CONFIRMED
  })
});

const mapDispatchToProps = dispatch => ({
  getAgentBuyOffers: ({ jobType, userId }) =>
    dispatch(getAgentBuyOffers({ jobType, userId })),
  getAgentSellOffers: ({ jobType, userId }) =>
    dispatch(getAgentSellOffers({ jobType, userId })),
  getAgentAutobidOffers: userId => dispatch(getAgentAutobidOffers(userId)),
  getAgentRating: ({ agentId }) => dispatch(getAgentRating({ agentId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  OfferSettingsLandingSummary
);
