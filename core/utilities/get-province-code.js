import { PROVINCES } from "../data/provinces";

export const getProvinceCode = ({ provinceOrState }) => {
  const province = PROVINCES.find(
    province =>
      provinceOrState &&
      province &&
      (province.code.toLowerCase() === provinceOrState.trim().toLowerCase() ||
        province.label.toLowerCase() === provinceOrState.trim().toLowerCase())
  );
  return province ? province.code : "";
};

export const getProvinceOrStateCoordinates = ({ provinceOrState }) => {
  const province = PROVINCES.find(
    province =>
      provinceOrState &&
      province &&
      (province.code.toLowerCase() === provinceOrState.trim().toLowerCase() ||
        province.label.toLowerCase() === provinceOrState.trim().toLowerCase())
  );

  return province ? province.coordinates : { lat: 0, lng: 0 };
};
