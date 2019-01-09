import React from "react";
import renderer from "react-test-renderer";
import AuthenticationLoader from "./index";

describe("AuthenticationLoader", () => {
  const componentJSX = <AuthenticationLoader type="loading" />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
