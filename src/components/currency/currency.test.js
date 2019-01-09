/* eslint-disable no-undef */ // We're using "global"
import React from "react";
import Currency from "./";

describe("Currency component base", () => {
  describe("Currency Snapshot 1", () => {
    const componentProps = {
      currency: "US",
      value: 44
    };
    const componentMount = global.Enzyme.shallow(
      <Currency {...componentProps} />
    );

    it("should not show decimals for non-penny prices", () => {
      expect(componentMount).toMatchSnapshot();
    });

    it("should show decimals for prices with pennies", () => {
      componentMount.setProps({
        currency: "US",
        value: 32.51
      });
      expect(componentMount).toMatchSnapshot();
    });

    it("should show 0 when zero number is passed.", () => {
      componentMount.setProps({
        currency: "US",
        value: 0
      });
      expect(componentMount).toMatchSnapshot();
    });

    it("should show only currency when no value is passed.", () => {
      componentMount.setProps({
        currency: "US",
        value: false
      });
      expect(componentMount).toMatchSnapshot();
    });

    it("should show round pennies if fractional", () => {
      componentMount.setProps({
        currency: "US",
        value: 823.517834
      });
      expect(componentMount).toMatchSnapshot();
    });

    it("should show 2 decimals if only 1 supplied", () => {
      componentMount.setProps({
        currency: "US",
        value: 52.5
      });
      expect(componentMount).toMatchSnapshot();
    });

    it("should show commas for prices over $1000", () => {
      componentMount.setProps({
        currency: "US",
        value: 974299543
      });
      expect(componentMount).toMatchSnapshot();
    });

    it("should show different currency if changed", () => {
      componentMount.setProps({
        currency: "CA",
        value: -974299543
      });
      expect(componentMount).toMatchSnapshot();
    });
  });
});
