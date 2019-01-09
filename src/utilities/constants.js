import {
  OFFER_OPEN,
  OFFER_ACCEPTED,
  OFFER_NOT_ACCEPTED,
  OFFER_REJECTED,
  OFFER_JOBDELETED,
  OFFER_JOBEXPIRED,
  OFFER_WITHDRAWN
} from "../../core/constants/offers";

import { SELL, BUY } from "../../core/api-transform/jobs";
import { JOB_CLOSED } from "../../core/constants/jobs";

import {
  RESIDENTIAL as RESIDENTIAL_PROPERTY,
  COMMERCIAL as COMMERCIAL_PROPERTY,
  HOUSE_TOWNHOUSE as HOUSE_TOWNHOUSE_PROPERTY,
  CONDO_APARTMENT as CONDO_APARTMENT_PROPERTY,
  RECREATIONAL as RECREATIONAL_PROPERTY,
  OTHER as OTHER_PROPERTY
} from "../../core/constants/listings";

import {
  COMMERCIAL_BUY_ICON,
  COMMERCIAL_SELL_ICON,
  COMMERCIAL_GREY_ICON,
  CONDO_BUY_ICON,
  CONDO_SELL_ICON,
  CONDO_GREY_ICON,
  HOUSE_SELL_ICON,
  HOUSE_BUY_ICON,
  HOUSE_GREY_ICON,
  OTHER_BUY_ICON,
  OTHER_SELL_ICON,
  OTHER_GREY_ICON,
  RECREATIONAL_BUY_ICON,
  RECREATIONAL_SELL_ICON,
  RECREATIONAL_GREY_ICON,
  AVATAR_DEFAULT_LARGE,
  AVATAR_MALE_LARGE,
  AVATAR_FEMALE_LARGE,
  AVATAR_DEFAULT_SMALL,
  AVATAR_DEFAULT_MEDIUM,
  AVATAR_MALE_SMALL,
  AVATAR_MALE_MEDIUM,
  AVATAR_FEMALE_SMALL,
  AVATAR_FEMALE_MEDIUM,
  AVATAR_DEFAULT_SELECTED,
  AVATAR_MALE_SELECTED,
  AVATAR_FEMALE_SELECTED
} from "./images";

import ConsumerRegistrationForm from "../components/consumer-registration-steps/registration-form";
import ConsumerRegistrationConfirm from "../components/consumer-registration-steps/confirm";
import {
  AVATAR_TYPE_DEFAULT,
  AVATAR_TYPE_MALE,
  AVATAR_TYPE_FEMALE,
  AVATAR_DISPLAY,
  AVATAR_EDITING,
  AVATAR_SELECTED,
  AVATAR_SMALL
} from "../../core/constants/users";

export const LIMITED_LIST_DEFAULT_ELEMS = 3;

export const RESIDENTIAL = "residential";
export const COMMERCIAL = "commercial";
export const OTHER = "other";

export const HOME = "home";
export const INVESTMENT = "investment";

export const GOLD = "#ffc300";
export const WATER_BLUE = "#1283c6";

export const OFFER_STATUS_CLASSNAME = {
  [OFFER_OPEN]: "offer-status-open",
  [OFFER_ACCEPTED]: "offer-status-accepted",
  [OFFER_NOT_ACCEPTED]: "offer-status-no-accepted",
  [OFFER_REJECTED]: "offer-status-rejected",
  [OFFER_JOBDELETED]: "offer-status-job-deleted",
  [OFFER_JOBEXPIRED]: "offer-status-job-expired",
  [OFFER_WITHDRAWN]: "offer-status-withdrawn"
};

export const RegistrationStepMap = {
  0: ConsumerRegistrationForm,
  1: ConsumerRegistrationConfirm
};

export const HOME_PAGE_BUY_SELL_BG_CLASS = "blue";
export const HOME_PAGE_BROWSE_BG_CLASS = "purple";
export const HOME_PAGE_LEARN_BG_CLASS = "yellow";

export const CONUMER_REGISTRATION_STEP3_TITLE = [
  "consumer.contract_to_brokerage_title",
  "consumer.verification_required",
  "consumer.unverified_user_title"
];

