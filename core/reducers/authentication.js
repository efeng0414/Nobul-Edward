import {
  SAVE_CURRENT_USER,
  USERS_IS_LOADING,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  USERS_IS_LOADING_SUCCESS,
  USERS_IS_LOADING_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  GET_AGENT_SERVICES_SUCCESS,
  GET_AGENT_SERVICES_FAILURE,
  GET_AGENT_COMMISSION_SUCCESS,
  GET_AGENT_COMMISSION_FAILURE,
  GET_AGENT_AVERAGE_RATING_SUCCESS,
  GET_AGENT_AVERAGE_RATING_FAILURE,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  UPDATE_SERVICES_AND_COMMISSIONS,
  UPDATE_SERVICES_AND_COMMISSIONS_FAILURE,
  UPDATE_REGION_AND_PROPERTY_TYPE,
  UPDATE_REGION_AND_PROPERTY_TYPE_FAILURE,
  SET_USER_GEOLOCATION,
  SET_PROPERTY_AS_FAVORITE_SUCCESS,
  SET_PROPERTY_AS_FAVORITE_FAILURE,
  REMOVE_PROPERTY_AS_FAVORITE_SUCCESS,
  REMOVE_PROPERTY_AS_FAVORITE_FAILURE,
  SET_USER_AVATAR_URL,
  SET_USER_AVATAR_TYPE_SUCCESS,
  GET_USERS_FAVORITE_LISTINGS_SUCCESS,
  GET_USERS_FAVORITE_LISTINGS_FAILURE,
  SET_REVERSE_GEOLOCATION_SUCCESS,
  SET_REVERSE_GEOLOCATION_ERROR,
  CLEAR_AUTH_ERROR_STATE,
  GET_USERS_AGREEMENT_STATUSES_SUCC,
  GET_USERS_AGREEMENT_STATUSES_FAIL,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESEND_VERIFICATION_EMAIL_FAIL,
  CLEAR_RESEND_VERIFICATION_STATUS,
  RELOAD_USER_LOADING,
  RELOAD_USER_SUCCESS,
  RELOAD_USER_FAILURE,
  SET_FIRST_TIME_REGISTRATION_STATUS,
  UPDATE_STANDARD_BUY_OFFER_SUCCESS,
  UPDATE_STANDARD_BUY_OFFER_FAILURE,
  UPDATE_STANDARD_SELL_OFFER_SUCCESS,
  UPDATE_STANDARD_SELL_OFFER_FAILURE,
  UPDATE_MARKETING_VALUE_USER_SUCCESS,
  UPDATE_MARKETING_VALUE_USER_FAILURE,
  SET_STANDARD_PROPOSAL_SUCCESS,
  SET_STANDARD_PROPOSAL_FAILURE,
  UPDATE_NOTIFICATION_SETTING_SUCCESS,
  UPDATE_NOTIFICATION_SETTING_FAILURE,
  AUTOBIDS_IS_LOADING,
  POST_AUTO_BIDS_SUCCESS,
  POST_AUTO_BIDS_FAILURE,
  UPDATE_AUTO_BIDS_STATUS_FOR_BUYERS_SUCCESS,
  UPDATE_AUTO_BIDS_STATUS_FOR_SELLERS_SUCCESS,
  UPDATE_AUTO_BIDS_STATUS_FAILURE,
  GET_AUTO_BIDS_STATUS_FOR_BUYERS_SUCCESS,
  GET_AUTO_BIDS_STATUS_FOR_SELLERS_SUCCESS,
  GET_AUTO_BIDS_STATUS_FAILURE,
  UPDATE_CURRENT_USER_REGIONS_SUCCESS,
  UPDATE_CURRENT_USER_REGIONS_FAILURE,
  ADD_VERIFICATION_DATA_SUCCESS,
  GET_LICENSE_IMAGE_URL_SUCCESS,
  SET_USER_AVATAR_ERROR,
  SET_USER_AVATAR_TYPE_ERROR,
  GET_LICENSE_IMAGE_URL_FAILURE,
  UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_SUCCESS,
  UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_FAILURE,
  SIGN_OUT_FAILURE,
  UPDATE_AUTO_BIDS_FOR_BUYERS_SUCCESS,
  UPDATE_AUTO_BIDS_FOR_SELLERS_SUCCESS
} from "../types/authentication";
import {
  UNSUBSCRIBE_FROM_STRIPE_PLAN_SUCCESS,
  CREATE_STRIPE_SUBSCRIPTION_CHARGE_SUCCESS
} from "../types/stripeCustomers";
import {
  NOTIFICATIONS,
  AUTOBID,
  REBATE_COMMISSION,
  COOPERATING_COMMISSION,
  LISTING_COMMISSION,
  SERVICES,
  PERSONALIZED_MESSAGE,
  TAGLINE
} from "../api-transform/users";
import { BUY, SELL } from "../api-transform/jobs";
import { createObjectFromArray } from "../utilities/array-to-object";

