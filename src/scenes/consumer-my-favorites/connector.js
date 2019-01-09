import { connect } from "react-redux";
import ConsumerMyFavorites from "./container";
import { getFavoriteListingsDetails } from "../../../core/thunk/listings";

const mapStateToProps = state => ({
  isUserLoading: state.authentication.isLoading,
  currentUser: state.authentication.currentUser,
  favoriteListings: state.authentication.favoriteListings,
  favoriteProperties: state.listings.favoriteListingsData,
  isListingsLoading: state.listings.isLoading
});

const mapDispatchToProps = dispatch => ({
  getMultipleListings: listingIds =>
    dispatch(getFavoriteListingsDetails(listingIds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsumerMyFavorites);
