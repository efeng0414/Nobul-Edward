import {
  CREATE_AGREEMENT_SUCCESS,
  CREATE_AGREEMENT_FAILURE,
  GET_AGREEMENT_URL_SUCCESS,
  GET_AGREEMENT_URL_FAILURE,
  GET_AGREEMENT_SUCCESS,
  GET_AGREEMENT_FAILURE,
  GET_AGREEMENT_LIST_SUCCESS,
  GET_AGREEMENT_LIST_FAILURE,
  AGREEMENT_LOADING,
  SEND_ENVELOPE_FAILURE,
  SEND_ENVELOPE_SUCCESS,
  VIEW_AGREEMENT_SUCCESS,
  VIEW_AGREEMENT_FAILURE,
  GET_AGREEMENT_LIST
} from "../types/agreements";

const getFormListSuccess = result => {
  return { type: GET_AGREEMENT_LIST_SUCCESS, payload: result.data.results };
};

const getFormList = () => {
  return {
    type: GET_AGREEMENT_LIST
  };
};

const getFormListFailure = error => {
  return {
    type: GET_AGREEMENT_LIST_FAILURE,
    payload: error
  };
};

const getAgreementPDFUrlSuccess = url => {
  return { type: GET_AGREEMENT_URL_SUCCESS, payload: url };
};

const getAgreementPDFUrlFailure = error => {
  return {
    type: GET_AGREEMENT_URL_FAILURE,
    payload: error
  };
};

const createAgreementSuccess = agreementDetails => {
  return { type: CREATE_AGREEMENT_SUCCESS, payload: agreementDetails };
};

const createAgreementFailure = error => {
  return {
    type: CREATE_AGREEMENT_FAILURE,
    payload: error
  };
};

const getAgreementSuccess = (agreementType, agreementData, agreementId) => {
  return {
    type: GET_AGREEMENT_SUCCESS,
    payload: { ...agreementData, agreementType, agreementId }
  };
};

const agreementGetFailure = error => {
  return {
    type: GET_AGREEMENT_FAILURE,
    payload: error
  };
};

const agreementLoading = ({ isLoading }) => {
  return {
    type: AGREEMENT_LOADING,
    payload: isLoading
  };
};

const sendEnvelopeSuccess = payload => {
  return {
    type: SEND_ENVELOPE_SUCCESS,
    payload
  };
};

const sendEnvelopeFailure = error => {
  return {
    type: SEND_ENVELOPE_FAILURE,
    payload: error
  };
};

const viewAgreementSuccess = payload => {
  return {
    type: VIEW_AGREEMENT_SUCCESS,
    payload
  };
};

const viewAgreementFailure = error => {
  return {
    type: VIEW_AGREEMENT_FAILURE,
    payload: error
  };
};

export {
  createAgreementSuccess,
  createAgreementFailure,
  getAgreementSuccess,
  agreementGetFailure,
  getAgreementPDFUrlFailure,
  getAgreementPDFUrlSuccess,
  getFormListSuccess,
  getFormListFailure,
  agreementLoading,
  sendEnvelopeSuccess,
  sendEnvelopeFailure,
  viewAgreementSuccess,
  viewAgreementFailure,
  getFormList
};
