import { connect } from "react-redux";
import { withRouter } from "react-router";
import App from "./container";

import {
  getSignedInUserNode,
  signOutAsync,
  onAuthStateChange
} from "../../../core/thunk/authentication";
import { listenForNotificationsAsync } from "../../../core/thunk/notifications";
import { setScreenBreakpoint } from "../../../core/actions/breakpoints";
import { getActiveFeaturesAsync } from "../../../core/thunk/config";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(getSignedInUserNode(user)),
  signOut: () => dispatch(signOutAsync()),
  listenForNotifications: userId =>
    dispatch(listenForNotificationsAsync(userId)),
  onAuthStateChange: () => {
    dispatch(onAuthStateChange());
  },
  setScreenBreakpoint: currentBreakpoint =>
    dispatch(setScreenBreakpoint({ currentBreakpoint })),
  getActiveFeatures: () => dispatch(getActiveFeaturesAsync())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
