import React from "react";
import renderer from "react-test-renderer";
import ViewAgreementWrapped from "./container";
import { IntlProvider, intlShape } from "react-intl";

const { WrappedComponent: ViewAgreement } = ViewAgreementWrapped;

describe("View Agreement", () => {
  const mockGetAgreementData = jest.fn();
  const containerProps = {
    intl: global.getIntl(),
    getAgreementData: mockGetAgreementData,
    match: {
      params: {
        agreementType: "buy",
        agreementId: "123ab"
      }
    },
    agreement: {}
  };
  const containerJSX = <ViewAgreement {...containerProps} />;

  describe("Container Snapshot", () => {
    const snapshotJSX = <IntlProvider {...global.intl}>{containerJSX}</IntlProvider>;

    const containerSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(containerSnapshot).toMatchSnapshot();
    });
  });

  describe("Container Mount", () => {
    it("should call getAgreementData in componentDidMount", () => {
      mockGetAgreementData.mockReset();
      const containerMount = global.Enzyme.shallow(
        containerJSX,
        global.getIntlContext({ intl: containerProps.intl })
      );
      expect(mockGetAgreementData).toBeCalledWith("buy", "123ab");
    });
  });
});
