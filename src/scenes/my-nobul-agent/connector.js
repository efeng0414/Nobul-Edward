import { connect } from "react-redux";
import AgentMyNobul from "./container";
import { doesRequireAttentionForAgent } from "../../utilities/event-status";
import { filterByCurrentDate } from "../../components/event-list/utilities";
import { getEventsForAgentThunk } from "../../../core/thunk/events";

const mapStateToProps = state => ({
  profile: state.authentication.profile,
  eventCount: Object.entries(state.events.list)
    .filter(doesRequireAttentionForAgent)
    .filter(filterByCurrentDate).length
});

const mapDispatchToProps = dispatch => ({
  getEventsForAgent: ({ agentId }) =>
    dispatch(getEventsForAgentThunk({ agentId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentMyNobul);
