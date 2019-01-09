import { connect } from "react-redux";
import GenerateContractScreen from "./container";
import { withRouter } from "react-router";

import { getAgentOffersRequiringContracts } from "../../../core/thunk/offers";
import { BUY, SELL } from "../../../core/constants/shared";
import {
  BUY_TO_CONTRACT,
  SELL_TO_CONTRACT
} from "../../../core/constants/offers";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  isLoading:
    state.authentication.currentUser &&
    state.authentication.currentUser.isLoading,
  sellOffers: state.offers[SELL_TO_CONTRACT] || {},
  buyOffers: state.offers[BUY_TO_CONTRACT] || {}
});

const mapDispatchToProps = dispatch => ({
  getAgentSellOffersNeedingContracts: ({ userId }) => {
    dispatch(getAgentOffersRequiringContracts({ jobType: SELL, userId }));
  },
  getAgentBuyOffersNeedingContracts: ({ userId }) => {
    dispatch(getAgentOffersRequiringContracts({ jobType: BUY, userId }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GenerateContractScreen));
