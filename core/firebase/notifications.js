import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { READ, UNREAD, DISCARDED } from "../constants/notifications";
import {
  CREATED_AT,
  UPDATED_AT,
  MESSAGE,
  STATUS,
  TYPE,
  NOTIFICATIONS
} from "../api-transform/notifications";

const listenForNotifications = (userId, callback) => {
  return firebase
    .database()
    .ref(`${NOTIFICATIONS}/${userId}`)
    .orderByChild(CREATED_AT)
    .on("value", callback);
};

const postNotification = (userId, notification) => {
  let notificationData = {
    [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [MESSAGE]: notification[MESSAGE],
    [STATUS]: UNREAD,
    [TYPE]: notification[TYPE]
  };
  return firebase
    .database()
    .ref(`${NOTIFICATIONS}/${userId}`)
    .push(notificationData);
};

const readNotification = (userId, notificationId) => {
  let notificationData = {
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [STATUS]: READ
  };
  return firebase
    .database()
    .ref(`${NOTIFICATIONS}/${userId}/${notificationId}`)
    .update(notificationData);
};

const discardNotification = (userId, notificationId) => {
  let notificationData = {
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [STATUS]: DISCARDED
  };
  return firebase
    .database()
    .ref(`${NOTIFICATIONS}/${userId}/${notificationId}`)
    .update(notificationData);
};

export {
  listenForNotifications,
  postNotification,
  readNotification,
  discardNotification
};
