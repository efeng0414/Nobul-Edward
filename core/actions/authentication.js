import {
  SAVE_CURRENT_USER,
  USERS_IS_LOADING,
  USERS_IS_LOADING_SUCCESS,
  USERS_IS_LOADING_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_OUT,
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
  REMOVE_PROPERTY_AS_FAVORITE_SUCCESS,
  SET_PROPERTY_AS_FAVORITE_FAILURE,
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
  ADD_VERIFICATION_DATA_FAILURE,
  GET_LICENSE_IMAGE_URL_SUCCESS,
  SET_USER_AVATAR_ERROR,
  SET_USER_AVATAR_TYPE_ERROR,
  GET_USER_LICENSE_IMAGE_FAILURE,
  UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_SUCCESS,
  UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_FAILURE,
  SIGN_OUT_FAILURE,
  UPDATE_AUTO_BIDS_FOR_BUYERS_SUCCESS,
  UPDATE_AUTO_BIDS_FOR_SELLERS_SUCCESS
} from "../types/authentication";

export const autoBidsIsLoading = isLoading => ({
  type: AUTOBIDS_IS_LOADING,
  payload: isLoading
});

export const postAutoBidsSuccess = autoBid => ({
  type: POST_AUTO_BIDS_SUCCESS,
  payload: autoBid
});

export const postAutoBidsFailure = error => ({
  type: POST_AUTO_BIDS_FAILURE,
  payload: error
});

export const updateAutoBidsForBuyersSuccess = ({ payload }) => ({
  type: UPDATE_AUTO_BIDS_FOR_BUYERS_SUCCESS,
  payload: payload
});

export const updateAutoBidsForSellersSuccess = ({ payload }) => ({
  type: UPDATE_AUTO_BIDS_FOR_SELLERS_SUCCESS,
  payload: payload
});

export const updateAutoBidsStatusForBuyersSuccess = status => ({
  type: UPDATE_AUTO_BIDS_STATUS_FOR_BUYERS_SUCCESS,
  payload: status
});

export const updateAutoBidsStatusForSellersSuccess = status => ({
  type: UPDATE_AUTO_BIDS_STATUS_FOR_SELLERS_SUCCESS,
  payload: status
});

export const updateAutoBidsFailure = error => ({
  type: UPDATE_AUTO_BIDS_STATUS_FAILURE,
  payload: error
});

export const getAutoBidsStatusForBuyersSuccess = status => ({
  type: GET_AUTO_BIDS_STATUS_FOR_BUYERS_SUCCESS,
  payload: status
});

export const getAutoBidsStatusForSellersSuccess = status => ({
  type: GET_AUTO_BIDS_STATUS_FOR_SELLERS_SUCCESS,
  payload: status
});

export const getAutoBidsStatusFailure = error => ({
  type: GET_AUTO_BIDS_STATUS_FAILURE,
  payload: error
});

export const usersIsLoading = isLoading => ({
  type: USERS_IS_LOADING,
  payload: isLoading
});

export const saveCurrentUserSuccess = currentUser => ({
  type: USERS_IS_LOADING_SUCCESS,
  payload: currentUser
});

export const saveCurrentUserFailure = error => ({
  type: USERS_IS_LOADING_FAILURE,
  payload: error
});

export const saveCurrentUser = userData => ({
  type: SAVE_CURRENT_USER,
  payload: userData
});

export const resetPassword = isEmailSent => ({
  type: RESET_PASSWORD,
  payload: isEmailSent
});

export const resetPasswordFailure = error => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error
});

export const loginUserSuccess = (currentUser, userNode) => ({
  type: LOGIN_SUCCESS,
  payload: { currentUser, userNode }
});

export const loginUserFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const getAgentServicesSuccess = agentServices => ({
  type: GET_AGENT_SERVICES_SUCCESS,
  payload: agentServices
});

export const getAgentServicesFailure = error => ({
  type: GET_AGENT_SERVICES_FAILURE,
  payload: error
});

