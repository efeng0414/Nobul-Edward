import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";

import MessageFromAgentCardWrapped from "./index";

describe("MessageFromAgentCard", () => {
  const {
    WrappedComponent: MessageFromAgentCard
  } = MessageFromAgentCardWrapped;

  const componentProps = {
    intl: global.getIntl()
  };

  const componentJSX = <MessageFromAgentCard {...componentProps} />;

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
