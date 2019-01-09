import React, { PureComponent } from "react";
import { injectIntl, intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import ExternalLink from "../external-link";

@injectIntl
class ConsentForNews extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div>
        {translate(this.props.intl, "consumer.consent3")}
        <span className="accept-terms-link">
          <ExternalLink
            href="https://corp.nobul.com/legal/privacy-policy/"
            link="button.privacyPolicy"
          />
        </span>
        {translate(this.props.intl, "consumer.consent4")}
        <span className="accept-terms-link">
          <ExternalLink
            href="https://corp.nobul.com/contact-us/"
            link="contactUs"
          />
        </span>
        {translate(this.props.intl, "consumer.consent5")}
      </div>
    );
  }
}

export default ConsentForNews;
