import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";

import ConsumerProposalDetailsAgentCardWrapped from "./index";

describe("ConsumerProposalDetailsAgentCard", () => {
  const {
    WrappedComponent: ConsumerProposalDetailsAgentCard
  } = ConsumerProposalDetailsAgentCardWrapped;

  const componentProps = {
    intl: global.getIntl(),
    agentAvatar: "Avatar",
    agentName: "John Smith",
    agentOffice: "REMAX",
    agentAbout: "This is some text about the agent"
  };

  const componentJSX = <ConsumerProposalDetailsAgentCard {...componentProps} />;

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
    it("should render the card body ", () => {
      expect(wrapper.find(".agent-card__body").length).toEqual(1);
    });

    it("should render the card footer ", () => {
      expect(wrapper.find(".agent-card__footer").length).toEqual(1);
    });
  });
});
