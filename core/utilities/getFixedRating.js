export const getFixedRating = agentRating => {
  const rating =
    isNaN(agentRating) || agentRating === undefined || agentRating === null
      ? 3
      : agentRating;
  const fixedRating = Math.floor(rating * 100);
  let fixedInteger = Math.floor(rating) * 100;
  const fixedDecimal = fixedRating - fixedInteger;
  if (fixedDecimal >= 75) {
    fixedInteger += 100;
  } else if (fixedDecimal < 75 && fixedDecimal >= 25) {
    fixedInteger += 50;
  }

  return fixedInteger / 100 <= 5 ? fixedInteger / 100 : 5;
};
