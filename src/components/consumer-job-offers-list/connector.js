import { connect } from "react-redux";
import ConsumerJobDetails from "./component";
import {
  jobBuyOffersSelector,
  jobSellOffersSelector
} from "../../../core/selectors";
import { setOffersFilters } from "../../../core/actions/offers";
import { setOfferHasBeenRead } from "../../../core/thunk/offers";

const mapStateToProps = state => ({
  isLoading: state.offers.isLoading,
  buyOffers: jobBuyOffersSelector(state),
  sellOffers: jobSellOffersSelector(state),
  filters: state.offers.filters,
  agents: state.users.agents
});

const mapDispatchToProps = dispatch => ({
  setOffersFilters: ({ filters }) => dispatch(setOffersFilters({ filters })),
  setOfferHasBeenRead: ({ jobType, offerId }) =>
    dispatch(setOfferHasBeenRead({ jobType, offerId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerJobDetails);
