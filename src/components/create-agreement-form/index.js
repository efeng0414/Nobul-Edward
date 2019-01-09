import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import moment from "moment";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { Form, Button, Select, Modal } from "antd";
import { intlShape, injectIntl } from "react-intl";
import * as MyNobulRoutes from "../../routes/myNobul";
import { getFormLayout } from "../../utilities/forms";
import ActivityIndicator from "../../components/activity-indicator";
import { translate } from "../../utilities/locale";
import {
  PDF,
  GENERATED_AGREEMENT_PDF_NAME,
  REFERRAL,
  SELL
} from "../../../core/constants/shared";

import {
  formatValueForPdf,
  generateFormMetadata
} from "../../../core/utilities/agreements";

import BuySellAgreement from "./buy-sell";
import CongratulationsIcon from "../../assets/images/congratulations_icon.svg";
import PDFViewer from "../../components/pdf-viewer";

import "./styles.scss";

class CreateAgreementForm extends PureComponent {
  state = {
    isSaving: false,
    formData: null, // For returning to form view using back button.
    pdfStoragePath: null,
    showSuccessModal: false,
    signerOrder: []
  };

  getPdfStoragePath() {
    let storagePath = null;

    if (this.state.pdfStoragePath) {
      storagePath = this.state.pdfStoragePath; // Take path from state
    } else if (this.props.pdfList && this.props.pdfList.forms) {
      let thisForm = this.props.pdfList.forms[this.props.formType][0]; // Or from first form elem
      storagePath = thisForm.url;
      this.setState({
        signerOrder: thisForm.signers
      });
    }

    return storagePath;
  }

  getNextFormType() {
    const { offer } = this.props;

    if (!offer || !offer.agreements) {
      return null;
    }

    const thisFormType = this.props.match.params.formType;
    const agreementsTypes = Object.keys(offer.agreements);
    const nonReferralForms = agreementsTypes.filter(form => form !== REFERRAL);

    let nextFormType = nonReferralForms[0];

    return thisFormType === nextFormType ? null : nextFormType;
  }

  formatDataForPDF(additionalValues = {}) {
    const { agreement, formType, setAgreementDetails } = this.props;
    let agreementData = {
      ...agreement, // Add all aggreement details
      ...additionalValues, // Overwrite any additional ones.
      todaysDate: moment(),
      documentVersion: agreement.agreementsCount
        ? agreement.agreementsCount + 1
        : 1,
      formatted: true
    };

    // Set form data we can return to if "back" button is pressed.
    this.setState({
      formData: { ...agreementData }
    });

    // Format the data to send to PDF
    Object.keys(agreementData).map(key => { // eslint-disable-line
      agreementData = formatValueForPdf({
        agreementData,
        key,
        intl: this.props.intl,
        translate
      });
    });

    !agreementData.scheduleText &&
      agreement.services &&
      (agreementData.scheduleText = this.formatSchedule(agreement));

    // Set these details
    setAgreementDetails(agreementData, formType);

    return agreementData;
  }

