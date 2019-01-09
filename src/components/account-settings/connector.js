import { connect } from "react-redux";
import {
  updateCurrentUserProfileForKeyThunk,
  updateCurrentUserPasswordAsync,
  updateMarketingValueForUserThunk,
  updateCurrentUsersEmailThunk
} from "../../../core/thunk/authentication";
import AccountSettings from "./component";
import {
  CONSENT_FOR_NEWS,
  CONSENT_EMAIL_NOTIFICATIONS
} from "../../../core/api-transform/users";
import { CONSUMER_USER_TYPE } from "../../../core/constants/users";
import { checkIfEmailExists } from "../../../core/firebase/users";

const mapStateToProps = state => ({
  userProfile: state.authentication.profile,
  consentForNews: state.authentication.marketing.consentForNews,
  consentForEmailNotifications:
    state.authentication.marketing.consentEmailNotifications,
  error: state.authentication.error
});

const mapDispatchToProps = dispatch => ({
  updateProfile: ({ userId, userType, key, value }) =>
    dispatch(
      updateCurrentUserProfileForKeyThunk({ userId, userType, key, value })
    ),
  updatePassword: (currentPassword, newPassword) =>
    dispatch(updateCurrentUserPasswordAsync(currentPassword, newPassword)),
  updateConsentForNews: ({ consumerId, consentForNews }) =>
    dispatch(
      updateMarketingValueForUserThunk({
        userId: consumerId,
        userType: CONSUMER_USER_TYPE,
        key: CONSENT_FOR_NEWS,
        value: consentForNews
      })
    ),
  updateConsentForEmailNotifications: ({ consumerId, emailNotifications }) =>
    dispatch(
      updateMarketingValueForUserThunk({
        userId: consumerId,
        key: CONSENT_EMAIL_NOTIFICATIONS,
        value: emailNotifications,
        userType: CONSUMER_USER_TYPE
      })
    ),
  updateEmail: ({ email, password, userId, userType }) =>
    dispatch(
      updateCurrentUsersEmailThunk({ email, password, userId, userType })
    ),
  isEmailUnique: email => dispatch(checkIfEmailExists(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
