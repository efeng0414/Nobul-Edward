import { STARS, RATING } from "../api-transform/agentRatings";
export const getRatingsArray = ({ ratingDataObj }) =>
  Object.values(ratingDataObj);

const sumReducer = (accumulator, agentRating) =>
  accumulator + (agentRating[RATING] ? agentRating[RATING][STARS] : 0);

export const getAverageAgentRating = ({ ratingDataObj }) => {
  const ratingsArray = getRatingsArray({
    ratingDataObj: ratingDataObj || {}
  });
  return ratingsArray.reduce(sumReducer, 0) / ratingsArray.length;
};
