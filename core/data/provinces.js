const PROVINCES = [
  {
    code: "AB",
    label: "Alberta",
    country: "CA",
    supported: true,
    polygonFilename: "alberta-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 53.01669802, lng: -112.8166386 }
  },
  {
    code: "AK",
    label: "Alaska",
    country: "US",
    supported: true,
    polygonFilename: "alaska-unitedstates.json",
    coordinates: { lat: 66.160507, lng: -153.369141 }
  },
  {
    code: "AL",
    label: "Alabama",
    country: "US",
    supported: true,
    polygonFilename: "alabama-unitedstates.json",
    coordinates: { lat: 32.31823, lng: -86.902298 }
  },
  {
    code: "AR",
    label: "Arkansas",
    country: "US",
    supported: true,
    polygonFilename: "arkansas-unitedstates.json",
    coordinates: { lat: 35.201, lng: 91.8318 }
  },
  {
    code: "AZ",
    label: "Arizona",
    country: "US",
    supported: true,
    polygonFilename: "arizona-unitedstates.json",
    coordinates: { lat: 34.048927, lng: -111.093735 }
  },
  {
    code: "BC",
    label: "British Columbia",
    country: "CA",
    supported: true,
    polygonFilename: "britishcolumbia-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 49.09996035, lng: -116.516697 }
  },
  {
    code: "CA",
    label: "California",
    country: "US",
    supported: true,
    polygonFilename: "california-unitedstates.json",
    coordinates: { lat: 36.778259, lng: -119.417931 }
  },
  {
    code: "CO",
    label: "Colorado",
    country: "US",
    supported: true,
    polygonFilename: "colorado-unitedstates.json",
    coordinates: { lat: 39.5501, lng: 105.7821 }
  },
  {
    code: "CT",
    label: "Connecticut",
    country: "US",
    supported: true,
    polygonFilename: "connecticut-unitedstates.json",
    coordinates: { lat: 41.6032, lng: 73.0877 }
  },
  {
    code: "DC",
    label: "District of Columbia",
    country: "US",
    supported: true,
    polygonFilename: "districtofcolumbia-unitedstates.json",
    coordinates: { lat: 38.9072, lng: 77.0369 }
  },
  {
    code: "DE",
    label: "Delaware",
    country: "US",
    supported: true,
    polygonFilename: "delaware-unitedstates.json",
    coordinates: { lat: 38.9108, lng: 75.5277 }
  },
  {
    code: "FL",
    label: "Florida",
    country: "US",
    supported: true,
    polygonFilename: "florida-unitedstates.json",
    listingBucketName: process.env.FLORIDA_LISTING_BUCKET,
    coordinates: { lat: 27.994402, lng: -81.760254 }
  },
  {
    code: "GA",
    label: "Georgia",
    country: "US",
    supported: true,
    polygonFilename: "georgia-unitedstates.json",
    listingBucketName: process.env.GEORGIA_LISTING_BUCKET,
    coordinates: { lat: 33.247875, lng: -83.441162 }
  },
  {
    code: "HI",
    label: "Hawaii",
    country: "US",
    supported: true,
    polygonFilename: "hawaii-unitedstates.json",
    coordinates: { lat: 21.289373, lng: -157.91748 }
  },
  {
    code: "IA",
    label: "Iowa",
    country: "US",
    supported: true,
    polygonFilename: "iowa-unitedstates.json",
    coordinates: { lat: 42.032974, lng: -93.581543 }
  },
  {
    code: "ID",
    label: "Idaho",
    country: "US",
    supported: true,
    polygonFilename: "idaho-unitedstates.json",
    coordinates: { lat: 44.068203, lng: -114.742043 }
  },
  {
    code: "IL",
    label: "Illinois",
    country: "US",
    supported: false,
    polygonFilename: "illinois-unitedstates.json",
    coordinates: { lat: 40.6331, lng: 89.3985 }
  },
  {
    code: "IN",
    label: "Indiana",
    country: "US",
    supported: true,
    polygonFilename: "indiana-unitedstates.json",
    coordinates: { lat: 40.273502, lng: -86.126976 }
  },
  {
    code: "KS",
    label: "Kansas",
    country: "US",
    supported: true,
    polygonFilename: "kansas-unitedstates.json",
    coordinates: { lat: 39.0119, lng: 98.4842 }
  },
  {
    code: "KY",
    label: "Kentucky",
    country: "US",
    supported: true,
    polygonFilename: "kentucky-unitedstates.json",
    coordinates: { lat: 37.839333, lng: -84.27002 }
  },
  {
    code: "LA",
    label: "Louisiana",
    country: "US",
    supported: false,
    polygonFilename: "louisiana-unitedstates.json",
    coordinates: { lat: 30.39183, lng: -92.329102 }
  },
  {
    code: "MA",
    label: "Massachusetts",
    country: "US",
    supported: true,
    polygonFilename: "massachusetts-unitedstates.json",
    coordinates: { lat: 42.407211, lng: -71.382439 }
  },
  {
    code: "MB",
    label: "Manitoba",
    country: "CA",
    supported: true,
    polygonFilename: "manitoba-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 50.15002545, lng: -96.88332178 }
  },
  {
    code: "MD",
    label: "Maryland",
    country: "US",
    supported: true,
    polygonFilename: "maryland-unitedstates.json",
    coordinates: { lat: 39.045753, lng: -76.641273 }
  },
  {
    code: "ME",
    label: "Maine",
    country: "US",
    supported: true,
    polygonFilename: "maine-unitedstates.json",
    coordinates: { lat: 45.367584, lng: -68.972168 }
  },
  {
    code: "MI",
    label: "Michigan",
    country: "US",
    supported: false,
    polygonFilename: "michigan-unitedstates.json",
    coordinates: { lat: 44.182205, lng: -84.506836 }
  },
  {
    code: "MN",
    label: "Minnesota",
    country: "US",
    supported: false,
    polygonFilename: "minnesota-unitedstates.json",
    coordinates: { lat: 46.39241, lng: -94.63623 }
  },
  {
    code: "MO",
    label: "Missouri",
    country: "US",
    supported: true,
    polygonFilename: "missouri-unitedstates.json",
    coordinates: { lat: 38.573936, lng: -153.369141 }
  },
  {
    code: "MS",
    label: "Mississippi",
    country: "US",
    supported: true,
    polygonFilename: "mississippi-unitedstates.json",
    coordinates: { lat: 32.3547, lng: 89.3985 }
  },
  {
    code: "MT",
    label: "Montana",
    country: "US",
    supported: true,
    polygonFilename: "montana-unitedstates.json",
    coordinates: { lat: 46.8797, lng: 110.3626 }
  },
  {
    code: "NB",
    label: "New Brunswick",
    country: "CA",
    supported: false,
    polygonFilename: "newbrunswick-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 45.26704185, lng: -66.07667505 }
  },
  {
    code: "NC",
    label: "North Carolina",
    country: "US",
    supported: true,
    polygonFilename: "northcarolina-unitedstates.json",
    coordinates: { lat: 35.7596, lng: 79.0193 }
  },
  {
    code: "ND",
    label: "North Dakota",
    country: "US",
    supported: true,
    polygonFilename: "northdakota-unitedstates.json",
    coordinates: { lat: 47.5515, lng: 101.002 }
  },
  {
    code: "NE",
    label: "Nebraska",
    country: "US",
    supported: true,
    polygonFilename: "nebraska-unitedstates.json",
    coordinates: { lat: 41.4925, lng: 99.9018 }
  },
  {
    code: "NH",
    label: "New Hampshire",
    country: "US",
    supported: true,
    polygonFilename: "newhampshire-unitedstates.json",
    coordinates: { lat: 43.1939, lng: 71.5724 }
  },
  {
    code: "NJ",
    label: "New Jersey",
    country: "US",
    supported: true,
    polygonFilename: "newjersey-unitedstates.json",
    coordinates: { lat: 40.0583, lng: 74.4057 }
  },
  {
    code: "NM",
    label: "New Mexico",
    country: "US",
    supported: false,
    polygonFilename: "newmexico-unitedstates.json",
    coordinates: { lat: 34.5199, lng: 105.8701 }
  },
  {
    code: "NL",
    label: "Newfoundland & Labrador",
    country: "CA",
    supported: false,
    polygonFilename: "newfoundlandandlabrador-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 49.17440025, lng: -57.42691878 }
  },
  {
    code: "NS",
    label: "Nova Scotia",
    country: "CA",
    supported: false,
    polygonFilename: "novascotia-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 45.58327578, lng: -62.63331934 }
  },
  {
    code: "NV",
    label: "Nevada",
    country: "US",
    supported: true,
    polygonFilename: "nevada-unitedstates.json",
    coordinates: { lat: 38.8026, lng: 116.4194 }
  },
  {
    code: "NY",
    label: "New York",
    country: "US",
    supported: false,
    polygonFilename: "newyork-unitedstates.json",
    coordinates: { lat: 40.7128, lng: 74.006 }
  },
  {
    code: "NT",
    label: "Northwest Territories",
    country: "CA",
    supported: true,
    polygonFilename: "northwestterritories-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 62.40005292, lng: -110.7333291 }
  },
  {
    code: "NU",
    label: "Nunavut",
    country: "CA",
    supported: false,
    polygonFilename: "nunavut-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 68.76746684, lng: -81.23608303 }
  },
  {
    code: "OH",
    label: "Ohio",
    country: "US",
    supported: true,
    polygonFilename: "ohio-unitedstates.json",
    coordinates: { lat: 40.4173, lng: 82.9071 }
  },
  {
    code: "OK",
    label: "Oklahoma",
    country: "US",
    supported: true,
    polygonFilename: "oklahoma-unitedstates.json",
    coordinates: { lat: 35.0078, lng: 97.0929 }
  },
  {
    code: "ON",
    label: "Ontario",
    country: "CA",
    supported: false,
    polygonFilename: "ontario-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 44.56664532, lng: -80.84998519 }
  },
  {
    code: "OR",
    label: "Oregon",
    country: "US",
    supported: true,
    polygonFilename: "oregon-unitedstates.json",
    coordinates: { lat: 43.8041, lng: 120.5542 }
  },
  {
    code: "PA",
    label: "Pennsylvania",
    country: "US",
    supported: false,
    polygonFilename: "pennsylvania-unitedstates.json",
    coordinates: { lat: 41.2033, lng: 77.1945 }
  },
  {
    code: "PE",
    label: "Prince Edward Island",
    country: "CA",
    supported: false,
    polygonFilename: "princeedwardisland-canada.json",
    coordinates: { lat: 46.24928164, lng: -63.13132512 }
  },
  {
    code: "QC",
    label: "Quebec",
    country: "CA",
    supported: false,
    polygonFilename: "quebec-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 49.82257774, lng: -64.34799504 }
  },
  {
    code: "RI",
    label: "Rhode Island",
    country: "US",
    supported: true,
    polygonFilename: "rhodeisland-unitedstates.json",
    coordinates: { lat: 41.5801, lng: 71.4774 }
  },
  {
    code: "SC",
    label: "South Carolina",
    country: "US",
    supported: true,
    polygonFilename: "southcarolina-unitedstates.json",
    coordinates: { lat: 33.8361, lng: 81.1637 }
  },
  {
    code: "SD",
    label: "South Dakota",
    country: "US",
    supported: true,
    polygonFilename: "southdakota-unitedstates.json",
    coordinates: { lat: 43.9695, lng: 99.9018 }
  },
  {
    code: "SK",
    label: "Saskatchewan",
    country: "CA",
    supported: true,
    polygonFilename: "saskatchewan-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 50.93331097, lng: -102.7999891 }
  },
  {
    code: "TN",
    label: "Tennessee",
    country: "US",
    supported: true,
    polygonFilename: "tennessee-unitedstates.json",
    coordinates: { lat: 35.5175, lng: 86.5804 }
  },
  {
    code: "TX",
    label: "Texas",
    country: "US",
    supported: true,
    polygonFilename: "texas-unitedstates.json",
    coordinates: { lat: 31.9686, lng: 99.9018 }
  },
  {
    code: "UT",
    label: "Utah",
    country: "US",
    supported: true,
    polygonFilename: "utah-unitedstates.json",
    coordinates: { lat: 39.321, lng: 111.0937 }
  },
  {
    code: "VA",
    label: "Virginia",
    country: "US",
    supported: false,
    polygonFilename: "virginia-unitedstates.json",
    coordinates: { lat: 37.4316, lng: 78.6569 }
  },
  {
    code: "VT",
    label: "Vermont",
    country: "US",
    supported: true,
    polygonFilename: "vermont-unitedstates.json",
    coordinates: { lat: 44.5588, lng: 72.5778 }
  },
  {
    code: "WA",
    label: "Washington",
    country: "US",
    supported: false,
    polygonFilename: "washington-unitedstates.json",
    coordinates: { lat: 47.7511, lng: 120.7401 }
  },
  {
    code: "WI",
    label: "Wisconsin",
    country: "US",
    supported: false,
    polygonFilename: "wisconsin-unitedstates.json",
    coordinates: { lat: 43.7844, lng: 88.7879 }
  },
  {
    code: "WV",
    label: "West Virginia",
    country: "US",
    supported: true,
    polygonFilename: "westvirginia-unitedstates.json",
    coordinates: { lat: 38.5976, lng: 80.4549 }
  },
  {
    code: "WY",
    label: "Wyoming",
    country: "US",
    supported: true,
    polygonFilename: "wyoming-unitedstates.json",
    coordinates: { lat: 43.076, lng: 107.2903 }
  },
  {
    code: "YT",
    label: "Yukon",
    country: "CA",
    supported: false,
    polygonFilename: "yukon-canada.json",
    listingBucketName: process.env.CANADA_LISTING_BUCKET,
    coordinates: { lat: 61.35037539, lng: -139.0000017 }
  }
];

const COUNTRY_FROM_STATE = {};
PROVINCES.map(province => {
  // eslint-disable-line
  COUNTRY_FROM_STATE[province.code] = province.country;
});

export { PROVINCES, COUNTRY_FROM_STATE };
