import { BUY, SELL, BOTH } from "../../../../core/constants/shared";

export const fieldMap = {
  LOOKING_FOR: "lookingFor",
  TIMELINE: "timeline",
  PRE_APPROVED_MORTGAGE: "preApprovedMortgage",
  AREA_OF_INTEREST: "areaOfInterest",
  TERM: "term",
  CONSENT: "consent",
  MORTGAGE_AMOUNT: "mortgageAmount",
  CONTRACT_TO_BROKERAGE: "contractToBrokerage",
  CONSENT_FOR_NEWS: "consent_for_news",
  CONSENT_FOR_EMAIL: "email_notifications"
};

export const getFormPayload = ({ signUpValues, formValues }) => {
  const postData = {
    ...signUpValues,
    ...formValues
  };
  postData.mortgageAmount = !postData.preApprovedMortgage
    ? "0"
    : postData.mortgageAmount.replace(/^0+/, "");

  postData.consentForNews = postData[fieldMap.CONSENT].includes(
    fieldMap.CONSENT_FOR_NEWS
  );

  postData.allowEmailNotifications = postData[fieldMap.CONSENT].includes(
    fieldMap.CONSENT_FOR_EMAIL
  );

  postData[fieldMap.LOOKING_FOR] = postData[fieldMap.LOOKING_FOR].includes(BOTH)
    ? [BUY, SELL]
    : [postData[fieldMap.LOOKING_FOR]];

  return postData;
};
