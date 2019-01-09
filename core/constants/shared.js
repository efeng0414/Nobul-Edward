import { PHONE_PREFIXES } from "../data/countries";

export const CANADA = "canada";
const DISPLAY_DATE_FORMAT = "DD-MM-YYYY";
const DISPLAY_TIME_FORMAT = "H:mm";
const STANDARD_DATE_FORMAT = "DD-MMMM-YYYY";
const MONTH_DATE_FORMAT = "MMMM Do[,] YYYY";
export const MONTH_SHORT_DATE_FORMAT = "MMM DD, YYYY";
const STANDARD_TIME_FORMAT = "HH:mm";
const AM_PM_TIME_FORMAT = "h:mm a";
const MOBILE_AM_PM_TIME_FORMAT = "hh:mmA";
const DATE_YEAR_FORMAT = "MMM, YYYY";
export const SAFE_DATE_FORMAT = "YYYY-MM-DD";

export const minPasswordLength = 6;
export const maxPasswordLength = 16;

const BUY = "buy";
const SELL = "sell";
const BOTH = "both";
const ALL = "all";
const REPRESENTATION = "representation";
const REFERRAL = "referral";
const EDIT = "edit";
const YEARLY = "yearly";
const MONTHLY = "monthly";
const MONTH = "month";
const PREMIUM = "premium";

const PROMOTE = "promote";
const SUBSCRIPTION = "subscription";
const FREE_TRIAL = "freeTrial";

const SHOW_ALL = "showAll";

const CREATED_ON_WEB = "web";
export const CREATED_ON_MOBILE = "mobile";

const BUYER = "buyer";
const SELLER = "seller";

const PRICE = "price";
const PRICE_RANGE_FIELD = "priceRange";
const PROPERTY_TYPE_FIELD = "propertyType";
const REGIONS_FIELD = "regions";
const ADDRESS_FIELD = "address";
const PROPERTY_FEATURES = "propertyFeatures";
const PROPERTY_BEDROOMS = "propertyBedrooms";
const PROPERTY_BATHROOMS = "propertyBathrooms";
const SERVICES_RANGE = "servicesRange";
const SERVICES_EXACT = "servicesExact";
const DESCRIPTION = "description";

const DATE = "date";

const HIGH_TO_LOW = "highToLow";
const LOW_TO_HIGH = "lowToHigh";
const NEW_TO_OLD = "newToOld";
const OLD_TO_NEW = "oldToNew";

const US_ZIPCODE_PATTERN = /^\d{5}(?:[-\s]\d{4})?$/;
const CA_POSTALCODE_PATTERN = /^([ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z])\s*([0-9][ABCEGHJ-NPRSTV-Z][0-9])$/i;

const DEFAULT_PREFIX = PHONE_PREFIXES.CA;

const PHONE_MASK = {
  [DEFAULT_PREFIX]: "   -   -    "
};

const PHONE_PATTERN = {
  [DEFAULT_PREFIX]: /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ // eslint-disable-line
};

const AUTOBID = "autoBid";
const PROMOTE_OFFER = "promoteOffer";

const RESIDENTIAL = "residential";
const COMMERCIAL = "commercial";

const PDF = "pdf";
const WEBFORM = "form";
const LOADED = "LOADED";
const SUBMIT_TYPE = "SUBMIT";
const PREFILL_TYPE = "PREFILL";
const SIGNED = "SIGNED";
const PENDING = "PENDING";

const GENERATED_AGREEMENT_PDF_NAME = "generated.pdf";
const SEEN_CREA_POPUP = "SEEN_CREA_POPUP";

export const premiumPrice = 39.99;
export const emailReminderDays = 7;

//Mortgage Calculator
const LISTING_PRICE = "listingPrice";
const DOWNPAYMENT_AMOUNT = "downpaymentAmount";
const MORTGAGE_AMOUNT = "mortgageAmount";
const AMORIZATION_PERIOD = "amorizationPeriod";
const INTEREST_RATE = "interestRate";
const PAYMENT_FREQUENCY = "paymentFrequency";
const DESC = "desc";
const ASC = "asc";

