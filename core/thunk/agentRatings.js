import {
  postAgentRating,
  getAgentRatingsForAgentId
} from "../firebase/agentRatings";
import {
  getAgentRatingSuccess,
  getAgentRatingFailiure,
  agentRatingIsLoading,
  saveAgentRatingSuccess,
  saveAgentRatingFailure
} from "../actions/agentRatings";

export const saveAgentRating = (agentRating, offer) => {
  return dispatch => {
    dispatch(agentRatingIsLoading(true));
    postAgentRating(agentRating, offer)
      .then(() => {
        dispatch(saveAgentRatingSuccess());
      })
      .catch(error => {
        dispatch(saveAgentRatingFailure(error));
      });
  };
};

export const getAgentRating = ({ agentId }) => async dispatch => {
  dispatch(agentRatingIsLoading(true));
  try {
    const ratingsResponse = await getAgentRatingsForAgentId({ agentId });
    const ratingsData = ratingsResponse.val() || { [agentId]: {} };
    dispatch(getAgentRatingSuccess({ ratingsData }));
  } catch (error) {
    dispatch(getAgentRatingFailiure({ error }));
  }
};
