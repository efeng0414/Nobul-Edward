import { REBATE_COMMISSION } from "../../../core/api-transform/users";
import { REBATE_COMMISSION as OFFER_REBATE_COMMISSION } from "../../../core/api-transform/offers";
import { BUY, SELL } from "../../../core/api-transform/jobs";

export const getJobType = ({ jobDetails, jobTypeProp }) => {
  if (jobTypeProp) return jobTypeProp;
  return jobDetails[REBATE_COMMISSION] !== undefined ||
    jobDetails[OFFER_REBATE_COMMISSION] !== undefined
    ? BUY
    : SELL;
};
