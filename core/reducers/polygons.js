import {
  POLYGONS_IS_LOADING,
  GET_POLYGONS_SUCCESS,
  GET_POLYGONS_FAILURE,
  GET_SUPPORTED_BROWSE_POLYGONS_SUCCESS,
  GET_SUPPORTED_BROWSE_POLYGONS_FAILURE
} from "../types/polygons";

const defaultState = {
  isLoading: false,
  supportedBrowsePolygons: {},
  boundaries: {},
  error: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case POLYGONS_IS_LOADING:
      return { ...state, isLoading: action.payload, error: {} };
    case GET_POLYGONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        boundaries: {
          [action.payload.provinceOrState]: action.payload.polygonData,
          ...state.boundaries
        },
        error: {}
      };
    case GET_POLYGONS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GET_SUPPORTED_BROWSE_POLYGONS_SUCCESS:
      return {
        ...state,
        supportedBrowsePolygons: action.payload,
        isLoading: false,
        error: {}
      };
    case GET_SUPPORTED_BROWSE_POLYGONS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
