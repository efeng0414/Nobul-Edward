import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import AgentFreeTrialFaqWrapped from "./index";
import {
  freeTrialFaq,
  renderFreeTrialFaqItem
} from "../../../../utilities/free-trial";

describe("AgentFreeTrialFaq Component", () => {
  const { WrappedComponent: AgentFreeTrialFaq } = AgentFreeTrialFaqWrapped;
  const componentProps = {
    intl: global.getIntl()
  };

  const componentJSX = <AgentFreeTrialFaq {...componentProps} />;
  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{componentJSX}</IntlProvider>
    );
    const componentSnapshot = renderer.create(snapshotJSX).toJSON();
    it("Should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const componentMount = global.Enzyme.shallow(componentJSX);
    const Obj = freeTrialFaq({ intl: componentProps.intl });
    const expectedObject = Obj.map(renderFreeTrialFaqItem);
    it("should have  correct classname in the rendered jsx", () => {
      expect(
        componentMount
          .find("div")
          .at(3)
          .hasClass(expectedObject[0].props.className)
      ).toEqual(true);
    });
  });
});
