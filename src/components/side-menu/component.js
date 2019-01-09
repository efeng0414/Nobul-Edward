import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Drawer } from "antd";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import anime from "animejs";

import SideMenuItem from "./side-menu-item";
import CollapseTrigger from "./collapse-trigger";
import CurrentUserDetails from "./current-user-details";
import { passProps } from "./utilities";
import { objectIsEmpty } from "../../../core/utilities/misc";
import Devices from "../../components/breakpoints/devices";
import Desktop from "../../components/breakpoints/desktop";
import { MOBILE, TABLET } from "../../../core/constants/breakpoints";
import ErrorBoundary from "../error-boundary";
import { editAvatarEnter } from "./animations";

import "./styles.scss";
import { isUnreadAndVisible } from "../../../core/utilities/notifications";

const { Sider, Content } = Layout;

@injectIntl
class SideMenu extends PureComponent {
  static propTypes = {
    currentUserProfile: PropTypes.object.isRequired,
    menuConfig: PropTypes.object.isRequired,
    eventCount: PropTypes.number.isRequired,
    notifications: PropTypes.object.isRequired,
    renderSubRoutes: PropTypes.func.isRequired,
    avatarUrl: PropTypes.string,
    userAgreements: PropTypes.object,
    isConsumer: PropTypes.bool,
    intl: intlShape.isRequired,
    setConsumerAvatar: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    updateAgentAvatar: PropTypes.func.isRequired,
    renderEditAvatar: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeMenuItem: "",
    avatarUrl: "",
    isConsumer: false
  };

  state = {
    collapsed: false,
    isEditingAvatar: false
  };

  @bound
  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  @bound
  getUserName() {
    const { firstName, lastName } = this.props.currentUserProfile;
    return `${firstName} ${lastName}`;
  }

  @bound
  onMenuItemSelect() {
    this.toggleCollapsed();
    window.scrollTo(0, 0);
  }

  @bound
  getMenuItemConfigWithCount() {
    const menuItemsConfigWithCount = { ...this.props.menuConfig };
    const notificationsCount = this.props.notifications.sortedNotifications
      .length
      ? this.props.notifications.sortedNotifications.filter(isUnreadAndVisible)
          .length
      : 0;

    menuItemsConfigWithCount.events.count = this.props.eventCount;

    menuItemsConfigWithCount.notifications.count =
      notificationsCount <= 99 ? notificationsCount : "+";
    return Object.values(menuItemsConfigWithCount);
  }

  @bound
  toggleEditAvatar() {
    this.setState(
      {
        isEditingAvatar: !this.state.isEditingAvatar
      },
      () => this.state.isEditingAvatar && anime(editAvatarEnter)
    );
  }

  @bound
  updateCurrentAvatar() {
    this.toggleEditAvatar();
    this.props.setCurrentUser(this.props.currentUser);
  }

  @bound
  setConsumerAvatar({ avatarType }) {
    this.props.setConsumerAvatar({
      uid: this.props.currentUser.uid,
      avatarType: avatarType
    });

    this.updateCurrentAvatar();
  }

  render() {
    const hasAgreementsClass =
      this.props.userAgreements && !objectIsEmpty(this.props.userAgreements)
        ? "has-agreements layout-sider-menu-wrapper"
        : "layout-sider-menu-wrapper";

    const editAvatarProps = {
      avatarUrl: this.props.avatarUrl,
      avatarType: this.props.currentUserProfile.avatarType,
      isConsumer: this.props.isConsumer,
      setConsumerAvatar: this.setConsumerAvatar,
      closeEditAvatar: this.toggleEditAvatar,
      uid: this.props.currentUser.uid,
      updateAgentAvatar: this.props.updateAgentAvatar,
      updateCurrentAvatar: this.updateCurrentAvatar,
      intl: this.props.intl
    };

    return (
      <div>
        <Devices sizes={[MOBILE, TABLET]}>
          <Drawer
            placement={"left"}
            closable={false}
            onClose={this.toggleCollapsed}
            visible={this.state.collapsed}
            className={"layout-sider"}
          >
            {this.state.isEditingAvatar &&
              this.props.renderEditAvatar(editAvatarProps)}
            <CurrentUserDetails
              name={this.getUserName()}
              avatarUrl={this.props.avatarUrl}
              avatarType={this.props.currentUserProfile.avatarType}
              editAvatar={this.toggleEditAvatar}
              intl={this.props.intl}
            />

            <Menu
              mode="inline"
              onSelect={this.onMenuItemSelect}
              className={hasAgreementsClass}
            >
              {this.getMenuItemConfigWithCount().map(
                passProps({ fn: SideMenuItem, props: this.props })
              )}
            </Menu>
          </Drawer>
          <CollapseTrigger
            isCollapsed={this.state.collapsed}
            toggleCollapsed={this.toggleCollapsed}
          />
          <Content>{this.props.renderSubRoutes()}</Content>
        </Devices>

        <Desktop>
          <Layout className="layout-sider">
            <Sider
              className="layout-sider-menu desktop-sider"
              breakpoint="sm"
              collapsedWidth="0"
              trigger={null}
            >
              {this.state.isEditingAvatar && (
                <ErrorBoundary>
                  {this.props.renderEditAvatar(editAvatarProps)}
                </ErrorBoundary>
              )}
              <CurrentUserDetails
                name={this.getUserName()}
                avatarUrl={this.props.avatarUrl}
                avatarType={this.props.currentUserProfile.avatarType}
                editAvatar={this.toggleEditAvatar}
                intl={this.props.intl}
              />
              <Menu
                mode="inline"
                onSelect={this.onMenuItemSelect}
                className={hasAgreementsClass}
              >
                {this.getMenuItemConfigWithCount().map(
                  passProps({ fn: SideMenuItem, props: this.props })
                )}
              </Menu>
            </Sider>
            <CollapseTrigger
              isCollapsed={this.state.collapsed}
              toggleCollapsed={this.toggleCollapsed}
            />
            <Content className="desktop-content">
              {this.props.renderSubRoutes()}
            </Content>
          </Layout>
        </Desktop>
      </div>
    );
  }
}

export default SideMenu;
