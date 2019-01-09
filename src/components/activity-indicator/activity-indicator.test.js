import React from "react";
import renderer from "react-test-renderer";
import ActivityIndicator from "./index";

describe("ActivityIndicator", () => {
  const componentProps = {
    children: "activity-indicator",
    type: "loading",
    size: "large",
    spinning: false
  };
  const componentJSX = <ActivityIndicator {...componentProps} />;

  describe("component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
