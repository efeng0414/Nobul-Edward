import { connect } from "react-redux";
import AgentJobs from "./container";

import {
  getAgentSellOffers,
  getAgentBuyOffers,
  getAgentAutobidOffers,
  getOffersJobDetailsAsync
} from "../../../core/thunk/offers";

import { filterJobs } from "../../../core/actions/jobs";

const mapStateToProps = state => ({
  users: state.authentication,
  sellProposals: state.offers.sell || {},
  buyProposals: state.offers.buy || {},
  autoBid: state.offers.autoBid || {},
  isLoading: state.offers.isLoading,
  filteredJobObjects: state.jobs.filteredJobObjects,
  filters: state.jobs.filters || {},
  isPremium: true // REMOVE_PREMIUM state.authentication.isPremium,
});

const mapDispatchToProps = dispatch => ({
  filterJobs: filters => dispatch(filterJobs(filters)),
  getAgentSellOffers: ({ jobType, userId }) =>
    dispatch(getAgentSellOffers({ jobType, userId })),
  getAgentBuyOffers: ({ jobType, userId }) =>
    dispatch(getAgentBuyOffers({ jobType, userId })),
  getAgentAutobidOffers: userId => dispatch(getAgentAutobidOffers(userId)),
  getOffersJobDetails: ({ offers, jobType }) =>
    dispatch(getOffersJobDetailsAsync({ offers, jobType }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentJobs);
