import {
  EVENTS_IS_LOADING,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  ACCEPT_EVENT_SUCCESS,
  ACCEPT_EVENT_FAILURE,
  DECLINE_EVENT_SUCCESS,
  DECLINE_EVENT_FAILURE,
  PROPOSED_NEW_TIME_SUCCESS,
  PROPOSED_NEW_TIME_FAILURE,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS,
  SET_EVENT_INVISIBLE_SUCCESS,
  SET_EVENT_INVISIBLE_FAILURE,
  GET_EVENT_CREATED_AT_RANGE_SUCCESS,
  GET_EVENT_CREATED_AT_RANGE_FAILURE
} from "../types/events";

export const eventsIsLoading = ({ isLoading }) => ({
  type: EVENTS_IS_LOADING,
  payload: isLoading
});

export const postEventSuccess = ({ payload } = {}) => ({
  type: POST_EVENT_SUCCESS,
  payload
});

export const postEventFailure = ({ error }) => ({
  type: POST_EVENT_FAILURE,
  payload: error
});

export const getEventsSuccess = ({ payload }) => ({
  type: GET_EVENTS_SUCCESS,
  payload
});

export const getEventsFailure = ({ error }) => ({
  type: GET_EVENTS_FAILURE,
  payload: error
});

export const acceptEventSuccess = ({ payload } = {}) => ({
  type: ACCEPT_EVENT_SUCCESS,
  payload
});

export const acceptEventFailure = ({ error }) => ({
  type: ACCEPT_EVENT_FAILURE,
  payload: error
});

export const declineEventSuccess = ({ payload } = {}) => ({
  type: DECLINE_EVENT_SUCCESS,
  payload
});

export const declineEventFailure = ({ error } = {}) => ({
  type: DECLINE_EVENT_FAILURE,
  payload: error
});

export const setEventInvisibleSuccess = ({ payload, invisibleType } = {}) => ({
  type: SET_EVENT_INVISIBLE_SUCCESS,
  payload: { value: payload, invisibleType }
});

export const setEventInvisibleFailure = ({ error } = {}) => ({
  type: SET_EVENT_INVISIBLE_FAILURE,
  payload: error
});

export const proposedNewTimeSuccess = ({ payload } = {}) => ({
  type: PROPOSED_NEW_TIME_SUCCESS,
  payload
});

export const proposedNewTimeFailure = ({ error }) => ({
  type: PROPOSED_NEW_TIME_FAILURE,
  payload: error
});

export const deleteEventSuccess = ({ payload } = {}) => ({
  type: DELETE_EVENT_SUCCESS,
  payload
});

export const deleteEventFailure = ({ error } = {}) => ({
  type: DELETE_EVENT_FAILURE,
  payload: error
});

export const getEventsCreatedAtRangeSuccess = ({ events = [] }) => ({
  type: GET_EVENT_CREATED_AT_RANGE_SUCCESS,
  payload: events
});

export const getEventsCreatedAtRangeFailure = ({ error = {} }) => ({
  type: GET_EVENT_CREATED_AT_RANGE_FAILURE,
  payload: error
});
