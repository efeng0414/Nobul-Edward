export const getToolTips = ({ jobType, servicesToolTips }) => {
  if (servicesToolTips)
    return jobType === "buy" ? servicesToolTips.buy : servicesToolTips.sell;
  return [];
};
