import { SET_SCREEN_BREAKPOINT } from "../types/breakpoints";

const defaultState = {
  currentBreakPoint: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_SCREEN_BREAKPOINT:
      return {
        ...state,
        currentBreakPoint: action.payload.currentBreakpoint
      };
    default:
      return { ...state };
  }
};
