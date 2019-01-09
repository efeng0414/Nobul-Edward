import React from "react";
import { IntlProvider, intlShape } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { shape } from "prop-types";
import PropTypes from "prop-types";
import ConsumerJobOffersWrapped from "./container";
import { Provider } from "react-redux";

describe("ConsumerJobOffers", () => {
  const {
    WrappedComponent: ConsumerJobOffers
  } = ConsumerJobOffersWrapped.WrappedComponent.WrappedComponent;

  const resolvePromise = () => Promise.resolve();
  const containerProps = {
    intl: global.getCustomIntl({
      myPostings: "My postings string",
      proposals: "Postings string",
      learningCenter: "Learning center string",
      proposalsTitle: "Proposals string"
    }),
    match: { params: { jobId: "abc123", jobType: "buy" } },
    jobDetails: {},
    buyOffers: { offerDetail: { agentId: "agent456" } },
    sellOffers: { agentId: "abc123" },
    getJobDetail: () => {},
    getJobOffers: resolvePromise,
    getMultipleAgentsWithAvatar: () => {}
  };
  const containerJSX = <ConsumerJobOffers {...containerProps} />;
  const mockStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
      breakpoints: {
        currentBreakPoint: ""
      },
      authentication: {
        isLoading: false,
        currentUser: {}
      }
    })
  };
  const router = {
    history: new BrowserRouter().history,
    route: {
      location: {},
      match: {}
    }
  };
  const contextObject = {
    context: { intl: containerProps.intl, router, store: mockStore },
    childContextTypes: {
      intl: intlShape.isRequired,
      router: shape({}),
      store: PropTypes.object
    }
  };

  describe("Container Snapshot", () => {
    const containerMount = global.Enzyme.shallow(containerJSX, contextObject);
    it("should match stored snapshot", () => {
      expect(containerMount).toMatchSnapshot();
    });
  });

  describe("ComponentDidMount", () => {
    const getJobOffersMock = jest.fn(
      () =>
        new Promise(resolve => {
          resolve();
        })
    );

    containerProps.getJobOffers = getJobOffersMock;
    const wrapper = Enzyme.shallow(
      <ConsumerJobOffers {...containerProps} />,
      global.getIntlContext({ intl: containerProps.intl })
    );
    const jobObj = {
      jobType: containerProps.match.params.jobType,
      jobId: containerProps.match.params.jobId
    };

    it("should call props.getJobOffers on Mount", () => {
      expect(getJobOffersMock).toHaveBeenCalledWith(jobObj);
    });

    it("should call getUniqueAgentIds wth buyOffers on mount", async () => {
      const offers = containerProps.buyOffers;
      const getUniqueAgentIdsMock = jest.fn();
      const p = Promise.resolve("validMockData");
      containerProps.getJobOffers = jest.fn(() => p);
      const wrapper = Enzyme.shallow(
        <ConsumerJobOffers {...containerProps} />,
        global.getIntlContext({ intl: containerProps.intl })
      );
      wrapper.instance().getUniqueAgentIds = getUniqueAgentIdsMock;
      await p;

      expect(getUniqueAgentIdsMock).toHaveBeenCalledWith(offers);
    });

    it("should call getUniqueAgentIds wth sellOffers on mount", async () => {
      const getUniqueAgentIdsMock = jest.fn();
      const p = Promise.resolve("validMockData");
      containerProps.getJobOffers = jest.fn(() => p);
      containerProps.sellOffers = { agentId: "abc123" };
      containerProps.match.params.jobType = "sell";
      const offers = containerProps.sellOffers;

      const wrapper = Enzyme.shallow(
        <ConsumerJobOffers {...containerProps} />,
        global.getIntlContext({ intl: containerProps.intl })
      );
      wrapper.instance().getUniqueAgentIds = getUniqueAgentIdsMock;
      await p;

      expect(getUniqueAgentIdsMock).toHaveBeenCalledWith(offers);
    });

    it("should call props.getMultipleAgentsWithAvatar on mount", async () => {
      const getMultipleAgentsWithAvatarMock = jest.fn();
      containerProps.match.params.jobType = "sell";

      containerProps.getMultipleAgentsWithAvatar = getMultipleAgentsWithAvatarMock;
      const p = Promise.resolve("validMockData");
      containerProps.getJobOffers = jest.fn(() => p);

      const wrapper = Enzyme.shallow(
        <ConsumerJobOffers {...containerProps} />,
        global.getIntlContext({ intl: containerProps.intl })
      );
      await p;

      expect(getMultipleAgentsWithAvatarMock).toHaveBeenCalledWith({
        agentIdArray: wrapper
          .instance()
          .getUniqueAgentIds(containerProps.sellOffers)
      });
    });
  });
});
