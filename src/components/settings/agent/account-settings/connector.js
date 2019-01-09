import { connect } from "react-redux";
import {
  updateCurrentUserProfileForKeyThunk,
  updateCurrentUserPasswordAsync,
  updateMarketingValueForUserThunk,
  updateCurrentUsersEmailThunk
} from "../../../../../core/thunk/authentication";
import {
  getCustomerCardsAsync,
  deleteCardAsync
} from "../../../../../core/thunk/stripeCustomers";

import AccountSettings from "./component";
import { AGENT_USER_TYPE } from "../../../../../core/constants/users";
import {
  CONSENT_FOR_NEWS,
  CONSENT_EMAIL_NOTIFICATIONS
} from "../../../../../core/api-transform/users";
import { checkIfEmailExists } from "../../../../../core/firebase/users";

const mapStateToProps = state => ({
  userProfile: state.authentication.profile,
  consentForNews: state.authentication.marketing.consentForNews,
  stripeCards: state.stripeCustomers.cards,
  consentForEmailNotifications:
    state.authentication.marketing.consentEmailNotifications,
  error: state.authentication.error
});

const mapDispatchToProps = dispatch => ({
  deleteCardAsync: ({ userId, cardNodeId }) =>
    dispatch(deleteCardAsync({ userId, cardNodeId })),
  getStripeCards: userId => dispatch(getCustomerCardsAsync({ userId })),
  updateProfile: ({ userId, userType, key, value }) =>
    dispatch(
      updateCurrentUserProfileForKeyThunk({ userId, userType, key, value })
    ),
  updatePassword: (currentPassword, newPassword) =>
    dispatch(updateCurrentUserPasswordAsync(currentPassword, newPassword)),
  updateConsentForNews: ({ agentId, consentForNews }) =>
    dispatch(
      updateMarketingValueForUserThunk({
        userId: agentId,
        userType: AGENT_USER_TYPE,
        key: CONSENT_FOR_NEWS,
        value: consentForNews
      })
    ),
  updateConsentForEmailNotifications: ({ agentId, emailNotifications }) =>
    dispatch(
      updateMarketingValueForUserThunk({
        userId: agentId,
        key: CONSENT_EMAIL_NOTIFICATIONS,
        value: emailNotifications,
        userType: AGENT_USER_TYPE
      })
    ),
  updateEmail: ({ email, userId, userType, password }) =>
    dispatch(
      updateCurrentUsersEmailThunk({ email, userId, userType, password })
    ),
  isEmailUnique: email => dispatch(checkIfEmailExists(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
