import {
  AGENT_RATING_IS_LOADING,
  SAVE_AGENT_RATING_SUCCESS,
  SAVE_AGENT_RATING_FAILURE,
  GET_AGENT_RATING_SUCCESS,
  GET_AGENT_RATING_FAILURE
} from "../types/agentRatings";

export const agentRatingIsLoading = isLoading => {
  return {
    type: AGENT_RATING_IS_LOADING,
    payload: isLoading
  };
};

export const saveAgentRatingSuccess = rating => {
  return {
    type: SAVE_AGENT_RATING_SUCCESS,
    payload: rating
  };
};

export const saveAgentRatingFailure = error => {
  return {
    type: SAVE_AGENT_RATING_FAILURE,
    payload: error
  };
};

export const getAgentRatingSuccess = ({ ratingsData }) => ({
  type: GET_AGENT_RATING_SUCCESS,
  payload: ratingsData
});

export const getAgentRatingFailiure = ({ error }) => ({
  type: GET_AGENT_RATING_FAILURE,
  payload: error
});
