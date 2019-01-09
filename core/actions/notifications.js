import {
  NOTIFICATIONS_IS_LOADING,
  GET_ALL_NOTIFICATIONS_FAILURE,
  GET_ALL_NOTIFICATIONS_SUCCESS,
  SAVE_NOTIFICATION_FAILURE,
  SAVE_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION_FAILURE,
  READ_NOTIFICATION_SUCCESS,
  DISCARD_NOTIFICATION_SUCCESS,
  DISCARD_NOTIFICATION_FAILURE
} from "../types/notifications";

const notificationsIsLoading = isLoading => {
  return {
    type: NOTIFICATIONS_IS_LOADING,
    payload: isLoading
  };
};

const listenForNotificationsSuccess = ({ notifications }) => {
  return {
    type: GET_ALL_NOTIFICATIONS_SUCCESS,
    payload: { sortedNotifications: notifications }
  };
};

const listenForNotificationsFailure = error => {
  return {
    type: GET_ALL_NOTIFICATIONS_FAILURE,
    payload: error
  };
};

const saveNotificationSuccess = () => {
  return {
    type: SAVE_NOTIFICATION_SUCCESS
  };
};

const saveNotificationFailure = error => {
  return {
    type: SAVE_NOTIFICATION_FAILURE,
    payload: error
  };
};

const readNotificationSuccess = () => {
  return {
    type: READ_NOTIFICATION_SUCCESS
  };
};

const readNotificationFailure = error => {
  return {
    type: READ_NOTIFICATION_FAILURE,
    payload: error
  };
};

const discardNotificationSuccess = () => {
  return {
    type: DISCARD_NOTIFICATION_SUCCESS
  };
};

const discardNotificationFailure = error => {
  return {
    type: DISCARD_NOTIFICATION_FAILURE,
    payload: error
  };
};

export {
  notificationsIsLoading,
  listenForNotificationsSuccess,
  listenForNotificationsFailure,
  saveNotificationSuccess,
  saveNotificationFailure,
  readNotificationSuccess,
  readNotificationFailure,
  discardNotificationSuccess,
  discardNotificationFailure
};
