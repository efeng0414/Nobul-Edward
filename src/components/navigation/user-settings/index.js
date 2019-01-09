import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import IconGear from "react-icons/lib/io/ios-gear";
import IconBars from "react-icons/lib/md/menu";
import IconClose from "react-icons/lib/io/close-round";
import Notifications from "../../../scenes/notifications";
import Desktop from "../../breakpoints/desktop";
import Devices from "../../breakpoints/devices";
import { TABLET, MOBILE } from "../../../../core/constants/breakpoints";
import { translate } from "../../../utilities/locale";
import * as MyNobulRoutes from "../../../routes/myNobul";
import "./styles.scss";

@injectIntl
class UserSettings extends PureComponent {
  static propTypes = {
    toggleMenu: PropTypes.func,
    showMenu: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    settingsMenuItems: PropTypes.array.isRequired,
    intl: intlShape.isRequired,
    hideMenu: PropTypes.func.isRequired,
    isHomePage: PropTypes.bool
  };

  static defaultProps = {
    isLoggedIn: false,
    showMenu: false,
    toggleMenu: () => {},
    isHomePage: false
  };

  render() {
    const toogleIcon = this.props.showMenu ? (
      <div>
        <IconClose size={25} />
      </div>
    ) : (
      <div>
        <IconBars size={25} />
      </div>
    );

    const settingsMenu = (
      <Menu className="settings-menu-overlay">
        <Menu.Item className="title">Settings</Menu.Item>
        {this.props.settingsMenuItems.map(({ route, labelKey }, index) => (
          <Menu.Item key={index}>
            <Link to={`${MyNobulRoutes.url.settings}?tab=${route}`}>
              {translate(this.props.intl, labelKey)}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div
        className={
          this.props.isHomePage
            ? "user-settings user-settings--white"
            : "user-settings"
        }
      >
        {this.props.isLoggedIn && (
          <Notifications hideMenu={this.props.hideMenu} isDropdown />
        )}
        <Desktop>
          {this.props.isLoggedIn && (
            <div id="settings">
              <Dropdown
                overlay={settingsMenu}
                placement="bottomCenter"
                trigger={["click"]}
                getPopupContainer={() => document.getElementById("settings")}
              >
                <div>
                  <IconGear size={30} className="settings-icon" />
                </div>
              </Dropdown>
            </div>
          )}
        </Desktop>
        <Devices sizes={[MOBILE, TABLET]}>
          <div>
            <label htmlFor="menu-toggle">{toogleIcon}</label>
            <input
              type="checkbox"
              id="menu-toggle"
              onChange={this.props.toggleMenu}
            />
          </div>
        </Devices>
      </div>
    );
  }
}

export default UserSettings;
