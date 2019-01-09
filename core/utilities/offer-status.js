import {
  OFFER_ACCEPTED,
  OFFER_ACCEPTED_CONFIRMED,
  OFFER_REJECTED,
  OFFER_JOBDELETED,
  OFFER_JOBEXPIRED,
  OFFER_WITHDRAWN,
  EDIT_PREMIUM,
  // EDIT_SUBSCRIBE, //TODO: Premium
  CREATE,
  ACCEPTED_IN_PROGRESS,
  ACCEPTED_IN_CONTRACT,
  OPEN_IN_REVIEW,
  DECLINED_ACCEPTED_IN_CONTRACT,
  DECLINED_BY_CLIENT,
  DECLINED_JOB_DELETED,
  DECLINED_JOB_EXPIRED,
  WITHDRAWN_BY_AGENT
} from "../constants/offers";

import { JOB_DELETED } from "../constants/jobs";

const getAgentHasOffer = ({ agentOffers, agentId }) => {
  if (!agentOffers) return false;
  return Object.keys(agentOffers).filter(key => key === agentId).length > 0;
};

const getWinningOffer = ({ agentOffers }) => {
  if (!agentOffers) return {};
  return Object.entries(agentOffers)
    .filter(
      ([, value]) =>
        value === OFFER_ACCEPTED || value === OFFER_ACCEPTED_CONFIRMED
    )
    .map(([key, value]) => ({ agentId: key, status: value }));
};

export const getOfferStatus = ({
  agentOffers,
  agentId,
  jobStatus,
  offerStatus
  // isPremium
}) => {
  const agentHasOffer = getAgentHasOffer({ agentOffers, agentId });
  const winningOffer = getWinningOffer({ agentOffers });
  const jobHasWinningOffer = winningOffer.length > 0;

  const winningOfferAccepted =
    jobHasWinningOffer && winningOffer[0].status === OFFER_ACCEPTED;
  const winningOfferConfirmed =
    jobHasWinningOffer && winningOffer[0].status === OFFER_ACCEPTED_CONFIRMED;
  const winningOfferByCurrentAgent =
    jobHasWinningOffer && winningOffer[0].agentId === agentId;
  const jobDeleted =
    jobStatus === OFFER_JOBDELETED || jobStatus === JOB_DELETED;
  const jobExpired = jobStatus === OFFER_JOBEXPIRED;

  const offerRejected = offerStatus === OFFER_REJECTED;
  const offerWithdrawn = offerStatus === OFFER_WITHDRAWN;

  if (jobDeleted) return DECLINED_JOB_DELETED;
  if (jobExpired) return DECLINED_JOB_EXPIRED;
  if (offerRejected) return DECLINED_BY_CLIENT;
  if (offerWithdrawn) return WITHDRAWN_BY_AGENT;

  if (!jobHasWinningOffer && !agentHasOffer) return CREATE;
  if (!jobHasWinningOffer && agentHasOffer) return EDIT_PREMIUM;

  // REMOVE_PREMIUM
  // if (!jobHasWinningOffer && agentHasOffer && isPremium) return EDIT_PREMIUM;
  // if (!jobHasWinningOffer && agentHasOffer && !isPremium) return EDIT_SUBSCRIBE;

  if (winningOfferAccepted && winningOfferByCurrentAgent)
    return ACCEPTED_IN_PROGRESS;
  if (winningOfferAccepted && !winningOfferByCurrentAgent)
    return OPEN_IN_REVIEW;
  if (winningOfferConfirmed && winningOfferByCurrentAgent)
    return ACCEPTED_IN_CONTRACT;
  if (winningOfferConfirmed && !winningOfferByCurrentAgent)
    return DECLINED_ACCEPTED_IN_CONTRACT;
  return CREATE;
};
