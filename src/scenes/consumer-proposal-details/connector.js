import { connect } from "react-redux";
import ConsumerProposalDetails from "./container";

const mapStateToProps = state => ({
  offer: state.offers.offerDetail,
  currentUser: state.authentication.currentUser,
  agentProfile: state.users.agent,
  jobDetail: state.jobs.jobDetail,
  events: state.events.list
});

const mapDispatchToProps = dispatch => ({
  //
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ConsumerProposalDetails
);
