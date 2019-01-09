import { connect } from "react-redux";
import EventMenu from "./component";
import {
  deleteEventThunk,
  getEventsForConsumerThunk,
  getEventsForAgentThunk,
  setEventInvisibleAsync
} from "../../../../core/thunk/events";
import { AGENT_USER_TYPE } from "../../../../core/constants/users";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  currentUserType: state.authentication.userType
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: ({ eventId }) => dispatch(deleteEventThunk({ eventId })),
  setEventInvisible: ({ eventId, userType }) =>
    dispatch(setEventInvisibleAsync({ eventId, userType })),
  getEventsForUser: ({ userId, userType }) => {
    const thunkToDispatch =
      userType === AGENT_USER_TYPE
        ? getEventsForAgentThunk({ agentId: userId })
        : getEventsForConsumerThunk({ consumerId: userId });
    return dispatch(thunkToDispatch);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventMenu);
