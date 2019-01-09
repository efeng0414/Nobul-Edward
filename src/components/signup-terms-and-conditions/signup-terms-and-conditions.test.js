import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";

import TermsAndConditions from "./";

describe("Terms And Conditions", () => {
  const containerProps = {
    intl: global.getIntl()
  };
  const containerJSX = (
    <IntlProvider {...containerProps}>
      <TermsAndConditions />
    </IntlProvider>
  );
  describe("Container Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{containerJSX}</IntlProvider>
    );
    const containerSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(containerSnapshot).toMatchSnapshot();
    });
  });
});