// SETTINGS
const SETTING_CHANGE_PASSWORD = "settingChangePassword";
const SETTING_PROFILE = "settingProfile";
const SETTING_AGENT_SERVICES = "settingAgentServices";
const SETTING_AGENT_REGIONS = "settingAgentRegions";

//Default Coordinates
const DEFAULT_LAT = 43.6567919;
const DEFAULT_LON = -79.4609302;
const DEFAULT_LAT_MOBILE = 43.6832;
const DEFAULT_LON_MOBILE = -79.39999;
//TODO: Change to CAD and $ and handle the change
const CURRENCY_SYMBOLS = {
  CAD: "$",
  USD: "$"
};

export const DEFAULT_REGION = "ON";
export const DEFAULT_COUNTRY = "CA";

const MAX_CURRENT_LISTING_PRICE = 5000001;
const MAX_DISPLAY_PRICE = 5000000;

const TAX_PERCENT = 1.13;

const POPUP_TOP = "popupTop";
const POPUP_BOTTOM = "popupBottom";
const DAYS = "days";

const TRIAL_PERIOD_LENGTH = 90;
export const STRIPE_TIMEOUT = 15000;

export const ROUTE = "route";
export const LINK = "link";

export const MOBILE_TAGLINE_CHARACTER_LIMIT = 50;
export const MOBILE_MESSAGE_WORD_LIMIT = 100;

export const EDIT_REGIONS_URI =
  "https://nobul.com/my-dashboard/settings?tab=proposal";

export const MOBILE_LOCAL_USER_DATA = "userData";

export {
  DISPLAY_DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
  STANDARD_DATE_FORMAT,
  STANDARD_TIME_FORMAT,
  MONTH_DATE_FORMAT,
  AM_PM_TIME_FORMAT,
  MOBILE_AM_PM_TIME_FORMAT,
  DATE_YEAR_FORMAT,
  BUY,
  SELL,
  ALL,
  BOTH,
  REPRESENTATION,
  REFERRAL,
  BUYER,
  SELLER,
  DEFAULT_PREFIX,
  PHONE_MASK,
  PHONE_PATTERN,
  US_ZIPCODE_PATTERN,
  CA_POSTALCODE_PATTERN,
  AUTOBID,
  PROMOTE_OFFER,
  PROMOTE,
  SUBSCRIPTION,
  DATE,
  PRICE,
  PRICE_RANGE_FIELD,
  PROPERTY_TYPE_FIELD,
  ADDRESS_FIELD,
  REGIONS_FIELD,
  PROPERTY_FEATURES,
  PROPERTY_BEDROOMS,
  PROPERTY_BATHROOMS,
  SERVICES_RANGE,
  SERVICES_EXACT,
  DESCRIPTION,
  CREATED_ON_WEB,
  RESIDENTIAL,
  COMMERCIAL,
  FREE_TRIAL,
  PDF,
  WEBFORM,
  SUBMIT_TYPE,
  PREFILL_TYPE,
  GENERATED_AGREEMENT_PDF_NAME,
  SIGNED,
  PENDING,
  SEEN_CREA_POPUP,
  LISTING_PRICE,
  DOWNPAYMENT_AMOUNT,
  MORTGAGE_AMOUNT,
  AMORIZATION_PERIOD,
  INTEREST_RATE,
  PAYMENT_FREQUENCY,
  EDIT,
  YEARLY,
  MONTHLY,
  MONTH,
  SHOW_ALL,
  SETTING_CHANGE_PASSWORD,
  SETTING_PROFILE,
  SETTING_AGENT_SERVICES,
  SETTING_AGENT_REGIONS,
  CURRENCY_SYMBOLS,
  PREMIUM,
  MAX_CURRENT_LISTING_PRICE,
  MAX_DISPLAY_PRICE,
  TAX_PERCENT,
  LOADED,
  ASC,
  DESC,
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  NEW_TO_OLD,
  OLD_TO_NEW,
  DEFAULT_LAT,
  DEFAULT_LON,
  DEFAULT_LAT_MOBILE,
  DEFAULT_LON_MOBILE,
  POPUP_TOP,
  POPUP_BOTTOM,
  DAYS,
  TRIAL_PERIOD_LENGTH
};
