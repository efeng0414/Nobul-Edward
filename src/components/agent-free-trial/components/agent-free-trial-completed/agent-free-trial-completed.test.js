import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import AgentFreeTrialCompletedWrapped from "./index";

describe("AgentFreeTrialAccountInfo Component", () => {
  const {
    WrappedComponent: AgentFreeTrialCompleted
  } = AgentFreeTrialCompletedWrapped;
  const componentProps = {
    intl: global.getIntl(),
    firstName: "Agent"
  };

  const componentJSX = <AgentFreeTrialCompleted {...componentProps} />;

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
