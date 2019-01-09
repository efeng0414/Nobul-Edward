import React from "react";
import { IntlProvider, intlShape } from "react-intl";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { shape } from "prop-types";
import * as Routes from "../../routes/routes";
import ConsumerHomeWrapped from "./container";

describe("ConsumerHome", () => {
  const { WrappedComponent: ConsumerHome } = ConsumerHomeWrapped;
  const containerProps = {
    intl: global.getIntl(),
    promptLoginOnMount: false,
    promptLogin: () => {},
    history: { push: () => {} },
    currentUserId: "",
    open: () => {}
  };

  const containerJSX = <ConsumerHome {...containerProps} />;

  describe("Container Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{containerJSX}</IntlProvider>
    );
    const containerSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(containerSnapshot).toMatchSnapshot();
    });
  });

  describe("componentRender", () => {
    const router = {
      history: new BrowserRouter().history,
      route: {
        location: {},
        match: {}
      }
    };
    const contextObject = {
      context: { intl: containerProps.intl, router },
      childContextTypes: { intl: intlShape.isRequired, router: shape({}) }
    };

    const functionsToReset = ["handleBuyOrSell", "handleBrowse", "handleLearn"];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({ component: ConsumerHome }),
      {}
    );
    const containerMount = global.Enzyme.shallow(containerJSX, contextObject);

    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: ConsumerHome,
          componentMount: containerMount,
          componentPrototypeResets
        })
      );
    });

    const mockHistory = {
      calledWithParam: "",
      push: function(url) {
        this.calledWithParam = url;
      }
    };

    describe("ComponentDidMount", () => {
      it("should call props.promptLogin on mount", () => {
        const promptLoginSpy = jest.fn();
        containerProps.promptLoginOnMount = true;
        containerProps.promptLogin = promptLoginSpy;
        const wrapper = global.Enzyme.shallow(
          <ConsumerHome {...containerProps} />,
          contextObject
        );

        expect(promptLoginSpy).toHaveBeenCalled();
      });
    });

    describe("handleBuyOrSell", () => {
      it("should call handleBuyOrSell function on button Click", () => {
        const mockEvent = {
          preventDefault: function() {
            this.preventDefaultCalled = true;
          },
          preventDefaultCalled: false
        };
        const handleBuyOrSellMock = jest.fn();
        containerMount.instance().handleBuyOrSell = handleBuyOrSellMock;
        containerMount.setProps({ a: 1 });
        containerMount
          .find("Box")
          .at(0)
          .simulate("click", mockEvent);

        expect(handleBuyOrSellMock).toBeCalled();
      });

      it("should call preventDefault on the event", () => {
        const mockEvent = {
          preventDefault: function() {
            this.preventDefaultCalled = true;
          },
          preventDefaultCalled: false
        };
        containerMount.setProps({ b: 1 });
        containerMount
          .find("Box")
          .at(0)
          .simulate("click", mockEvent);
        expect(mockEvent.preventDefaultCalled).toBe(true);
      });

      it("should push url to getStarted route on button click if there is a registered user", () => {
        const mockEvent = {
          preventDefault: function() {
            this.preventDefaultCalled = true;
          },
          preventDefaultCalled: false
        };
        containerMount.setProps({
          history: mockHistory,
          currentUserId: "consumer1234"
        });
        containerMount
          .find("Box")
          .at(0)
          .simulate("click", mockEvent);
        expect(mockHistory.calledWithParam).toBe(Routes.url.getStarted);
      });
    });

    describe("handleBrowseEvent", () => {
      const mockEvent = {
        preventDefault: function() {
          this.preventDefaultCalled = true;
        },
        preventDefaultCalled: false
      };
      it("should call preventDefault on the event", () => {
        containerMount.setProps({ b: 1 });
        containerMount
          .find("Box")
          .at(1)
          .simulate("click", mockEvent);
        expect(mockEvent.preventDefaultCalled).toBe(true);
      });

      it("should push url to BrowseListings on button click", () => {
        containerMount.setProps({
          history: mockHistory
        });
        containerMount
          .find("Box")
          .at(1)
          .simulate("click", mockEvent);
        expect(mockHistory.calledWithParam).toBe(Routes.url.browseListings);
      });
    });

    describe("handleLearn", () => {
      const mockEvent = {
        preventDefault: function() {
          this.preventDefaultCalled = true;
        },
        preventDefaultCalled: false
      };
      it("should call preventDefault on the event", () => {
        containerMount.setProps({ b: 1 });
        containerMount
          .find("Box")
          .at(2)
          .simulate("click", mockEvent);
        expect(mockEvent.preventDefaultCalled).toBe(true);
      });

      it("correct url is called", () => {
        const open = jest.spyOn(window, "open");
        containerMount
          .find("Box")
          .at(2)
          .simulate("click", mockEvent);
        expect(open).toHaveBeenCalledWith(
          Routes.externalLinks.learnRealEstate,
          "_blank"
        );
      });
    });
  });
});
