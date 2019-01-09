import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import {
  AVATAR_EDITING,
  AVATAR_SELECTED
} from "../../../../core/constants/users";
import { AVATAR_MAP } from "../../../utilities/constants";

class IndividualAvatar extends PureComponent {
  static propTypes = {
    avatarType: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelected: PropTypes.func.isRequired
  };

  @bound
  onAvatarClick(event) {
    event.stopPropagation();
    this.props.onSelected({ avatarType: this.props.avatarType });
  }

  render() {
    return (
      <img
        src={
          this.props.isSelected
            ? AVATAR_MAP[AVATAR_SELECTED][this.props.avatarType]
            : AVATAR_MAP[AVATAR_EDITING][this.props.avatarType]
        }
        onClick={this.onAvatarClick}
      />
    );
  }
}

export default IndividualAvatar;
