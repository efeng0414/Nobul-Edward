import React from "react";
import renderer from "react-test-renderer";
import BoxCollapsible from "./index";

describe("BoxCollapsible", () => {
  const componentProps = {
    children: "abc",
    className: "component",
    isOpenByDefault: true
  };
  const componentJSX = <BoxCollapsible {...componentProps} />;
  describe("ComponentSnapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
  describe("Component Render", () => {
    it("should check if default props are set", () => {
      const defaultProps = {
        isOpenByDefault: false
      };
      const props = Enzyme.mount(<BoxCollapsible />).props();
      expect(props).toEqual(defaultProps);
    });
  });
});
