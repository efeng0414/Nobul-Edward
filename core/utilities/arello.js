import { PROVINCES } from "../data/provinces";

const checkIfProvinceIsSupported = province => {
  const foundProvince = PROVINCES.find(item => item.code === province);
  return foundProvince ? foundProvince.supported : false;
};

export { checkIfProvinceIsSupported };
