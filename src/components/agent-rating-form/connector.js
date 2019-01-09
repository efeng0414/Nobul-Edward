/*
* TODO:
* 1. Grab the currentOffer from the page the form is used on
*/
import { connect } from "react-redux";
import AgentRatingForm from "./component";
import { saveAgentRating } from "../../../core/thunk/agentRatings";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  agentRatings: state.agentRatings
});

const mapDispatchToProps = dispatch => ({
  pushAgentRating: ({ agentRatingData, offer }) => {
    dispatch(saveAgentRating(agentRatingData, offer));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentRatingForm);
