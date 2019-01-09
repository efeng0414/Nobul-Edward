import { connect } from "react-redux";
import ConsumerViewMyEvents from "./container";
import {
  getConsumerBuyOffers,
  getConsumerSellOffers
} from "../../../core/thunk/offers";
import {
  getEventsForConsumerThunk,
  consumerHasProposedNewTimeThunk
} from "../../../core/thunk/events";
import { getAgentProfileAsync } from "../../../core/thunk/users";

const mapStateToProps = state => ({
  agentProfile: state.users.agentProfile
});

const mapDispatchToProps = dispatch => ({
  getConsumerOffers: ({ consumerId }) =>
    Promise.all([
      dispatch(getConsumerBuyOffers({ consumerId })),
      dispatch(getConsumerSellOffers({ consumerId }))
    ]),
  getConsumerEvents: ({ userId }) =>
    dispatch(getEventsForConsumerThunk({ consumerId: userId })),
  getAgentProfile: ({ userId }) =>
    dispatch(getAgentProfileAsync({ agentId: userId })),
  proposeNewTime: ({ eventId, startTime, endTime }) =>
    dispatch(consumerHasProposedNewTimeThunk({ eventId, startTime, endTime }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ConsumerViewMyEvents
);
