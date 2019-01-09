import {
  COMMERCIAL,
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  RECREATIONAL,
  OTHER,
  RESIDENTIAL_PROPERTY,
  CONDO_PROPERTY,
  COMMERCIAL_PROPERTY
} from "../../constants/listings";

import { CANADA } from "../../constants/shared";
import { DEFAULT_PHOTO_COUNT } from "../../constants/listings";

export const transformListingForRegion = ({ listing }) => {
  return listing["L_Class"]
    ? handleTrebListings({ listing })
    : handleCreaListings({ listing });
};

const handleTrebListings = ({ listing }) => {
  const {
    //Common
    L_Class = "",
    Addr = "",
    Bath_tot = "",
    Rltr = "",
    Lp_dol = "",
    Ml_num = "",
    Gar_spaces = "",
    Zip = "",
    Ad_text = "",
    Timestamp_sql = "",
    //Residential
    Br = "",
    //Commercial
    Municipality = "",
    County = "",
    //Condos
    Maint = "",
    Park_spcs = ""
  } = listing;

  return {
    uid: Ml_num,
    MLS: Ml_num,
    lastUpdated: Timestamp_sql || "",

    price: Lp_dol || 0,
    propertyType: mapPropertyTypeForTreb({ rawPropertyType: L_Class }),
    bathrooms: parseInt(Bath_tot) || 0,
    bedrooms: parseInt(Br) || 0,
    parkingCount: parseInt(Gar_spaces) || parseInt(Park_spcs) || 0,
    brokerage: Rltr || "",
    photoCount: DEFAULT_PHOTO_COUNT,

    city: Municipality || "",
    address: Addr || "",
    provinceOrState: County || "",
    country: CANADA,
    postalCode: Zip || "",

    publicRemarks: Ad_text || "",
    maintenanceFee: Maint || 0
  };
};

const handleCreaListings = ({ listing }) => {
  const {
    featureImageUrl,
    $,
    Address = [],
    ListingID = [],
    Price = [],
    Building = [],
    ParkingSpaces = [],
    ParkingSpaceTotal = [],
    AgentDetails = [],
    PublicRemarks = [],
    UtilitiesAvailable = [],
    AmmenitiesNearBy = [],
    Photo = [{ PropertyPhoto: [] }]
  } = listing;

  const {
    AddressLine1 = [],
    City = [],
    Country = [],
    PostalCode = [],
    Province = []
  } = Address[0];

  const { ID = "", LastUpdated = "" } = $;
  const { PropertyPhoto } = Photo[0];
  const photoCount = PropertyPhoto.length;

  const amenities = AmmenitiesNearBy[0] ? AmmenitiesNearBy[0].split(", ") : [];

  const { Parking = [] } = ParkingSpaces[0] || { Parking: [] };
  let totalParkingCount = ParkingSpaceTotal.length
    ? parseInt(ParkingSpaceTotal[0])
    : 0;
  let parking = 0;

  if (totalParkingCount === 0) {
    for (let i = 0; i < Parking.length; i++) {
      parking +=
        typeof Parking[i].Spaces !== "undefined"
          ? parseInt(Parking[i].Spaces[0])
          : 0;
    }
  } else {
    parking = totalParkingCount;
  }

  const parkingName = Parking[0] ? Parking[0].Name : "";
  const { Utility = [] } = UtilitiesAvailable[0];
  const utilities = Utility.map(utility => {
    const { Type = [] } = utility;
    return Type[0] || "";
  });

  const { BedroomsTotal = [], BathroomTotal = [] } = Building[0];

  const { Office = [] } = AgentDetails[0];
  const { Name: brokerageName = [] } = Office[0];
  const propertyType = mapPropertyTypeForCrea({ listing });

  return {
    uid: ID,
    MLS: ListingID[0],
    featureImageUrl,
    photoCount: photoCount,
    lastUpdated: LastUpdated,

    price: Price[0] || 0,
    propertyType: propertyType,
    bathrooms: parseInt(BathroomTotal[0]) || 0,
    bedrooms: parseInt(BedroomsTotal[0]) || 0,
    parkingCount: parseInt(parking) || 0,
    parkingName: parkingName,
    brokerage: brokerageName[0] || "",

    city: City[0] || "",
    address: AddressLine1[0] || "",
    provinceOrState: Province[0] || "",
    country: Country[0] || "",
    postalCode: PostalCode[0] || "",

    publicRemarks: PublicRemarks[0] || "",
    amenitiesNearBy: amenities,
    utilitiesAvailable: utilities
  };
};

const mapPropertyTypeForCrea = ({ listing }) => {
  const { PropertyType = [], OwnershipType = [] } = listing;
  const pType = PropertyType[0];
  const oType = OwnershipType[0];

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

const mapPropertyTypeForTreb = ({ rawPropertyType }) => {
  const propertyTypeMap = {
    [RESIDENTIAL_PROPERTY]: HOUSE_TOWNHOUSE,
    [CONDO_PROPERTY]: CONDO_APARTMENT,
    [COMMERCIAL_PROPERTY]: COMMERCIAL
  };

  return propertyTypeMap[rawPropertyType];
};