  // Add this to store, redirect user to PDF viewer.
  @bound
  goToPDF(e) {
    const { validateFieldsAndScroll } = this.props.form;
    const { agreement } = this.props;

    e.preventDefault();

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.formatDataForPDF(values);

        // Show the PDF
        this.props.history.push({
          pathname: MyNobulRoutes.url.generateAgreement
            .replace(":format?", PDF)
            .replace(":formType?", this.props.match.params.formType)
            .replace(":offerId?", agreement.offerId)
        });
      }
    });
  }

  generatePDF(formData, pdfBlob) {
    const { agreement, formType } = this.props;

    // Set base form data
    let agreementData = {
      offerId: agreement.offerId,
      userId: agreement.consumerId,
      agentId: agreement.agentId,
      jobType: agreement.jobType,
      region: agreement.region,
      country: agreement.country,
      rebateCommission:
        this.state.formData && this.state.formData.rebateCommission
          ? this.state.formData.rebateCommission
          : null,
      fileName: `${formType}-${GENERATED_AGREEMENT_PDF_NAME}`,
      templateStoragePath: this.getPdfStoragePath()
    };

    // Add all form fields to form node
    agreementData.formData = formData;

    // Supplement base agreement data with data from the form fields
    agreementData = generateFormMetadata(agreementData);

    agreementData.signerOrder = this.state.signerOrder;

    // send data + PDF to server
    return this.props.generateAgreement(agreementData, formType, pdfBlob);
  }

  @bound
  nextPDF(formData, pdfBlob) {
    this.setState({ formData, pdfBlob, showCheckDataModal: true });
  }

  @bound
  submitPdf() {
    const { formData, pdfBlob } = this.state;
    this.setState({ showCheckDataModal: false });

    const { agreement } = this.props;
    const nextFormType = this.getNextFormType();
    if (!this.state.showSuccessModal) {
      this.generatePDF(formData, pdfBlob)
        .then(() => {
          if (nextFormType) {
            // Go to next PDF in chain.
            this.props.history.push({
              pathname: MyNobulRoutes.url.generateAgreement
                .replace(":format?", PDF)
                .replace(":formType?", nextFormType)
                .replace(":offerId?", agreement.offerId)
            });
          } else {
            this.setState({ isSaving: true });

            // Send to endpoint!
            this.props
              .startSendEnvelope({
                offerId: this.props.agreement.offerId,
                offerType: this.props.agreement.jobType
              })
              .then(() => {
                // Finished this process, show a modal!
                this.setState({ showSuccessModal: true, isSaving: false });
              })
              .catch(this.showError);
          }
        })
        .catch(this.showError);
    }
  }

  showError(error) {
    const message = error.message;
    alert(message);
  }

  @bound
  finishContract() {
    this.props.history.push({
      pathname: MyNobulRoutes.url.offers
    });
  }

  @bound
  hideCheckDataModal() {
    this.setState({ showCheckDataModal: false });
  }

  // Show the PDF screen.
  viewPDF() {
    const {
      agreement,
      pdfUrl,
      resolvePFDUrl,
      intl,
      helmetTitleKey
    } = this.props;
    const nextForm = this.getNextFormType();
    const buttonText = nextForm
      ? translate(intl, "button.submit")
      : translate(intl, "button.finish");
    let formatted =
      pdfUrl && !agreement.formatted
        ? this.formatDataForPDF(agreement)
        : agreement;

    // Resolve the path form storage.
    if (!pdfUrl) {
      resolvePFDUrl(this.getPdfStoragePath());
    }

    return pdfUrl ? (
      <div className="create-agreement-pdf">
        <Helmet title={translate(intl, helmetTitleKey)} />

        {this.createFormRegionChooser()}
        {this.createFormChooser()}

        <PDFViewer
          source={pdfUrl}
          prefillData={formatted}
          onSubmit={this.nextPDF}
          buttonText={buttonText}
        />

        {this.state.showSuccessModal && (
          <Modal
            visible
            onCancel={this.finishContract}
            footer={null}
            className="create-agreement-modal"
          >
            <img
              src={CongratulationsIcon}
              alt={translate(this.props.intl, "offer.congratulations")}
            />
            <h3>{translate(this.props.intl, "agreement.envelopeSent")}</h3>
            <p>{translate(this.props.intl, "agreement.successMessage")}</p>
          </Modal>
        )}

        {this.state.showCheckDataModal && (
          <Modal
            visible
            onCancel={this.hideCheckDataModal}
            onOk={this.submitPdf}
            className="create-agreement-modal"
          >
            <h3>{translate(this.props.intl, "agreement.sendConfirmHeader")}</h3>
            <p>{translate(this.props.intl, "agreement.sendConfirmText")}</p>
            <p>{translate(this.props.intl, "agreement.sendConfirmText2")}</p>
          </Modal>
        )}
      </div>
    ) : (
      <p>Fetching blank form...</p>
    );
  }

  createPdfOptions(region, prefix) {
    const { formType } = this.props;
    const { forms, id, regions } = region;
    const { Option } = Select;

    // Format data
    const formUrl = forms ? forms[formType] : "";
    const display = prefix ? `${prefix} > ${id}` : `${id}`;

    // Loop subregions
    let subOptions = [];
    if (regions) {
      subOptions = regions.map(region =>
        this.createPdfOptions(region, display)
      );
    }

    // Generate option
    const thisOption = formUrl ? (
      <Option value={formUrl} key={formUrl}>
        {display}
      </Option>
    ) : null;

    // Return option and suboptions.
    return [thisOption, ...subOptions];
  }

  @bound
  changePdfStoragePath(index) {
    const formsList =
      (this.props.pdfList && this.props.pdfList.forms[this.props.formType]) ||
      [];
    const formData = formsList[index];

    this.setState(
      { pdfStoragePath: formData.url, signerOrder: formData.signers },
      this.viewPDF
    );
  }

  createFormChooser() {
    const formsList =
      (this.props.pdfList && this.props.pdfList.forms[this.props.formType]) ||
      [];

    return formsList.length > 1 ? (
      <Select
        placeholder={translate(this.props.intl, "chooseFormJurisdiction")}
        onChange={this.changePdfStoragePath}
        className="create-agreement-form-select"
      >
        {formsList.map((formdata, index) => (
          <Select.Option value={index} key={index}>
            {formdata.title || translate(this.props.intl, "chooseFormDefault")}
          </Select.Option>
        ))}
      </Select>
    ) : null;
  }

  createFormRegionChooser() {
    return this.props.pdfList && this.props.pdfList.regions ? (
      <Select
        placeholder={translate(this.props.intl, "chooseFormJurisdiction")}
        onChange={this.changePdfStoragePath}
      >
        {this.createPdfOptions(this.props.pdfList)}
      </Select>
    ) : null;
  }

  // Formt data to be shown in schedule.
  formatSchedule(agreement) {
    const servicesStrings = [];
    let servicesIntroString = "";

    Object.keys(agreement.services).map(key =>
      servicesStrings.push(`∙ ${translate(this.props.intl, key)}`)
    );

    if (servicesStrings.length > 0) {
      servicesIntroString = `${translate(
        this.props.intl,
        "servicesToBeProvided"
      )}:\n`;
    }

    return `${servicesIntroString} ${servicesStrings.join(`\n`)}`;
  }

  viewForm() {
    const { intl, helmetTitleKey, agreement } = this.props;
    const { formData } = this.state;
    const FormItem = Form.Item;
    const paddedFieldLayout = getFormLayout(true);
    const pdfStoragePath = this.getPdfStoragePath();

    agreement &&
      agreement.services &&
      (agreement.scheduleText = this.formatSchedule(agreement));

    return (
      <div className="create-agreement">
        <Helmet title={translate(intl, helmetTitleKey)} />

        <Form layout="horizontal" onSubmit={this.goToPDF}>
          <BuySellAgreement {...this.props} agreement={formData || agreement} />

          {/* Submit */}
          <FormItem {...paddedFieldLayout}>
            <Button type="primary" htmlType="submit" disabled={!pdfStoragePath}>
              {translate(intl, "button.generatePDF")}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  render() {
    const view = this.props.format === PDF ? this.viewPDF() : this.viewForm();
    return (
      <ActivityIndicator spinning={this.state.isSaving} type="saving">
        {view}
      </ActivityIndicator>
    );
  }
}

CreateAgreementForm.propTypes = {
  intl: intlShape.isRequired,
  agreement: PropTypes.object,
  form: PropTypes.any,
  generateAgreement: PropTypes.func,
  startSendEnvelope: PropTypes.func,
  setAgreementDetails: PropTypes.func,
  resolvePFDUrl: PropTypes.func,
  formType: PropTypes.string,
  helmetTitleKey: PropTypes.string,
  format: PropTypes.string,
  pdfUrl: PropTypes.string,
  history: PropTypes.object,
  match: PropTypes.object,
  pdfList: PropTypes.object,
  offer: PropTypes.object
};

export default Form.create()(injectIntl(CreateAgreementForm));
