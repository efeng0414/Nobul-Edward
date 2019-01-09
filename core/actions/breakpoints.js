import { SET_SCREEN_BREAKPOINT } from "../types/breakpoints";

export const setScreenBreakpoint = ({ currentBreakpoint }) => {
  return {
    type: SET_SCREEN_BREAKPOINT,
    payload: currentBreakpoint
  };
};
