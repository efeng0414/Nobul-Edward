import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import PermissionDenied from "./container";

describe("Permission Denied", () => {
  const containerProps = {
    intl: global.getIntl()
  };

  const containerJSX = (
    <IntlProvider {...containerProps}>
      <PermissionDenied />
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
