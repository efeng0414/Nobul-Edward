import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import IconLocation from "react-icons/lib/go/location";
import { Avatar } from "antd";
import {
  AVATAR_TYPE_DEFAULT,
  AVATAR_DISPLAY
} from "../../../../core/constants/users";
import { AVATAR_MAP } from "../../../utilities/constants";
import { EDIT_AVATAR_ICON } from "../../../utilities/images";

import userLocation from "../../../utilities/user-location";

@userLocation
class CurrentUserDetails extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    avatarType: PropTypes.string,
    editAvatar: PropTypes.func.isRequired,
    userLocation: PropTypes.object,
    intl: intlShape.isRequired
  };

  static defaultProps = {
    avatarType: AVATAR_TYPE_DEFAULT
  };

  @bound
  avatarEditHandle(event) {
    event.stopPropagation();
    this.props.editAvatar();
  }

  render() {
    return (
      <div className="layout-sider-menu-logo">
        <div
          className="layout-sider-menu-logo-avatar"
          onClick={this.avatarEditHandle}
        >
          <Avatar
            src={
              this.props.avatarUrl
                ? this.props.avatarUrl
                : AVATAR_MAP[AVATAR_DISPLAY][this.props.avatarType]
            }
          />
          <img src={EDIT_AVATAR_ICON} className="edit-icon" />
        </div>
        <div className="user">{this.props.name}</div>
        <div className="location">
          <IconLocation size="14" />
          {`${this.props.userLocation.city}, ${
            this.props.userLocation.country
          }`}
        </div>
      </div>
    );
  }
}

export default CurrentUserDetails;
