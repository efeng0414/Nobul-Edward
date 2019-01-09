import { connect } from "react-redux";
import NotificationSettings from "./component";
import {
  NOTIFICATIONS,
  EVENT,
  PROPOSAL_NOTIFICATION,
  POSTING_NOTIFICATION,
  CONSENT_EMAIL_NOTIFICATIONS,
  MARKETING
} from "../../../core/api-transform/users";
import {
  updateNotificationSettingThunk,
  updateMarketingValueForUserThunk
} from "../../../core/thunk/authentication";

const mapStateToProps = state => ({
  isEventNotificationChecked: state.authentication[NOTIFICATIONS][EVENT],
  isProposalNotificationChecked:
    state.authentication[NOTIFICATIONS][PROPOSAL_NOTIFICATION],
  isPostingNotificationChecked:
    state.authentication[NOTIFICATIONS][POSTING_NOTIFICATION],
  isEmailNotificationChecked:
    state.authentication[MARKETING][CONSENT_EMAIL_NOTIFICATIONS],
  currentUserId: state.authentication.currentUser.uid,
  currentUserType: state.authentication.userType
});

const mapDispatchToProps = dispatch => ({
  updateNotificationSetting: ({ key, value, userId, userType }) =>
    dispatch(updateNotificationSettingThunk({ key, value, userId, userType })),
  updateConsentForEmailNotifications: ({
    userId,
    emailNotifications,
    userType
  }) =>
    dispatch(
      updateMarketingValueForUserThunk({
        userId,
        key: CONSENT_EMAIL_NOTIFICATIONS,
        value: emailNotifications,
        userType
      })
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationSettings
);
