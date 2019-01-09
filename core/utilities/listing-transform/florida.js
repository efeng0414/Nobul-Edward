import {
  COMMERCIAL,
  HOUSE_TOWNHOUSE,
  CONDO_APARTMENT,
  OTHER
} from "../../constants/listings";

export const transformListingForRegion = ({ listing }) => {
  return listing["Matrix_Unique_ID"]
    ? handleMiamiListings({ listing })
    : handleCentralFloridaListings({ listing });
};

export const handleMiamiListings = ({ listing }) => {
  const {
    Matrix_Unique_ID = "",
    featureImageUrl,
    MLSNumber = "",
    ListOfficeName = "",
    LastChangeTimestamp = "",
    AddressInternetDisplay = "",
    BathsTotal = 0,
    BedsTotal = 0,
    NumGarageSpaces = 0,
    ParkingDescription = "",
    CurrentPrice = 0,
    City = "",
    Remarks = "",
    Amenities = "",
    PostalCode = "",
    UtilitiesAvailable = "",
    PhotoCount = 0,
    StateOrProvince = "",
    UnitNumber,
    StreetName,
    StreetNumberNumeric
    //No country in this feed
  } = listing;

  const propertyType = mapPropertyType({ listing });
  const amenities = Amenities ? Amenities.split(",") : [];
  const utilities = UtilitiesAvailable ? UtilitiesAvailable.split(",") : [];

  // Some listings have the value of "***" for AddressInternetDisplay and UnitNumber.
  // Lets convert these into something meaningful
  const unit = UnitNumber === "***" ? "" : UnitNumber;
  const formattedAddress =
    !AddressInternetDisplay || AddressInternetDisplay === "***"
      ? `${StreetNumberNumeric} ${StreetName} ${unit}`
      : AddressInternetDisplay;

  return {
    uid: Matrix_Unique_ID,
    MLS: MLSNumber,
    featureImageUrl,
    photoCount: parseInt(PhotoCount),
    lastUpdated: LastChangeTimestamp,

    price: CurrentPrice,
    propertyType: propertyType,
    bathrooms: parseInt(BathsTotal),
    bedrooms: parseInt(BedsTotal),
    parkingCount: NumGarageSpaces,
    parkingName: ParkingDescription,
    brokerage: ListOfficeName,

    city: City,
    address: formattedAddress,
    provinceOrState: "FL",
    country: "",
    postalCode: PostalCode,

    publicRemarks: Remarks,
    amenitiesNearBy: amenities,
    utilitiesAvailable: utilities
  };
};

export const handleCentralFloridaListings = ({ listing }) => {
  const {
    ListingKeyNumeric = "",
    ListingId = "",
    featureImageUrl,
    PhotosCount = 0,
    ModificationTimestamp = "",
    CurrentPrice = 0,
    BedroomsTotal = 0,
    BathroomsTotalInteger = 0,
    GarageSpaces = 0,
    ParkingFeatures = "",
    ListOfficeName = "",
    City = "",
    UnparsedAddress = "",
    Country = "",
    PostalCode = "",
    PublicRemarks = "",
    AssociationAmenities = "",
    AmenitiesAdditionalFees = "",
    Utilities = ""
  } = listing;

  const propertyType = "Residential";
  let amenities = AssociationAmenities || AmenitiesAdditionalFees;
  amenities = amenities ? amenities.split(",") : [];
  const utilities = Utilities ? Utilities.split(",") : [];

  return {
    uid: ListingKeyNumeric,
    MLS: ListingId,
    featureImageUrl,
    photoCount: parseInt(PhotosCount),
    lastUpdated: ModificationTimestamp,

    price: CurrentPrice,
    propertyType: propertyType,
    bathrooms: parseInt(BathroomsTotalInteger),
    bedrooms: parseInt(BedroomsTotal),
    parkingCount: GarageSpaces,
    parkingName: ParkingFeatures,
    brokerage: ListOfficeName,

    city: City,
    address: UnparsedAddress,
    provinceOrState: "FL",
    country: Country,
    postalCode: PostalCode,

    publicRemarks: PublicRemarks,
    amenitiesNearBy: amenities,
    utilitiesAvailable: utilities
  };
};

const mapPropertyType = ({ listing }) => {
  const { PropertyType = "", TypeofProperty = "" } = listing;
  switch (TypeofProperty) {
    case "Apartment":
      return CONDO_APARTMENT;
    case "Commercial":
      return COMMERCIAL;
    case "Condo":
      return CONDO_APARTMENT;
    case "Co-Op":
      return CONDO_APARTMENT;
    case "Dockominium":
      return CONDO_APARTMENT;
    case "Duplex":
      return HOUSE_TOWNHOUSE;
    case "Efficiency":
      return CONDO_APARTMENT;
    case "Fourplex":
      return HOUSE_TOWNHOUSE;
    case "Hotel":
      return COMMERCIAL;
    case "Income":
      return COMMERCIAL;
    case "Industrial":
      return COMMERCIAL;
    case "Lease":
      return; //HIDE LISTING
    case "Mobile":
      return CONDO_APARTMENT;
    case "Multifamily":
      return CONDO_APARTMENT;
    case "Other":
      return OTHER;
    case "Residential":
      switch (PropertyType) {
        case "Commercial/Business/Agricultural/Industrial Land":
          return COMMERCIAL;
        case "Residential Land/Boat Docks":
          return OTHER;
        case "Residential Rental":
          return;
        default:
          return;
      }
    case "Single":
      switch (PropertyType) {
        case "Business Opportunity":
          return COMMERCIAL;
        case "Commercial/Business/Agricultural/Industrial Land":
          return COMMERCIAL;
        case "Commercial/Industrial":
          return COMMERCIAL;
        case "Residential Land/Boat Docks":
          return COMMERCIAL;
        case "Residential Rental":
          return;
        case "Single Family":
          return HOUSE_TOWNHOUSE;
        default:
          return;
      }
    case "Special":
      return OTHER;
    case "Timeshare":
      return OTHER;
    case "Townhouse":
      return HOUSE_TOWNHOUSE;
    case "Triplex":
      return HOUSE_TOWNHOUSE;
    case "TypeofProperty":
      return OTHER;
    case "Unimproved Agri/Recreatn/Moblhome":
      return OTHER;
    case "Villa":
      return HOUSE_TOWNHOUSE;
    default:
      switch (PropertyType) {
        case "Business Opportunity":
          return COMMERCIAL;
        case "Commercial/Business/Agricultural/Industrial Land":
          return COMMERCIAL;
        case "Commercial/Industrial":
          return COMMERCIAL;
        case "Condo/Co-Op/Villa/Townhouse":
          return CONDO_APARTMENT;
        case "Residential Income":
          return COMMERCIAL;
        case "Residential Land/Boat Docks":
          return OTHER;
        case "Residential Rental":
          return;
      }
      return;
  }
};
