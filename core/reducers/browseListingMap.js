import {
  SAVE_CURRENT_LISTING_LIST,
  CLEAR_CURRENT_LISTING_LIST,
  SET_BROWSE_LOCATION
} from "../types/browseListingMap";

const defaultState = {
  currentListingList: [],
  browseLocation: ""
};

const browseListingMapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_LISTING_LIST:
      return {
        ...state,
        currentListingList: action.payload
      };
    case CLEAR_CURRENT_LISTING_LIST:
      return {
        ...state,
        currentListingList: []
      };
    case SET_BROWSE_LOCATION:
      return {
        ...state,
        browseLocation: action.payload
      };
    default:
      return state;
  }
};

export default browseListingMapReducer;