const defaultState = {
  currentUser: {},
  requestedAgreements: {},
  isLoading: false,
  currentUserLocation: {},
  reverseGeoLocation: "",
  error: {},
  isEmailSent: false,
  isEmailVerified: false,
  isResetPasswordFail: false,
  verificationEmailResent: false,
  isFirstTimeRegistration: false,
  profile: {}
};

const authentication = (state = defaultState, action) => {
  switch (action.type) {
    case USERS_IS_LOADING:
      return {
        ...state,
        error: {},
        isLoading: action.payload
      };
    case USERS_IS_LOADING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: {},
        isLoading: false
      };
    case USERS_IS_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SAVE_CURRENT_USER:
      return {
        ...state
      };
    case RESET_PASSWORD:
      return {
        ...state,
        isEmailSent: action.payload,
        isResetPasswordFail: !action.payload,
        error: {},
        isLoading: false
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        isResetPasswordFail: !!action.payload,
        isEmailSent: false,
        isLoading: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userNode,
        currentUser: action.payload.currentUser,
        error: {},
        isLoading: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_AGENT_SERVICES_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false
      };
    case GET_AGENT_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_AGENT_COMMISSION_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false
      };
    case GET_AGENT_COMMISSION_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_AGENT_AVERAGE_RATING_SUCCESS:
      return {
        ...state,
        averageRating: action.payload,
        error: {},
        isLoading: false
      };
    case GET_AGENT_AVERAGE_RATING_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        ...action.payload,
        error: {}
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        error: {},
        profile: action.payload,
        isLoading: false
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UPDATE_SERVICES_AND_COMMISSIONS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_SERVICES_AND_COMMISSIONS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    case UPDATE_REGION_AND_PROPERTY_TYPE:
      return {
        ...state,
        ...action.payload,
        error: {}
      };
    case UPDATE_REGION_AND_PROPERTY_TYPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_USER_GEOLOCATION:
      return {
        ...state,
        error: {},
        isLoading: false,
        currentUserLocation: action.payload
      };
    case SET_PROPERTY_AS_FAVORITE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case SET_PROPERTY_AS_FAVORITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case REMOVE_PROPERTY_AS_FAVORITE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_PROPERTY_AS_FAVORITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_USER_AVATAR_URL:
      return {
        ...state,
        avatarUrl: action.payload
      };
    case SET_USER_AVATAR_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: {
          ...state.profile,
          avatarType: action.payload
        }
      };
    case GET_USERS_FAVORITE_LISTINGS_SUCCESS:
      return {
        ...state,
        favoriteListings: action.payload,
        isLoading: false
      };
    case GET_USERS_FAVORITE_LISTINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_REVERSE_GEOLOCATION_SUCCESS:
      return {
        ...state,
        reverseGeolocation: action.payload
      };
    case SET_REVERSE_GEOLOCATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_AUTH_ERROR_STATE:
      return {
        ...state,
        error: {}
      };
    case GET_USERS_AGREEMENT_STATUSES_SUCC:
      return {
        ...state,
        requestedAgreements: action.payload,
        isLoading: false
      };
    case GET_USERS_AGREEMENT_STATUSES_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case RESEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        verificationEmailResent: true,
        error: {},
        isLoading: false
      };
    case RESEND_VERIFICATION_EMAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        verificationEmailResent: false,
        isLoading: false
      };
    case CLEAR_RESEND_VERIFICATION_STATUS:
      return {
        ...state,
        verificationEmailResent: false,
        error: {},
        isLoading: false
      };

    case RELOAD_USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case RELOAD_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isEmailVerified: action.payload.emailVerified,
        error: {},
        isLoading: false
      };
    case RELOAD_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isEmailVerified: false,
        isLoading: false
      };
    case SET_FIRST_TIME_REGISTRATION_STATUS:
      return {
        ...state,
        isFirstTimeRegistration: action.payload,
        error: {},
        isLoading: false
      };
    case UPDATE_STANDARD_BUY_OFFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
        defaultCommissions: {
          ...state.defaultCommissions,
          [REBATE_COMMISSION]: action.payload.agentData[REBATE_COMMISSION]
        },
        [PERSONALIZED_MESSAGE]: action.payload.agentData[PERSONALIZED_MESSAGE],
        [TAGLINE]: action.payload.agentData[TAGLINE],
        [SERVICES]: {
          ...state[SERVICES],
          buy: createObjectFromArray(action.payload.agentData[SERVICES])
        }
      };
    case UPDATE_STANDARD_BUY_OFFER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_STANDARD_SELL_OFFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
        defaultCommissions: {
          ...state.defaultCommissions,
          [COOPERATING_COMMISSION]:
            action.payload.agentData[COOPERATING_COMMISSION],
          [LISTING_COMMISSION]: action.payload.agentData[LISTING_COMMISSION]
        },
        [PERSONALIZED_MESSAGE]: action.payload.agentData[PERSONALIZED_MESSAGE],
        [TAGLINE]: action.payload.agentData[TAGLINE],
        [SERVICES]: {
          ...state[SERVICES],
          sell: createObjectFromArray(action.payload.agentData[SERVICES])
        }
      };
    case UPDATE_STANDARD_SELL_OFFER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_MARKETING_VALUE_USER_SUCCESS:
      return {
        ...state,
        marketing: {
          ...state.marketing,
          [action.payload.key]: action.payload.value
        },
        error: {},
        isLoading: false
      };
    case UPDATE_MARKETING_VALUE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_STANDARD_PROPOSAL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: {},
        isLoading: false
      };
    case SET_STANDARD_PROPOSAL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case UPDATE_NOTIFICATION_SETTING_SUCCESS:
      return {
        ...state,
        [NOTIFICATIONS]: {
          ...state[NOTIFICATIONS],
          [action.payload.notificationKey]: action.payload.notificationValue
        },
        error: {},
        isLoading: false
      };
    case UPDATE_NOTIFICATION_SETTING_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UNSUBSCRIBE_FROM_STRIPE_PLAN_SUCCESS:
      return {
        ...state,
        isPremium: false
      };
    case CREATE_STRIPE_SUBSCRIPTION_CHARGE_SUCCESS:
      return {
        ...state,
        isPremium: true
      };
    case AUTOBIDS_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case POST_AUTO_BIDS_SUCCESS:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          ...action.payload
        },
        isLoading: false
      };
    case POST_AUTO_BIDS_FAILURE:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          error: action.payload
        },
        isLoading: false
      };
    case UPDATE_AUTO_BIDS_STATUS_FOR_BUYERS_SUCCESS:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          [BUY]: {
            ...state[AUTOBID][BUY],
            status: action.payload
          }
        },
        isLoading: false
      };
    case UPDATE_AUTO_BIDS_STATUS_FOR_SELLERS_SUCCESS:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          [SELL]: {
            ...state[AUTOBID][SELL],
            status: action.payload
          }
        },
        isLoading: false
      };
    case UPDATE_AUTO_BIDS_STATUS_FAILURE:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          error: action.payload
        },
        isLoading: false
      };
    case GET_AUTO_BIDS_STATUS_FOR_BUYERS_SUCCESS:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          statusForBuyers: action.payload
        },
        isLoading: false
      };
    case GET_AUTO_BIDS_STATUS_FOR_SELLERS_SUCCESS:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          statusForSellers: action.payload
        },
        isLoading: false
      };
    case GET_AUTO_BIDS_STATUS_FAILURE:
      return {
        ...state,
        [AUTOBID]: {
          ...state[AUTOBID],
          error: action.payload
        },
        isLoading: false
      };
    case UPDATE_CURRENT_USER_REGIONS_SUCCESS:
      return {
        ...state,
        error: {},
        locations: action.payload,
        isLoading: false
      };
    case UPDATE_CURRENT_USER_REGIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ADD_VERIFICATION_DATA_SUCCESS:
      return {
        ...state,
        verification: { ...state.verification, ...action.payload },
        profile: { ...state.profile, ...action.payload },
        isLoading: false
      };
    case GET_LICENSE_IMAGE_URL_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false,
        verification: {
          ...state.verification,
          licenseImageUrl: action.payload
        }
      };
    case GET_LICENSE_IMAGE_URL_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_USER_AVATAR_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case SET_USER_AVATAR_TYPE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: {}
      };
    }
    case UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case SIGN_OUT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case UPDATE_AUTO_BIDS_FOR_BUYERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: {},
        [AUTOBID]: {
          ...state[AUTOBID],
          [BUY]: {
            ...state[AUTOBID][BUY],
            ...action.payload
          }
        }
      };
    }

    case UPDATE_AUTO_BIDS_FOR_SELLERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: {},
        [AUTOBID]: {
          ...state[AUTOBID],
          [SELL]: {
            ...state[AUTOBID][SELL],
            ...action.payload
          }
        }
      };
    }
    default:
      return state;
  }
};

export default authentication;
