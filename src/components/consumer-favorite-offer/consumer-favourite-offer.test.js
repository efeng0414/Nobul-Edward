import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider, intlShape } from "react-intl";
import ConsumerFavoriteOffer from "./index";

describe("ConsumerFavoriteOffer", () => {
  const componentProps = {
    isFavorite: false,
    intl: global.getIntl(),
    handleFavoriteStatus: () => {},
    showFavoriteIcon: true
  };
  const componentJSX = <ConsumerFavoriteOffer {...componentProps} />;
  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match existing snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("componentRender", () => {
    const componentMount = global.Enzyme.shallow(componentJSX);
    describe("componentDidMount", () => {
      const mockIsFavourite = componentProps.isFavorite;
      expect(componentMount.state().active).toBe(mockIsFavourite);
    });

    describe("componentDidUpdate", () => {
      const componentMount = global.Enzyme.shallow(componentJSX);
      it("should set state of active if previous props not equal to current props", () => {
        componentMount.setProps({ isFavorite: true });
        expect(componentMount.state().active).toBe(
          componentMount.instance().props.isFavorite
        );
      });
    });

    describe("onClick function", () => {
      const mockEvent = {
        stopPropagation() {}
      };
      const clickHandleSpy = jest.spyOn(
        componentMount.instance(),
        "clickHandle"
      );
      it("should call onClick function", () => {
        componentMount.setProps({ bc: 1 });
        componentMount
          .find(".blue-heart")
          .at(0)
          .simulate("click", mockEvent);
        expect(clickHandleSpy).toHaveBeenCalled();
      });

      it("should setstate when click handle is called", () => {
        clickHandleSpy.mockRestore();
        componentMount.setProps({ z: 1 });
        componentMount.setState({ active: true });
        componentMount
          .find(".red-heart")
          .at(0)
          .simulate("click", mockEvent);
        expect(componentMount.state("active")).toBe(false);
      });

      it("should call handleFavouriteStatus when onClick is called", () => {
        componentMount.setState({ active: true });
        const mockHandleFavouriteStatus = jest.fn();
        componentMount.setProps({
          handleFavoriteStatus: mockHandleFavouriteStatus
        });
        componentMount.instance().clickHandle(mockEvent);
        expect(mockHandleFavouriteStatus).toHaveBeenCalled();
      });
    });
  });
});
