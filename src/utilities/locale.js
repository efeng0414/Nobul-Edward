import { CURRENCY_SYMBOLS } from "../../core/constants/shared";

export const translate = (intl, id, values = {}) => {
  return intl.formatMessage({ id }, values);
};

export const formatCurrency = (value, currency = "CAD") => {
  const amount = parseFloat(value);

  return `${CURRENCY_SYMBOLS[currency]} ${amount.toLocaleString()}`;
};
