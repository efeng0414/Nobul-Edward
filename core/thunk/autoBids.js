import { autoBidsIsLoading } from "../actions/authentication";
import {
  postAutoBidsSuccess,
  postAutoBidsFailure,
  updateAutoBidsStatusForBuyersSuccess,
  updateAutoBidsStatusForSellersSuccess,
  updateAutoBidsFailure,
  getAutoBidsStatusForBuyersSuccess,
  getAutoBidsStatusForSellersSuccess,
  getAutoBidsStatusFailure,
  updateAutoBidsForBuyersSuccess,
  updateAutoBidsForSellersSuccess
} from "../actions/authentication";
import {
  setAutoBidForAgent,
  changeAutoBidStatus,
  updateAutoBid
} from "../firebase/autoBids";
import { getAgentAutoBidStatus } from "../firebase/users";
import { BUY, SELL } from "../constants/shared";

export const setAutoBidAsync = ({
  postData,
  createdOn,
  agentId,
  onSuccess = () => {}
}) => {
  return dispatch => {
    const postDataWithCreatedOn = { ...postData, createdOn };
    dispatch(autoBidsIsLoading(true));
    setAutoBidForAgent({ postData: postDataWithCreatedOn, agentId })
      .then(() => {
        dispatch(postAutoBidsSuccess(postDataWithCreatedOn));
        onSuccess();
      })
      .catch(error => {
        dispatch(postAutoBidsFailure(error));
      });
  };
};

export const updateAutoBidAsync = ({ postData, agentId, jobType }) => {
  return dispatch => {
    dispatch(autoBidsIsLoading(true));
    updateAutoBid({ postData: postData, agentId, jobType })
      .then(() => {
        jobType === BUY &&
          dispatch(updateAutoBidsForBuyersSuccess({ payload: postData }));
        jobType === SELL &&
          dispatch(updateAutoBidsForSellersSuccess({ payload: postData }));
      })
      .catch(error => {
        dispatch(postAutoBidsFailure(error));
      });
  };
};

export const changeAutoBidStatusAsync = ({ agentId, status, jobType }) => {
  return dispatch => {
    dispatch(autoBidsIsLoading(true));
    changeAutoBidStatus({ agentId, status, jobType })
      .then(() => {
        jobType === BUY &&
          dispatch(updateAutoBidsStatusForBuyersSuccess(status));
        jobType === SELL &&
          dispatch(updateAutoBidsStatusForSellersSuccess(status));
      })
      .catch(error => {
        dispatch(updateAutoBidsFailure(error));
      });
  };
};

export const getAgentAutoBidStatusAsync = ({ userId }) => {
  return dispatch => {
    Promise.all([
      getAgentAutoBidStatus({ userId, jobType: BUY }),
      getAgentAutoBidStatus({ userId, jobType: SELL })
    ])
      .then(([autoBidForBuyersStatus, autoBidForSellersStatus]) => {
        dispatch(
          getAutoBidsStatusForBuyersSuccess(autoBidForBuyersStatus.val())
        );
        dispatch(
          getAutoBidsStatusForSellersSuccess(autoBidForSellersStatus.val())
        );
      })
      .catch(error => {
        dispatch(getAutoBidsStatusFailure(error));
      });
  };
};
