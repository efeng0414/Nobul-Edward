import { getProvinceCode } from "../../../core/utilities/get-province-code";

export const getProvinceOrStateArray = ({ regionsObject }) =>
  Object.values(regionsObject)
    .reduce(
      (accumulator, regionObject) =>
        accumulator.includes(regionObject.province)
          ? accumulator
          : [...accumulator, regionObject.province],
      []
    )
    .map(provinceOrState => getProvinceCode({ provinceOrState }));
