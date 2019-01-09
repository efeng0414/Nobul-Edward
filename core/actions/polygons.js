import {
  POLYGONS_IS_LOADING,
  GET_POLYGONS_SUCCESS,
  GET_POLYGONS_FAILURE,
  GET_SUPPORTED_BROWSE_POLYGONS_SUCCESS,
  GET_SUPPORTED_BROWSE_POLYGONS_FAILURE
} from "../types/polygons";

export const polygonsIsLoading = ({ isLoading }) => ({
  type: POLYGONS_IS_LOADING,
  payload: isLoading
});

export const getPolygonsSuccess = ({ provinceOrState, polygonData }) => ({
  type: GET_POLYGONS_SUCCESS,
  payload: {
    provinceOrState,
    polygonData
  }
});

export const getPolygonsFailure = ({ error }) => ({
  type: GET_POLYGONS_FAILURE,
  payload: error
});

export const getSupportedBrowsePolygonsSuccess = ({ polygonData }) => ({
  type: GET_SUPPORTED_BROWSE_POLYGONS_SUCCESS,
  payload: polygonData
});

export const getSupportedBrowsePolygonsFailure = ({ error }) => ({
  type: GET_SUPPORTED_BROWSE_POLYGONS_FAILURE,
  payload: error
});