export const CONUMER_REGISTRATION_STEP3_LINE1 = [
  "consumer.contract_to_brokerage_line1",
  "consumer.thank_you",
  "consumer.unverified_user_line_1"
];

export const CONUMER_REGISTRATION_STEP3_LINE2 = [
  "consumer.contract_to_brokerage_line2",
  "consumer.verification_send",
  "consumer.unverified_user_line_2"
];

export const PROPERTY_MAP = {
  [SELL]: {
    [RESIDENTIAL_PROPERTY]: HOUSE_SELL_ICON,
    [COMMERCIAL_PROPERTY]: COMMERCIAL_SELL_ICON,
    [HOUSE_TOWNHOUSE_PROPERTY]: HOUSE_SELL_ICON,
    [CONDO_APARTMENT_PROPERTY]: CONDO_SELL_ICON,
    [RECREATIONAL_PROPERTY]: RECREATIONAL_SELL_ICON,
    [OTHER_PROPERTY]: OTHER_SELL_ICON
  },
  [BUY]: {
    [RESIDENTIAL_PROPERTY]: HOUSE_BUY_ICON,
    [COMMERCIAL_PROPERTY]: COMMERCIAL_BUY_ICON,
    [HOUSE_TOWNHOUSE_PROPERTY]: HOUSE_BUY_ICON,
    [CONDO_APARTMENT_PROPERTY]: CONDO_BUY_ICON,
    [RECREATIONAL_PROPERTY]: RECREATIONAL_BUY_ICON,
    [OTHER_PROPERTY]: OTHER_BUY_ICON
  },
  [JOB_CLOSED]: {
    [RESIDENTIAL_PROPERTY]: HOUSE_GREY_ICON,
    [COMMERCIAL_PROPERTY]: COMMERCIAL_GREY_ICON,
    [HOUSE_TOWNHOUSE_PROPERTY]: HOUSE_GREY_ICON,
    [CONDO_APARTMENT_PROPERTY]: CONDO_GREY_ICON,
    [RECREATIONAL_PROPERTY]: RECREATIONAL_GREY_ICON,
    [OTHER_PROPERTY]: OTHER_GREY_ICON
  }
};

export const AVATAR_MAP = {
  [AVATAR_DISPLAY]: {
    [AVATAR_TYPE_DEFAULT]: AVATAR_DEFAULT_LARGE,
    [AVATAR_TYPE_MALE]: AVATAR_MALE_LARGE,
    [AVATAR_TYPE_FEMALE]: AVATAR_FEMALE_LARGE
  },
  [AVATAR_EDITING]: {
    [AVATAR_TYPE_DEFAULT]: AVATAR_DEFAULT_MEDIUM,
    [AVATAR_TYPE_MALE]: AVATAR_MALE_MEDIUM,
    [AVATAR_TYPE_FEMALE]: AVATAR_FEMALE_MEDIUM
  },
  [AVATAR_SMALL]: {
    [AVATAR_TYPE_DEFAULT]: AVATAR_DEFAULT_SMALL,
    [AVATAR_TYPE_MALE]: AVATAR_MALE_SMALL,
    [AVATAR_TYPE_FEMALE]: AVATAR_FEMALE_SMALL
  },
  [AVATAR_SELECTED]: {
    [AVATAR_TYPE_DEFAULT]: AVATAR_DEFAULT_SELECTED,
    [AVATAR_TYPE_MALE]: AVATAR_MALE_SELECTED,
    [AVATAR_TYPE_FEMALE]: AVATAR_FEMALE_SELECTED
  }
};

export const SERVICES_CHECKBOXES = "services-checkboxes";
export const SERVICES_GROUPS = "services-groups";
export const SERVICES_ACCORDION = "services-accordion";

export const PRICE_RANGE_SELECTOR_CLASS_NAME = "select-price-range";

export const locationSearchFilterOutTypes = [
  "room",
  "establishment",
  "finance",
  "food",
  "general_contractor",
  "place_of_worship",
  "street_number",
  "street_address",
  "subPremise",
  "natural_feature",
  "health"
];

export const minPasswordLength = 8;
export const maxPasswordLength = 16;

export const SELECT_CARD = "selectCard";
export const ADD_CARD = "addCard";

export const LANDING_PAGE_QUERY_PARAM = "ref=landing";
