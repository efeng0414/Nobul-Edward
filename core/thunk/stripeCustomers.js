import {
  stripeCustomersIsLoading,
  postStripeTokenSuccess,
  postStripeTokenFailure,
  getStripeCustomerSuccess,
  getStripeCustomerFailure,
  getStripeCardsSuccess,
  getStripeCardsFailure,
  hideNewCard,
  unsubscribeFromStripePlanSuccess,
  unsubscribeFromStripePlanFailure,
  createStripeSingleChargeSuccess,
  createStripeSingleChargeFailure,
  createStripeSubscriptionChargeSuccess,
  createStripeSubscriptionChargeFailure,
  getStripeSubscriptionSuccess,
  getStripeSubscriptionFailure,
  getStripeUserSubscriptionDataSuccess,
  getStripeUserSubscriptionDataFailure,
  getStripeMonthlySubscriptionsDataSuccess,
  getStripeMonthlySubscriptionsDataFailure
} from "../actions/stripeCustomers";

import {
  postStripeTokenToStripeCustomers,
  checkIfUserHasStripe,
  createStripeCustomer,
  fetchStripeCustomer,
  fetchStripeCards,
  getAllStripeSubscriptions,
  deleteStripeCard,
  unsubscribeFromStripePlan,
  createStripeSingleCharge,
  createStripeSubscriptionCharge,
  getStripeUserSubscriptionData,
  getStripeMonthlySubscriptionsData,
  listenForAddedCard,
  updateFreeTrialSubscribeStatus
} from "../firebase/stripeCustomers";

export const saveStripeToken = (userId, token) => {
  const { id = "" } = token;
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return postStripeTokenToStripeCustomers(userId, id)
      .then(() => {
        return dispatch(postStripeTokenSuccess(id));
      })
      .catch(error => {
        return dispatch(postStripeTokenFailure(error));
      });
  };
};

export const addPaymentSourceToUserAsync = ({ userId, tokenId }) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return checkIfUserHasStripe(userId)
      .then(snapshot => {
        if (snapshot.exists()) {
          return postStripeTokenToStripeCustomers(userId, tokenId);
        } else {
          return createStripeCustomer(userId)
            .then(() => postStripeTokenToStripeCustomers(userId, tokenId))
            .catch(error => {
              Promise.reject(error);
            });
        }
      })
      .then(() => {
        return listenForAddedCard({ userId });
      })
      .then(() => {
        dispatch(getCustomerCardsAsync({ userId }));
        dispatch(hideNewCard());
        return dispatch(postStripeTokenSuccess(tokenId));
      })
      .catch(error => {
        dispatch(postStripeTokenFailure(error));
        return Promise.reject();
      });
  };
};

export const getStripeCustomerAsync = userId => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return fetchStripeCustomer(userId)
      .then(snapshot => dispatch(getStripeCustomerSuccess(snapshot.val())))
      .catch(error => dispatch(getStripeCustomerFailure(error)));
  };
};

export const getCustomerCardsAsync = ({ userId }) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return fetchStripeCards(userId)
      .then(snapshot => {
        const cards = Object.entries(snapshot.val())
          .filter(([, card]) => Object.keys(card).length)
          .map(([nodeId, values]) => ({
            nodeId,
            ...values
          }))
          .filter(({ deleted, error }) => !deleted && !error);
        dispatch(getStripeCardsSuccess(cards));
      })
      .catch(error => dispatch(getStripeCardsFailure(error)));
  };
};

export const unsubscribeFromStripePlanAsync = (userId, subscriptionId) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return unsubscribeFromStripePlan(userId, subscriptionId)
      .then(() => {
        return dispatch(unsubscribeFromStripePlanSuccess());
      })
      .catch(error => {
        return dispatch(unsubscribeFromStripePlanFailure({ error }));
      });
  };
};

export const deleteCardAsync = ({ userId, cardNodeId }) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return deleteStripeCard(userId, cardNodeId)
      .then(() => {
        return dispatch(getCustomerCardsAsync({ userId }));
      })
      .catch(error => dispatch(getStripeCardsFailure(error)));
  };
};

