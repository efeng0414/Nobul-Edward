import { connect } from "react-redux";
import AgentViewMyEvents from "./container";
import {
  getAgentBuyOffers,
  getAgentSellOffers
} from "../../../core/thunk/offers";
import { BUY, SELL } from "../../../core/constants/shared";
import {
  getEventsForAgentThunk,
  agentHasProposedNewTimeThunk
} from "../../../core/thunk/events";
import { getConsumerProfileAsync } from "../../../core/thunk/users";

const mapStateToProps = state => ({
  consumerProfile: state.users.consumerProfile
});

const mapDispatchToProps = dispatch => ({
  getAgentOffers: ({ agentId }) =>
    Promise.all([
      dispatch(getAgentBuyOffers({ userId: agentId, jobType: BUY })),
      dispatch(getAgentSellOffers({ userId: agentId, jobType: SELL }))
    ]),
  getAgentEvents: ({ userId }) =>
    dispatch(getEventsForAgentThunk({ agentId: userId })),
  getConsumerProfile: ({ userId }) =>
    dispatch(getConsumerProfileAsync({ consumerId: userId })),
  proposeNewTime: ({ eventId, startTime, endTime }) =>
    dispatch(agentHasProposedNewTimeThunk({ eventId, startTime, endTime }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentViewMyEvents);
