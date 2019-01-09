import firebase from "firebase/app";
import "firebase/database";
import { USERS, AUTOBID, AGENTS } from "../api-transform";
import { UPDATED_AT, CREATED_AT, AGENT_ID } from "../api-transform/users";
import { BUY } from "../constants/shared";

export const setAutoBidForAgent = ({
  postData,
  agentId,
  isNewAutoBid = false
}) => {
  const autoBidData = {
    ...postData,
    [UPDATED_AT]: firebase.database.ServerValue.TIMESTAMP,
    [AGENT_ID]: agentId
  };
  if (isNewAutoBid)
    autoBidData[CREATED_AT] = firebase.database.ServerValue.TIMESTAMP;
  return firebase
    .database()
    .ref(`${USERS}/${AGENTS}/${agentId}/${AUTOBID}`)
    .update(autoBidData);
};

export const getAutoBidForAgent = ({ agentId }) => {
  return firebase
    .database()
    .ref(`${USERS}/${AGENTS}/${agentId}/${AUTOBID}`)
    .once("value");
};

export const updateAutoBid = ({ postData, agentId, jobType = BUY }) =>
  firebase
    .database()
    .ref(`${USERS}/${AGENTS}/${agentId}/${AUTOBID}/${jobType}`)
    .update(postData);

export const changeAutoBidStatus = ({ agentId, status, jobType }) => {
  return getAutoBidForAgent({ agentId, jobType })
    .then(() => {
      return firebase
        .database()
        .ref(`${USERS}/${AGENTS}/${agentId}/${AUTOBID}/${jobType}`)
        .update({ status });
    })
    .catch(error => {
      console.error("Error getting agent Autobid preferences: ", error);
    });
};
