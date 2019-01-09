import { getLocation } from "../url";

describe("Get location from URL", () => {
  const locationObject = {
    search: "?ON"
  };

  it("should return correct region", () => {
    expect(getLocation(locationObject)).toEqual("ON");
  });
});
