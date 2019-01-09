import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";

import Login from "../../login";
import Registration from "../../registration";
import { translate } from "../../../utilities/locale";
import { triggerLoginAsync } from "../../../../core/thunk/anonymousEventListeners";
import { openHowItWorksModal } from "../../../../core/actions/anonymousEventListeners";
import { url } from "../../../routes/routes";
import "./styles.scss";

class UserAuthentication extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object,
    loginTrigger: PropTypes.bool,
    triggerLogin: PropTypes.func.isRequired,
    showLogin: PropTypes.bool,
    onLoginClick: PropTypes.func.isRequired,
    onLoginCancel: PropTypes.func.isRequired,
    showRegistration: PropTypes.bool,
    onRegistrationCancel: PropTypes.func.isRequired,
    onRegistrationClick: PropTypes.func.isRequired,
    onJoinNobulFromLogin: PropTypes.func.isRequired,
    openHowItWorksModal: PropTypes.func.isRequired,
    isHomePage: PropTypes.bool
  };

  static defaultProps = {
    isHomePage: false
  };

  onAgentRegistrationClick = () => {
    this.props.history.push(url.agentRegistration);
  };

  onConsumerRegistrationClick = () => {
    this.props.history.push(url.consumerRegistration);
  };

  render() {
    return (
      <div className="user-authentication">
        <div className="user-authentication__menu">
          <a onClick={this.props.openHowItWorksModal}>
            {translate(this.props.intl, "howNobulWorks")}
          </a>
          <a
            href="https://wp.nobul.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate(this.props.intl, "learnRealEstate")}
          </a>
        </div>
        <div className="user-authentication__gap" />
        <div className="user-authentication__buttons-wrapper">
          <Button type="primary" onClick={this.props.onRegistrationClick}>
            {this.props.isHomePage
              ? translate(this.props.intl, "button.signUp")
              : translate(this.props.intl, "button.register")}
          </Button>

          <a onClick={this.props.onLoginClick}>
            {translate(this.props.intl, "button.signIn")}
          </a>
        </div>
        <Login
          isLoginVisible={this.props.showLogin}
          onLoginCancel={this.props.onLoginCancel}
          history={this.props.history}
          intl={this.props.intl}
          onJoinNobulFromLogin={this.props.onJoinNobulFromLogin}
        />

        <Registration
          isRegistrationVisible={this.props.showRegistration}
          onRegistrationCancel={this.props.onRegistrationCancel}
          history={this.props.history}
          intl={this.props.intl}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginTrigger: state.anonymousEventListeners.loginTrigger
});

const mapDispatchToProps = dispatch => ({
  triggerLogin: ({ trigger }) => dispatch(triggerLoginAsync({ trigger })),
  openHowItWorksModal: () => dispatch(openHowItWorksModal())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserAuthentication)
);
