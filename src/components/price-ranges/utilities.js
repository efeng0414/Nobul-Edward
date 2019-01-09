import { PRICE_RANGE_SELECTOR_CLASS_NAME } from "../../utilities/constants";

export const getSelectorParent = () =>
  document.querySelector(`.${PRICE_RANGE_SELECTOR_CLASS_NAME}`);
