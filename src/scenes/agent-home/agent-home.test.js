import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import { IntlProvider, intlShape } from "react-intl";
import AgentHomeWrapped from "./container";
import * as Routes from "../../routes/routes";

describe("AgentHome", () => {
  const { WrappedComponent: AgentHome } = AgentHomeWrapped.WrappedComponent;
  const containerProps = {
    intl: global.getIntl(),
    promptLoginOnMount: true,
    promptLogin: () => {},
    history: { location: {}, push: () => {} },
    currentUserId: "abc123",
    isAgent: true,
    businessProfileCreated: false,
    hasLicenceData: true,
    iconSrc: "",
    hoverIconSrc: "",
    getStarted: true
  };

  const containerJSX = <AgentHome {...containerProps} />;

  describe("Container Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{containerJSX}</IntlProvider>
    );

    const containerSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(containerSnapshot).toMatchSnapshot();
    });
  });

  const mockStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
      breakpoints: {
        currentBreakPoint: ""
      },
      authentication: {
        isLoading: false
      }
    })
  };
  const mockContext = {
    context: { intl: containerProps.intl, store: mockStore },
    childContextTypes: {
      intl: intlShape.isRequired,
      store: PropTypes.object
    }
  };

  const functionKeysToReset = [
    "handleMarketplace",
    "handleStandardProposal",
    "goToStandardProposal",
    "closeModal"
  ];

  const componentPrototypeResets = functionKeysToReset.reduce(
    global.createComponentPrototypeResets({
      component: AgentHome
    }),
    {}
  );
  let containerMount;

  beforeEach(() => {
    containerMount = global.Enzyme.mount(containerJSX, mockContext);
    containerMount.setState({ showLicenceModal: "" });

    functionKeysToReset.map(
      global.resetPropertyComponentProperty({
        component: AgentHome,
        componentMount: containerMount,
        componentPrototypeResets
      })
    );
  });

  const mockEvent = {
    preventDefault: function() {
      this.preventDefaultCalled = true;
    },
    preventDefaultCalled: false
  };
  const mockHistory = {
    calledWithParam: "",
    push: function(url) {
      this.calledWithParam = url;
    },
    locations: {}
  };

  describe("ComponentDidMount", () => {
    it("should call props.promptLogin if promptLoginOnMount is true", () => {
      const promptLoginMock = jest.fn();
      containerProps.promptLogin = promptLoginMock;
      const wrapper = Enzyme.shallow(
        <AgentHome {...containerProps} />,
        global.getIntlContext({ intl: containerProps.intl })
      );

      expect(promptLoginMock).toHaveBeenCalled();
    });

    it("should not call props.promptLogin if promptLoginOnMount is true", () => {
      containerProps.promptLoginOnMount = false;
      const promptLoginMock = jest.fn();
      containerProps.promptLogin = promptLoginMock;
      const wrapper = Enzyme.shallow(
        <AgentHome {...containerProps} />,
        global.getIntlContext({ intl: containerProps.intl })
      );

      expect(promptLoginMock).not.toHaveBeenCalled();
    });

    it("should push url to marketPlace if user is an Agent and has a businessProfileCreated", () => {
      containerProps.isAgent = true;
      containerProps.businessProfileCreated = true;
      containerProps.history = mockHistory;

      const wrapper = Enzyme.shallow(
        <AgentHome {...containerProps} />,
        global.getIntlContext({ intl: containerProps.intl })
      );

      expect(mockHistory.calledWithParam).toBe(Routes.url.marketPlace);
    });

    it("should not push url to marketPlace if Agent doesnot have a businessProfileCreated", () => {
      const mockHistory = {
        calledWithParam: "",
        push: function(url) {
          this.calledWithParam = url;
        },
        locations: {}
      };
      containerMount.setProps({
        history: mockHistory,
        isAgent: true,
        businessProfileCreated: false
      });

      expect(mockHistory.calledWithParam).toBe("");
    });
  });

  describe("handleMarketPlace", () => {
    it("should call preventDefault on the event", () => {
      containerMount.instance().handleMarketplace(mockEvent);
      expect(mockEvent.preventDefaultCalled).toBe(true);
    });

    it("should call history.push prop with marketPlace url", () => {
      const mockHistory = {
        calledWithParam: "",
        push: function(url) {
          this.calledWithParam = url;
        },
        locations: {}
      };
      containerMount.setProps({ history: mockHistory });
      containerMount
        .find("Box")
        .at(1)
        .simulate("click");

      expect(mockHistory.calledWithParam).toBe(Routes.url.marketPlace);
    });

    it("should call handleMarketPlace on icon click", () => {
      const mockHandleMarketPlace = jest.fn();
      containerMount.instance().handleMarketplace = mockHandleMarketPlace;
      containerMount.setProps({ a: 1 });
      containerMount
        .find("Box")
        .at(1)
        .simulate("click");

      expect(mockHandleMarketPlace).toHaveBeenCalled();
    });
  });

  describe("handleStandardProposal", () => {
    it("should call preventDefault on the event", () => {
      containerMount.instance().handleStandardProposal(mockEvent);

      expect(mockEvent.preventDefaultCalled).toBe(true);
    });

    it("should call handleStandardProposal onclick", () => {
      const wrapper = global.Enzyme.mount(containerJSX, mockContext);

      const handleStandardProposalMock = jest.fn();
      wrapper.instance().handleStandardProposal = handleStandardProposalMock;
      wrapper.setProps({ ab: 1 });
      wrapper
        .find("Box")
        .at(0)
        .simulate("click", mockEvent);

      expect(handleStandardProposalMock).toBeCalled();
    });

    it("should call goToStandardProposal onclick", () => {
      const goToStandardProposalMock = jest.fn();
      containerMount.instance().goToStandardProposal = goToStandardProposalMock;
      containerMount.setState({ showLicenceModal: true });
      containerMount
        .find("Box")
        .at(0)
        .simulate("click", mockEvent);

      expect(goToStandardProposalMock).toHaveBeenCalled();
    });

    it("should setState of showLicenceModal to be true if props.hasLicenseData is false", () => {
      containerMount.setProps({ hasLicenceData: false });
      containerMount
        .find("Box")
        .at(0)
        .simulate("click", mockEvent);

      expect(containerMount.state().showLicenceModal).toEqual(true);
    });

    it("should call history.push prop with standardProposal url", () => {
      const mockHistory = {
        calledWithParam: "",
        push: function(url) {
          this.calledWithParam = url;
        },
        locations: {}
      };
      containerProps.history = mockHistory;
      containerProps.isAgent = true;
      const container = <AgentHome {...containerProps} />;
      const wrapper = global.Enzyme.mount(container, mockContext);
      wrapper.instance().handleStandardProposal(mockEvent);

      expect(mockHistory.calledWithParam).toBe(
        "/standard-proposal-flow/step/1/"
      );
    });
  });

  describe("closeModal", () => {
    it("should setState of showLicenseModal to be false", () => {
      containerMount.instance().closeModal();

      expect(containerMount.state().showLicenceModal).toBe(false);
    });
  });
});
