import React from "react";
import renderer from "react-test-renderer";
import AgentOfferCongratulations from "./";

describe("Agent Offer Congratulations Component", () => {
  const componentProps = {
    intl: global.getIntl(),
    onNext: () => {}
  };
  const componentJSX = <AgentOfferCongratulations {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  // REMOVE_PROMOTED remove test.
  // describe("button click event", () => {
  //   const componentMount = global.Enzyme.mount(componentJSX);
  //   it("should trigger onNext function when button is clicked", () => {
  //     const mockFn = jest.fn();
  //     componentMount.setProps({ onNext: mockFn });
  //     componentMount
  //       .find("Button")
  //       .props()
  //       .onClick();
  //     expect(mockFn).toHaveBeenCalled();
  //   });
  // });
});
