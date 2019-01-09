import React from "react";
import ConsumerMortgageCalculatorWrapper from "./index";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";

describe("ConsumerMortgageCalculatorWrapper", () => {
  const componentProps = {
    intl: intlShape.isRequired,
    mortgageDefaultInput: 12,
    intl: global.getCustomIntl({})
  };
  const componentJSX = (
    <ConsumerMortgageCalculatorWrapper {...componentProps} />
  );

  const mockStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
      breakpoints: {
        currentBreakPoint: "mobile"
      },
      authentication: {
        isLoading: false
      }
    })
  };
  const mockContext = {
    context: { intl: componentProps.intl, store: mockStore },
    childContextTypes: {
      intl: intlShape.isRequired,
      store: PropTypes.object
    }
  };
  const functionKeysToReset = ["toggleDisplayMortgageCalculator"];
  const componentPrototypeResets = functionKeysToReset.reduce(
    global.createComponentPrototypeResets({
      component: ConsumerMortgageCalculatorWrapper
    }),
    {}
  );
  const componentMount = global.Enzyme.shallow(componentJSX, mockContext);
  beforeEach(() => {
    functionKeysToReset.map(
      global.resetPropertyComponentProperty({
        component: ConsumerMortgageCalculatorWrapper,
        componentMount: componentMount,
        componentPrototypeResets
      })
    );
  });

  describe("Component Snapshot", () => {
    it("should match stored snapshot", () => {
      expect(componentMount).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const initialState = true;
    beforeEach(() => {
      componentMount.setState({ displayMortgageCalculator: initialState });
    });
    it("should call toggleDisplayMortgageCalculator", () => {
      const toggleDisplayMortgageCalculatorMock = jest.fn();
      componentMount.instance().toggleDisplayMortgageCalculator = toggleDisplayMortgageCalculatorMock;
      componentMount.setProps({ a: 1 });
      componentMount
        .find("Button")
        .at(0)
        .simulate("click");

      expect(toggleDisplayMortgageCalculatorMock).toHaveBeenCalled();
    });

    it("should hide Mortgagte calculator if displayed already", () => {
      componentMount.setProps({ b: 1 });
      componentMount
        .find("Button")
        .at(0)
        .simulate("click");

      expect(componentMount.state().displayMortgageCalculator).toBe(
        !initialState
      );
    });

    it("should display the modal by setting the visible prop correctly ", () => {
      componentMount.setProps({ c: 1 });
      expect(componentMount.find("Modal").props().visible).toBe(initialState);
    });

    it("should set the defaultValue in ConsumerMortgageCalculator correctly", () => {
      expect(
        componentMount
          .find("InjectIntl(Form(ConsumerMortgageCalculator))")
          .at(0)
          .props().visible
      ).toBe(componentProps.visible);
    });
  });
});
