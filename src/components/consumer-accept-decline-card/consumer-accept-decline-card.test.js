import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";

import ConsumerAcceptDeclineCardWrapped from "./index";
import ConsumerProposalDetailsButtonContainer from "../consumer-proposal-details-button-container";

describe("ConsumerAcceptDeclineCard", () => {
  const {
    WrappedComponent: ConsumerAcceptDeclineCard
  } = ConsumerAcceptDeclineCardWrapped;

  const componentProps = {
    intl: global.getIntl()
  };

  const componentJSX = <ConsumerAcceptDeclineCard {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{componentJSX}</IntlProvider>
    );

    const componentSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should matched stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Render method", () => {
    const wrapper = global.Enzyme.mount(componentJSX);
    it("should render the card header ", () => {
      expect(wrapper.find(".consumer-card__header").length).toEqual(1);
    });

    it("should render the card body ", () => {
      expect(wrapper.find(".consumer-card__body").length).toEqual(1);
    });

    it("should render the child component containing buttons", () => {
      expect(
        wrapper.find(ConsumerProposalDetailsButtonContainer).length
      ).toEqual(1);
    });
  });
});
