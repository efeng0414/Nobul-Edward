import React from "react";
import { IntlProvider, intlShape } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { shape } from "prop-types";
import PropTypes from "prop-types";
import AgentJobDetailsWrapped from "./container";

describe("AgentJobDetails", () => {
  const {
    WrappedComponent: AgentJobDetails
  } = AgentJobDetailsWrapped.WrappedComponent.WrappedComponent;

  const resolvePromise = () => Promise.resolve();

  const containerProps = {
    intl: global.getCustomIntl({ agentJobDetail: "test" }),
    match: { params: { jobType: "agent", jobId: "123abc" } },
    getJobDetail: resolvePromise,
    getConsumerProfileAsync: () => {},
    getAgentAverageRating: () => {},
    getJobOffers: () => {},
    jobDetail: { jobType: "agent", consumerId: "consumer123" },
    isLoading: true,
    authUserId: "abc123",
    consumerCity: "BartonPool"
  };

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
      },
      users: {
        isLoading: "",
        consumerProfile: {
          city: ""
        }
      },
      jobs: {
        jobDetail: ""
      },
      offers: {
        newOffer: ""
      },
      stripeCustomers: {
        cards: ""
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

  const containerJSX = <AgentJobDetails {...containerProps} />;

  describe("Container Snapshot", () => {
    const snapshotJSX = (
      <Provider store={mockStore}>
        <IntlProvider {...global.intl}>{containerJSX}</IntlProvider>
      </Provider>
    );
    const containerMount = global.Enzyme.shallow(containerJSX, contextObject);
    it("should match stored snapshot", () => {
      expect(containerMount).toMatchSnapshot();
    });
  });

  describe("ComponentDidMount", () => {
    const getAgentAverageRatingMock = jest.fn();
    const getJobDetailMock = jest.fn(
      () =>
        new Promise(resolve => {
          resolve();
        })
    );
    const getConsumerProfileAsyncMock = jest.fn();
    const getJobOffersMock = jest.fn();

    containerProps.getAgentAverageRating = getAgentAverageRatingMock;
    containerProps.getJobDetail = getJobDetailMock;
    containerProps.getJobOffers = getJobOffersMock;
    containerProps.getConsumerProfileAsync = getConsumerProfileAsyncMock;

    const wrapper = Enzyme.shallow(
      <AgentJobDetails {...containerProps} />,
      global.getIntlContext({ intl: containerProps.intl })
    );

    const jobObj = {
      jobType: containerProps.match.params.jobType,
      jobId: containerProps.match.params.jobId
    };
    it("should call props.getAverageRating on Mount", () => {
      expect(getAgentAverageRatingMock).toHaveBeenCalledWith({
        agentId: containerProps.authUserId
      });
    });
    it("should call props.getJobDetail and getJobOffersMock on mount", () => {
      expect(getJobDetailMock).toHaveBeenCalledWith(jobObj);
    });

    // TODO:
    // this is failing in Sandra's imac. Seems to be a problem with tje
    // async function being call after the assert.
    // Craig will take a look after
    // ticket: https://github.com/nobul/web/issues/3038

    // it("should call  getJobOffersMock on mount", () => {
    //   const expectedObj = {
    //     consumerId: containerProps.jobDetail.consumerId
    //   };

    //   expect(getConsumerProfileAsyncMock).toHaveBeenCalledWith(expectedObj);
    // });

    // it("should call  getJobOffersMock on mount", () => {
    //   expect(getJobOffersMock).toHaveBeenCalledWith(jobObj);
    // });
  });
});
