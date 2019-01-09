import React from "react";
import renderer from "react-test-renderer";
import Box from "./index";

describe("Box Component", () => {
  const componentProps = {
    icon: "abc",
    title: "title",
    description: "description",
    onClick: () => {},
    backgroundClass: "",
    className: "component",
    children: "abc",
    intl: global.getIntl()
  };
  const componentJSX = <Box {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
  describe("button click event", () => {
    it("should call onClick function when the button is clicked", () => {
      const componentMount = global.Enzyme.shallow(componentJSX);
      const mockFn = jest.fn();
      componentMount.setProps({ onClick: mockFn });
      componentMount.find("div.box").simulate("click");
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