export const getAgentAverageRatingSuccss = agentRating => ({
  type: GET_AGENT_AVERAGE_RATING_SUCCESS,
  payload: agentRating
});

export const getAgentAverageRatingFailure = error => ({
  type: GET_AGENT_AVERAGE_RATING_FAILURE,
  payload: error
});

export const updatePassword = isUpdatePasswordSuccess => ({
  type: UPDATE_PASSWORD,
  payload: isUpdatePasswordSuccess
});

export const updatePasswordFailure = error => ({
  type: UPDATE_PASSWORD_FAILURE,
  payload: error
});

export const getAgentCommissionSuccess = agentCommission => ({
  type: GET_AGENT_COMMISSION_SUCCESS,
  payload: agentCommission
});

export const getAgentCommissionFailure = error => ({
  type: GET_AGENT_COMMISSION_FAILURE,
  payload: error
});

export const updateProfile = profile => ({
  type: UPDATE_PROFILE,
  payload: profile
});

export const updateProfileFailure = error => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error
});

export const addVerificationDataSuccess = ({ payload = {} }) => ({
  type: ADD_VERIFICATION_DATA_SUCCESS,
  payload
});

export const addVerificationDataFailure = error => ({
  type: ADD_VERIFICATION_DATA_FAILURE,
  payload: error
});

export const updateServicesAndCommissions = payload => ({
  type: UPDATE_SERVICES_AND_COMMISSIONS,
  payload: payload
});

export const updateServicesAndCommissionsFailure = error => ({
  type: UPDATE_SERVICES_AND_COMMISSIONS_FAILURE,
  payload: {
    error: error
  }
});

export const updateRegionAndPropertyType = payload => ({
  type: UPDATE_REGION_AND_PROPERTY_TYPE,
  payload
});

export const updateRegionAndPropertyTypeFailure = payload => ({
  type: UPDATE_REGION_AND_PROPERTY_TYPE_FAILURE,
  payload
});

export const setUserGeolocation = coordinates => ({
  type: SET_USER_GEOLOCATION,
  payload: coordinates
});

export const signOut = () => ({
  type: SIGN_OUT
});

export const signOutFailure = error => ({
  type: SIGN_OUT_FAILURE,
  payload: error
});

export const setPropertyAsFavoriteSuccess = creaId => ({
  type: SET_PROPERTY_AS_FAVORITE_SUCCESS,
  payload: creaId
});

export const setPropertyAsFavoriteFailure = error => ({
  type: SET_PROPERTY_AS_FAVORITE_FAILURE,
  payload: error
});

export const removePropertyAsFavoriteSuccess = creaId => ({
  type: REMOVE_PROPERTY_AS_FAVORITE_SUCCESS,
  payload: creaId
});

export const removePropertyAsFavoriteFailure = error => ({
  type: REMOVE_PROPERTY_AS_FAVORITE_FAILURE,
  payload: error
});

export const setUserAvatarUrl = ({ payload }) => ({
  type: SET_USER_AVATAR_URL,
  payload
});

export const setUserAvatarTypeSuccess = ({ payload }) => ({
  type: SET_USER_AVATAR_TYPE_SUCCESS,
  payload
});

export const setUserAvatarError = ({ payload }) => ({
  type: SET_USER_AVATAR_ERROR,
  payload
});

export const setUserAvatarTypeError = ({ payload }) => ({
  type: SET_USER_AVATAR_TYPE_ERROR,
  payload
});

export const getUsersFavoriteListingsSuccess = ({ payload }) => ({
  type: GET_USERS_FAVORITE_LISTINGS_SUCCESS,
  payload
});

export const getUsersFavoriteListingsFailure = ({ error }) => ({
  type: GET_USERS_FAVORITE_LISTINGS_FAILURE,
  payload: error
});

export const setReverseGeolocationSuccess = location => ({
  type: SET_REVERSE_GEOLOCATION_SUCCESS,
  payload: location
});

export const setReverseGeolocationError = error => ({
  type: SET_REVERSE_GEOLOCATION_ERROR,
  payload: error
});

