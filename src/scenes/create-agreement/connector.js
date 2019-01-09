import { connect } from "react-redux";
import CreateAgreement from "./container";

import {
  createAgreementAsync,
  collectAgreementPrefillDataAsync,
  getBlankFormPDFUrlAsync,
  getBlankFormListAsync,
  startSendEnvelopeAsync
} from "../../../core/thunk/agreements";

import { getAgreementSuccess } from "../../../core/actions/agreements";

const mapStateToProps = state => ({
  offer: state.offers.offer,
  agreement: state.agreements.currentAgreement,
  pdfUrl: state.agreements.pdfUrl,
  pdfList: state.agreements.pdfList,
  isLoading: state.agreements.isLoading,
  error: state.agreements.error
});

const mapDispatchToProps = dispatch => ({
  getPDFUrls: (country, region) =>
    dispatch(getBlankFormListAsync(country, region)),
  resolvePFDUrl: storagePath => dispatch(getBlankFormPDFUrlAsync(storagePath)),
  generateAgreement: (postData, agreementType, fileToUpload) =>
    dispatch(createAgreementAsync(postData, agreementType, fileToUpload)),
  setAgreementDetails: (agreementData, agreementType) =>
    dispatch(getAgreementSuccess(agreementType, agreementData)),
  collectAgreementPrefillData: (agreementType, offerId) =>
    dispatch(collectAgreementPrefillDataAsync(agreementType, offerId)),
  startSendEnvelope: ({ offerId, offerType }) =>
    dispatch(startSendEnvelopeAsync({ offerId, offerType }))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAgreement);
