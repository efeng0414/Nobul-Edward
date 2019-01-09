import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Avatar, Dropdown, Button } from "antd";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../../utilities/locale";
import { signOutUser } from "../../../../core/firebase/users";
import * as Routes from "../../../routes/routes";
import Devices from "../../breakpoints/devices";
import { TABLET, MOBILE } from "../../../../core/constants/breakpoints";
import { AVATAR_MAP } from "../../../utilities/constants";
import { clearCachedData } from "../../../utilities/cache-handler";
import {
  AVATAR_TYPE_DEFAULT,
  AVATAR_SMALL
} from "../../../../core/constants/users";

import "./styles.scss";

class UserWelcome extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    avatarUrl: PropTypes.string,
    userProfile: PropTypes.object,
    history: PropTypes.object,
    signOut: PropTypes.func,
    refreshHeader: PropTypes.func,
    isHomePage: PropTypes.bool
  };

  static defaultProps = {
    avatarUrl: "",
    userProfile: { avatarType: AVATAR_TYPE_DEFAULT },
    isHomePage: false
  };

  @bound
  handleMenuItemClick(item) {
    const { key } = item;
    switch (key) {
      case "1":
        return null;
      case "2":
        return null;
      case "3":
        return this.logoutUser();
      default:
        return null;
    }
  }

  @bound
  logoutUser() {
    signOutUser({ preSignOutFunction: clearCachedData }).then(() => {
      this.props.signOut();
      this.props.history.push(Routes.url.home);
    });
  }

  render() {
    const userName = this.props.userProfile.firstName || "";
    const menu = (
      <Menu onClick={this.handleMenuItemClick} className="user-welcome-menu">
        <Menu.Item key="3">Sign out</Menu.Item>
      </Menu>
    );

    return (
      <div className="user-welcome">
        <div>
          <div id="signoutContainer" className="signout-container" />
          <Avatar
            src={
              this.props.avatarUrl
                ? this.props.avatarUrl
                : AVATAR_MAP[AVATAR_SMALL][this.props.userProfile.avatarType]
            }
          />
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            getPopupContainer={() =>
              document.getElementById("signoutContainer")
            }
          >
            <a
              className={
                this.props.isHomePage
                  ? "ant-dropdown-link--white"
                  : "ant-dropdown-link"
              }
              href="#"
            >
              {translate(this.props.intl, "welcomeUser", { name: userName })}
              <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <Devices sizes={[MOBILE, TABLET]}>
          <Button onClick={this.logoutUser} type="primary">
            {translate(this.props.intl, "button.signOut")}
          </Button>
        </Devices>
      </div>
    );
  }
}
// TODO:
// grab the user image from currentUser after the field is added to the profile
// <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
// const UserAvatar = <Avatar icon="user" />;

export default UserWelcome;
