import {
  AGENT_RATING_IS_LOADING,
  SAVE_AGENT_RATING_SUCCESS,
  SAVE_AGENT_RATING_FAILURE,
  GET_AGENT_RATING_SUCCESS,
  GET_AGENT_RATING_FAILURE
} from "../types/agentRatings";
import { getAverageAgentRating } from "../utilities/averageRating";

const defaultState = {
  error: {},
  success: false,
  isLoading: false,
  ratingsData: {},
  averageRating: 0
};

export default (state = defaultState, action) => {
  const getAgentId = ({ payload }) => Object.keys(payload)[0];

  switch (action.type) {
    case AGENT_RATING_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case SAVE_AGENT_RATING_SUCCESS:
      return {
        ...state,
        error: {},
        success: true,
        isLoading: false
      };

    case SAVE_AGENT_RATING_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case GET_AGENT_RATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        averageRating: getAverageAgentRating({
          ratingDataObj: action.payload
        }),
        agentId: getAgentId({ payload: action.payload }),
        ratingsData: action.payload,
        error: {}
      };

    case GET_AGENT_RATING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
