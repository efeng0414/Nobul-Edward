import firebase from "firebase/app";
import "firebase/database";

import {
  setConsumerUserNodeInDatabase,
  setAgentUserNodeInDatabase,
  postLicenseImage,
  postAvatarImage,
  getAvatarImageUrl
} from "../firebase/users";
import {
  saveCurrentUserSuccess,
  saveCurrentUserFailure,
  setUserAvatarUrl
} from "../actions/authentication";
import { createMarketingNode } from "../utilities/create-marketing-node";
import {
  USER_TYPE,
  IS_PREMIUM,
  EMAIL,
  PHONE_PREFIX,
  PHONE,
  ADDRESS1,
  ADDRESS2,
  CREATED_AT,
  UPDATED_AT,
  CREATED_ON,
  LOOKING_FOR,
  TIMELINE,
  MARKETING,
  CITY,
  PROVINCE_OR_STATE,
  COUNTRY,
  POSTAL_OR_ZIP_CODE,
  PROFILE,
  FIRST_NAME,
  LAST_NAME,
  FAVORITE_LISTINGS,
  NOTIFICATIONS,
  PROPOSAL_NOTIFICATION,
  EVENT,
  PRE_APPROVED_MORTGAGE,
  AREA_OF_INTEREST,
  TIMEZONE,
  BUSINESS_PROFILE_CREATED,
  CONSENT_EMAIL_NOTIFICATIONS,
  CONSENT_FOR_NEWS,
  POSTING_NOTIFICATION,
  VERIFICATION,
  STATUS,
  UNVERIFIED
} from "../api-transform/users";
import { CREATED_ON_WEB } from "../constants/shared";
import { AGENT_USER_TYPE } from "../constants/users";

const registerConsumer = (postData, dispatch) => {
  const {
    address1 = "",
    address2 = "",
    city = "",
    country = "",
    email,
    firstName,
    lastName,
    phone = "",
    phonePrefix = "",
    postalOrZipCode = "",
    province = "",
    lookingFor,
    timeline,
    favoriteList = {},
    consentForNews = false,
    areaOfInterest = "",
    mortgageAmount = 0,
    createdOn = CREATED_ON_WEB
  } = postData;

  Object.keys(favoriteList).map(prop => {
    favoriteList[prop] = firebase.database.ServerValue.TIMESTAMP;
  });

  let consumerPostData = null;

  consumerPostData = {
    [USER_TYPE]: "consumer",
    [FAVORITE_LISTINGS]: favoriteList,
    [NOTIFICATIONS]: {
      [PROPOSAL_NOTIFICATION]: true,
      [EVENT]: true,
      [POSTING_NOTIFICATION]: true
    },
    [MARKETING]: {
      [CONSENT_EMAIL_NOTIFICATIONS]: true,
      [CONSENT_FOR_NEWS]: consentForNews
    },
    [AREA_OF_INTEREST]: areaOfInterest,
    [PROFILE]: {
      [FIRST_NAME]: firstName,
      [LAST_NAME]: lastName,
      [EMAIL]: email,
      [PHONE_PREFIX]: phonePrefix,
      [PHONE]: phone.replace(/-| /g, ""),
      [PROVINCE_OR_STATE]: province,
      [POSTAL_OR_ZIP_CODE]: postalOrZipCode,
      [ADDRESS1]: address1,
      [ADDRESS2]: address2,
      [CITY]: city,
      [COUNTRY]: country,
      [LOOKING_FOR]: lookingFor,
      [TIMELINE]: timeline,
      [PRE_APPROVED_MORTGAGE]: parseFloat(mortgageAmount)
    },
    [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [CREATED_ON]: createdOn,
    [TIMEZONE]: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown" // Timezone code doesnt work in IE and breakz things
  };

  return setConsumerUserNodeInDatabase(consumerPostData)
    .then(() => {
      dispatch(saveCurrentUserSuccess(consumerPostData));
      return Promise.resolve("save success");
    })
    .catch(error => {
      dispatch(saveCurrentUserFailure(error));
      return Promise.reject(error);
    });
  // return identifyCurrentUser(profile); - Intercom Integration
};

const registerAgent = (postData, userType, agentData, dispatch) => {
  if (Object.keys(postData).length) {
    agentData.profile = postData;
  }
  const { profile } = agentData;

  let {
    email,
    firstName,
    lastName,
    phonePrefix = "",
    phone,
    marketingArrayOfValues,
    consentForNews,
    createdOn = CREATED_ON_WEB
  } = profile;

  const consentForNewsArrayValue = consentForNews && "consentForNews";
  const marketingArray = marketingArrayOfValues || [consentForNewsArrayValue];
  const marketing = createMarketingNode(marketingArray);

  const agentPostData = {
    [USER_TYPE]: AGENT_USER_TYPE,
    [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [BUSINESS_PROFILE_CREATED]: false,
    [PROFILE]: {
      [FIRST_NAME]: firstName,
      [LAST_NAME]: lastName,
      [EMAIL]: email,
      [PHONE_PREFIX]: phonePrefix,
      [PHONE]: phone.replace(/-| /g, "")
    },
    [NOTIFICATIONS]: {
      [PROPOSAL_NOTIFICATION]: true,
      [EVENT]: true,
      [POSTING_NOTIFICATION]: true
    },
    [CREATED_ON]: createdOn,
    [IS_PREMIUM]: false,
    [MARKETING]: marketing,
    [TIMEZONE]: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown", // Timezone code doesnt work in IE and breakz things
    [VERIFICATION]: {
      [STATUS]: UNVERIFIED
    }
  };

  setAgentUserNodeInDatabase(agentPostData)
    .then(() => dispatch(saveCurrentUserSuccess(agentPostData)))
    .catch(error => {
      dispatch(saveCurrentUserFailure(error));
      return Promise.reject(error);
    });
  // return identifyCurrentUser(profile); - Intercom Integration
};

export { registerConsumer, registerAgent };
