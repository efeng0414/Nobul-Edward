import React from "react";
import renderer from "react-test-renderer";
import ConsumerJobLoginRegister from "./index";
import toJSON from "enzyme-to-json";

describe("Consumer Job Login/Register modal Component", () => {
  const componentProps = {
    intl: global.getIntl(),
    visible: true,
    onCancel: () => {},
    onLogin: () => {},
    onRegister: () => {}
  };
  const componentJSX = <ConsumerJobLoginRegister {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = toJSON(global.Enzyme.shallow(componentJSX));
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Register with Email click event", () => {
    it("should call onRegister function when the button is clicked", () => {
      const componentMount = global.Enzyme.shallow(componentJSX);
      const mockFn = jest.fn();
      componentMount.setProps({ onRegister: mockFn });
      componentMount.find(".loginRegister__register-button").simulate("click");
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("Login click event", () => {
    it("should call onLogin function when the button is clicked", () => {
      const componentMount = global.Enzyme.shallow(componentJSX);
      const mockFn = jest.fn();
      componentMount.setProps({ onLogin: mockFn });
      componentMount.find(".loginRegister__login-button").simulate("click");
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
