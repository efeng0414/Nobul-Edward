export const formatPriceString = value => {
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parsePriceString = value => {
  return value.replace(/\$\s?|(,*)/g, "");
};

export const formatPercentString = value => {
  return `${value}%`;
};
export const parsePercentString = value => {
  return value.replace("%", "");
};
