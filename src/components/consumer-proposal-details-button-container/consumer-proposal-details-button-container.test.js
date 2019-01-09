import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";

import ConsumerProposalDetailsButtonContainer from "./index";

describe("ConsumerProposalDetailsButtonContainer", () => {
  const componentProps = {
    intl: global.getIntl(),
    handleProposalAcceptClick: () => {},
    handleProposalDeclineClick: () => {}
  };

  const componentJSX = (
    <ConsumerProposalDetailsButtonContainer {...componentProps} />
  );

  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{componentJSX}</IntlProvider>
    );

    const componentSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should matched stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
