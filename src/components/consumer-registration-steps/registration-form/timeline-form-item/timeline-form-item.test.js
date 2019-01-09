import React from "react";
import TimelineFormItem from "./index";
import { optionArray } from "./utilities";

describe("TimelineFormItem", () => {
  const componentProps = {
    getFieldDecorator: fieldName => jsx => [fieldName, jsx],
    intl: global.getIntl(),
    fieldName: "timeline"
  };

  const componentJSX = <TimelineFormItem {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = global.renderer.create(componentJSX).toJSON();

    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const componentMount = global.Enzyme.shallow(componentJSX);

    it("should render the correct number of options", () => {
      const optionCount = componentMount.find("Option").length;

      expect(optionCount).toBe(optionArray.length);
    });
  });
});
