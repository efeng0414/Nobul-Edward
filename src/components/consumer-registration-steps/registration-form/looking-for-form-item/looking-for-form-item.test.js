import React from "react";
import LookingForFormItem from "./index";

describe("LookingForFormItem Component", () => {
  const componentProps = {
    getFieldDecorator: fieldName => jsx => [fieldName, jsx],
    intl: global.getIntl(),
    fieldName: "lookingFor"
  };

  const componentJSX = <LookingForFormItem {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = global.renderer.create(componentJSX).toJSON();

    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
