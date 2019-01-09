import React from "react";
import { shallow } from "enzyme";
import { userLocation } from "../user-location";

// This comes from the IP detection API
const locationObjectFromAPI = {
  json: () => {
    return {
      city: "Miami",
      country_code: "US", // eslint-disable-line
      region_code: "FL", // eslint-disable-line,
      latitude: 25.5584,
      longitude: -80.4582
    };
  }
};

describe("User location from profile", () => {
  const WrappedComponent = userLocation(<div />);
  // This comes from the store
  const componentProps = {
    isLoading: false,
    userProfile: {
      city: "Toronto",
      country: "CA",
      provinceOrState: "ON"
    },
    userId: "mock_user_id",
    userType: "user",
    fetch: () => Promise.resolve({})
  };

  it("should return user profile location country", () => {
    const HOC = shallow(<WrappedComponent {...componentProps} />);
    const expected = "CA";
    const actual = HOC.state().userLocation.country;

    expect(actual).toBe(expected);
  });
});

describe("User location from IP", () => {
  const WrappedComponent = userLocation(<div />);
  const fakePromise = Promise.resolve(locationObjectFromAPI);

  // This comes from the store
  const componentProps = {
    isLoading: false,
    userProfile: {},
    userId: "mock_user_id",
    userType: "user",
    fetch: jest.fn().mockImplementationOnce(() => {
      return fakePromise;
    })
  };

  it("should show get user location from IP location function ", async () => {
    const HOC = shallow(<WrappedComponent {...componentProps} />);
    await Promise.all([fakePromise]);
    expect(HOC.state().userLocation).toEqual({
      city: "Miami",
      country: "US",
      isRegionSupported: true,
      state: "FL",
      latlng: { lat: 25.5584, lng: -80.4582 }
    });
  });
});
