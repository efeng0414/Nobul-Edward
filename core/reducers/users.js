import {
  GET_CONSUMER_PROFILE_SUCCESS,
  GET_CONSUMER_PROFILE_FAILURE,
  GET_AGENT_PROFILE_SUCCESS,
  GET_AGENT_PROFILE_FAILURE,
  GET_MULTIPLE_AGENTS_FAILURE,
  GET_MULTIPLE_AGENTS_SUCCESS,
  GET_MULTIPLE_AGENTS_WITH_AVATAR_FAILURE,
  GET_MULTIPLE_AGENTS_WITH_AVATAR_SUCCESS,
  GET_AGENT_WITH_AVATAR_SUCCESS,
  GET_AGENT_WITH_AVATAR_FAILURE,
  USER_PROFILE_IS_LOADING,
  GET_MULTIPLE_CONSUMERS_FAILURE,
  GET_MULTIPLE_CONSUMERS_SUCCESS,
  SET_CONSUMER_AVATAR_SUCCESS,
  SET_CONSUMER_AVATAR_FAILURE,
  UPDATE_AGENT_AVATAR_SUCCESS,
  UPDATE_AGENT_AVATAR_FAILURE,
  GET_USER_CREATED_AT_RANGE_SUCCESS,
  GET_USER_CREATED_AT_RANGE_FAILURE
} from "../types/user";

const defaultState = {
  agents: {},
  consumers: {},
  consumerProfile: {},
  isLoading: false,
  agentProfile: {},
  error: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_CONSUMER_PROFILE_SUCCESS:
      return {
        ...state,
        consumerProfile: action.payload,
        error: {},
        isLoading: false
      };
    case GET_CONSUMER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_MULTIPLE_CONSUMERS_SUCCESS:
      return {
        ...state,
        consumers: action.payload,
        error: {},
        isLoading: false
      };
    case GET_MULTIPLE_CONSUMERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_AGENT_PROFILE_SUCCESS:
      return {
        ...state,
        agentProfile: action.payload,
        error: {},
        isLoading: false
      };
    case GET_AGENT_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_MULTIPLE_AGENTS_SUCCESS:
      return {
        ...state,
        agents: action.payload,
        error: {},
        isLoading: false
      };
    case GET_MULTIPLE_AGENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_MULTIPLE_AGENTS_WITH_AVATAR_SUCCESS:
      return {
        ...state,
        agents: action.payload,
        error: {},
        isLoading: false
      };
    case GET_MULTIPLE_AGENTS_WITH_AVATAR_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case GET_AGENT_WITH_AVATAR_SUCCESS:
      return {
        ...state,
        agent: action.payload,
        error: {},
        isLoading: false
      };
    case GET_AGENT_WITH_AVATAR_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case USER_PROFILE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: {}
      };
    case SET_CONSUMER_AVATAR_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case SET_CONSUMER_AVATAR_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_AGENT_AVATAR_SUCCESS:
      return { ...state, isLoading: false };
    case UPDATE_AGENT_AVATAR_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case GET_USER_CREATED_AT_RANGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.userType]: action.payload.users,
        error: {}
      };
    case GET_USER_CREATED_AT_RANGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
