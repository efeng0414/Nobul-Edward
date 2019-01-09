export const calculateCommision = (price, commission) => {
  return (price * commission * 0.01).toFixed(2);
};

export default calculateCommision;
