import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateAgreementForm from "../../components/create-agreement-form";
import ActivityIndicator from "../../components/activity-indicator";
import { translate } from "../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import { BUY, SELL, REFERRAL } from "../../../core/constants/shared";
import { objectIsEmpty } from "../../../core/utilities/misc";
import "./styles.scss";

class CreateAgreement extends Component {
  state = { isLoading: false };

  componentDidMount() {
    const { collectAgreementPrefillData } = this.props;
    const { formType, offerId } = this.props.match.params;

    collectAgreementPrefillData(formType, offerId);
  }

  componentDidUpdate(prevProps) {
    const { getPDFUrls, agreement } = this.props;

    if (prevProps.agreement !== agreement) {
      const { country, region } = agreement;

      // Get the list of PDFs
      if (country && region) {
        getPDFUrls(country, region);
      }
    }
  }

  render() {
    const { isLoading } = this.props;
    const { formType, format } = this.props.match.params;

    let helmetTitleKey = "";
    switch (formType) {
      case BUY:
        helmetTitleKey = "helmet.createBuyerAgreement";
        break;
      case SELL:
        helmetTitleKey = "helmet.createListingAgreement";
        break;
      case REFERRAL:
        helmetTitleKey = "helmet.createReferralAgreement";
        break;
    }

    return (
      <ActivityIndicator spinning={isLoading} type="loading">
        {objectIsEmpty(this.props.error) &&
          formType && (
            <CreateAgreementForm
              {...this.props}
              format={format}
              formType={formType}
              helmetTitleKey={helmetTitleKey}
            />
          )}

        {!objectIsEmpty(this.props.error) && (
          <div className="contracts__unavailable">
            <h2>
              {translate(this.props.intl, "contracts.unavailable.header")}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: translate(this.props.intl, "contracts.unavailable.text")
              }} // Content is from en.js file, there is no danger.
            />
          </div>
        )}
      </ActivityIndicator>
    );
  }
}

CreateAgreement.propTypes = {
  agreement: PropTypes.object,
  formType: PropTypes.string,
  pdfUrl: PropTypes.string,
  match: PropTypes.any,
  generateAgreement: PropTypes.func,
  setAgreementDetails: PropTypes.func,
  collectAgreementPrefillData: PropTypes.func,
  resolvePFDUrl: PropTypes.func,
  getPDFUrls: PropTypes.func,
  pdfList: PropTypes.object,
  history: PropTypes.object,
  offer: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  intl: intlShape.isRequired
};

export default injectIntl(CreateAgreement);
