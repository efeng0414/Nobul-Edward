import {
  GET_CONSUMER_PROFILE_SUCCESS,
  GET_CONSUMER_PROFILE_FAILURE,
  GET_AGENT_PROFILE_SUCCESS,
  GET_AGENT_PROFILE_FAILURE,
  GET_MULTIPLE_AGENTS_SUCCESS,
  GET_MULTIPLE_AGENTS_FAILURE,
  AGENTS_IS_LOADING,
  GET_MULTIPLE_AGENTS_WITH_AVATAR_SUCCESS,
  GET_MULTIPLE_AGENTS_WITH_AVATAR_FAILURE,
  GET_AGENT_WITH_AVATAR_SUCCESS,
  GET_AGENT_WITH_AVATAR_FAILURE,
  USER_PROFILE_IS_LOADING,
  GET_MULTIPLE_CONSUMERS_SUCCESS,
  GET_MULTIPLE_CONSUMERS_FAILURE,
  CONSUMERS_IS_LOADING,
  SET_CONSUMER_AVATAR_SUCCESS,
  SET_CONSUMER_AVATAR_FAILURE,
  UPDATE_AGENT_AVATAR_SUCCESS,
  UPDATE_AGENT_AVATAR_FAILURE,
  GET_USER_CREATED_AT_RANGE_SUCCESS,
  GET_USER_CREATED_AT_RANGE_FAILURE
} from "../types/user";

export const agentsIsLoading = ({ isLoading }) => ({
  type: AGENTS_IS_LOADING,
  payload: isLoading
});

export const consumersIsLoading = ({ isLoading }) => ({
  type: CONSUMERS_IS_LOADING,
  payload: isLoading
});

export const getConsumerProfileSuccess = ({ payload }) => ({
  type: GET_CONSUMER_PROFILE_SUCCESS,
  payload
});

export const getConsumerProfileFailure = ({ error }) => ({
  type: GET_CONSUMER_PROFILE_FAILURE,
  payload: error
});

export const getMultipleConsumersSuccess = ({ payload }) => ({
  type: GET_MULTIPLE_CONSUMERS_SUCCESS,
  payload
});

export const getMultipleConsumersFailure = ({ payload }) => ({
  type: GET_MULTIPLE_CONSUMERS_FAILURE,
  payload
});

export const getAgentProfileSuccess = ({ payload }) => ({
  type: GET_AGENT_PROFILE_SUCCESS,
  payload
});

export const getAgentProfileFailure = ({ error }) => ({
  type: GET_AGENT_PROFILE_FAILURE,
  payload: error
});

export const getMultipleAgentsSuccess = ({ payload }) => ({
  type: GET_MULTIPLE_AGENTS_SUCCESS,
  payload
});

export const getMultipleAgentsFailure = ({ payload }) => ({
  type: GET_MULTIPLE_AGENTS_FAILURE,
  payload
});

export const getMultipleAgentsWithAvatarSuccess = ({ payload }) => ({
  type: GET_MULTIPLE_AGENTS_WITH_AVATAR_SUCCESS,
  payload
});

export const getMultipleAgentsWithAvatarFailure = ({ payload }) => ({
  type: GET_MULTIPLE_AGENTS_WITH_AVATAR_FAILURE,
  payload
});

export const getAgentWithAvatarSuccess = ({ payload }) => ({
  type: GET_AGENT_WITH_AVATAR_SUCCESS,
  payload
});

export const getAgentWithAvatarFailure = ({ payload }) => ({
  type: GET_AGENT_WITH_AVATAR_FAILURE,
  payload
});

export const userProfileIsLoading = ({ isLoading }) => ({
  type: USER_PROFILE_IS_LOADING,
  payload: isLoading
});

export const setConsumerAvatarSuccess = () => ({
  type: SET_CONSUMER_AVATAR_SUCCESS
});

export const setConsumerAvatarFailure = () => ({
  type: SET_CONSUMER_AVATAR_FAILURE
});

export const updateAgentAvatarSuccess = () => ({
  type: UPDATE_AGENT_AVATAR_SUCCESS
});

export const updateAgentAvatarFailure = () => ({
  type: UPDATE_AGENT_AVATAR_FAILURE
});

export const getUserCreatedAtRangeSuccess = ({
  userType = "consumers",
  users = []
}) => ({
  type: GET_USER_CREATED_AT_RANGE_SUCCESS,
  payload: { userType, users }
});

export const getUserCreatedAtRangeFailure = ({ error }) => ({
  type: GET_USER_CREATED_AT_RANGE_FAILURE,
  payload: error
});
