import React from "react";
import renderer from "react-test-renderer";
import PropertyBedrooms from "./index";
import { IntlProvider } from "react-intl";

describe("PropertyBedrooms", () => {
  const componentProps = {
    onBedroomsChange: () => {},
    selectedBedrooms: 0,
    intl: global.getIntl(),
    jobType: "test"
  };

  const componentJSX = (
    <IntlProvider {...componentProps}>
      <PropertyBedrooms />
    </IntlProvider>
  );

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
