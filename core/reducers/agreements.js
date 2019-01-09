import {
  CREATE_AGREEMENT_SUCCESS,
  CREATE_AGREEMENT_FAILURE,
  GET_AGREEMENT_SUCCESS,
  GET_AGREEMENT_FAILURE,
  GET_AGREEMENT_URL_SUCCESS,
  GET_AGREEMENT_URL_FAILURE,
  GET_AGREEMENT_LIST_SUCCESS,
  GET_AGREEMENT_LIST_FAILURE,
  AGREEMENT_LOADING,
  VIEW_AGREEMENT_SUCCESS,
  VIEW_AGREEMENT_FAILURE,
  SEND_ENVELOPE_SUCCESS,
  GET_AGREEMENT_LIST
} from "../types/agreements";

const defaultState = {
  buy: {},
  sell: {},
  error: {},
  pdfUrl: "",
  isLoading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_AGREEMENT_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false
      };
    case GET_AGREEMENT_LIST:
      return { ...state, error: {}, isLoading: true };
    case CREATE_AGREEMENT_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_AGREEMENT_SUCCESS:
      return {
        ...state,
        currentAgreement: action.payload,
        error: {},
        isLoading: false
      };
    case GET_AGREEMENT_URL_SUCCESS:
      return {
        ...state,
        pdfUrl: action.payload,
        error: {},
        isLoading: false
      };
    case GET_AGREEMENT_LIST_SUCCESS:
      return {
        ...state,
        pdfList: action.payload,
        error: {},
        isLoading: false
      };
    case VIEW_AGREEMENT_SUCCESS:
      return {
        ...state,
        pdfUrl: action.payload,
        error: {},
        isLoading: false
      };
    case GET_AGREEMENT_URL_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_AGREEMENT_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case GET_AGREEMENT_LIST_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case AGREEMENT_LOADING:
      return { ...state, error: {}, isLoading: true };
    case VIEW_AGREEMENT_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case SEND_ENVELOPE_SUCCESS:
      return { ...state, error: {}, isLoading: false };

    default:
      return state;
  }
};
