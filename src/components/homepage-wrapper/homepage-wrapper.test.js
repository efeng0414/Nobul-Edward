import React from "react";
import renderer from "react-test-renderer";
import HomepageWrapper from "./index";

describe("HomepageWrapper", () => {
  const componentProps = {
    children: "children",
    backgroundImage: "backgroundUrl"
  };

  const componentJSX = <HomepageWrapper {...componentProps} />;
  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
