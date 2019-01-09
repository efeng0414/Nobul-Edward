import { getStripeChargesData } from "../firebase/stripeCustomers";
import { getPriceRangeId } from "../utilities/misc";

export const getStripeChargeForPriceRange = ({
  priceRangeLow,
  priceRangeHigh
}) => {
  return new Promise((resolve, reject) => {
    const priceRangeId = getPriceRangeId({ priceRangeLow, priceRangeHigh });
    getStripeChargesData()
      .then(snapshot => {
        const arrayOfCharges = snapshot.val();
        return resolve(arrayOfCharges[priceRangeId] || 0);
      })
      .catch(() => {
        reject("Error obtaining stripe charges data");
      });
  });
};
