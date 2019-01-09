import {
  PRICE_RANGES,
  BROWSE_PRICE_STEPS,
  MAX_CURRENT_LISTING_PRICE
} from "../data/propertyData";

const isNullOrUndefined = val => {
  return val !== 0 && !val;
};

const getPriceRangeId = ({ priceRangeLow, priceRangeHigh }) => {
  if (
    isNullOrUndefined(priceRangeLow) ||
    isNullOrUndefined(priceRangeHigh) ||
    priceRangeHigh === 0
  ) {
    return PRICE_RANGES[0].key;
  } else if (MAX_CURRENT_LISTING_PRICE === parseInt(priceRangeHigh)) {
    return PRICE_RANGES[PRICE_RANGES.length - 1].key;
  } else {
    const priceRangeObject = PRICE_RANGES.find(priceRange => { // eslint-disable-line
      if (priceRange.high === parseInt(priceRangeHigh)) {
        return priceRange.key;
      }
    });
    return priceRangeObject.key;
  }
};

const getBrowsePriceStepsId = ({ price }) => {
  const priceRangeObject =
    price === 5000001
      ? { label: "Unlimited", value: "30" }
      : BROWSE_PRICE_STEPS.find(
          priceRange => parseInt(priceRange.label.replace(/\D/g, "")) === price
        );

  return priceRangeObject
    ? priceRangeObject.value
    : BROWSE_PRICE_STEPS[0].value;
};

const getPriceRangeByKey = key => {
  return PRICE_RANGES.find(range => {
    return range.key === key;
  });
};

const objectIsEmpty = object => {
  if (!object) return true;
  return Object.keys(object).every(key => {
    return (
      (Array.isArray(object[key]) && object[key].length === 0) ||
      Object.keys(object[key]).length === 0
    );
  });
};

const getFirstElementFromArray = array => {
  if (array.length > 0) {
    return array[0];
  }
  return "";
};

const getObjectByKey = ({ array, key, value }) =>
  array.find(x => x[key] === value);

const getRegionsNames = regions =>
  Object.keys(regions).map(key => regions[key].name);

const getObjectLength = object => {
  return Object.keys(object).length;
};

export const arraysHaveSameValues = ({ array1, array2 }) =>
  array1.length && array2.length && array1.every(item => array2.includes(item));

export {
  getPriceRangeId,
  getPriceRangeByKey,
  objectIsEmpty,
  getFirstElementFromArray,
  getObjectByKey,
  getRegionsNames,
  getBrowsePriceStepsId,
  getObjectLength
};
