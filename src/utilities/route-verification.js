import { checkForCached } from "../utilities/cache-handler";
import {
  getUserProfileById,
  getAgentUserNodeFromUserId
} from "../../core/firebase/users";
import {
  AGENT_USER_TYPE,
  CONSUMER_USER_TYPE
} from "../../core/constants/users";
import { AGENTS, CONSUMERS } from "../../core/api-transform";

export const defaultCheckUser = () => new Promise(resolve => resolve(true));

const isUserType = ({ userId, userType, userNodeList }) =>
  new Promise(resolve => {
    const cachedUserType = checkForCached("userType");
    const isUserNodePresent = snapshot => {
      snapshot.val() ? resolve(true) : resolve(false);
    };
    cachedUserType === userType
      ? resolve(true)
      : getUserProfileById({ userId, userType: userNodeList }).then(
          isUserNodePresent
        );
  });

export const isPremiumAgent = ({ userId }) =>
  new Promise(resolve => {
    const checkForPremiumFlag = snapshot => {
      snapshot.exists() && snapshot.val().isPremium
        ? resolve(true)
        : resolve(false);
    };
    getAgentUserNodeFromUserId({ userId })
      .then(checkForPremiumFlag)
      .catch(resolve(false));
  });

export const isAgent = ({ userId }) =>
  isUserType({ userId, userType: AGENT_USER_TYPE, userNodeList: AGENTS });

export const isConsumer = ({ userId }) =>
  isUserType({ userId, userType: CONSUMER_USER_TYPE, userNodeList: CONSUMERS });

export const couldEditJob = props => {
  const { location = {} } = props;
  const { state = {} } = location;
  const { job, jobKey } = state;
  if (job && jobKey) return true;
  else return false;
};

export const couldUpdateOffer = props => {
  const { location = {} } = props;
  const { state = {} } = location;
  const { isWinningOffer } = state;
  if (typeof isWinningOffer === "boolean") return true;
  else return false;
};
