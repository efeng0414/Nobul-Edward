import React from "react";
import renderer from "react-test-renderer";
import ConsumerOfferAcceptOrReject from "./index";
import { IntlProvider } from "react-intl";
import { ACCEPT_PROPOSAL, DECLINE_PROPOSAL } from "../../utilities/google-tag-variable";
import * as gtmEvent from "../../utilities/gtm-event";

describe("ConsumerOfferAcceptOrReject", () => {
  const componentProps = {
    jobType: "buy",
    offerId: "abc12",
    action: "buy",
    acceptOffer: () => {},
    rejectOffer: () => {},
    offerHandle: () => {},
    intl: global.getIntl()
  };
  const componentJSX = <ConsumerOfferAcceptOrReject {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = <IntlProvider {...global.getIntl()}>{componentJSX}</IntlProvider>;

    it("should match existing snapshot", () => {
      const componentSnapshot = renderer.create(snapshotJSX).toJSON();
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const functionsToReset = ["clickHandle", "acceptOffer", "rejectOffer"];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({ component: ConsumerOfferAcceptOrReject }),
      {}
    );
    const componentMount = Enzyme.mount(
      componentJSX,
      global.getIntlContext({ intl: componentProps.intl })
    );

    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: ConsumerOfferAcceptOrReject,
          componentMount,
          componentPrototypeResets
        })
      );
    });

    describe("Button Click", () => {
      it("should call clickHandle function on button click", () => {
        const mockClickHandle = jest.fn();
        componentMount.instance().clickHandle = mockClickHandle;
        componentMount.setProps({ x: 1 });
        componentMount.find("Button").simulate("click");
        expect(mockClickHandle).toHaveBeenCalled();
      });
    });
    describe("ClickHandle", () => {
      it("should call offerHandle function with action on button click", () => {
        const mockOfferHandle = jest.fn();
        componentMount.setProps({ offerHandle: mockOfferHandle });
        componentMount.find("Button").simulate("click");
        expect(mockOfferHandle).toBeCalledWith(componentProps.action);
      });

      it("should call accept offer if action is accept", () => {
        gtmEvent.gtmEvent = jest.fn();
        const mockAcceptOffer = jest.fn();
        componentMount.instance().acceptOffer = mockAcceptOffer;
        componentMount.setProps({ action: "accept" });
        componentMount.find("Button").simulate("click");
        const { jobType, offerId } = componentProps;

        expect(mockAcceptOffer).toBeCalledWith({ jobType, offerId });
      });

      it("should call gtm Event function if action is accept", () => {
        gtmEvent.gtmEvent = jest.fn();
        componentMount.setProps({ z: 1 });
        componentMount.find("Button").simulate("click");
        const expObject = {
          name: ACCEPT_PROPOSAL
        };

        expect(gtmEvent.gtmEvent).toHaveBeenCalledWith(expect.objectContaining(expObject));
      });

      it("should call rejectOffer if action is reject", () => {
        const mockRejectOffer = jest.fn();
        componentMount.instance().rejectOffer = mockRejectOffer;
        componentMount.setProps({ action: "reject" });
        componentMount.find("Button").simulate("click");
        const { jobType, offerId } = componentProps;

        expect(mockRejectOffer).toBeCalledWith({ jobType, offerId });
      });

      it("should call gtm Event if action is reject", () => {
        gtmEvent.gtmEvent = jest.fn();
        componentMount.setProps({ y: 1 });
        componentMount.find("Button").simulate("click");
        const expectedObject = {
          name: DECLINE_PROPOSAL
        };

        expect(gtmEvent.gtmEvent).toHaveBeenCalledWith(expect.objectContaining(expectedObject));
      });
    });
  });
});
