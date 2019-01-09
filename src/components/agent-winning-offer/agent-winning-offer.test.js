import React from "react";
import renderer from "react-test-renderer";
import AgentWinningOffer from "./container";
import textField from "../form-fields/text-field";

describe("AgentWinningOffer", () => {
  const componentProps = {
    jobType: "buy",
    jobId: "123ab",
    winningOffer: {
      rebateCommission: 1.2,
      listingCommission: 1.3,
      cooperatingCommission: 1.5
    },
    getJobWinningOffer: () => {},
    callThunk: true,
    displayBackground: true,
    intl: global.getIntl()
  };
  const componentJSX = <AgentWinningOffer {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
  describe("Component Render", () => {
    let componentMount;
    beforeEach(() => {
      componentMount = global.Enzyme.shallow(componentJSX);
    });

    it("should call getCommission function on mount", () => {
      const getJobWinningOfferSpy = jest.spyOn(
        AgentWinningOffer.prototype,
        "getCommissions"
      );
      componentMount.setProps({ getJobWinningOffer: getJobWinningOfferSpy });
      expect(getJobWinningOfferSpy).toHaveBeenCalled();
    });
    describe("getCommissions", () => {
      it("should call getCommissions on render", () => {
        const mockGetCommissions = jest.fn();
        componentMount.instance().getCommissions = mockGetCommissions;
        componentMount.setProps({ displayBackground: false });
        expect(mockGetCommissions).toHaveBeenCalled();
      });

      it("should display rebate% if jobType is Buy", () => {
        componentMount.setProps({ x: 1 });
        const wrapper = componentMount.find("div").at(3);
        expect(wrapper.props().children[1]).toEqual("1.2%");
      });
      it("should display listing and cooperating commission if jobType is sell", () => {
        componentMount.setProps({ jobType: "sell" });
        const wrapper = componentMount.find("div").at(3);
        expect(wrapper.props().children[1]).toEqual("1.3%");
        expect(wrapper.props().children[3]).toEqual("1.5%");
      });
    });
  });
});
