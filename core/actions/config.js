import { SET_ACTIVE_FEATURES } from "../types/config";

export const setActiveFeatures = features => {
  return {
    type: SET_ACTIVE_FEATURES,
    payload: features
  };
};
