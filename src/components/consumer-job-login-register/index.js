import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import { translate } from "../../utilities/locale";

import "./styles.scss";

class ConsumerJobLoginRegister extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
      >
        <div className="loginRegister">
          <Button
            className="loginRegister__register-button"
            type="primary"
            size="large"
            onClick={this.props.onRegister}
          >
            {translate(this.props.intl, "anonymous.signUp")}
          </Button>

          <div className="loginRegister__line" />

          <div className="loginRegister__login">
            <span>{`${translate(
              this.props.intl,
              "anonymous.haveAccount"
            )} `}</span>
            <button
              className="loginRegister__login-button"
              onClick={this.props.onLogin}
            >
              {translate(this.props.intl, "anonymous.login")}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ConsumerJobLoginRegister;
