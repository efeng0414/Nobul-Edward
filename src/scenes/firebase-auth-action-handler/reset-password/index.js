import React, { Component } from "react";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../utilities/locale";

@injectIntl
class ResetPassword extends Component {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div>
        <h1>{translate(this.props.intl, "authAction.resetPassword.title")}</h1>
      </div>
    );
  }
}

export default ResetPassword;
