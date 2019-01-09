import {
  notificationsIsLoading,
  listenForNotificationsSuccess,
  listenForNotificationsFailure,
  saveNotificationSuccess,
  saveNotificationFailure,
  readNotificationSuccess,
  readNotificationFailure,
  discardNotificationSuccess,
  discardNotificationFailure
} from "../actions/notifications";

import {
  listenForNotifications,
  postNotification,
  readNotification,
  discardNotification
} from "../firebase/notifications";

import { descendingSort } from "../utilities/sorting-notifications";
import { filterByMultipleValues } from "../utilities/filter-data";
import { READ, UNREAD, STATUS } from "../constants/notifications";

const listenForNotificationsAsync = userId => {
  return dispatch => {
    dispatch(notificationsIsLoading(true));
    listenForNotifications(userId, snapshot => {
      const notificationStatus = [UNREAD, READ];
      const allNotifications = snapshot.val();
      let qualifiedNotifications = {};
      if (allNotifications) {
        qualifiedNotifications = filterByMultipleValues({
          databaseKey: STATUS,
          filterValues: notificationStatus,
          entities: allNotifications
        });
      }
      const notifications = descendingSort({
        notifications: qualifiedNotifications
      });
      dispatch(listenForNotificationsSuccess({ notifications }));
    });
  };
};

const saveNotification = (userId, notification) => {
  return dispatch => {
    dispatch(notificationsIsLoading(true));
    postNotification(userId, notification)
      .then(() => {
        dispatch(saveNotificationSuccess());
      })
      .catch(error => {
        dispatch(saveNotificationFailure(error));
      });
  };
};

const readNotificationAsync = (userId, notificationId) => {
  return dispatch => {
    dispatch(notificationsIsLoading);
    readNotification(userId, notificationId)
      .then(() => {
        dispatch(readNotificationSuccess());
      })
      .catch(error => {
        dispatch(readNotificationFailure(error));
      });
  };
};

const discardNotificationAsync = (userId, notificationId) => {
  return dispatch => {
    dispatch(notificationsIsLoading);
    discardNotification(userId, notificationId)
      .then(() => {
        dispatch(discardNotificationSuccess());
      })
      .catch(error => {
        dispatch(discardNotificationFailure(error));
      });
  };
};

export {
  listenForNotificationsAsync,
  saveNotification,
  readNotificationAsync,
  discardNotificationAsync
};
