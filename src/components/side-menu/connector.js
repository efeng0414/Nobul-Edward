import { connect } from "react-redux";
import {
  setConsumerAvatarAsync,
  updateAgentAvatarAsync
} from "../../../core/thunk/users";
import { getSignedInUserNode } from "../../../core/thunk/authentication";

import SideMenu from "./component";

const mapStateToProps = state => ({
  avatarUrl: state.authentication.avatarUrl,
  currentUserProfile: state.authentication.profile,
  currentUser: state.authentication.currentUser,
  userAgreements: state.authentication.agreements,
  notifications: state.notifications.notifications
});

const mapDispatchToProps = dispatch => ({
  setConsumerAvatar: ({ uid, avatarType }) =>
    dispatch(setConsumerAvatarAsync({ uid, avatarType })),
  setCurrentUser: user => dispatch(getSignedInUserNode(user)),
  updateAgentAvatar: ({ uid, file }) =>
    dispatch(updateAgentAvatarAsync({ uid, file }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
