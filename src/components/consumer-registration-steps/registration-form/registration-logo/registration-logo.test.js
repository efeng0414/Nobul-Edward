import React from "react";
import RegistrationLogo from "./index";

describe("RegistrationLogo Component", () => {
  const componentJSX = <RegistrationLogo />;

  describe("Component Snapshot", () => {
    const componentSnapshot = global.renderer.create(componentJSX).toJSON();

    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
