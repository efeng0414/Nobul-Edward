import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import requireAuth from "./require-auth";
import { isAgent, isConsumer } from "./route-verification";
import {
  AGENT_USER_TYPE,
  CONSUMER_USER_TYPE,
  ANONYMOUS_USER_TYPE
} from "../../core/constants/users";
import AuthenticationLoader from "../components/authentication-loader";
import makeCancelablePromise from "./make-cancelable-promise";

const dualUserTypeScene = ({
  agentScene,
  consumerScene,
  anonymousScene = false
}) => {
  @requireAuth({ allowAnonymous: !!anonymousScene })
  class DualUserTypeScene extends Component {
    static propTypes = {
      authUserId: PropTypes.string.isRequired,
      isAnonymousUser: PropTypes.bool.isRequired
    };

    state = {
      userType: false
    };

    @bound
    handleIsAgentSuccess() {
      this.isConsumerPromise.cancel();
      this.setState({ userType: AGENT_USER_TYPE });
    }

    @bound
    handleIsConsumerSuccess() {
      this.isAgentPromise.cancel();
      this.setState({ userType: CONSUMER_USER_TYPE });
    }

    @bound
    handleError(error) {
      !error.isCanceled && console.error(error);
    }

    isConsumerCheck() {
      this.isConsumerPromise = makeCancelablePromise(
        isConsumer({ userId: this.props.authUserId })
      );
      this.isConsumerPromise.promise
        .then(isConsumer => {
          isConsumer && this.handleIsConsumerSuccess();
        })
        .catch(this.handleError);
    }

    isAgentCheck() {
      this.isAgentPromise = makeCancelablePromise(
        isAgent({ userId: this.props.authUserId })
      );
      this.isAgentPromise.promise
        .then(isAgent => {
          isAgent && this.handleIsAgentSuccess();
        })
        .catch(this.handleError);
    }

    handleAnonymousScene() {
      this.setState({ userType: ANONYMOUS_USER_TYPE });
    }

    componentDidMount() {
      if (!this.props.isAnonymousUser) {
        this.isConsumerCheck();
        this.isAgentCheck();
      } else {
        this.handleAnonymousScene();
      }
    }

    componentWillUnmount() {
      if (!this.props.isAnonymousUser) {
        this.isAgentPromise.cancel();
        this.isConsumerPromise.cancel();
      }
    }

    @bound
    getSceneForUserType({ userType }) {
      const userTypeSceneMap = {
        [AGENT_USER_TYPE]: agentScene,
        [CONSUMER_USER_TYPE]: consumerScene,
        [ANONYMOUS_USER_TYPE]: anonymousScene
      };

      const SceneToRender = userTypeSceneMap[userType];
      return <SceneToRender {...this.props} userType={userType} />;
    }

    render() {
      return this.state.userType ? (
        this.getSceneForUserType({ userType: this.state.userType })
      ) : (
        <AuthenticationLoader />
      );
    }
  }

  return DualUserTypeScene;
};

export default dualUserTypeScene;
