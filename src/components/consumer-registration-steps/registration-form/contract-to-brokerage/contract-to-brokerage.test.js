import React from "react";
import ContractToBrokerageFormItem from "./index";

describe("ContractToBrokerageFormItem", () => {
  const mockForm = {
    getFieldDecorator: () => jsx => jsx
  };
  const componentProps = {
    intl: global.getIntl(),
    fieldName: "Example field",
    getFieldDecorator: mockForm.getFieldDecorator
  };

  const componentJSX = <ContractToBrokerageFormItem {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = global.renderer.create(componentJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
