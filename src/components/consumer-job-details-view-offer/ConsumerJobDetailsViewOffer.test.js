import React from "react";
import ConsumerJobDetailsViewOffer from "./index";
import { BrowserRouter } from "react-router-dom";

describe("ConsumerJobDetailsViewOffer snapshot", () => {
  it("should match existing snapshot", () => {
    const componentProps = {
      intl: global.getIntl(),
      jobType: "buy",
      offerId: "abc123"
    };
    const componentJSX = <ConsumerJobDetailsViewOffer {...componentProps} />;
    const contextObj = {
      childContextTypes: {
        router: () => void 0
      },
      context: {
        intl: componentProps.intl,
        router: {
          history: new BrowserRouter().history || "",
          route: {
            location: {}
          }
        }
      }
    };
    const wrapper = Enzyme.shallow(componentJSX, contextObj);
    expect(wrapper).toMatchSnapshot();
  });
});
