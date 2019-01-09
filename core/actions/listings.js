import {
  LISTINGS_IS_LOADING,
  MASTERLIST_IS_LOADING,
  GET_MASTERLIST_SUCCESS,
  GET_MASTERLIST_FAILURE,
  GET_SINGLE_LISTING_DETAILS_SUCCESS,
  GET_SINGLE_LISTING_DETAILS_FAILURE,
  GET_MULTIPLE_LISTING_DETAILS_SUCCESS,
  GET_MULTIPLE_LISTING_DETAILS_FAILURE,
  GET_FAVORITE_LISTINGS_DETAILS_SUCCESS,
  GET_FAVORITE_LISTINGS_DETAILS_FAILURE,
  GET_TAGGED_LISTINGS_DETAILS_SUCCESS,
  GET_TAGGED_LISTINGS_DETAILS_FAILURE,
  GET_DETAILS_AND_FEATURE_IMAGES_SUCCESS,
  GET_DETAILS_AND_FEATURE_IMAGES_FAILURE,
  FILTER_LISTINGS,
  SORT_LISTINGS_IDS_LOADING,
  SORT_LISTINGS_IDS_SUCCESS,
  SORT_LISTINGS_IDS_FAILURE
} from "../types/listings";

export const listingsIsLoading = isLoading => ({
  type: LISTINGS_IS_LOADING,
  payload: isLoading
});

export const masterlistIsLoading = isLoading => ({
  type: MASTERLIST_IS_LOADING,
  payload: isLoading
});

export const getMasterlistSuccess = (masterlist, provinceOrState) => ({
  type: GET_MASTERLIST_SUCCESS,
  payload: {
    masterlist,
    provinceOrState
  }
});

export const getMasterlistFailure = error => ({
  type: GET_MASTERLIST_FAILURE,
  payload: error
});

export const getSingleListingDetailsSuccess = data => ({
  type: GET_SINGLE_LISTING_DETAILS_SUCCESS,
  payload: data
});

export const getSingleListingDetailsFailure = data => ({
  type: GET_SINGLE_LISTING_DETAILS_FAILURE,
  payload: data
});

export const getMultipleListingDetailsSuccess = data => ({
  type: GET_MULTIPLE_LISTING_DETAILS_SUCCESS,
  payload: data
});

export const getMultileListingDetailsFailure = data => ({
  type: GET_MULTIPLE_LISTING_DETAILS_FAILURE,
  payload: data
});

export const getDetailsAndFeatureImagesSuccess = data => ({
  type: GET_DETAILS_AND_FEATURE_IMAGES_SUCCESS,
  payload: data
});

export const getDetailsAndFeatureImagesFailure = error => ({
  type: GET_DETAILS_AND_FEATURE_IMAGES_FAILURE,
  payload: error
});

export const filterListings = filter => ({
  type: FILTER_LISTINGS,
  payload: filter
});

export const getFavoriteListingsDetailsSuccess = data => ({
  type: GET_FAVORITE_LISTINGS_DETAILS_SUCCESS,
  payload: data
});

export const getFavoriteListingsDetailsFailure = data => ({
  type: GET_FAVORITE_LISTINGS_DETAILS_FAILURE,
  payload: data
});

export const getTaggedListingsDetailsSuccess = data => ({
  type: GET_TAGGED_LISTINGS_DETAILS_SUCCESS,
  payload: data
});

export const getTaggedListingsDetailsFailure = data => ({
  type: GET_TAGGED_LISTINGS_DETAILS_FAILURE,
  payload: data
});

export const sortListingsIdsSuccess = listingIds => ({
  type: SORT_LISTINGS_IDS_SUCCESS,
  payload: listingIds
});

export const sortListingsIdsFailure = error => ({
  type: SORT_LISTINGS_IDS_FAILURE,
  payload: error
});

export const sortListingsIdsLoading = error => ({
  type: SORT_LISTINGS_IDS_LOADING,
  payload: error
});
