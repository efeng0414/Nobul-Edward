import React, { PureComponent } from "react";
import { injectIntl, intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import ExternalLink from "../external-link";

@injectIntl
class TermsAndConditions extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div>
        {translate(this.props.intl, "consumer.consent1")}
        <span className="accept-terms-link">
          <ExternalLink
            href="https://corp.nobul.com/legal/terms-and-conditions/"
            link="termsOfService"
          />
        </span>
        {translate(this.props.intl, "consumer.consent2")}
      </div>
    );
  }
}

export default TermsAndConditions;
