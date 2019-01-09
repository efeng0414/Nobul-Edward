import axios from "axios";

import {
  listingsIsLoading,
  masterlistIsLoading,
  getMasterlistSuccess,
  getMasterlistFailure,
  getSingleListingDetailsSuccess,
  getSingleListingDetailsFailure,
  getDetailsAndFeatureImagesSuccess,
  getDetailsAndFeatureImagesFailure,
  getMultipleListingDetailsSuccess,
  getMultipleListingDetailsFailure,
  getFavoriteListingsDetailsSuccess,
  getFavoriteListingsDetailsFailure,
  getTaggedListingsDetailsSuccess,
  getTaggedListingsDetailsFailure,
  sortListingsIdsLoading,
  sortListingsIdsSuccess,
  sortListingsIdsFailure,
  filterListings
} from "../actions/listings";

import {
  fetchAndParseMasterlist,
  fetchSingleListingDetails,
  fetchMultipleDetailsAndFeatureImages
} from "../firebase/listings";

import { BROWSE_PRICE_STEPS_LOOKUP } from "../data/propertyData";

export const getAndParseMasterlist = ({
  provinceOrState = "ON"
}) => dispatch => {
  dispatch(masterlistIsLoading(true));
  fetchAndParseMasterlist(provinceOrState)
    .then(data => {
      dispatch(getMasterlistSuccess(data, provinceOrState));
    })
    .catch(err => {
      dispatch(getMasterlistFailure(err));
    });
};

export const getSingleListingDetails = (
  listingId,
  provinceOrState = "ON"
) => dispatch => {
  dispatch(listingsIsLoading(true));
  return fetchSingleListingDetails(listingId, provinceOrState)
    .then(data => dispatch(getSingleListingDetailsSuccess(data[listingId])))
    .catch(error => dispatch(getSingleListingDetailsFailure(error)));
};

export const getMultipleDetailsAndFeatureImages = (
  listingIds,
  provinceOrState = "ON"
) => dispatch => {
  dispatch(listingsIsLoading(true));
  fetchMultipleDetailsAndFeatureImages(listingIds, provinceOrState)
    .then(data => {
      dispatch(getDetailsAndFeatureImagesSuccess(data));
    })
    .catch(error => {
      dispatch(getDetailsAndFeatureImagesFailure(error));
    });
};

export const getMultipleListingsDetails = (
  listingIds,
  provinceOrState = "ON"
) => dispatch => {
  dispatch(listingsIsLoading(true));
  fetchMultipleDetailsAndFeatureImages(listingIds, provinceOrState)
    .then(data => {
      dispatch(getMultipleListingDetailsSuccess(data));
    })
    .catch(error => {
      dispatch(getMultipleListingDetailsFailure(error));
    });
};

export const getFavoriteListingsDetails = (
  listingIds,
  provinceOrState = "ON"
) => dispatch => {
  dispatch(listingsIsLoading(true));
  fetchMultipleDetailsAndFeatureImages(listingIds, provinceOrState)
    .then(data => {
      dispatch(getFavoriteListingsDetailsSuccess(data));
    })
    .catch(error => {
      dispatch(getFavoriteListingsDetailsFailure(error));
    });
};

export const getTaggedListingsDetails = (
  listingIds,
  provinceOrState
) => dispatch => {
  dispatch(listingsIsLoading(true));
  fetchMultipleDetailsAndFeatureImages(listingIds, provinceOrState)
    .then(data => {
      dispatch(getTaggedListingsDetailsSuccess(data));
    })
    .catch(error => {
      dispatch(getTaggedListingsDetailsFailure(error));
    });
};

export const filterListingsAsync = ({
  filters,
  sortBy,
  latBottom,
  latTop,
  lngLeft,
  lngRight,
  skipSorting
}) => dispatch => {
  dispatch(filterListings(filters));

  // If we don't have coordinates, don't do anything.
  if (skipSorting || (!latBottom || !latTop || !lngLeft || !lngRight)) {
    return Promise.resolve();
  }

  // Sort using API call
  dispatch(sortListingsIdsLoading(true));
  return axios({
    method: "get",
    url: `${process.env.DATA_PLATFORM_LISTING_SERVICE}/sort`,
    params: {
      sortBy: sortBy,
      priceLow: BROWSE_PRICE_STEPS_LOOKUP[filters.priceMin],
      priceHigh: BROWSE_PRICE_STEPS_LOOKUP[filters.priceMax],
      propertyTypes: filters.propertyTypes
        ? filters.propertyTypes.join(",")
        : "",
      minBedrooms: filters.bedrooms,
      minBathrooms: filters.bathrooms,
      minParking: filters.parking,
      latBottom,
      latTop,
      lngLeft,
      lngRight
    }
  })
    .then(listings => dispatch(sortListingsIdsSuccess(listings.data)))
    .catch(error => dispatch(sortListingsIdsFailure(error)));
};
