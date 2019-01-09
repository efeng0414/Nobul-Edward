import { connect } from "react-redux";
import AgentSettings from "./container";
import { BUY, SELL } from "../../../core/constants/shared";
import { getAutoBidKeyFromState } from "../../utilities/auto-bid-data-from-state";
import { checkLicenceData } from "../../utilities/check-licence-data";
import { PRICE_RANGE_FIELD } from "../../../core/constants/shared";

import {
  changeAutoBidStatusAsync,
  getAgentAutoBidStatusAsync
} from "../../../core/thunk/autoBids";
import {
  unsubscribeFromStripePlanAsync,
  checkIfUserHasStripeAsync
} from "../../../core/thunk/stripeCustomers";

const mapStateToProps = state => ({
  isPremium: true, // REMOVE_PREMIUM state.authentication.isPremium,
  hasLicenceData: checkLicenceData({
    verification: state.authentication.verification
  }),
  businessProfileCreated: state.authentication.businessProfileCreated,
  autoBidBuyPriceRange: getAutoBidKeyFromState({
    jobType: BUY,
    authentication: state.authentication,
    key: PRICE_RANGE_FIELD
  }) || [0, 0],
  autoBidSellPriceRange: getAutoBidKeyFromState({
    jobType: SELL,
    authentication: state.authentication,
    key: PRICE_RANGE_FIELD
  }) || [0, 0],

  isLoading: state.users.isLoading,
  autoBidStatusForBuyers:
    state.authentication.autoBid && state.authentication.autoBid.buy
      ? state.authentication.autoBid.buy.status
      : "",
  autoBidStatusForSellers:
    state.authentication.autoBid && state.authentication.autoBid.sell
      ? state.authentication.autoBid.sell.status
      : "",
  currentUser: state.authentication.currentUser,
  subscriptionId: state.stripeCustomers.subscriptionId
});

const mapDispatchToProps = dispatch => ({
  changeAutoBidStatus: ({ agentId, status, jobType }) =>
    dispatch(changeAutoBidStatusAsync({ agentId, status, jobType })),
  unsubscribeFromStripePlanAsync: (userId, subscriptionId) =>
    dispatch(unsubscribeFromStripePlanAsync(userId, subscriptionId)),
  checkUserHasStripeAsync: ({ userId }) =>
    dispatch(checkIfUserHasStripeAsync({ userId })),
  getAutoBidStatusAsync: ({ userId }) =>
    dispatch(getAgentAutoBidStatusAsync({ userId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentSettings);
