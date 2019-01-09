import React, { Component } from "react";
import Helmet from "react-helmet";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";

import { translate } from "../../utilities/locale";
import DisplayAgreement from "../../components/display-agreement";
import "./styles.scss";

class ViewAgreement extends Component {
  static propTypes = {
    intl: PropTypes.any,
    getAgreementData: PropTypes.func,
    match: PropTypes.any,
    agreement: PropTypes.any
  };

  componentDidMount() {
    const { getAgreementData } = this.props;
    const { agreementId, agreementType } = this.props.match.params;
    getAgreementData(agreementType, agreementId);
  }

  render() {
    const { intl, agreement } = this.props;
    const { agreementType } = this.props.match.params;

    return (
      <div>
        <Helmet title={translate(intl, "helmet.agentViewOffers")} />
        <DisplayAgreement agreementType={agreementType} agreement={agreement} />
      </div>
    );
  }
}

export default injectIntl(ViewAgreement);
