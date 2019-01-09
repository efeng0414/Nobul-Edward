import { connect } from "react-redux";
import ListingList from "./component";
import { getUsersFavoriteListingsAsync } from "../../../core/thunk/authentication";
import { getAllConsumerBuyJobs } from "../../../core/thunk/jobs";

const mapStateToProps = state => ({
  usersFavorites: state.authentication.favoriteListings,
  usersJobs: state.jobs.buy
});

const mapDispatchToProps = dispatch => ({
  getFavoriteListings: ({ userId }) =>
    dispatch(getUsersFavoriteListingsAsync({ userId })),
  getAllConsumerBuyJobs: ({ userId }) => dispatch(getAllConsumerBuyJobs(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingList);
