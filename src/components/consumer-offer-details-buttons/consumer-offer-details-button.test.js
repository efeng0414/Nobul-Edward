import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider, intlShape } from "react-intl";
import ConsumerOfferDetailsButtons from "./index";
import { Button } from "antd/lib/radio";

describe("ConsumerOfferDetailsButtons Component", () => {
  const componentProps = {
    intl: global.getIntl(),
    buttonClickHandle: () => {}
  };

  const componentJSX = <ConsumerOfferDetailsButtons {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = <IntlProvider {...global.getIntl()}>{componentJSX}</IntlProvider>;

    it("should match stored snapshot", () => {
      const componentSnapshot = renderer.create(snapshotJSX).toJSON();

      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component render", () => {
    const functionsToReset = ["clickHandle"];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({ component: ConsumerOfferDetailsButtons }),
      {}
    );
    const componentMount = global.Enzyme.mount(
      componentJSX,
      global.getIntlContext({ intl: componentProps.intl })
    );

    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: ConsumerOfferDetailsButtons,
          componentMount,
          componentPrototypeResets
        })
      );
    });
    describe("OnClick event", () => {
      const mockClickHandle = jest.fn();
      const mockButtonClickHandle = jest.fn();

      it("should call clickHandle on Button click with action Accept offer", () => {
        componentMount.instance().clickHandle = mockClickHandle;
        componentMount.setProps({ a: 1 });
        componentMount
          .find("Button")
          .at(0)
          .simulate("click");
        expect(mockClickHandle).toBeCalled();
      });

      it("should call clickHandle on Button click with action Reject offer", () => {
        componentMount.instance().clickHandle = mockClickHandle;
        componentMount.setProps({ b: 1 });
        componentMount
          .find("Button")
          .at(1)
          .simulate("click");
        expect(mockClickHandle).toBeCalled();
      });
      it("should call buttonClickHandle function with action={REJECT_OFFER} passed when button is clicked", () => {
        componentMount.setProps({ buttonClickHandle: mockButtonClickHandle });
        const action = componentMount
          .find("Button")
          .at(0)
          .getDOMNode()
          .getAttribute("action");
        componentMount
          .find("Button")
          .at(0)
          .simulate("click");
        expect(mockButtonClickHandle).toBeCalledWith({ action });
      });

      it("should call buttonClickHandle function with action={ACCEPT_OFFER} passed when button is clicked", () => {
        componentMount.setProps({ buttonClickHandle: mockButtonClickHandle });
        const action = componentMount
          .find("Button")
          .at(1)
          .getDOMNode()
          .getAttribute("action");
        componentMount
          .find("Button")
          .at(1)
          .simulate("click");
        expect(mockButtonClickHandle).toBeCalledWith({ action });
      });
    });
  });
});
