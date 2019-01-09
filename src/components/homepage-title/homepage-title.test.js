import React from "react";
import renderer from "react-test-renderer";
import HomepageTitle from "./index";

describe("HomepageTitle", () => {
  const componentProps = {
    title: "homepage"
  };
  const componentJSX = <HomepageTitle {...componentProps} />;
  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
