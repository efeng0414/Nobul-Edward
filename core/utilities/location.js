import { COUNTRIES } from "../data/countries";

const getCountryName = code => {
  if (!code) return "";
  const codeToUpper = code.trim().toUpperCase();
  const country = COUNTRIES.find(country => country.code === codeToUpper);
  return country ? country.label : "";
};

const getCountryCode = name => {
  if (!name) return "";
  const nameToLower = name.trim().toLowerCase();
  const country = COUNTRIES.find(
    country => country.label.toLowerCase() === nameToLower
  );
  return country ? country.code : "";
};

const getCountryFromRegions = regions =>
  regions.length > 0 && getCountryCode(regions[0].country);

const getCountryFromJob = ({ jobDetail }) =>
  getCountryFromRegions(Object.values(jobDetail.regions || {}));

export {
  getCountryName,
  getCountryCode,
  getCountryFromJob,
  getCountryFromRegions
};
