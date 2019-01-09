import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import AuthenticationLoader from "../components/authentication-loader";
import makeCancelablePromise from "./make-cancelable-promise";
import { url } from "../routes/routes";

const validateUser = ({ fn, exception = false }) => WrappedComponent => {
  class ValidateUser extends Component {
    static propTypes = {
      authUserId: PropTypes.string.isRequired,
      history: PropTypes.object.isRequired,
      isAnonymousUser: PropTypes.bool
    };

    static defaultProps = {
      isAnonymousUser: false
    };

    state = {
      userIsValidated:
        (this.props.isAnonymousUser && !this.props.authUserId) || exception
    };

    static WrappedComponent = WrappedComponent;

    @bound
    handleSuccess() {
      this.setState({ userIsValidated: true });
    }

    @bound
    handleError(error) {
      if (!error.isCanceled) {
        console.error(error);
        this.props.history.push(url.permissionDenied);
      }
    }

    @bound
    fireValidationPromise() {
      this.validationPromise && this.validationPromise.cancel();
      this.validationPromise = makeCancelablePromise(
        fn({ userId: this.props.authUserId })
      );

      this.validationPromise.promise
        .then(didPass => {
          didPass
            ? this.handleSuccess()
            : this.handleError("user did not pass validation");
        })
        .catch(this.handleError);
    }

    componentDidMount() {
      !exception && this.fireValidationPromise();
    }

    componentDidUpdate(prevProps) {
      this.props.authUserId !== prevProps.authUserId &&
        !this.props.isAnonymousUser &&
        this.fireValidationPromise();
    }

    componentWillUnmount() {
      !exception && this.validationPromise.cancel();
    }

    render() {
      return this.state.userIsValidated ? (
        <WrappedComponent {...this.props} />
      ) : (
        <AuthenticationLoader />
      );
    }
  }

  return ValidateUser;
};

export default validateUser;
