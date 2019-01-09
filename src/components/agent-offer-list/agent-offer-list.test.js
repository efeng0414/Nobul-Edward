import React from "react";
import AgentOfferListWrapped from "./index";
import toJson from "enzyme-to-json";
import { OFFER_OPEN, OFFER_ACCEPTED } from "../../../core/constants/offers";

describe("AgentOfferList", () => {
  const { WrappedComponent: AgentOfferList } = AgentOfferListWrapped;

  const mockGetOffersJobDetails = jest.fn();
  const componentProps = {
    intl: global.getIntl(),
    getOffersJobDetails: mockGetOffersJobDetails,
    offerList: [
      {
        status: "open"
      },
      {
        status: "withdrawn"
      },
      {
        status: "accepted"
      },
      {
        status: "withdrawn"
      }
    ],
    jobType: "buy",
    isPremium: true,
    getOfferCount: () => {},
    preventLoad: true
  };

  describe("Component Render", () => {
    const componentJSX = <AgentOfferList {...componentProps} />;

    const functionsToReset = ["handleStatusChange", "renderAgentOfferItem"];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({ component: AgentOfferList }),
      {}
    );

    const componentMount = Enzyme.shallow(
      componentJSX,
      global.getIntlContext({ intl: componentProps.intl })
    );

    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: AgentOfferList,
          componentMount,
          componentPrototypeResets
        })
      );
    });

    it("should match existing snapshot", () => {
      expect(toJson(componentMount)).toMatchSnapshot();
    });

    describe("ComponentDidMount", () => {
      it("should call props.getOfferJobDetails on Mount", () => {
        expect(mockGetOffersJobDetails).toHaveBeenCalledWith({
          jobType: componentProps.jobType,
          offers: componentProps.offerList
        });
      });
    });

    describe("filterByStatus", () => {
      beforeEach(() => {
        componentMount.setState({ status: "", list: ["abc"] });
      });

      it("should set state correctly with status is shoWAll", () => {
        componentMount
          .find("Select")
          .at(1)
          .simulate("change", "showAll");
        const expectedOfferList = componentMount.instance().props.offerList;

        expect(componentMount.state().list).toEqual(expectedOfferList);
        expect(componentMount.state().status).toEqual("showAll");
      });

      it("should set state correctly with status is accepted", () => {
        componentMount
          .find("Select")
          .at(1)
          .simulate("change", OFFER_ACCEPTED);
        const expectedOfferList = {
          list: [{ status: OFFER_ACCEPTED }],
          status: OFFER_ACCEPTED
        };

        expect(componentMount.state()).toMatchObject(expectedOfferList);
      });

      it("should call props.getOfferCount", () => {
        const getOfferCountSpy = jest.fn();
        componentMount.setProps({ getOfferCount: getOfferCountSpy });
        componentMount
          .find(".offer-status-select")
          .at(0)
          .simulate("change", OFFER_OPEN);

        expect(getOfferCountSpy).toHaveBeenCalledWith({
          jobType: componentProps.jobType,
          offerCount: 1
        });
      });
    });

    describe("renderAgentOfferItem", () => {
      it("should call renderAgentOfferItem on render", () => {
        const renderAgentOfferItemMock = jest.fn();
        componentMount.instance().renderAgentOfferItem = renderAgentOfferItemMock;
        componentMount.setProps({ a: 1 });
        componentMount.find(".agent-list");

        expect(renderAgentOfferItemMock).toHaveBeenCalled();
      });

      it("should set JobType in AgentOfferItem correctly", () => {
        componentMount.setState({
          status: OFFER_OPEN,
          list: [{ status: OFFER_OPEN }]
        });

        expect(
          componentMount.find("Connect(InjectIntl(AgentOfferItem))").props()
            .jobType
        ).toBe("buy");
      });
    });
  });
});
