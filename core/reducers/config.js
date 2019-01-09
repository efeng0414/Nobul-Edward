import { SET_ACTIVE_FEATURES } from "../types/config";

const defaultState = {
  features: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_FEATURES:
      return {
        ...state,
        features: action.payload
      };
    default:
      return { ...state };
  }
};
