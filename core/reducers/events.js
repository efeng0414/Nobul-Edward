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
import { STATUS } from "../api-transform/events";
import {
  STATUS_ACCEPTED,
  STATUS_DECLINED,
  STATUS_DELETED
} from "../constants/events";

const defaultState = {
  error: {},
  isLoading: false,
  list: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case EVENTS_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: {}
      };
    case POST_EVENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: {}
      };
    case POST_EVENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        list: action.payload || {},
        isLoading: false,
        error: {}
      };
    case GET_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case ACCEPT_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
        list: {
          ...state.list,
          [action.payload]: {
            ...state.list[action.payload],
            [STATUS]: STATUS_ACCEPTED
          }
        }
      };
    case ACCEPT_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DECLINE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {}
      };
    case DECLINE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case PROPOSED_NEW_TIME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {}
      };
    case PROPOSED_NEW_TIME_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_EVENT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        list: {
          ...state.list,
          [action.payload]: {
            ...state.list[action.payload],
            [STATUS]: STATUS_DELETED
          }
        }
      };
    }

    case SET_EVENT_INVISIBLE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    case SET_EVENT_INVISIBLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        list: {
          ...state.list,
          [action.payload.value]: {
            ...state.list[action.payload.value],
            [action.payload.invisibleType]: true
          }
        }
      };
    }

    case GET_EVENT_CREATED_AT_RANGE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_EVENT_CREATED_AT_RANGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
