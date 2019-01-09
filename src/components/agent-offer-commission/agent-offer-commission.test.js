import React from "react";
import renderer from "react-test-renderer";
import AgentOfferCommission from "./index";
import calculateCommision from "../../../core/utilities/calculate-commission";
import { IntlProvider, intlShape } from "react-intl";

describe("AgentOfferCommission", () => {
  const componentProps = {
    value: 1.2,
    priceLow: 123,
    priceHigh: 456,
    intl: global.getIntl(),
    commissionType: "buy",
    onChange: () => {}
  };

  const componentJSX = <AgentOfferCommission {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{componentJSX}</IntlProvider>
    );

    const componentSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
  describe("Container mount", () => {
    const contextObject = {
      context: { intl: componentProps.intl },
      childContextTypes: { intl: intlShape.isRequired }
    };

    const functionKeysToReset = ["handleCommissionChange", "calculateRange"];
    const componentPrototypeResets = functionKeysToReset.reduce(
      global.createComponentPrototypeResets({
        component: AgentOfferCommission
      }),
      {}
    );

    const componentMount = global.Enzyme.shallow(componentJSX, contextObject);
    beforeEach(() => {
      functionKeysToReset.map(
        global.resetPropertyComponentProperty({
          component: AgentOfferCommission,
          componentMount: componentMount,
          componentPrototypeResets
        })
      );
    });
    const mockCommission = 4.9;

    it("should call calculateRange function on button click", () => {
      const calculateRangeSpy = jest.fn();
      componentMount.instance().calculateRange = calculateRangeSpy;
      componentMount.setProps({ a: 1, b: 2, c: 3 });
      componentMount.find("Button").simulate("click");
      expect(calculateRangeSpy).toHaveBeenCalled();
    });

    it("it should check if calculateCommission function is working correctly", () => {
      const mockPrice = 2.3;
      const mockCommission = 3.2;
      expect(calculateCommision(mockPrice, mockCommission)).toBe("0.07");
    });

    it("should set state when calculateRange function is called", () => {
      componentMount.setState({ commission: mockCommission });
      componentMount.instance().calculateRange();
      const expectedCalculatedLow = calculateCommision(
        componentProps.priceLow,
        mockCommission
      );
      const expectedCalculatedHigh = calculateCommision(
        componentProps.priceHigh,
        mockCommission
      );

      expect(componentMount.state().calculatedLow).toBe(expectedCalculatedLow);
      expect(componentMount.state().calculatedHigh).toBe(
        expectedCalculatedHigh
      );
    });

    it("should call handleCommissionChange function on Input Change", () => {
      const handleCommissionSpy = jest.fn();
      componentMount.instance().handleCommissionChange = handleCommissionSpy;
      componentMount.setProps({ b: 1 });
      componentMount.find("InputNumber").simulate("change");
      expect(handleCommissionSpy).toHaveBeenCalled();
    });

    it("should setState of commission when handleCommissionChange is called", () => {
      const fakeMockCommissionState = 1;
      componentMount.setState({ commission: fakeMockCommissionState });
      componentMount.instance().handleCommissionChange(mockCommission);
      expect(componentMount.state("commission")).toBe(mockCommission);
    });

    it("should call this.props.onChange function when handleCommissionChange is called", () => {
      const mockOnChange = jest.fn();
      componentMount.setProps({ onChange: mockOnChange });
      componentMount.instance().handleCommissionChange(mockCommission);
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
