import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Form, Button, Modal, Alert, Row, Col, message } from "antd";
import { intlShape } from "react-intl";
import { connect } from "react-redux";

import ActivityIndicator from "../../components/activity-indicator";
import EmailField from "../../components/form-fields/email-field";
import PasswordField from "../../components/form-fields/password-field";
import { translate } from "../../utilities/locale";
import {
  signInUserAsync,
  resetUserPasswordAsync
} from "../../../core/thunk/authentication";
import { clearErrorState } from "../../../core/actions/authentication";
import {
  AUTH_NOT_VERIFIED,
  AUTH_USER_NOT_FOUND,
  AUTH_WRONG_PASSWORD
} from "../../../core/constants/firebaseErrorCode";
import { url } from "../../../src/routes/routes";
import { PASSWORD } from "../../../core/api-transform/users";

import "./styles.scss";
import { bound } from "../../../node_modules/class-bind";

class Login extends Component {
  state = {
    confirmDirty: false,
    showLoginForm: true
  };

  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    signInUserAsync: PropTypes.func.isRequired,
    resetPassword: PropTypes.func,
    clearErrorState: PropTypes.func,
    isLoading: PropTypes.bool,
    isEmailSent: PropTypes.bool,
    passwordResetError: PropTypes.object,
    onLoginCancel: PropTypes.func,
    history: PropTypes.object,
    isLoginVisible: PropTypes.bool,
    error: PropTypes.object,
    favoriteList: PropTypes.object,
    isResetPasswordFail: PropTypes.bool,
    userType: PropTypes.string,
    onJoinNobulFromLogin: PropTypes.func.isRequired,
    onLogin: PropTypes.func
  };

  static defaultProps = {
    error: {}
  };

  componentDidMount() {
    if (
      Object.keys(this.props.error).length &&
      this.props.error.code === AUTH_NOT_VERIFIED
    ) {
      this.props.history.push({
        pathname: url.browseListings,
        state: { step: 2 }
      });
      this.handleModalClose();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isResetPasswordFail && this.props.isResetPasswordFail) {
      const error = this.props.error;
      const errorCode = error.code;
      if (errorCode === AUTH_USER_NOT_FOUND) {
        message.error(
          translate(this.props.intl, "error.passwordResetUserNotFound")
        );
      } else {
        message.error(translate(this.props.intl, "error.passwordResetFailure"));
      }
      this.props.clearErrorState();
    } else if (!prevProps.isEmailSent && this.props.isEmailSent) {
      message.success(translate(this.props.intl, "success.passwordReset"));
    }
  }

  @bound
  handleLogin(e) {
    const { validateFieldsAndScroll } = this.props.form;
    const { signInUserAsync, favoriteList } = this.props;
    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { email = "", password = "" } = values;
        const anonymousUser = { favoriteList };

        signInUserAsync({ email, password, anonymousUser })
          .then(() => {
            if (this.props.onLogin) {
              this.props.onLogin();
            } else {
              this.props.history.push(url.home);
            }
          })
          .catch(error => {
            if (error.code === AUTH_WRONG_PASSWORD) {
              this.resetPasswordField();
            }
          });
      }
    });
  }

  @bound
  resetPasswordField() {
    this.props.form.resetFields([PASSWORD]);
  }

  @bound
  handlePasswordReset(e) {
    const { validateFieldsAndScroll } = this.props.form;
    const { resetPassword } = this.props;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { forgotPasswordEmail = "" } = values;
        resetPassword(forgotPasswordEmail);
        this.handleModalClose();
      }
    });
  }

  @bound
  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  @bound
  handleForgotPassword(e) {
    e.preventDefault();
    this.setState({ showLoginForm: false });
  }

  @bound
  handleModalClose() {
    this.setState({ showLoginForm: true });
    this.props.onLoginCancel();
    this.props.clearErrorState();
  }

  @bound
  generateLoginForm() {
    const { intl, form = {}, error } = this.props;
    const FormItem = Form.Item;

    return (
      <div className="login">
        {error.message && (
          <Alert
            message={translate(intl, error.message)}
            type="error"
            showIcon
          />
        )}

        <Form onSubmit={this.handleLogin}>
          <div className="login-fieldset">
            <EmailField required form={form} />
            <PasswordField required withoutConfirm form={form} />
          </div>

          <Row>
            <Col span="12">
              <FormItem>
                <a
                  className="login-forgot-password"
                  onClick={this.handleForgotPassword}
                >
                  {`${translate(intl, "forgotYourPassword")}?`}
                </a>
              </FormItem>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            {translate(intl, "signIn")}
          </Button>
          <div className="join-nobul">
            <div>{translate(intl, "dontHaveAccount")}</div>
            <div
              className="join-nobul-text-link"
              onClick={this.props.onJoinNobulFromLogin}
            >
              {translate(intl, "button.registration")}
            </div>
          </div>
        </Form>
      </div>
    );
  }

  @bound
  resetEmailHasSent(intl) {
    message.success(translate(intl, "success.passwordReset"));
  }

  @bound
  resetPasswordError(error) {
    message.error(error);
  }

  @bound
  generatePasswordResetForm() {
    const { intl, form = {} } = this.props;

    return (
      <div className="forgot-password">
        <Form onSubmit={this.handlePasswordReset}>
          <EmailField required form={form} name={"forgotPasswordEmail"} />
          <Row>
            <Button type="primary" htmlType="submit">
              {translate(intl, "button.submit")}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }

  render() {
    const { intl, isLoading, isLoginVisible } = this.props;
    const { showLoginForm } = this.state;
    const labelText = translate(
      intl,
      showLoginForm ? "signIn" : "button.submit"
    );

    return (
      isLoginVisible && (
        <Modal
          visible
          title={labelText}
          onCancel={this.handleModalClose}
          wrapClassName="login-modal"
          width={380}
          footer=""
        >
          <ActivityIndicator spinning={isLoading} type="Logging in">
            <Helmet>
              <title>{translate(intl, "helmet.login")}</title>
              <meta
                name="description"
                content={translate(intl, "helmet.loginDescription")}
              />
            </Helmet>
            {showLoginForm
              ? this.generateLoginForm()
              : this.generatePasswordResetForm()}
          </ActivityIndicator>
        </Modal>
      )
    );
  }
}

const mapStateToProps = state => {
  const { authentication } = state;
  return {
    isLoading: authentication.isLoginLoading,
    isEmailSent: authentication.isEmailSent,
    isResetPasswordFail: authentication.isResetPasswordFail,
    passwordResetError: authentication.passwordResetError,
    error: authentication.error,
    currentUser: authentication.currentUser,
    favoriteList: state.anonymousEventListeners.favoriteList,
    userType: authentication.userType
  };
};

const mapDispatchToProps = dispatch => ({
  signInUserAsync: ({ email, password, anonymousUser }) =>
    dispatch(signInUserAsync({ email, password, anonymousUser })),
  resetPassword: email => dispatch(resetUserPasswordAsync(email)),
  clearErrorState: () => dispatch(clearErrorState())
});

export default Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
