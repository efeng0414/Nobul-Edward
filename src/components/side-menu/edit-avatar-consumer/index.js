import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import { Button, Icon } from "antd";
import anime from "animejs";

import { translate } from "../../../utilities/locale";
import {
  AVATAR_TYPE_DEFAULT,
  AVATAR_TYPE_MALE,
  AVATAR_TYPE_FEMALE
} from "../../../../core/constants/users";
import IndividualAvatar from "../individual-avatar";
import { editAvatarLeave } from "../animations";

class EditAvatarConsumer extends Component {
  static propTypes = {
    avatarUrl: PropTypes.string,
    avatarType: PropTypes.string,
    setConsumerAvatar: PropTypes.func.isRequired,
    closeEditAvatar: PropTypes.func.isRequired,
    intl: intlShape.isRequired
  };

  static defaultProps = {
    avatarType: AVATAR_TYPE_DEFAULT
  };

  state = {
    selectedAvatar: this.props.avatarType
  };

  @bound
  onAvatarSet() {
    this.props.setConsumerAvatar({ avatarType: this.state.selectedAvatar });
  }

  @bound
  onAvatarSelected({ avatarType }) {
    this.setState({
      selectedAvatar: avatarType
    });
  }

  @bound
  isAvatarSelected({ avatarType }) {
    return this.state.selectedAvatar === avatarType;
  }

  @bound
  onCloseClick() {
    const avatarAnimation = anime(editAvatarLeave);
    avatarAnimation.complete = ({ completed }) =>
      completed && this.props.closeEditAvatar();
  }

  render() {
    return (
      <div className="edit-avatar">
        <div className="edit-avatar-consumer">
          <div className="edit-avatar-consumer-close">
            <Icon
              type="close"
              onClick={this.onCloseClick}
              className="close-icon"
            />
          </div>
          <div className="edit-avatar-consumer-images">
            <div className="edit-avatar-consumer-images-row">
              <IndividualAvatar
                avatarType={AVATAR_TYPE_DEFAULT}
                isSelected={this.isAvatarSelected({
                  avatarType: AVATAR_TYPE_DEFAULT
                })}
                onSelected={this.onAvatarSelected}
              />
              <IndividualAvatar
                avatarType={AVATAR_TYPE_MALE}
                isSelected={this.isAvatarSelected({
                  avatarType: AVATAR_TYPE_MALE
                })}
                onSelected={this.onAvatarSelected}
              />
              <IndividualAvatar
                avatarType={AVATAR_TYPE_FEMALE}
                isSelected={this.isAvatarSelected({
                  avatarType: AVATAR_TYPE_FEMALE
                })}
                onSelected={this.onAvatarSelected}
              />
            </div>
            <Button onClick={this.onAvatarSet} type="primary">
              {translate(this.props.intl, "button.saveAvatar")}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditAvatarConsumer;
