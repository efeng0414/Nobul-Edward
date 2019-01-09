import * as REGIONS from "../../../core/constants/regions";
import { DEFAULT_REGION } from "../../../core/constants/shared";

export const getLabelKeyForProvinceOrState = ({ provinceOrState }) => {
  const supportedLocations = Object.values(REGIONS);
  return supportedLocations.includes(provinceOrState)
    ? provinceOrState
    : DEFAULT_REGION;
};
