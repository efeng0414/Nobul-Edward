import React from "react";
import renderer from "react-test-renderer";
import ConsumerJobDetailsFeatures from "./index";

describe("ConsumerJobDetailsFeatures", () => {
  const componentProps = {
    intl: global.getIntl(),
    price: {},
    propertyType: "buy",
    regions: {},
    bedrooms: 12,
    bathrooms: 0,
    propertyFeatures: {},
    isLoading: true,
    title: "ConsumerJobDetails",
    jobType: "buy",
    address: "12100 metric blvd",
    description: "my house"
  };
  const componentJSX = <ConsumerJobDetailsFeatures {...componentProps} />;
  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
