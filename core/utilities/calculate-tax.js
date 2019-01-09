export const calculateTax = (price, rate = 1.13) => {
  const amount = (price * rate).toFixed(2);

  return amount;
};
