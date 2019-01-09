import React from "react";
import renderer from "react-test-renderer";
import Home from "./index";

describe("Home Component", () => {
  const componentJSX = <Home />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
