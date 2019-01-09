import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import ActivityIndicator from "../activity-indicator";
import TopMenu from "../navigation/top-menu";
import UserWelcome from "../navigation/user-welcome";
import { WHITE_NOBUL_LOGO, NOBUL_LOGO } from "../../utilities/images";
import { Link } from "react-router-dom";
import { translate } from "../../utilities/locale";
import * as Routes from "../../routes/routes";
import { MOBILE, TABLET } from "../../../core/constants/breakpoints";
import Desktop from "../breakpoints/desktop";
import Devices from "../breakpoints/devices";
import UserAuthentication from "../navigation/user-authentication";
import AgentUserSettings from "../navigation/user-settings/agent";
import ConsumerUserSettings from "../navigation/user-settings/consumer";
import "./styles.scss";
@injectIntl
class Header extends Component {
  state = {
    showMenu: false,
    showLoginModal: false,
    showRegistrationModal: false
  };
  static propTypes = {
    intl: intlShape.isRequired,
    currentUser: PropTypes.object.isRequired,
    toggle: PropTypes.bool,
    history: PropTypes.object,
    signOut: PropTypes.func,
    loginTrigger: PropTypes.bool,
    triggerLogin: PropTypes.func,
    isUserLoading: PropTypes.bool.isRequired,
    currentBreakPoint: PropTypes.string,
    isAgent: PropTypes.bool.isRequired,
    showTopMenu: PropTypes.bool,
    isHomePage: PropTypes.bool,
    showWhiteLogo: PropTypes.bool
  };
  static defaultProps = {
    toggle: false,
    loginTrigger: false,
    showTopMenu: true,
    history: {},
    signOut: () => {},
    isHomePage: false,
    showWhiteLogo: false
  };
  @bound
  deselectMenu() {
    this.setState({
      showMenu: false
    });
  }
  @bound
  toggleMenu(e) {
    this.setState({ showMenu: !this.state.showMenu });
  }
  @bound
  hideMenu() {
    this.setState({ showMenu: false });
  }
  @bound
  onLoginCancel() {
    this.props.triggerLogin({ trigger: false });
    this.setState({ showLoginModal: false });
  }
  @bound
  onLoginClick(e) {
    this.setState({ showLoginModal: true, showMenu: e.target.checked });
    this.state.showRegistrationModal &&
      this.setState({
        showRegistrationModal: false
      });
  }
  @bound
  onRegistrationCancel() {
    this.setState({ showRegistrationModal: false });
  }
  @bound
  onRegistrationClick(e) {
    this.setState({
      showRegistrationModal: true,
      showMenu: e && e.target && e.target.checked
    });
    this.state.showLoginModal &&
      this.setState({
        showLoginModal: false
      });
  }
  @bound
  onJoinNobulFromLogin() {
    this.onLoginCancel();
    this.onRegistrationClick();
  }

  componentDidUpdate(prevProps) {
    const { previousUser = {} } = prevProps;
    const userLoggedInOrOut =
      this.state.showLoginModal &&
      this.props.currentUser.uid !== previousUser.uid;
    const loginTriggered =
      !this.state.showLoginModal &&
      this.props.loginTrigger &&
      this.props.loginTrigger !== prevProps.loginTrigger;
    if (userLoggedInOrOut) {
      this.setState({ showLoginModal: false });
    } else if (loginTriggered) {
      this.setState({ showLoginModal: true });
    }
  }
  render() {
    const isLoggedIn = !!Object.keys(this.props.currentUser).length;
    const isMobile =
      this.props.currentBreakPoint === MOBILE ||
      this.props.currentBreakPoint === TABLET;
    const UserSettings = this.props.isAgent
      ? AgentUserSettings
      : ConsumerUserSettings;
    const menuClass =
      isMobile && this.state.showMenu
        ? "header-navigation show"
        : "header-navigation";

    return (
      <div className="header">
        <div className="header-logo">
          <Link to={Routes.url.home}>
            <img
              src={
                !this.props.showWhiteLogo || isMobile
                  ? NOBUL_LOGO
                  : WHITE_NOBUL_LOGO
              }
              alt={translate(this.props.intl, "home")}
              onClick={this.deselectMenu}
            />
          </Link>
          <Devices sizes={[MOBILE, TABLET]}>
            <UserSettings
              isMobile={isMobile}
              toggleMenu={this.toggleMenu}
              showMenu={this.state.showMenu}
              isLoggedIn={isLoggedIn}
              hideMenu={this.hideMenu}
            />
          </Devices>
        </div>
        <Desktop>
          <div className="header-navigation">
            <ActivityIndicator
              spinning={this.props.isUserLoading}
              size={"small"}
            >
              {!this.props.isUserLoading &&
                this.props.showTopMenu && (
                  <TopMenu
                    showMenu={this.state.showMenu}
                    toggleMenu={this.toggleMenu}
                    intl={this.props.intl}
                    isLoggedIn={isLoggedIn}
                    isMobile={isMobile}
                    isHomePage={this.props.isHomePage}
                  />
                )}
              {isLoggedIn && (
                <div className="header-navigation-settings">
                  <UserSettings
                    isMobile={isMobile}
                    toggleMenu={this.toggleMenu}
                    showMenu={this.state.showMenu}
                    isLoggedIn={isLoggedIn}
                    hideMenu={this.hideMenu}
                    isHomePage={this.props.isHomePage}
                  />
                  <UserWelcome
                    intl={this.props.intl}
                    history={this.props.history}
                    signOut={this.props.signOut}
                    isHomePage={this.props.isHomePage}
                  />
                </div>
              )}
              {((!isLoggedIn && !this.props.isUserLoading) ||
                this.state.showLoginModal) && (
                <UserAuthentication
                  intl={this.props.intl}
                  showLogin={this.state.showLoginModal}
                  onLoginCancel={this.onLoginCancel}
                  onLoginClick={this.onLoginClick}
                  showRegistration={this.state.showRegistrationModal}
                  onRegistrationClick={this.onRegistrationClick}
                  onRegistrationCancel={this.onRegistrationCancel}
                  onJoinNobulFromLogin={this.onJoinNobulFromLogin}
                  toggleMenu={this.toggleMenu}
                  isHomePage={this.props.isHomePage}
                  isMobile={isMobile}
                />
              )}
            </ActivityIndicator>
          </div>
        </Desktop>
        <Devices sizes={[MOBILE, TABLET]}>
          <div className={menuClass}>
            {isLoggedIn && (
              <UserWelcome
                intl={this.props.intl}
                history={this.props.history}
                signOut={this.props.signOut}
              />
            )}
            {this.props.showTopMenu && (
              <TopMenu
                intl={this.props.intl}
                isLoggedIn={isLoggedIn}
                isMobile={isMobile}
                toggleMenu={this.toggleMenu}
              />
            )}
            {!isLoggedIn && (
              <UserAuthentication
                intl={this.props.intl}
                showLogin={this.state.showLoginModal}
                onLoginCancel={this.onLoginCancel}
                onLoginClick={this.onLoginClick}
                showRegistration={this.state.showRegistrationModal}
                onRegistrationClick={this.onRegistrationClick}
                onRegistrationCancel={this.onRegistrationCancel}
                onJoinNobulFromLogin={this.onJoinNobulFromLogin}
                isHomePage={this.props.isHomePage}
                isMobile={isMobile}
              />
            )}
          </div>
        </Devices>
      </div>
    );
  }
}
export default Header;
