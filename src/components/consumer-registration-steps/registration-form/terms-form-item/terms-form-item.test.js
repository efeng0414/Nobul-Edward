import React from "react";
import TermsFormItem from "./index";
import { IntlProvider } from "react-intl";

describe("TermsFormItem Component", () => {
  const componentProps = {
    getFieldDecorator: fieldName => jsx => [fieldName, jsx],
    intl: global.getIntl(),
    termsFieldName: "terms",
    consentFieldName: "consent",
    consentForNewsValue: "consentForNews",
    termsValidator: () => {}
  };

  const componentJSX = (
    <IntlProvider {...componentProps.intl}>
      <TermsFormItem {...componentProps} />
    </IntlProvider>
  );

  describe("Component Snapshot", () => {
    const componentSnapshot = global.renderer.create(componentJSX).toJSON();

    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
