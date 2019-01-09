import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";

import ConsumerViewCommissionCardWrapped from "./index";

describe("ConsumerViewCommissionCard", () => {
  const {
    WrappedComponent: ConsumerViewCommissionCard
  } = ConsumerViewCommissionCardWrapped;

  const componentProps = {
    intl: global.getIntl()
  };

  const componentJSX = <ConsumerViewCommissionCard {...componentProps} />;

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
