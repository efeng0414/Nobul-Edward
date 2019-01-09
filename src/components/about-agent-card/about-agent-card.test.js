import React from "react";
import renderer from "react-test-renderer";
import { Card } from "antd";
import AboutAgentCard from "./index";

describe("AboutAgentcard", () => {
  const componentProps = {
    agentImage: "fakeImage",
    agentRating: 123,
    agentName: "fakeName",
    brokerage: "fakeBrokerage"
  };
  const componentJSX = <AboutAgentCard {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });

    describe("Card component", () => {
      const componentMount = global.Enzyme.mount(componentJSX);
      it("always renders a 'Card' component", () => {
        expect(componentMount.find(Card).length).toBe(1);
      });
    });
  });
});
