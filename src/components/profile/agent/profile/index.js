import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";

import "./styles.scss";
class Profile extends Component {
  state = {
    avatarUploadUrl: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    registrationFields: PropTypes.object,
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired
  };

  render() {
    return <div id="agent-profile" />;
  }
}

export default injectIntl(Profile);
