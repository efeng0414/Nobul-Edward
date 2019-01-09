import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { AGENT_RATINGS } from "../api-transform";

import {
  CREATED_AT,
  UPDATED_AT,
  CREATED_ON,
  JOB_TYPE,
  OFFER_ID,
  RATING,
  DID_AGENT_DELIVER,
  REASON_FOR_FAILURE,
  FEEDBACK,
  STARS
} from "../api-transform/agentRatings";

export const getAgentRatingsForAgentId = ({ agentId }) =>
  firebase
    .database()
    .ref(`${AGENT_RATINGS}/${agentId}`)
    .orderByChild(CREATED_AT)
    .once("value");

export const getMultipleAgentsRatingsForAgentId = ({ agentIdArray }) =>
  Promise.all(
    agentIdArray.map(agentId => getAgentRatingsForAgentId({ agentId }))
  );

export const postAgentRating = (agentRating, offer) => {
  return firebase
    .database()
    .ref(`${AGENT_RATINGS}/${offer.agentId}`)
    .push({
      [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
      [CREATED_ON]: offer.createdOn,
      [JOB_TYPE]: offer.jobType,
      [OFFER_ID]: offer.offerId,
      [RATING]: {
        [DID_AGENT_DELIVER]: agentRating.didAgentDeliver,
        [REASON_FOR_FAILURE]: agentRating.reasonForFailure,
        [FEEDBACK]: agentRating.feedback,
        [STARS]: agentRating.rating
      }
    });
};
