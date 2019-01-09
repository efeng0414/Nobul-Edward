import React from "react";
import renderer from "react-test-renderer";
import ListingMapPreviewList from "./index";

describe("Listing Map Preview List", () => {
  const componentProps = {
    isLoading: false,
    listings: [],
    onListingLoad: () => {},
    hasMore: false,
    popupPosition: "popupBottom",
    provinceOrState: "ON",
    propertyCount: 10
  };
  const componentJSX = <ListingMapPreviewList {...componentProps} />;

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Enzyme Render", () => {
    const componentMount = global.Enzyme.mount(componentJSX);

    describe("Should call getClassName when propertyCount is available", () => {
      it("When the property is over 3 and the position is bottom, the className should be contain scroll and top.", () => {
        componentMount.setProps({
          propertyCount: 10,
          popupPosition: "popupBottom"
        });

        componentMount.instance().getClassName();
        expect(
          componentMount
            .find(".preview-list")
            .childAt(0)
            .prop("className")
        ).toBe("preview-list__scroll preview-list__scroll--top");
      });

      it("When the property is over 3 and the position is top, the className should be contain scroll and bottom.", () => {
        componentMount.setProps({
          propertyCount: 10,
          popupPosition: "popupTop"
        });

        componentMount.instance().getClassName();
        expect(
          componentMount
            .find(".preview-list")
            .childAt(0)
            .prop("className")
        ).toBe("preview-list__scroll preview-list__scroll--bottom");
      });

      it("When the property is below 3 and the position is bottom, the className should be contain top and not scroll.", () => {
        componentMount.setProps({
          propertyCount: 2,
          popupPosition: "popupBottom"
        });

        componentMount.instance().getClassName();
        expect(
          componentMount
            .find(".preview-list")
            .childAt(0)
            .prop("className")
        ).toBe("preview-list__content preview-list__content--top");
      });

      it("When the property is below 3 and the position is top, the className should be contain bottom and not scroll.", () => {
        componentMount.setProps({
          propertyCount: 2,
          popupPosition: "popupTop"
        });

        componentMount.instance().getClassName();
        expect(
          componentMount
            .find(".preview-list")
            .childAt(0)
            .prop("className")
        ).toBe("preview-list__content preview-list__content--bottom");
      });
    });
  });
});
