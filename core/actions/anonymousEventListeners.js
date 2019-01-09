import {
  TRIGGER_LOGIN_FOR_ANONYMOUS_USER,
  SET_FAVORITE_FOR_ANONYMOUS_USER,
  OPEN_EVENT_CONFIRMATION_MODAL,
  CLOSE_EVENT_CONFIRMATION_MODAL,
  OPEN_HOW_IT_WORKS_MODAL,
  CLOSE_HOW_IT_WORKS_MODAL
} from "../types/anonymousEventListeners";

export const triggerLogin = trigger => ({
  type: TRIGGER_LOGIN_FOR_ANONYMOUS_USER,
  payload: trigger
});

export const setFavoriteProperty = favoriteList => ({
  type: SET_FAVORITE_FOR_ANONYMOUS_USER,
  payload: favoriteList
});

export const openEventConfirmationModal = ({ eventId }) => ({
  type: OPEN_EVENT_CONFIRMATION_MODAL,
  payload: eventId
});

export const closeEventConfirmationModal = () => ({
  type: CLOSE_EVENT_CONFIRMATION_MODAL
});

export const openHowItWorksModal = () => ({
  type: OPEN_HOW_IT_WORKS_MODAL
});

export const closeHowItWorksModal = () => ({
  type: CLOSE_HOW_IT_WORKS_MODAL
});
