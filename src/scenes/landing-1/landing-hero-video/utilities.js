import { gtmEvent } from "../../../utilities/gtm-event";
import onlyOnce from "../../../utilities/only-once";

export const videoOptions = {
  playerVars: {
    controls: 0,
    rel: 0
  },
  width: "100%",
  height: "270"
};

export const videoStartGtmEvent = onlyOnce({ fn: gtmEvent });
export const videoHalfWayGtmEvent = onlyOnce({ fn: gtmEvent });
export const videoEndGtmEvent = onlyOnce({ fn: gtmEvent });
