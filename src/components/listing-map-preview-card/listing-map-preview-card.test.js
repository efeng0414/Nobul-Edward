import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import ListingMapPreviewCard from "./index";

describe("Listing Map Preview Card", () => {
  const componentProps = {
    listing: {
      bathrooms: 3,
      bedrooms: 4,
      provinceOrState: "Ontario",
      uid: "12345",
      address: "200 wellington street",
      price: "880000.00",
      featureImageUrl:
        "https://firebasestorage.googleapis.com/v0/b/nobul-production-canada-listings/o/property-images%2F19904702%2F1.jpg?alt=media&token=2d92aab1-2db5-44b3-b76f-262156e1f9b9"
    },
    provinceOrState: "ON",
    isLoading: false
  };
  const componentJSX = (
    <MemoryRouter>
      <ListingMapPreviewCard {...componentProps} />
    </MemoryRouter>
  );

  describe("Component Snapshot", () => {
    const componentSnapshot = renderer.create(componentJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });
});
