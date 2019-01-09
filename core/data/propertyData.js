import {
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  RECREATIONAL,
  COMMERCIAL,
  OTHER
} from "../constants/listings";

import {
  RESIDENTIAL,
  COMMERCIAL as COMMERCIAL_TYPE
} from "../../core/constants/shared";

export const REBATE_COMMISSION_MIN = 0;
export const REBATE_COMMISSION_MAX = 2.5;

export const LISTING_COMMISSION_MIN = 0;
export const LISTING_COMMISSION_MAX = 2.5;

export const COOPERATING_COMMISSION_MIN = 0;
export const COOPERATING_COMMISSION_MAX = 2.5;

export const FEATURES = [
  { value: "pool" },
  { value: "fireplace" },
  { value: "parking" },
  { value: "airConditioning" }
];

export const PROPERTY_TYPES = [
  { value: HOUSE_TOWNHOUSE, propertyClass: HOUSE_TOWNHOUSE },
  { value: CONDO_APARTMENT, propertyClass: CONDO_APARTMENT },
  { value: RECREATIONAL, propertyClass: RECREATIONAL },
  { value: COMMERCIAL, propertyClass: COMMERCIAL },
  { value: OTHER, propertyClass: OTHER }
];

export const DEFAULT_PROPERTY_TYPES = [
  { value: HOUSE_TOWNHOUSE, propertyClass: HOUSE_TOWNHOUSE },
  { value: CONDO_APARTMENT, propertyClass: CONDO_APARTMENT }
];

export const mapResidentialOrCommercialToPropertyTypes = ({
  propertyTypesArray
}) => {
  const resultingPropertyType = [];
  if (propertyTypesArray.includes(RESIDENTIAL)) {
    resultingPropertyType.push(HOUSE_TOWNHOUSE, CONDO_APARTMENT, RECREATIONAL);
  }

  if (propertyTypesArray.includes(COMMERCIAL_TYPE)) {
    resultingPropertyType.push(COMMERCIAL, OTHER);
  }

  return resultingPropertyType;
};

export const PRICE_RANGES = [
  { key: "0", label: "$0 - $100,000", low: 0, high: 100000 },
  { key: "1", label: "$100,000 - $200,000", low: 100000, high: 200000 },
  { key: "2", label: "$200,000 - $300,000", low: 200000, high: 300000 },
  { key: "3", label: "$300,000 - $400,000", low: 300000, high: 400000 },
  { key: "4", label: "$400,000 - $600,000", low: 400000, high: 600000 },
  { key: "5", label: "$600,000 - $800,000", low: 600000, high: 800000 },
  { key: "6", label: "$800,000 - $1,000,000", low: 800000, high: 1000000 },
  { key: "7", label: "$1,000,000 - $1,500,000", low: 1000000, high: 1500000 },
  { key: "8", label: "$1,500,000 - $2,000,000", low: 1500000, high: 2000000 },
  { key: "9", label: "$2,000,000 - $3,000,000", low: 2000000, high: 3000000 },
  { key: "10", label: "$3,000,000 - $5,000,000", low: 3000000, high: 5000000 },
  { key: "11", label: "$5,000,000+", low: 5000000, high: 5000000 }
];

export const SINGLE_PRICE_LABEL = [
  { value: 0, label: "$0" },
  { value: 100000, label: "$100,000" },
  { value: 200000, label: "$200,000" },
  { value: 300000, label: "$300,000" },
  { value: 400000, label: "$400,000" },
  { value: 600000, label: "$600,000" },
  { value: 800000, label: "$800,000" },
  { value: 1000000, label: "$1,000,000" },
  { value: 1500000, label: "$1,500,000" },
  { value: 2000000, label: "$2,000,000" },
  { value: 3000000, label: "$3,000,000" },
  { value: 5000000, label: "$5,000,000" }
];

export const MAX_CURRENT_LISTING_PRICE = 5000001;

export const PROPERTY_PRICE_RANGE = [
  { label: "$0", value: "0", numericValue: 0 },
  { label: "$100,000", value: "1", numericValue: 100000 },
  { label: "$200,000", value: "2", numericValue: 200000 },
  { label: "$300,000", value: "3", numericValue: 300000 },
  { label: "$400,000", value: "4", numericValue: 400000 },
  { label: "$600,000", value: "5", numericValue: 600000 },
  { label: "$800,000", value: "6", numericValue: 800000 },
  { label: "$1,000,000", value: "7", numericValue: 1000000 },
  { label: "$1,500,000", value: "8", numericValue: 1500000 },
  { label: "$2,000,000", value: "9", numericValue: 2000000 },
  { label: "$3,000,000", value: "10", numericValue: 3000000 },
  { label: "$5,000,000", value: "11", numericValue: 5000000 },
  {
    label: "$5,000,000+",
    value: "12",
    numericValue: MAX_CURRENT_LISTING_PRICE
  }
];
export const PROPERTY_PRICE_RANGE_FOR_FILTER = PROPERTY_PRICE_RANGE.reduce(
  (accumulator, { numericValue, value }) => {
    return {
      ...accumulator,
      [numericValue]: value
    };
  },
  {}
);

export const BROWSE_PRICE_STEPS = [
  { label: "$0", value: "0" },
  { label: "$25,000", value: "1" },
  { label: "$50,000", value: "2" },
  { label: "$75,000", value: "3" },
  { label: "$100,000", value: "4" },
  { label: "$125,000", value: "5" },
  { label: "$150,000", value: "6" },
  { label: "$175,000", value: "7" },
  { label: "$200,000", value: "8" },
  { label: "$250,000", value: "9" },
  { label: "$300,000", value: "10" },
  { label: "$350,000", value: "11" },
  { label: "$400,000", value: "12" },
  { label: "$450,000", value: "13" },
  { label: "$500,000", value: "14" },
  { label: "$600,000", value: "15" },
  { label: "$700,000", value: "16" },
  { label: "$800,000", value: "17" },
  { label: "$900,000", value: "18" },
  { label: "$1,000,000", value: "19" },
  { label: "$1,250,000", value: "20" },
  { label: "$1,500,000", value: "21" },
  { label: "$1,750,000", value: "22" },
  { label: "$2,000,000", value: "23" },
  { label: "$2,500,000", value: "24" },
  { label: "$3,000,000", value: "25" },
  { label: "$3,500,000", value: "26" },
  { label: "$4,000,000", value: "27" },
  { label: "$4,500,000", value: "28" },
  { label: "$5,000,000", value: "29" },
  { label: "Unlimited", value: "30" }
];

export const BROWSE_PRICE_STEPS_LOOKUP = (() => {
  const lookupObject = {};
  BROWSE_PRICE_STEPS.map(
    priceRange =>
      (lookupObject[priceRange.value] =
        priceRange.label === "Unlimited"
          ? MAX_CURRENT_LISTING_PRICE
          : priceRange.label.replace("$", "").replace(/,/g, ""))
  );
  return lookupObject;
})();
