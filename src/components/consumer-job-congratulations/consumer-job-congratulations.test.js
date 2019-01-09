import React from "react";
import { BrowserRouter } from "react-router-dom";
import ConsumerJobCongratulations from "./index";
describe("ConsumerJobCongratulations", () => {
  const componentProps = {
    intl: global.getIntl(),
    visible: true,
    onCancel: () => {}
  };
  const componentJSX = <ConsumerJobCongratulations {...componentProps} />;
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
  it("should match existing snapshot", () => {
    const wrapper = Enzyme.shallow(componentJSX, contextObj);
    expect(wrapper).toMatchSnapshot();
  });
});
