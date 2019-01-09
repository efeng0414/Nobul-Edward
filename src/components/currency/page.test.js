/* eslint-disable no-undef */ // We're using "global"
import React from "react";
import PageCurrencyWrapped from "./page";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";

describe("Page Currency component", () => {
  const { WrappedComponent: PageCurrency } = PageCurrencyWrapped;
  const componentProps = {
    location: {
      search: "?FL"
    },
    value: 4000000.32
  };

  const containerJSX = <PageCurrency {...componentProps} />;
  const snapshotJSX = (
    <MemoryRouter initialEntries={[{ search: "?FL" }]}>
      {containerJSX}
    </MemoryRouter>
  );

  const componentMount = global.Enzyme.mount(containerJSX);

  it("should match existing snapshot", () => {
    const containerSnapshot = renderer.create(snapshotJSX).toJSON();
    expect(containerSnapshot).toMatchSnapshot();
  });

  describe("Checking state correctly loaded", () => {
    it("should store correct state", () => {
      expect(componentMount.state().stateCode).toBe("FL");
    });

    it("should update to correct state", () => {
      componentMount.setProps({
        location: {
          search: "?ON"
        }
      });
      expect(componentMount.state().stateCode).toBe("ON");
    });
  });
});
