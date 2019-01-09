import { getFixedRating } from "./getFixedRating";

describe("Test getFixedRating function", () => {
  it("If the input number is null, the output should be a default value which equals to 3", () => {
    const rating = null;
    expect(getFixedRating(rating)).toBe(3);
  });

  it("If the input number is smaller than x.25, the output should be a smaller integer number", () => {
    const rating = 2.2;
    expect(getFixedRating(rating)).toBe(2);
  });

  it("If the input number is larger than x.25, the output should be x.5", () => {
    const rating = 2.3;
    expect(getFixedRating(rating)).toBe(2.5);
  });

  it("If the input number is equal to x.5, the output should be x.5", () => {
    const rating = 2.5;
    expect(getFixedRating(rating)).toBe(2.5);
  });

  it("If the input number is between x.5 and x.74, the output should be x.5", () => {
    const rating = 2.74;
    expect(getFixedRating(rating)).toBe(2.5);
  });

  it("If the input number is larger than x.74, the output should be a larger integer number", () => {
    const rating = 2.9;
    expect(getFixedRating(rating)).toBe(3);
  });

  it("The input number is larger should be equal or smaller to number 5, if the input rating is over 5, the largest output rating is 5", () => {
    const rating = 99;
    expect(getFixedRating(rating)).toBe(5);
  });
});
