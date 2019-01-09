import { connect } from "react-redux";
import { withRouter } from "react-router";
import ConsumerOffers from "./container";
import {
  getAllConsumerBuyJobs,
  getAllConsumerSellJobs
} from "../../../core/thunk/jobs";
import {
  getConsumerBuyOffers,
  getConsumerSellOffers
} from "../../../core/thunk/offers";
import { getMultipleAgentsWithAvatar } from "../../../core/thunk/users";

const mapStateToProps = state => ({
  buyJobs: state.jobs.buy,
  sellJobs: state.jobs.sell,
  buyOffers: state.offers.buy,
  sellOffers: state.offers.sell,
  isLoading: state.jobs.isLoading
});

const mapDispatchToProps = dispatch => ({
  getConsumerJobs: ({ userId }) =>
    Promise.all([
      dispatch(getAllConsumerBuyJobs(userId)),
      dispatch(getAllConsumerSellJobs(userId))
    ]),
  getMultipleAgentsWithAvatar: ({ agentIdArray }) =>
    dispatch(getMultipleAgentsWithAvatar({ agentIdArray })),
  getConsumerOffers: ({ consumerId }) =>
    Promise.all([
      dispatch(getConsumerBuyOffers({ consumerId })),
      dispatch(getConsumerSellOffers({ consumerId }))
    ])
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConsumerOffers));
