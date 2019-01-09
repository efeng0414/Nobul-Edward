import {
  COMMERCIAL,
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  RECREATIONAL,
  RESIDENTIAL,
  OTHER
} from "../../constants/listings";

export const transformListingForRegion = ({ listing }) => {
  const {
    L_ListingID = "",
    featureImageUrl,
    LO1_OrganizationName = "",
    L_UpdateDate = "",
    L_Address = "",
    LM_Int4_5 = 0,
    LM_Int4_7 = 0,
    LFD_Parking_23 = 0,
    L_AskingPrice = 0,
    L_City = "",
    LR_remarks55 = "",
    LFD_Amenities_2 = "",
    LMD_MP_PostalCode = "",
    L_PictureCount = 0,
    L_Address2,
    L_AddressStreet,
    L_AddressNumber
  } = listing;

  const propertyType = returnPropertyTypeForGeorgia({
    propertyType: listing["L_Type_"]
  });
  const formattedAmenities = LFD_Amenities_2 ? LFD_Amenities_2.split(",") : [];
  // const utilities = UtilitiesAvailable ? UtilitiesAvailable.split(",") : []; To be addressed soon

  const formattedUnit = L_Address2 === "***" ? "" : L_Address2;
  const formattedAddress =
    !L_Address || L_Address === "***"
      ? `${L_AddressNumber} ${L_AddressStreet} ${formattedUnit}`
      : L_Address;

  return {
    uid: L_ListingID,
    MLS: L_ListingID,
    featureImageUrl,
    photoCount: parseInt(L_PictureCount),
    lastUpdated: L_UpdateDate,

    price: L_AskingPrice,
    propertyType: propertyType,
    bathrooms: parseInt(LM_Int4_5),
    bedrooms: parseInt(LM_Int4_7),
    parkingCount: LFD_Parking_23,
    parkingName: "",
    brokerage: LO1_OrganizationName,

    city: L_City,
    address: formattedAddress,
    provinceOrState: "GA",
    country: "USA",
    postalCode: LMD_MP_PostalCode,

    publicRemarks: LR_remarks55,
    amenitiesNearBy: formattedAmenities,
    utilitiesAvailable: []
  };
};

const returnPropertyTypeForGeorgia = ({ propertyType = "fallback" }) => {
  const propertyMap = {
    "Single Family Detached": HOUSE_TOWNHOUSE,
    "Single Family Attached": CONDO_APARTMENT,
    "Land Lot": OTHER,
    "Acreage & Farm": RECREATIONAL,
    Multifamily: RESIDENTIAL,
    Commercial: COMMERCIAL,
    fallback: ""
  };
  return propertyMap[propertyType];
};