export const clearErrorState = () => ({
  type: CLEAR_AUTH_ERROR_STATE,
  payload: {}
});

export const getUsersAgreementStatusesSucc = agreementStatuses => ({
  type: GET_USERS_AGREEMENT_STATUSES_SUCC,
  payload: agreementStatuses
});

export const getUsersAgreementStatusesFail = error => ({
  type: GET_USERS_AGREEMENT_STATUSES_FAIL,
  payload: error
});

export const resendVerificationEmailSuccess = () => ({
  type: RESEND_VERIFICATION_EMAIL_SUCCESS
});

export const resendVerificationEmailFail = error => ({
  type: RESEND_VERIFICATION_EMAIL_FAIL,
  payload: error
});

export const clearResendVerificationStatus = () => ({
  type: CLEAR_RESEND_VERIFICATION_STATUS
});

export const reloadUserLoading = () => ({
  type: RELOAD_USER_LOADING
});

export const reloadUserSuccess = currentUser => ({
  type: RELOAD_USER_SUCCESS,
  payload: currentUser
});

export const reloadUserFailure = error => ({
  type: RELOAD_USER_FAILURE,
  payload: error
});

export const setFirstTimeRegistrationStatus = status => ({
  type: SET_FIRST_TIME_REGISTRATION_STATUS,
  payload: status
});
export const updateStandardBuyOfferSuccess = offer => ({
  type: UPDATE_STANDARD_BUY_OFFER_SUCCESS,
  payload: offer
});

export const updateStandardBuyOfferFailure = error => ({
  type: UPDATE_STANDARD_BUY_OFFER_FAILURE,
  payload: error
});

export const updateStandardSellOfferSuccess = offer => ({
  type: UPDATE_STANDARD_SELL_OFFER_SUCCESS,
  payload: offer
});

export const updateStandardSellOfferFailure = error => ({
  type: UPDATE_STANDARD_SELL_OFFER_FAILURE,
  payload: error
});

export const updateMarketingValueForUserSuccess = ({ key, value }) => ({
  type: UPDATE_MARKETING_VALUE_USER_SUCCESS,
  payload: {
    key,
    value
  }
});

export const updateMarketingValueForUserFailure = ({ error }) => ({
  type: UPDATE_MARKETING_VALUE_USER_FAILURE,
  payload: error
});

export const setStandardProposalSuccess = ({ agentObject }) => ({
  type: SET_STANDARD_PROPOSAL_SUCCESS,
  payload: agentObject
});

export const setStandardProposalFailure = ({ error }) => ({
  type: SET_STANDARD_PROPOSAL_FAILURE,
  error
});

export const updateNotificationSettingSuccess = ({
  notificationKey,
  notificationValue
}) => ({
  type: UPDATE_NOTIFICATION_SETTING_SUCCESS,
  payload: {
    notificationKey,
    notificationValue
  }
});

export const updateNotificationSettingFailure = ({ error }) => ({
  type: UPDATE_NOTIFICATION_SETTING_FAILURE,
  payload: error
});

export const updateCurrentUserRegionsSuccess = ({ selectedPolygons }) => ({
  type: UPDATE_CURRENT_USER_REGIONS_SUCCESS,
  payload: selectedPolygons
});

export const updateCurrentUserRegionsFailure = ({ error }) => ({
  type: UPDATE_CURRENT_USER_REGIONS_FAILURE,
  payload: error
});

export const getUserLicenseImageUrlSuccess = ({ payload }) => ({
  type: GET_LICENSE_IMAGE_URL_SUCCESS,
  payload
});

export const getUserLicenseImageUrlFailure = ({ payload }) => ({
  type: GET_USER_LICENSE_IMAGE_FAILURE,
  payload
});

export const updateCurrentUserLicenseImageMobileSuccess = () => ({
  type: UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_SUCCESS
});

export const updateCurrentUserLicenseImageMobileFailure = ({ payload }) => ({
  type: UPDATE_CURRENT_USER_LICENSE_IMAGE_MOBILE_FAILURE,
  payload
});
