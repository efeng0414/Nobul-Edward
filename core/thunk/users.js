import {
  getAgentUserNodeFromUserId,
  getAvatarImageUrl,
  getMultipleAvatarImageUrl,
  getUserProfileById,
  getMultipleAgents,
  getMultipleConsumers,
  getAgentCreatedAt,
  setStandardProposal,
  setConsumerAvatar,
  postAvatarImage,
  fetchUsersCreatedAtRange
} from "../firebase/users";
import {
  getMultipleAgentsRatingsForAgentId,
  getAgentRatingsForAgentId
} from "../firebase/agentRatings";
import { getAverageAgentRating } from "../utilities/averageRating";

import { CONSUMERS, AGENTS } from "../api-transform";
import { BUSINESS_PROFILE_CREATED } from "../api-transform/users";

import { getYear } from "../utilities/date";

import {
  getConsumerProfileSuccess,
  getConsumerProfileFailure,
  getAgentProfileSuccess,
  getAgentProfileFailure,
  getMultipleAgentsSuccess,
  getMultipleAgentsFailure,
  getMultipleAgentsWithAvatarSuccess,
  getMultipleAgentsWithAvatarFailure,
  agentsIsLoading,
  getAgentWithAvatarSuccess,
  getAgentWithAvatarFailure,
  userProfileIsLoading,
  getMultipleConsumersSuccess,
  getMultipleConsumersFailure,
  setConsumerAvatarSuccess,
  setConsumerAvatarFailure,
  updateAgentAvatarSuccess,
  updateAgentAvatarFailure,
  getUserCreatedAtRangeSuccess,
  getUserCreatedAtRangeFailure
} from "../actions/users";

import {
  setUserAvatarTypeSuccess,
  setUserAvatarTypeError,
  setStandardProposalSuccess,
  setStandardProposalFailure
} from "../actions/authentication";

export const getAgentProfileAsync = ({ agentId }) => dispatch => {
  dispatch(userProfileIsLoading({ isLoading: true }));
  return getUserProfileById({ userId: agentId, userType: AGENTS })
    .then(snapshot =>
      dispatch(getAgentProfileSuccess({ payload: snapshot.val() }))
    )
    .catch(error => dispatch(getAgentProfileFailure({ error })));
};

export const getConsumerProfileAsync = ({ consumerId }) => dispatch => {
  dispatch(userProfileIsLoading({ isLoading: true }));
  return getUserProfileById({ userId: consumerId, userType: CONSUMERS })
    .then(snapshot =>
      dispatch(getConsumerProfileSuccess({ payload: snapshot.val() }))
    )
    .catch(error => dispatch(getConsumerProfileFailure({ error })));
};

export const getMultipleConsumersAsync = ({ consumerIdArray }) => dispatch => {
  dispatch(userProfileIsLoading({ isLoading: true }));
  getMultipleConsumers({ consumerIdArray })
    .then(snapshotArray => {
      const consumersData = {};
      snapshotArray.forEach((consumer, index) => {
        consumersData[consumerIdArray[index]] = {
          ...consumer.val()
        };
      });
      return dispatch(getMultipleConsumersSuccess({ payload: consumersData }));
    })
    .catch(error => dispatch(getMultipleConsumersFailure({ payload: error })));
};

export const getMultipleAgentsAsync = ({ agentIdArray }) => dispatch => {
  dispatch(agentsIsLoading({ isLoading: true }));
  getMultipleAgents({ agentIdArray })
    .then(snapshotArray => {
      const agentsData = snapshotArray.map(snapshot => snapshot.val());
      return dispatch(getMultipleAgentsSuccess({ payload: agentsData }));
    })
    .catch(error => dispatch(getMultipleAgentsFailure({ payload: error })));
};

