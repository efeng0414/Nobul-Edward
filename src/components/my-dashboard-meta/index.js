import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";

@injectIntl
class MyDashboardMeta extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    titleKey: PropTypes.string.isRequired
  };

  render() {
    const title = translate(this.props.intl, this.props.titleKey);
    const metaDescription = translate(
      this.props.intl,
      "helmet.myDashboard.defaultDescription"
    ).replace("#title#", title);

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
    );
  }
}

export default MyDashboardMeta;
