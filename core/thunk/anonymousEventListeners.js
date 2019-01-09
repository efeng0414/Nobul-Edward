import {
  triggerLogin,
  setFavoriteProperty,
  openEventConfirmationModal,
  closeEventConfirmationModal
} from "../actions/anonymousEventListeners";

export const triggerLoginAsync = ({ trigger }) => dispatch =>
  dispatch(triggerLogin(trigger));

export const setFavoriteAsync = ({ favoriteList }) => dispatch =>
  dispatch(setFavoriteProperty(favoriteList));

export const openEventConfirmationModalAsync = ({ eventId }) => dispatch =>
  dispatch(openEventConfirmationModal({ eventId }));

export const closeEventConfirmationModalAsync = () => dispatch =>
  dispatch(closeEventConfirmationModal());
