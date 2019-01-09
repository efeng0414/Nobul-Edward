import {
  eventsIsLoading,
  postEventFailure,
  postEventSuccess,
  getEventsSuccess,
  getEventsFailure,
  acceptEventSuccess,
  acceptEventFailure,
  declineEventSuccess,
  declineEventFailure,
  proposedNewTimeSuccess,
  proposedNewTimeFailure,
  deleteEventSuccess,
  deleteEventFailure,
  getEventsCreatedAtRangeSuccess,
  getEventsCreatedAtRangeFailure,
  setEventInvisibleFailure,
  setEventInvisibleSuccess
} from "../actions/events";
import {
  postEvent,
  getEventsForConsumer,
  acceptEvent,
  declineEvent,
  getEvent,
  proposeNewTimeAgent,
  proposeNewTimeConsumer,
  deleteEvent,
  setEventInvisible,
  getEventsForAgent,
  fetchEventsCreatedAtRange
} from "../firebase/events";
import {
  INVISIBLE_TO_AGENT,
  INVISIBLE_TO_CONSUMER
} from "../api-transform/events";
import { AGENT_USER_TYPE } from "../constants/users";

export const postEventThunk = ({ eventData }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return postEvent({ eventData })
    .then(() => dispatch(postEventSuccess()))
    .catch(error => dispatch(postEventFailure({ error })));
};

export const getEventsForConsumerThunk = ({ consumerId }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return getEventsForConsumer({ consumerId })
    .then(snapshot => {
      const events = snapshot.exists() ? snapshot.val() : {};

      Object.keys(events).forEach(eventId => {
        if (events[eventId][INVISIBLE_TO_CONSUMER]) {
          delete events[eventId];
        }
      });

      return dispatch(getEventsSuccess({ payload: events }));
    })
    .catch(error => dispatch(getEventsFailure({ error })));
};

export const getEventsForAgentThunk = ({ agentId }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return getEventsForAgent({ agentId })
    .then(snapshot => {
      const events = snapshot.exists() ? snapshot.val() : {};

      Object.keys(events).forEach(eventId => {
        if (events[eventId][INVISIBLE_TO_AGENT]) {
          delete events[eventId];
        }
      });

      return dispatch(getEventsSuccess({ payload: events }));
    })
    .catch(error => dispatch(getEventsFailure({ error })));
};

export const acceptEventInviteThunk = ({ eventId }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return acceptEvent({ eventId })
    .then(() => dispatch(acceptEventSuccess({ payload: eventId })))
    .catch(error => dispatch(acceptEventFailure({ error })));
};

export const declineEventInviteThunk = ({ eventId }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return declineEvent({ eventId })
    .then(() => dispatch(declineEventSuccess()))
    .catch(error => dispatch(declineEventFailure({ error })));
};

export const getEventThunk = ({ eventId }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return getEvent({ eventId })
    .then(snapshot => dispatch(getEventsSuccess({ payload: snapshot.val() })))
    .catch(error => dispatch(getEventsFailure({ error })));
};

export const agentHasProposedNewTimeThunk = ({
  eventId,
  startTime,
  endTime
}) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return proposeNewTimeAgent({ eventId, startTime, endTime })
    .then(() => dispatch(proposedNewTimeSuccess()))
    .catch(error => dispatch(proposedNewTimeFailure({ error })));
};

export const consumerHasProposedNewTimeThunk = ({
  eventId,
  startTime,
  endTime
}) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return proposeNewTimeConsumer({ eventId, startTime, endTime })
    .then(() => dispatch(proposedNewTimeSuccess()))
    .catch(error => dispatch(proposedNewTimeFailure({ error })));
};

export const deleteEventThunk = ({ eventId }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return deleteEvent({ eventId })
    .then(() => dispatch(deleteEventSuccess({ payload: eventId })))
    .catch(error => dispatch(deleteEventFailure({ error })));
};

export const setEventInvisibleAsync = ({ eventId, userType }) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return setEventInvisible({ eventId, userType })
    .then(() =>
      dispatch(
        setEventInvisibleSuccess({
          payload: eventId,
          invisibleType:
            userType === AGENT_USER_TYPE
              ? INVISIBLE_TO_AGENT
              : INVISIBLE_TO_CONSUMER
        })
      )
    )
    .catch(error => dispatch(setEventInvisibleFailure({ error })));
};

export const getEventsCreatedAtRange = ({
  startAt = 0,
  endAt = 0
}) => dispatch => {
  dispatch(eventsIsLoading({ isLoading: true }));
  return fetchEventsCreatedAtRange({ startAt, endAt })
    .then(events => dispatch(getEventsCreatedAtRangeSuccess({ events })))
    .catch(error => dispatch(getEventsCreatedAtRangeFailure({ error })));
};
