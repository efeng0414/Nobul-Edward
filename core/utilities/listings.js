import { PRICE_RANGES } from "../data/propertyData";
import {
  RESIDENTIAL,
  COMMERCIAL,
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  RECREATIONAL,
  OTHER
} from "../constants/listings";

const MAP_BINARY_TO_PROPERTY_TYPE = {
  "0000": HOUSE_TOWNHOUSE,
  "0001": CONDO_APARTMENT,
  "0010": COMMERCIAL,
  "0011": RECREATIONAL,
  "0100": OTHER
};

export const parseMasterList = masterlist => {
  let results = [];
  for (let i = 0; i < masterlist.length; i++) {
    const vals = masterlist[i].split("_");
    let [localId, lat, lng, priceRange] = vals;
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    priceRange = priceRange.charCodeAt(0);

    let decodedBedroomBathroom = vals[4].charCodeAt(0).toString(2);
    decodedBedroomBathroom =
      "00000000".substr(decodedBedroomBathroom.length) + decodedBedroomBathroom;
    const bedrooms = parseInt(decodedBedroomBathroom.slice(0, 4), 2);
    const bathrooms = parseInt(decodedBedroomBathroom.slice(4, 8), 2);

    let decodedParkingProperty = vals[5].charCodeAt(0).toString(2);
    decodedParkingProperty =
      "00000000".substr(decodedParkingProperty.length) + decodedParkingProperty;
    const parking = parseInt(decodedParkingProperty.slice(0, 4), 2);
    const propertyType =
      MAP_BINARY_TO_PROPERTY_TYPE[decodedParkingProperty.slice(4, 8)];

    const marker = {
      type: "Feature",
      properties: {
        listingId: localId,
        priceRange: priceRange,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        parking: parking,
        propertyType: propertyType
      },
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };
    results.push(marker);
  }
  return results;
};

export const mapPropertyType = (pType, oType) => {
  if (pType === "Single Family") {
    if (oType === "Freehold") {
      return HOUSE_TOWNHOUSE;
    } else {
      return CONDO_APARTMENT;
    }
  } else if (pType === "Business") {
    return COMMERCIAL;
  } else if (pType === "Other") {
    return OTHER;
  } else if (pType === "Multi-family") {
    return COMMERCIAL;
  } else if (pType === "Retail") {
    return COMMERCIAL;
  } else if (pType === "Industrial") {
    return COMMERCIAL;
  } else if (pType === "Office") {
    return COMMERCIAL;
  } else if (pType === "Vacant Land") {
    return OTHER;
  } else if (pType === "Agriculture") {
    return OTHER;
  } else if (pType === "Hospitality") {
    return OTHER;
  } else if (pType === "Institutional - Special Purpose") {
    return OTHER;
  } else if (pType === "Recreational") {
    return RECREATIONAL;
  } else if (pType === "Parking") {
    return OTHER;
  }
  return "";
};

export const mapToResidentialOrCommercial = propertyType => {
  switch (propertyType) {
    case HOUSE_TOWNHOUSE:
      return RESIDENTIAL;
    case CONDO_APARTMENT:
      return RESIDENTIAL;
    case RECREATIONAL:
      return RECREATIONAL;
    case COMMERCIAL:
      return COMMERCIAL;
    case OTHER:
      return OTHER;
    default:
      return OTHER;
  }
};

export const getPropertyPriceRange = price => {
  const priceRange = PRICE_RANGES.filter(
    range => range.low <= price && range.high >= price
  );
  return {
    low: priceRange[0].low,
    high: priceRange[0].high
  };
};
