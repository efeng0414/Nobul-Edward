import {
  getPolygonsForProvinceOrState,
  getPolygonsForSupportedBrowseRegions
} from "../firebase/polygons";
import {
  polygonsIsLoading,
  getPolygonsSuccess,
  getPolygonsFailure,
  getSupportedBrowsePolygonsSuccess,
  getSupportedBrowsePolygonsFailure
} from "../actions/polygons";

export const getPolygonBoundaries = ({ provinceOrState }) => {
  return dispatch => {
    dispatch(polygonsIsLoading({ isLoading: true }));
    return getPolygonsForProvinceOrState({
      provinceOrState
    })
      .then(polygonData =>
        dispatch(getPolygonsSuccess({ provinceOrState, polygonData }))
      )
      .catch(error => dispatch(getPolygonsFailure({ error })));
  };
};

export const getBrowseRegionsPolygons = () => {
  return dispatch => {
    dispatch(polygonsIsLoading({ isLoading: true }));
    getPolygonsForSupportedBrowseRegions()
      .then(polygonData => {
        dispatch(getSupportedBrowsePolygonsSuccess({ polygonData }));
      })
      .catch(error => {
        dispatch(getSupportedBrowsePolygonsFailure({ error }));
      });
  };
};
