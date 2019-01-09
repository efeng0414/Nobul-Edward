import React, { PureComponent } from "react";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../utilities/locale";

@injectIntl
class RecoverEmail extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div>
        <h1>{translate(this.props.intl, "authAction.recoverEmail.title")}</h1>
      </div>
    );
  }
}

export default RecoverEmail;
