import firebase from "firebase/app";
import "firebase/database";

import {
  SOURCES,
  PROMOTED_OFFER_CHARGES,
  SUBSCRIPTIONS,
  MONTHLY,
  YEARLY,
  CREATED_AT,
  TOKEN,
  CUSTOMER_ID
} from "../api-transform/stripeCustomers";
import { STRIPE_CUSTOMERS, STRIPE } from "../api-transform";
import { CHARGES } from "../api-transform/stripe";
import { STRIPE_TIMEOUT } from "../constants/shared";

const getStripeData = () => {
  return firebase
    .database()
    .ref(`${STRIPE}}`)
    .once("value");
};

const getStripeChargesData = () => {
  return firebase
    .database()
    .ref(`${STRIPE}/${PROMOTED_OFFER_CHARGES}`)
    .once("value");
};

const getStripeMonthlySubscriptionsData = () => {
  return firebase
    .database()
    .ref(`${STRIPE}/${SUBSCRIPTIONS}/${MONTHLY}`)
    .once("value");
};

const getStripeYearlySubscriptionsData = () => {
  return firebase
    .database()
    .ref(`${STRIPE}/${SUBSCRIPTIONS}/${YEARLY}`)
    .once("value");
};

const getStripeUserSubscriptionData = userId => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SUBSCRIPTIONS}`)
    .once("value");
};

const createStripeCustomer = userId => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${STRIPE_CUSTOMERS}/${userId}`)
      .set({
        [CREATED_AT]: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        //If there is no backend listening, timeout after 10 seconds
        const timeoutVariable = setTimeout(() => {
          reject("Creating stripe customer has timed out");
        }, STRIPE_TIMEOUT);

        listenForCustomerId(userId, timeoutVariable)
          .then(customerId => {
            resolve(customerId);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const listenForCustomerId = (userId, timeoutVariable) => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(`${STRIPE_CUSTOMERS}/${userId}/${CUSTOMER_ID}`)
      .on("value", snap => {
        //As soon as the customerId is created by the backend, clear the timeout and resolve the customerId
        let customerId = snap.val();
        if (customerId) {
          clearTimeout(timeoutVariable);
          resolve(customerId);
        }
      });
  });
};

//Checks if a user has an element in database
const checkIfUserHasStripe = userId => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}`)
    .once("value");
};

const checkIfUserHasARegisteredCard = pathArray => {
  const _STRIPE_CUSTOMERS = pathArray[0];
  const _USER_ID = pathArray[1];
  const _SOURCES = pathArray[2];
  const _PUSH_ID = pathArray[3];
  const timeoutVariable = setTimeout(() => {
    Promise.reject("Cannot find a credit card for this user");
  }, STRIPE_TIMEOUT);

  return listenForAddedCreditCard(
    _STRIPE_CUSTOMERS,
    _USER_ID,
    _SOURCES,
    _PUSH_ID,
    timeoutVariable
  );
};

const listenForAddedCreditCard = (
  _STRIPE_CUSTOMERS,
  _USER_ID,
  _SOURCES,
  _PUSH_ID,
  timeoutVariable
) => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref(`${_STRIPE_CUSTOMERS}/${_USER_ID}/${_SOURCES}/${_PUSH_ID}`)
      .on("value", sourceResult => {
        const creditCardResult = sourceResult.val();
        if (creditCardResult && creditCardResult.id) {
          resolve(creditCardResult.id);
          clearTimeout(timeoutVariable);
        }
      });
  });
};

//Checkes whether a user is registered with Stripe via Nobul
const fetchStripeCustomer = userId => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}`)
    .once("value");
};

//Checkes whether a user is registered with Stripe via Nobul
const fetchStripeCards = userId => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SOURCES}`)
    .once("value");
};

//Checks if user has a Stripe subscription(not necessarily Nobul Premium)
const checkIfUserHasStripeSubscription = userId => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SUBSCRIPTIONS}`)
    .once("value");
};

