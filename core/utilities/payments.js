import {
  createStripeCustomer,
  postStripeTokenToStripeCustomers
} from "../firebase/stripeCustomers";

export const createStripeCustomerAndToken = ({ userId, stripe }) => {
  return createStripeCustomer(userId)
    .then(() => {
      return stripe.createToken().then(tokenObject => {
        const { id = "" } = tokenObject.token;
        return postStripeTokenToStripeCustomers(userId, id);
      });
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

export const checkForStripe = sourcesSnap => {
  const sources = sourcesSnap.val();
  let hasStripe = false;
  if (sources) {
    sourcesSnap.forEach(source => {
      if (source.val() && source.val().id) hasStripe = true;
    });
  }
  return hasStripe;
};
