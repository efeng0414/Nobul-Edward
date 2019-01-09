import React from "react";
import ButtonGroupFormItem from "./index";

describe("ButtonGroupFormItem Component", () => {
  const componentProps = {
    formHasSubmitted: true,
    intl: global.getIntl(),
    signUpUser: () => {},
    toPreviousPage: () => {}
  };

  const componentJSX = <ButtonGroupFormItem {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = global.renderer.create(componentJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const componentMount = global.Enzyme.shallow(componentJSX);

    it("should call signUpUserProp on button next click", () => {
      componentProps.signUpUser = jest.fn();
      componentMount.setProps(componentProps);
      componentMount.find("Button.button-next").simulate("click");

      expect(componentProps.signUpUser).toHaveBeenCalled();
    });
  });
});