//Posts a token to the database and the backend handles storing the card & purchase information
const postStripeTokenToStripeCustomers = (userId, tokenId) => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SOURCES}`)
    .push({
      [TOKEN]: tokenId
    });
};

//Listens for whether the backend added the credit card to the user's account
const listenForAddedCard = ({ userId }) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject("Adding card has timed out");
    }, STRIPE_TIMEOUT);
    const sourcesRef = firebase
      .database()
      .ref(`${STRIPE_CUSTOMERS}/${userId}/${SOURCES}`);

    const childChangedListener = sourcesRef.on("child_changed", snapshot => {
      const snapshotValue = snapshot.val();
      clearTimeout(timeout);
      sourcesRef.off("child_changed", childChangedListener);
      snapshotValue.error ? reject(snapshotValue) : resolve(snapshotValue);
    });
  });

//Creates a one time charge and then listens to whether the backend handled it correctly
const createStripeSingleCharge = ({ userId, charge }) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${STRIPE_CUSTOMERS}/${userId}/${CHARGES}`)
      .push(charge)
      .then(snap => {
        const key = snap.getKey();
        const timeoutVariable = setTimeout(() => {
          reject("Creating stripe customer one-time charge has timed out");
        }, STRIPE_TIMEOUT);

        listenToAddedCharge(userId, key, timeoutVariable)
          .then(chargeStatus => {
            resolve(chargeStatus);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};

//Listens for whether the backend succesfully created the one-time purchase
const listenToAddedCharge = (userId, key, timeoutVariable) => {
  return new Promise(resolve => {
    const chargesRef = firebase
      .database()
      .ref(`${STRIPE_CUSTOMERS}/${userId}/${CHARGES}/${key}`);

    const valueListener = chargesRef.on("value", snap => {
      const charge = snap.val();
      const { paid = false } = charge;

      if (charge && paid === true) {
        clearTimeout(timeoutVariable);
        chargesRef.off("value", valueListener);
        resolve(snap.val());
      }
    });
  });
};

//Creates a subscription charge and then listens to whether the backend handled it correctly
const createStripeSubscriptionCharge = (userId, planId) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`${STRIPE_CUSTOMERS}/${userId}/${SUBSCRIPTIONS}`)
      .push({ plan_id: planId })
      .then(() => {
        var timeoutVariable = setTimeout(() => {
          reject("Creating stripe customer subscription charge has timed out");
        }, STRIPE_TIMEOUT);
        return listenToAddedSubscription(userId, planId, timeoutVariable);
      })
      .then(subscriptionStatus => {
        resolve(subscriptionStatus);
      })
      .catch(error => {
        reject(error);
      });
  });
};

//Listens for whether the backend succesfully created the subscription purchase
const listenToAddedSubscription = (userId, planId, timeoutVariable) => {
  return new Promise((resolve, reject) => {
    const subscriptionRef = firebase
      .database()
      .ref(`${STRIPE_CUSTOMERS}/${userId}/${SUBSCRIPTIONS}`);

    const childChangedListener = subscriptionRef.on("child_changed", snap => {
      const subscription = snap.val();
      if (
        subscription &&
        subscription.plan &&
        subscription.plan.id &&
        subscription.plan.id === planId
      ) {
        clearTimeout(timeoutVariable);
        subscriptionRef.off("child_changed", childChangedListener);
        resolve(subscription);
      } else {
        clearTimeout(timeoutVariable);
        subscriptionRef.off("child_changed", childChangedListener);
        reject("Unable to make payment");
      }
    });
  });
};

const getAllStripeSubscriptions = ({ userId }) => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SUBSCRIPTIONS}`)
    .once("value");
};

const updateFreeTrialSubscribeStatus = ({
  userId,
  subscriptionId,
  cancelAfterTrial
}) => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SUBSCRIPTIONS}/${subscriptionId}`)
    .update({ cancel_at_period_end: cancelAfterTrial });
};

//Unsubscribes the user from a given stripe plan
//TODO: Do we want to actually delete the data or set a flag here like "inactive"?
const unsubscribeFromStripePlan = (userId, subscriptionId) => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SUBSCRIPTIONS}/${subscriptionId}`)
    .remove();
};

//Deletes a credit card given a cardNodeId
const deleteStripeCard = (userId, cardNodeId) => {
  return firebase
    .database()
    .ref(`${STRIPE_CUSTOMERS}/${userId}/${SOURCES}/${cardNodeId}`)
    .update({ deleted: true });
};

export {
  getStripeData,
  getStripeChargesData,
  getStripeUserSubscriptionData,
  getStripeMonthlySubscriptionsData,
  getStripeYearlySubscriptionsData,
  getAllStripeSubscriptions,
  createStripeCustomer,
  listenForCustomerId,
  checkIfUserHasStripe,
  fetchStripeCustomer,
  checkIfUserHasStripeSubscription,
  postStripeTokenToStripeCustomers,
  listenForAddedCard,
  createStripeSingleCharge,
  createStripeSubscriptionCharge,
  checkIfUserHasARegisteredCard,
  listenToAddedCharge,
  listenToAddedSubscription,
  unsubscribeFromStripePlan,
  fetchStripeCards,
  deleteStripeCard,
  updateFreeTrialSubscribeStatus
};
