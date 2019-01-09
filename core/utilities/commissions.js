import { STANDARD_COMMISSIONS } from "../data/commissions";

const getStandardCommission = (province, country) => {
  if (province && STANDARD_COMMISSIONS.province[province])
    return STANDARD_COMMISSIONS.province[province];
  return STANDARD_COMMISSIONS[country];
};

export { getStandardCommission };
