import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import AgentFreeTrialAccountInfoWrapped from "./index";

describe("AgentFreeTrialAccountInfo Component", () => {
  const {
    WrappedComponent: AgentFreeTrialAccountInfo
  } = AgentFreeTrialAccountInfoWrapped;

  const componentProps = {
    intl: global.getIntl(),
    firstName: "Agent",
    trialCompleted: true
  };

  const componentJSX = <AgentFreeTrialAccountInfo {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{componentJSX}</IntlProvider>
    );

    const componentSnapshot = renderer.create(snapshotJSX).toJSON();
    it("Should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
