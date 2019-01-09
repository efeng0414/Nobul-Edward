import React from "react";
import renderer from "react-test-renderer";
import BoxIcon from "./index";

describe("BoxIcon", () => {
  const componentProps = {
    iconSrc: "",
    hoverIconSrc: "",
    getStarted: true
  };
  const componentJSX = <BoxIcon {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