export const getStripeUserSubscriptionDataAsync = ({ userId }) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return getStripeUserSubscriptionData(userId.userId)
      .then(snapshot => {
        if (snapshot.exists()) {
          dispatch(
            getStripeUserSubscriptionDataSuccess({
              subscriptionData: snapshot.val()
            })
          );
        }
      })
      .catch(error => {
        dispatch(getStripeUserSubscriptionDataFailure(error));
      });
  };
};

export const getStripeMonthlySubscriptionsDataAsync = () => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    return getStripeMonthlySubscriptionsData()
      .then(snapshot => {
        if (snapshot.exists()) {
          dispatch(
            getStripeMonthlySubscriptionsDataSuccess({
              monthlySubscriptionData: snapshot.val()
            })
          );
        }
      })
      .catch(error => {
        dispatch(getStripeMonthlySubscriptionsDataFailure(error));
      });
  };
};

export const createStripeSingleChargeAsync = ({ userId, charge }) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading({ isLoading: true }));
    return new Promise((resolve, reject) => {
      return createStripeSingleCharge({ userId, charge })
        .then(chargeDetails => {
          dispatch(createStripeSingleChargeSuccess({ chargeDetails }));
          resolve();
        })
        .catch(error => {
          dispatch(createStripeSingleChargeFailure({ error }));
          reject(error);
        });
    });
  };
};

export const createStripeSubscriptionChargeAsync = ({ userId, planId }) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading({ isLoading: true }));
    return new Promise((resolve, reject) => {
      return createStripeSubscriptionCharge(userId, planId)
        .then(() => {
          dispatch(createStripeSubscriptionChargeSuccess());
          return checkIfUserHasStripe(userId)
            .then(snapshot => {
              dispatch(
                getStripeSubscriptionSuccess({
                  subscriptionId: Object.keys(snapshot.val().subscriptions)[0]
                })
              );
              resolve();
            })
            .catch(error => {
              dispatch(getStripeSubscriptionFailure({ error }));
            });
        })
        .catch(error => {
          dispatch(createStripeSubscriptionChargeFailure({ error }));
          reject(error);
        });
    });
  };
};

export const checkIfUserHasStripeAsync = ({ userId }) => {
  return dispatch => {
    return checkIfUserHasStripe(userId)
      .then(snapshot => {
        dispatch(
          getStripeSubscriptionSuccess({
            subscriptionId: Object.keys(snapshot.val().subscriptions)[0]
          })
        );
      })
      .catch(error => {
        dispatch(getStripeSubscriptionFailure({ error }));
      });
  };
};

export const unsubscribeSpecificStripePlanAsync = ({ userId, planId }) => {
  return dispatch => {
    dispatch(stripeCustomersIsLoading(true));
    getAllStripeSubscriptions({ userId })
      .then(snapshot => {
        !snapshot.exists() && Promise.resolve();
        const subscriptions = snapshot.val();
        const unsubscribePromises = Object.values(subscriptions).map(
          subscription => {
            if (subscription.plan_id === planId) {
              return unsubscribeFromStripePlan(userId, planId);
            }
          }
        );

        return Promise.all(unsubscribePromises);
      })
      .then(() => {
        return dispatch(unsubscribeFromStripePlanSuccess());
      })
      .catch(error => {
        return dispatch(unsubscribeFromStripePlanFailure(error));
      });
  };
};

export const updateFreeTrialSubscribeStatusAsync = ({
  userId,
  subscriptionId,
  cancelAfterTrial
}) => {
  return dispatch => {
    updateFreeTrialSubscribeStatus({
      userId,
      subscriptionId,
      cancelAfterTrial
    }).then(() => {
      getStripeUserSubscriptionData(userId)
        .then(snapshot => {
          if (snapshot.exists()) {
            dispatch(
              getStripeUserSubscriptionDataSuccess({
                subscriptionData: snapshot.val()
              })
            );
          }
        })
        .catch(error => {
          dispatch(getStripeUserSubscriptionDataFailure(error));
        });
    });
  };
};
