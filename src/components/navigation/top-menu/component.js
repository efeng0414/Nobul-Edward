import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";
import { bound } from "class-bind";

import { translate } from "../../../utilities/locale";
import * as Routes from "../../../routes/routes";
import * as MyNobulRoutes from "../../../routes/myNobul";

import "./styles.scss";

const { SubMenu } = Menu;

@withRouter
class TopMenu extends Component {
  state = {
    selectedKeys: []
  };

  static propTypes = {
    isMobile: PropTypes.bool,
    intl: intlShape.isRequired,
    isLoggedIn: PropTypes.bool,
    history: PropTypes.object.isRequired,
    openHowItWorksModal: PropTypes.func.isRequired,
    businessProfileCreated: PropTypes.bool,
    isAgent: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func,
    showMenu: PropTypes.bool,
    isHomePage: PropTypes.bool
  };

  static defaultProps = {
    isLoggedIn: false,
    isMobile: false,
    businessProfileCreated: false,
    toggleMenu: () => {},
    showMenu: false,
    isHomePage: false
  };

  renderSettingLink() {
    if (this.props.isLoggedIn && this.props.isMobile) {
      return (
        <Menu.Item key="settings">
          <Link to={MyNobulRoutes.url.settings}>
            {translate(this.props.intl, "settings")}
          </Link>
        </Menu.Item>
      );
    }
    return null;
  }

  renderAgentMenu() {
    const { pathname = "" } = this.props.history.location;
    return (
      <Menu
        mode={this.props.isMobile ? "vertical" : "horizontal"}
        selectedKeys={pathname === "/" ? [] : this.state.selectedKeys}
        onSelect={this.onSelect}
      >
        {this.props.isLoggedIn && (
          <Menu.Item key="myNobul">
            <Link to={Routes.url.myNobul}>
              {translate(this.props.intl, "myNobul")}
            </Link>
          </Menu.Item>
        )}

        {this.props.isLoggedIn &&
          !this.props.isHomePage && (
            <Menu.Item key="marketPlace">
              <Link to={Routes.url.marketPlace}>
                {translate(this.props.intl, "marketPlace")}
              </Link>
            </Menu.Item>
          )}

        {this.props.isLoggedIn &&
          !this.props.isHomePage &&
          !this.props.businessProfileCreated && (
            <Menu.Item key="standardProposalFlow">
              <Link
                to={Routes.url.standardProposalFlow
                  .replace(":step?", "1")
                  .replace(":stage?", "")}
              >
                {translate(this.props.intl, "myStandardProposal")}
              </Link>
            </Menu.Item>
          )}

        {this.props.isLoggedIn && this.renderLearningCenter()}
        {this.renderSettingLink()}
      </Menu>
    );
  }

  renderLearningCenter() {
    const menuItems = [
      <Menu.Item key="nobul101">
        <a
          href="https://wp.nobul.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {translate(this.props.intl, "learnRealEstate")}
        </a>
      </Menu.Item>,
      <Menu.Item key="howItWorks">
        <a onClick={this.props.openHowItWorksModal}>
          {translate(this.props.intl, "howNobulWorks")}
        </a>
      </Menu.Item>
    ];

    return this.props.isMobile ? (
      menuItems
    ) : (
      <SubMenu
        title={translate(this.props.intl, "learningCenter")}
        className="header-sub-menu"
      >
        {menuItems}
      </SubMenu>
    );
  }

  @bound
  onBrowseListingsClick(e) {
    this.props.showMenu && this.props.toggleMenu(e);
  }

  @bound
  onGetStartedClick(e) {
    this.props.showMenu && this.props.toggleMenu(e);
  }

  @bound
  onSelect({ item, key, selectedKeys }) {
    this.setState({ selectedKeys });
    this.props.toggleMenu();
  }

  renderConsumerMenu() {
    const { pathname = "" } = this.props.history.location;

    return (
      <Menu
        mode={this.props.isMobile ? "vertical" : "horizontal"}
        selectedKeys={pathname === "/" ? [] : this.state.selectedKeys}
        onSelect={this.onSelect}
      >
        {this.props.isLoggedIn && (
          <Menu.Item key="myNobul">
            <Link to={Routes.url.myNobul}>
              {translate(this.props.intl, "myNobul")}
            </Link>
          </Menu.Item>
        )}

        {this.props.isLoggedIn &&
          !this.props.isHomePage && (
            <Menu.Item key="browseProperties">
              <Link to={Routes.url.home}>
                {translate(this.props.intl, "landing.browse")}
              </Link>
            </Menu.Item>
          )}

        {this.props.isLoggedIn &&
          !this.props.isHomePage && (
            <Menu.Item key="findAnAgent">
              <Link
                to={{
                  pathname: Routes.url.home,
                  state: { isAgentButtonActive: true }
                }}
              >
                {translate(this.props.intl, "home-page.findAgent")}
              </Link>
            </Menu.Item>
          )}

        {this.props.isLoggedIn && this.renderLearningCenter()}
        {this.renderSettingLink()}
      </Menu>
    );
  }

  render() {
    return (
      <div
        className={
          this.props.isHomePage ? "top-menu--white top-menu" : "top-menu"
        }
      >
        {this.props.isAgent && this.renderAgentMenu()}
        {!this.props.isAgent && this.renderConsumerMenu()}
      </div>
    );
  }
}

export default TopMenu;
