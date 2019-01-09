import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";
import { translate } from "../../../utilities/locale";
import { passProps } from "../utilities";

const SideMenuItem = ({
  intl,
  textKey,
  iconType,
  url,
  count,
  submenu,
  className
}) => {
  if (submenu) {
    return (
      <Menu.SubMenu
        key={textKey}
        title={
          <div>
            {!!iconType && <img src={iconType} />}
            {translate(intl, textKey)}
          </div>
        }
        className={`menu-item ${className || ""}`}
      >
        {Object.values(submenu).map(
          passProps({
            fn: SideMenuItem,
            props: { intl, textKey, iconType, url, count }
          })
        )}
      </Menu.SubMenu>
    );
  } else {
    return (
      <Menu.Item key={url} className={`menu-item ${className || ""}`}>
        <Link to={url}>
          {!!iconType && <img src={iconType} />}
          <span>
            {translate(intl, textKey)}
            {!!count && <span className="count">{count}</span>}
          </span>
        </Link>
      </Menu.Item>
    );
  }
};

SideMenuItem.propTypes = {
  intl: intlShape.isRequired,
  textKey: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  url: PropTypes.string.isRequired,
  submenu: PropTypes.object
};

SideMenuItem.defaultProps = {
  iconType: "",
  count: 0
};

export default SideMenuItem;
