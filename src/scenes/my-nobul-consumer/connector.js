import { connect } from "react-redux";
import MyNobul from "./container";
import { withRouter } from "react-router";
import { getEventsForConsumerThunk } from "../../../core/thunk/events";
import { doesRequireAttentionForConsumer } from "../../utilities/event-status";
import { filterByCurrentDate } from "../../components/event-list/utilities";

const mapStateToProps = state => ({
  profile: state.authentication.profile,
  eventCount: Object.entries(state.events.list)
    .filter(doesRequireAttentionForConsumer)
    .filter(filterByCurrentDate).length,
});

const mapDispatchToProps = dispatch => ({
  getEventsForConsumer: ({ consumerId }) =>
    dispatch(getEventsForConsumerThunk({ consumerId }))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyNobul)
);
