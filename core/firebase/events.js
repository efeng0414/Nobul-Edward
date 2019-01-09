import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import {
  CREATED_AT,
  CREATED_ON,
  LOCATION,
  PHONE,
  PHONE_PREFIX,
  CONSUMER_ID,
  AGENT_ID,
  SUBJECT,
  EVENT_TYPE,
  START_TIME,
  END_TIME,
  OFFER_ID,
  STATUS,
  COMMENT,
  INVISIBLE_TO_AGENT,
  INVISIBLE_TO_CONSUMER,
  UPDATED_AT
} from "../api-transform/events";
import { EVENTS } from "../api-transform";
import {
  STATUS_ACCEPTED,
  STATUS_DECLINED,
  STATUS_CONSUMER_HAS_PROPOSED,
  STATUS_AGENT_HAS_PROPOSED,
  STATUS_DELETED
} from "../constants/events";
import { AGENT_USER_TYPE } from "../constants/users";

export const postEvent = ({
  eventData: {
    createdOn,
    location,
    consumerId,
    agentId,
    offerId,
    subject,
    eventType,
    startTime,
    endTime,
    phone,
    phonePrefix,
    eventComment
  }
}) =>
  firebase
    .database()
    .ref(`${EVENTS}`)
    .push({
      [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [CREATED_ON]: createdOn,
      [LOCATION]: location,
      [CONSUMER_ID]: consumerId,
      [PHONE]: phone,
      [PHONE_PREFIX]: phonePrefix,
      [AGENT_ID]: agentId,
      [SUBJECT]: subject,
      [OFFER_ID]: offerId,
      [START_TIME]: startTime,
      [END_TIME]: endTime,
      [STATUS]: STATUS_CONSUMER_HAS_PROPOSED,
      [EVENT_TYPE]: eventType,
      [COMMENT]: eventComment,
      [INVISIBLE_TO_CONSUMER]: false,
      [INVISIBLE_TO_AGENT]: false,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
    });

export const getEventsForConsumer = ({ consumerId }) =>
  firebase
    .database()
    .ref(`${EVENTS}`)
    .orderByChild(CONSUMER_ID)
    .equalTo(consumerId)
    .once("value");

export const getEventsForAgent = ({ agentId }) =>
  firebase
    .database()
    .ref(`${EVENTS}`)
    .orderByChild(AGENT_ID)
    .equalTo(agentId)
    .once("value");

export const acceptEvent = ({ eventId }) =>
  firebase
    .database()
    .ref(`${EVENTS}/${eventId}`)
    .update({
      [STATUS]: STATUS_ACCEPTED,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
    });

export const declineEvent = ({ eventId }) =>
  firebase
    .database()
    .ref(`${EVENTS}/${eventId}`)
    .update({
      [STATUS]: STATUS_DECLINED,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
    });

export const getEvent = ({ eventId }) =>
  firebase
    .database()
    .ref(`${EVENTS}/${eventId}`)
    .once("value");

export const proposeNewTimeAgent = ({ eventId, startTime, endTime }) =>
  firebase
    .database()
    .ref(`${EVENTS}/${eventId}`)
    .update({
      [START_TIME]: startTime,
      [END_TIME]: endTime,
      [STATUS]: STATUS_AGENT_HAS_PROPOSED,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
    });

export const proposeNewTimeConsumer = ({ eventId, startTime, endTime }) =>
  firebase
    .database()
    .ref(`${EVENTS}/${eventId}`)
    .update({
      [START_TIME]: startTime,
      [END_TIME]: endTime,
      [STATUS]: STATUS_CONSUMER_HAS_PROPOSED,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
    });

export const deleteEvent = ({ eventId }) =>
  firebase
    .database()
    .ref(`${EVENTS}/${eventId}`)
    .update({
      [STATUS]: STATUS_DELETED,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
    });

export const setEventInvisible = ({ eventId, userType }) =>
  userType === AGENT_USER_TYPE
    ? firebase
        .database()
        .ref(`${EVENTS}/${eventId}`)
        .update({
          [INVISIBLE_TO_AGENT]: true,
          [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
        })
    : firebase
        .database()
        .ref(`${EVENTS}/${eventId}`)
        .update({
          [INVISIBLE_TO_CONSUMER]: true,
          [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP
        });

export const fetchEventsCreatedAtRange = ({ startAt = 0, endAt = 0 }) =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${EVENTS}`)
      .orderByChild(CREATED_AT)
      .startAt(startAt)
      .endAt(endAt)
      .once("value")
      .then(snapshot => resolve(snapshot.val() || {}))
      .catch(reject);
  });
