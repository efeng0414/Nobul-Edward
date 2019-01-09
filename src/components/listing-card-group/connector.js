import { connect } from "react-redux";
import ListingCardGroup from "./component";
import { getUsersFavoriteListings } from "../../../core/thunk/authentication";
import { getAllConsumerBuyJobs } from "../../../core/thunk/jobs";

const mapStateToProps = state => ({
  usersFavorites: state.authentication.favoriteListings,
  usersJobs: state.jobs.buy,
  currentUser: state.authentication.currentUser
});

const mapDispatchToProps = dispatch => ({
  getFavoriteListings: ({ userId }) =>
    dispatch(getUsersFavoriteListings({ userId })),
  getAllConsumerBuyJobs: ({ userId }) => dispatch(getAllConsumerBuyJobs(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingCardGroup);
