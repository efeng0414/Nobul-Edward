// REMOVE_PREMIUM
// export const getAutoBidKeyFromState = ({
//   jobType,
//   authentication: { isPremium, autoBid = {} },
//   key
// }) => isPremium && autoBid[jobType] && autoBid[jobType][key];


export const getAutoBidKeyFromState = ({
  jobType,
  authentication: { autoBid = {} },
  key
}) => autoBid[jobType] && autoBid[jobType][key];
