import {
  CONSENT_EMAIL_NOTIFICATIONS,
  CONTEST_PARTICIPATION,
  CONSENT_FOR_NEWS
} from "../api-transform/users";

export const createMarketingNode = marketingArrayOfChoices => {
  const getValueFromArray = ({ key }) =>
    marketingArrayOfChoices.indexOf(key) > -1;

  const marketing = {
    [CONSENT_FOR_NEWS]: getValueFromArray({ key: CONSENT_FOR_NEWS }),
    [CONTEST_PARTICIPATION]: getValueFromArray({ key: CONTEST_PARTICIPATION }),
    [CONSENT_EMAIL_NOTIFICATIONS]: true
  };

  return marketing;
};