export const getMultipleAgentsWithAvatar = ({ agentIdArray }) => dispatch => {
  dispatch(agentsIsLoading({ isLoading: true }));
  const getAgentsInformation = getMultipleAgents({ agentIdArray });
  const getAgentsRating = getMultipleAgentsRatingsForAgentId({
    agentIdArray
  });
  const getAgentsAvatar = getMultipleAvatarImageUrl({ users: agentIdArray });

  return Promise.all([getAgentsInformation, getAgentsRating, getAgentsAvatar])
    .then(result => {
      // TODO:
      // for now I'm assuming the result for the promises comes in
      // the same order. This is technically how is supposed to work.
      // But it will be safe if the promises return the data by AgentId.
      // we might need to create new function since the existing ones
      // are being used in other parts of the code
      const agentsData = {};
      result[0].forEach((agent, index) => {
        agentsData[agentIdArray[index]] = {
          ...agent.val(),
          avatarUrl: result[2][index],
          agentRating:
            result[1][index].val() &&
            getAverageAgentRating({
              ratingDataObj: result[1][index].val()
            })
        };
      });
      return dispatch(
        getMultipleAgentsWithAvatarSuccess({ payload: agentsData })
      );
    })
    .catch(error =>
      dispatch(getMultipleAgentsWithAvatarFailure({ payload: error }))
    );
};

export const getAgentWithAvatar = ({ agentId }) => dispatch => {
  const getAgentRating = getAgentRatingsForAgentId({ agentId });
  const getAgentAvatar = getAvatarImageUrl({ userId: agentId });
  const getAgentInformation = getUserProfileById({
    userId: agentId,
    userType: AGENTS
  });
  const getAgentStartYear = getAgentCreatedAt({ userId: agentId });

  return Promise.all([
    getAgentRating,
    getAgentAvatar,
    getAgentInformation,
    getAgentStartYear
  ])
    .then(
      ([
        agentRatingSnapshot,
        agentAvatar,
        agentInformationSnapshot,
        agentStartYearSnapshot
      ]) => {
        const averageRating = getAverageAgentRating({
          ratingDataObj: agentRatingSnapshot.val()
        });
        const avatarUrl = agentAvatar;
        const agentInformation = agentInformationSnapshot.val();
        const agentStartYear = getYear(agentStartYearSnapshot.val());
        const agentData = {
          averageRating,
          avatarUrl,
          agentInformation,
          agentStartYear
        };

        return dispatch(getAgentWithAvatarSuccess({ payload: agentData }));
      }
    )
    .catch(error => dispatch(getAgentWithAvatarFailure({ payload: error })));
};

export const setStandardProposalAsync = (uid, standardProposal) => dispatch => {
  return setStandardProposal(uid, standardProposal)
    .then(() => {
      return getAgentUserNodeFromUserId({ userId: uid });
    })
    .then(agentData => {
      agentData.exists() &&
        agentData.val()[BUSINESS_PROFILE_CREATED] &&
        dispatch(setStandardProposalSuccess({ agentObject: agentData.val() }));
    })
    .catch(error => dispatch(setStandardProposalFailure({ error })));
};

export const setConsumerAvatarAsync = ({ uid, avatarType }) => dispatch => {
  return setConsumerAvatar({ uid, avatarType })
    .then(() => {
      dispatch(setUserAvatarTypeSuccess({ payload: avatarType }));
    })
    .catch(error => {
      dispatch(setUserAvatarTypeError({ payload: error }));
    });
};

export const updateAgentAvatarAsync = ({ uid, file }) => dispatch => {
  return postAvatarImage(uid, file)
    .then(() => {
      dispatch(updateAgentAvatarSuccess());
    })
    .catch(error => {
      dispatch(updateAgentAvatarFailure(error));
    });
};

//Only used for admin panel
export const getUserCreatedAtRange = ({
  userType = "consumers",
  startAt = 0,
  endAt = 0
}) => dispatch => {
  dispatch(userProfileIsLoading({ isLoading: true }));
  return fetchUsersCreatedAtRange({ userType, startAt, endAt })
    .then(users => dispatch(getUserCreatedAtRangeSuccess({ userType, users })))
    .catch(error => dispatch(getUserCreatedAtRangeFailure({ error })));
};
