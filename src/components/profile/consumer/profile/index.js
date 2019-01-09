import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import AccountSettingsForm from "../../../forms/consumer/account-settings-form";

class Profile extends Component {
  state = {
    avatarUploadUrl: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    user: PropTypes.object,
    updateProfile: PropTypes.func
  };

  static defaultProps = {
    user: {},
    updateProfile: () => {}
  };

  render() {
    return (
      <div id="consumer-profile">
        <AccountSettingsForm
          user={this.props.user}
          updateProfile={this.props.updateProfile}
        />
      </div>
    );
  }
}

export default Profile;
