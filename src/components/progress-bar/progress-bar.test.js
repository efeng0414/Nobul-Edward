import React from "react";
import renderer from "react-test-renderer";
import ProgressBar from "./index";

describe("ProgressBar", () => {
  const componentProps = {
    currentStep: 2,
    numberOfSteps: 5
  };
  const componentJSX = <ProgressBar {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
