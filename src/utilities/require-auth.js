import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { connect } from "react-redux";

import {
  authenticateUser,
  isUserEmailVerified,
  getUserNode,
  setMigratedFlagToFalse
} from "../../core/firebase/users";
import { url } from "../../src/routes/routes";
import { url as myNobulUrls } from "../../src/routes/myNobul";
import AuthenticationLoader from "../../src/components/authentication-loader";
import makeCancelablePromise from "./make-cancelable-promise";
import { isAgent } from "./route-verification";
import { cacheItem, checkForCached } from "../utilities/cache-handler";
import {
  LOGIN_STATUS,
  USER_TYPE,
  BUYER_OR_SELLER,
  TIME_HORIZON
} from "../utilities/google-tag-variable";
import { gtmVariable } from "../utilities/gtm-event";

const RequireAuth = ({
  allowAnonymous = false
} = {}) => AuthenticatedComponent => {
  const mapStateToProps = state => ({
    currentUserId: state.authentication.currentUser.uid,
    userType: state.authentication.userType,
    lookingFor: state.authentication.profile.lookingFor,
    timeline: state.authentication.profile.timeline
  });

  @withRouter
  class RequireAuth extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      currentUserId: PropTypes.string,
      userType: PropTypes.string,
      lookingFor: PropTypes.array,
      timeline: PropTypes.number
    };

    static defaultProps = {
      currentUserId: "",
      userType: "",
      lookingFor: [],
      timeline: 0
    };

    state = {
      userIsAuthenticated: false,
      userId: "",
      doneAuthenticating: false
    };

    static WrappedComponent = AuthenticatedComponent;

    @bound
    handleMigratedUser({ userId, userType }) {
      setMigratedFlagToFalse({ userId, userType })
        .then(() => {
          this.props.history.push(myNobulUrls.accountSettings);
          cacheItem(this.getIsMigratedKeyHash({ userId }), true, 10000);
          this.handleVerifiedUser({ userId });
        })
        .catch(console.error);
    }

    @bound
    getIsMigratedKeyHash({ userId }) {
      return `isMigrated-${userId}`;
    }

    @bound
    handleVerifiedUser({ userId }) {
      this.setState({
        userIsAuthenticated: true,
        userId,
        doneAuthenticating: true
      });

      const urlPaths = [
        url.consumerRegistration,
        url.agentRegistration,
        url.landing3
      ];
      urlPaths.includes(this.props.history.location.pathname) &&
        this.props.history.push(url.home);
    }

    @bound
    isMigratedUser({ authUser }) {
      const { uid: userId } = authUser;
      const handleUserNodeResponse = (resolve, reject) => snapshot => {
        const user = snapshot.val();
        return user
          ? resolve({
              currentUser: authUser,
              ...user
            })
          : reject(new Error("No user object found"));
      };

      return new Promise(
        (resolve, reject) =>
          checkForCached(this.getIsMigratedKeyHash({ userId }))
            ? resolve({ currentUser: authUser })
            : getUserNode(authUser).then(
                handleUserNodeResponse(resolve, reject)
              )
      );
    }

    @bound
    handleUnverifiedUser({ userId }) {
      isAgent({ userId }).then(isAgent => {
        this.props.history.push({
          pathname: isAgent ? url.agentRegistration : url.consumerRegistration,
          state: { currentStep: 1, step: 1 }
        });
      });
    }

    @bound
    handleSuccessfulAuthentication(user) {
      const { uid: userId } = user;
      const handleIsMigratedResponse = ({
        currentUser: { uid: userId },
        userType,
        isMigrated
      }) => {
        isMigrated
          ? this.handleMigratedUser({ userId, userType })
          : this.handleVerifiedUser({ userId });
      };

      isUserEmailVerified()
        ? this.isMigratedUser({ authUser: user })
            .then(handleIsMigratedResponse)
            .catch(this.handleFailedAuthentication)
        : this.handleUnverifiedUser({ userId });
    }

    @bound
    handleFailedAuthentication(error) {
      if (!error.isCanceled) {
        !error.invalidAuth && console.error(error);
        this.setState({ doneAuthenticating: true });
        !allowAnonymous && this.props.history.push(url.homeWithLogin);
      }
    }

    @bound
    fireAuthenticationPromise() {
      this.authenticateUser && this.authenticateUser.cancel();
      this.authenticateUser = makeCancelablePromise(authenticateUser());
      this.authenticateUser.promise
        .then(this.handleSuccessfulAuthentication)
        .catch(this.handleFailedAuthentication);
    }

    componentDidMount() {
      this.fireAuthenticationPromise();
      this.setGTMVariables();
    }

    componentDidUpdate(prevProps, prevState) {
      this.props.currentUserId !== prevProps.currentUserId &&
        this.fireAuthenticationPromise();

      if (
        this.state.userIsAuthenticated !== prevState.userIsAuthenticated ||
        this.props.userType !== prevProps.userType ||
        this.props.lookingFor !== prevProps.lookingFor ||
        this.props.timeline !== prevProps.timeline
      ) {
        this.setGTMVariables();
      }
    }

    componentWillUnmount() {
      this.authenticateUser.cancel();
    }

    setGTMVariables() {
      gtmVariable({
        layerData: {
          [LOGIN_STATUS]: this.state.userIsAuthenticated ? "Yes" : "No",
          [USER_TYPE]: this.props.userType,
          [BUYER_OR_SELLER]:
            this.props.lookingFor.length > 0
              ? this.props.lookingFor.length === 1
                ? this.props.lookingFor[0]
                : "both"
              : "",
          [TIME_HORIZON]: this.props.timeline
        }
      });
    }

    render() {
      return this.state.doneAuthenticating &&
        (allowAnonymous || this.state.userIsAuthenticated) ? (
        <AuthenticatedComponent
          {...this.props}
          authUserId={this.state.userId}
          isAnonymousUser={!this.state.userIsAuthenticated}
        />
      ) : (
        <AuthenticationLoader />
      );
    }
  }
  return connect(mapStateToProps)(RequireAuth);
};

export default RequireAuth;
