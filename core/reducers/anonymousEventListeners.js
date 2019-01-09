import {
  TRIGGER_LOGIN_FOR_ANONYMOUS_USER,
  SET_FAVORITE_FOR_ANONYMOUS_USER,
  OPEN_EVENT_CONFIRMATION_MODAL,
  CLOSE_EVENT_CONFIRMATION_MODAL,
  OPEN_HOW_IT_WORKS_MODAL,
  CLOSE_HOW_IT_WORKS_MODAL
} from "../types/anonymousEventListeners";

const defaultState = {
  loginTrigger: false,
  favoriteList: {},
  eventConfirmationModal: false,
  howItWorksModal: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TRIGGER_LOGIN_FOR_ANONYMOUS_USER:
      return { ...state, loginTrigger: action.payload };
    case SET_FAVORITE_FOR_ANONYMOUS_USER:
      return { ...state, favoriteList: action.payload };
    case OPEN_EVENT_CONFIRMATION_MODAL:
      return {
        ...state,
        eventConfirmationModal: action.payload
      };
    case CLOSE_EVENT_CONFIRMATION_MODAL:
      return {
        ...state,
        eventConfirmationModal: false
      };
    case OPEN_HOW_IT_WORKS_MODAL:
      return {
        ...state,
        howItWorksModal: true
      };
    case CLOSE_HOW_IT_WORKS_MODAL:
      return {
        ...state,
        howItWorksModal: false
      };
    default:
      return state;
  }
};
