import {
  NOTIFICATIONS_IS_LOADING,
  GET_ALL_NOTIFICATIONS_SUCCESS,
  GET_ALL_NOTIFICATIONS_FAILURE,
  SAVE_NOTIFICATION_SUCCESS,
  SAVE_NOTIFICATION_FAILURE,
  READ_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION_FAILURE,
  DISCARD_NOTIFICATION_SUCCESS,
  DISCARD_NOTIFICATION_FAILURE
} from "../types/notifications";

const defaultState = {
  error: {},
  isLoading: false,
  notifications: { sortedNotifications: [] }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_IS_LOADING:
      return { ...state, isLoading: true, error: {} };

    case GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        isLoading: false,
        error: {}
      };

    case GET_ALL_NOTIFICATIONS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case SAVE_NOTIFICATION_SUCCESS:
      return { ...state, isLoading: false, error: {} };

    case SAVE_NOTIFICATION_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case READ_NOTIFICATION_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false
      };

    case READ_NOTIFICATION_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case DISCARD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        error: {},
        isLoading: false
      };

    case DISCARD_NOTIFICATION_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
};
