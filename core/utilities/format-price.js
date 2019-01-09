export const formatPrice = ({ price }) => {
  if (Math.floor(price.valueOf()) !== price.valueOf()) {
    const numberOfDecimals = price.toString().split(".")[1].length || 0;
    const formattedPrice = numberOfDecimals === 1 && price.toFixed(2);
    return formattedPrice;
  } else {
    return price;
  }
};

export const formatPriceString = value =>
  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const parsePriceString = value => value.replace(/\$\s?|(,*)/g, "");
