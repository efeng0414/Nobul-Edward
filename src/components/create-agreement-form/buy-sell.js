import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";

import { getFormLayout } from "../../utilities/forms";
import { BUY, SELL } from "../../../core/constants/shared";
import * as Fields from "../agreement-form-fields";

@Form.create({})
@injectIntl
class BuySellAgreement extends Component {
  state = {
    paidByCommission: true
  };

  render() {
    const { intl, form, agreement = {}, formType } = this.props;

    // Pre-fill agreement details
    const {
      clientName,
      brokerageName,
      clientAddress,
      clientPhone,
      agentName,
      brokeragePhone,
      startDate,
      expiryDate,
      holdoverPeriod,
      scheduleText,
      commission, // BUY
      propertyAddress, // SELL
      price, // SELL
      rebateCommission, // BUY
      listingCommission, // SELL
      cooperatingCommission // SELL
    } = agreement;

    const fieldLayout = getFormLayout();
    const { AgreementFields } = Fields;
    let key = 0; // For react keys

    const clientAddressFields = [
      <Fields.ClientName value={clientName} key={key++} />,
      <Fields.ClientAddress value={clientAddress} key={key++} />,
      <Fields.ClientPhone value={clientPhone} key={key++} />
    ];

    const buyPropertyFields = [
      <Fields.Commission value={commission} key={key++} />,
      <Fields.Rebate value={rebateCommission} key={key++} />
    ];

    const sellPropertyFields = [
      <Fields.PropertyAddress value={propertyAddress} key={key++} />,
      <Fields.Price value={price} key={key++} />,
      <Fields.ListingCommission value={listingCommission} key={key++} />,
      <Fields.CooperatingCommission value={cooperatingCommission} key={key++} />
    ];

    const heading =
      formType === BUY
        ? "contractHeaderRepresentation"
        : "contractHeaderListing";

    const instructions =
      formType === BUY
        ? "contractInstructionsRepresentation"
        : "contractInstructionsListing";

    return (
      <div>
        <h1>{translate(intl, heading)}</h1>
        <p>{translate(intl, instructions)}</p>
        <AgreementFields fieldlayout={fieldLayout} form={form} intl={intl}>
          <Fields.BrokerageName value={brokerageName} />
          <Fields.AgentName value={agentName} />
          <Fields.BrokeragePhone value={brokeragePhone} />
          {clientAddressFields}
          <Fields.StartDate value={startDate} />
          <Fields.ExpiryDate value={expiryDate} />
          <Fields.HoldoverPeriod value={holdoverPeriod} />
          {formType !== SELL || sellPropertyFields}
          {formType !== BUY || buyPropertyFields}
          <Fields.Schedule value={scheduleText} />
        </AgreementFields>
      </div>
    );
  }
}

BuySellAgreement.propTypes = {
  intl: intlShape.isRequired,
  agreement: PropTypes.object,
  form: PropTypes.any,
  generateAgreement: PropTypes.func,
  formType: PropTypes.string,
  agentId: PropTypes.string,
  consumerId: PropTypes.string,
  offerId: PropTypes.string,
  helmetTitleKey: PropTypes.string,
  processFile: PropTypes.func,
  propertyTypeChange: PropTypes.func
};

export default BuySellAgreement;
