import {
  SAVE_CURRENT_LISTING_LIST,
  CLEAR_CURRENT_LISTING_LIST,
  SET_BROWSE_LOCATION
} from "../types/browseListingMap";

export const saveCurrentListingList = ({ listingList }) => ({
  type: SAVE_CURRENT_LISTING_LIST,
  payload: listingList
});

export const clearCurrentListingList = () => ({
  type: CLEAR_CURRENT_LISTING_LIST
});

export const setBrowseLocation = ({ provinceOrState }) => ({
  type: SET_BROWSE_LOCATION,
  payload: provinceOrState
});
