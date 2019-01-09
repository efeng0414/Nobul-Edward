import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  setFavoritePropertyAsync,
  removeFavoritePropertyAsync,
  getUsersFavoriteListingsAsync
} from "../../../core/thunk/authentication";

import {
  triggerLoginAsync,
  setFavoriteAsync
} from "../../../core/thunk/anonymousEventListeners";

import ListingCard from "./component";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  isJobsLoading: state.jobs.isLoading,
  favoriteList: state.anonymousEventListeners.favoriteList,
  loginTrigger: state.anonymousEventListeners.loginTrigger
});

const mapDispatchToProps = dispatch => ({
  setPropertyAsFavorite: ({ uid, listing }) =>
    dispatch(setFavoritePropertyAsync(uid, listing)),
  removePropertyAsFavorite: ({ uid, creaId }) =>
    dispatch(removeFavoritePropertyAsync(uid, creaId)),
  getUsersFavoriteListings: ({ userId }) =>
    dispatch(getUsersFavoriteListingsAsync({ userId })),
  triggerLogin: ({ trigger }) => dispatch(triggerLoginAsync({ trigger })),
  setFavorite: ({ favoriteList }) =>
    dispatch(setFavoriteAsync({ favoriteList }))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListingCard)
);
