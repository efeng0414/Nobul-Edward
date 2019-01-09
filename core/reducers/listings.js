import {
  LISTINGS_IS_LOADING,
  MASTERLIST_IS_LOADING,
  GET_MASTERLIST_SUCCESS,
  GET_MASTERLIST_FAILURE,
  GET_SINGLE_LISTING_DETAILS_SUCCESS,
  GET_SINGLE_LISTING_DETAILS_FAILURE,
  GET_MULTIPLE_LISTING_DETAILS_SUCCESS,
  GET_MULTIPLE_LISTING_DETAILS_FAILURE,
  GET_DETAILS_AND_FEATURE_IMAGES_SUCCESS,
  GET_DETAILS_AND_FEATURE_IMAGES_FAILURE,
  FILTER_LISTINGS,
  GET_FAVORITE_LISTINGS_DETAILS_SUCCESS,
  GET_FAVORITE_LISTINGS_DETAILS_FAILURE,
  GET_TAGGED_LISTINGS_DETAILS_SUCCESS,
  GET_TAGGED_LISTINGS_DETAILS_FAILURE,
  SORT_LISTINGS_IDS_LOADING,
  SORT_LISTINGS_IDS_SUCCESS,
  SORT_LISTINGS_IDS_FAILURE
} from "../types/listings";

const defaultState = {
  isLoading: false,
  masterlistIsLoading: false,
  sortLoading: false,
  masterlist: [],
  listingsData: [],
  error: {},
  filters: {},
  currentListing: {},
  favoriteListingsData: [],
  filteredListings: [],
  taggedListingsData: [],
  sortedListingIds: []
};

const getFilteredListings = (listings, filter) => {
  const optionsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const {
    bedrooms,
    bathrooms,
    parking,
    priceMin,
    priceMax,
    propertyTypes
  } = filter;

  const bedroomQuery = optionsArray.slice(bedrooms);
  const bathroomQuery = optionsArray.slice(bathrooms);
  const parkingQuery = optionsArray.slice(parking);

  let filteredListings = [];
  for (let i = 0; i < listings.length; i++) {
    const listingDetails = listings[i].properties;
    if (!listingDetails) {
      continue;
    }

    if (!bathroomQuery.includes(listingDetails.bathrooms)) {
      continue;
    }
    if (!bedroomQuery.includes(listingDetails.bedrooms)) {
      continue;
    }
    if (!parkingQuery.includes(0) && !listingDetails.parking) {
      continue;
    }
    if (propertyTypes && !propertyTypes.includes(listingDetails.propertyType)) {
      continue;
    }
    if (
      listingDetails.priceRange < priceMin ||
      listingDetails.priceRange >= priceMax
    ) {
      continue;
    }
    filteredListings.push(listings[i]);
  }
  return filteredListings;
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LISTINGS_IS_LOADING:
      return { ...state, error: {}, isLoading: true };

    case MASTERLIST_IS_LOADING:
      return { ...state, error: {}, masterlistIsLoading: true };

    case GET_MASTERLIST_SUCCESS:
      return {
        ...state,
        masterlist: action.payload.masterlist,
        masterListProvinceOrState: action.payload.provinceOrState,
        error: {},
        masterlistIsLoading: false
      };

    case GET_MASTERLIST_FAILURE:
      return { ...state, error: action.payload, masterlistIsLoading: false };

    case GET_SINGLE_LISTING_DETAILS_SUCCESS:
      return {
        ...state,
        currentListing: action.payload,
        error: {},
        isLoading: false
      };

    case GET_SINGLE_LISTING_DETAILS_FAILURE:
      return {
        ...state,
        currentListing: {},
        error: action.payload,
        isLoading: false
      };

    case GET_DETAILS_AND_FEATURE_IMAGES_SUCCESS:
      return {
        ...state,
        listingsData: [...state.listingsData, ...action.payload],
        error: {},
        isLoading: false
      };

    case GET_DETAILS_AND_FEATURE_IMAGES_FAILURE:
      return {
        ...state,
        listingsData: [],
        error: action.payload,
        isLoading: false
      };

    case SORT_LISTINGS_IDS_LOADING:
      return {
        ...state,
        sortedListingIds: [],
        sortError: {},
        sortLoading: true
      };

    case SORT_LISTINGS_IDS_SUCCESS:
      return {
        ...state,
        sortedListingIds: action.payload,
        sortError: {},
        sortLoading: false
      };

    case SORT_LISTINGS_IDS_FAILURE:
      return {
        ...state,
        sortedListingIds: [],
        sortError: action.payload,
        sortLoading: false
      };

    case FILTER_LISTINGS:
      return {
        ...state,
        filteredListings: getFilteredListings(state.masterlist, action.payload),
        filters: action.payload,
        error: {},
        isLoading: false
      };
    case GET_MULTIPLE_LISTING_DETAILS_SUCCESS:
      return {
        ...state,
        listingData: action.payload,
        error: {},
        isLoading: false
      };
    case GET_MULTIPLE_LISTING_DETAILS_FAILURE:
      return {
        ...state,
        listingData: [],
        error: action.payload,
        isLoading: false
      };
    case GET_FAVORITE_LISTINGS_DETAILS_SUCCESS:
      return {
        ...state,
        favoriteListingsData: action.payload,
        error: {},
        isLoading: false
      };
    case GET_FAVORITE_LISTINGS_DETAILS_FAILURE:
      return {
        ...state,
        favoriteListingsData: [],
        error: action.payload,
        isLoading: false
      };
    case GET_TAGGED_LISTINGS_DETAILS_SUCCESS:
      return {
        ...state,
        taggedListingsData: action.payload,
        error: {},
        isLoading: false
      };
    case GET_TAGGED_LISTINGS_DETAILS_FAILURE:
      return {
        ...state,
        taggedListingsData: [],
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
