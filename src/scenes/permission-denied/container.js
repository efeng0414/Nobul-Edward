import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import "./styles.scss";

@injectIntl
class PermissionDenied extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div className="permission-denied">
        <Helmet>
          <title>{translate(this.props.intl, "helmet.permissionDenied")}</title>
          <meta
            name="description"
            content={translate(
              this.props.intl,
              "helmet.permissionDeniedDescription"
            )}
          />
        </Helmet>
        <h1>{translate(this.props.intl, "permissionDenied.title")}</h1>
        <p>{translate(this.props.intl, "permissionDenied.text")}</p>
      </div>
    );
  }
}

export default PermissionDenied;
