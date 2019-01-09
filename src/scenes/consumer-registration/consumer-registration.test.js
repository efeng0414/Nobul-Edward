/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider, intlShape } from "react-intl";
import { Provider } from "react-redux";
import * as Routes from "../../routes/routes";
import { RegistrationStepMap } from "../../utilities/constants";
import ConsumerRegistrationWrapped from "./container";

describe("Consumer Registration", () => {
  const {
    WrappedComponent: ConsumerRegistration
  } = ConsumerRegistrationWrapped.WrappedComponent;

  const containerProps = {
    intl: global.getIntl(),
    history: { location: {}, push: () => {} },
    signUpUser: () => {},
    error: {},
    jobs: { sell: {}, buy: {} },
    resendEmailVerification: () => {},
    verificationEmailResent: false,
    currentUser: {},
    clearResendVerificationStatus: () => {},
    reloadUser: () => {},
    isEmailVerified: false,
    isFirstTimeRegistration: false,
    scroll: () => {}
  };

  const mockStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
      breakpoints: {
        currentBreakPoint: "",
        store: {}
      },
      authentication: {
        isLoading: false,
        currentUser: {}
      },
      jobs: {
        sell: {},
        buy: {}
      }
    })
  };

  const containerJSX = <ConsumerRegistration {...containerProps} />;

  const containerWithStoreJSX = (
    <Provider store={mockStore}>
      <ConsumerRegistration {...containerProps} />
    </Provider>
  );

  describe("Container Snapshot", () => {
    const snapshotJSX = (
      <Provider store={mockStore}>
        <IntlProvider {...global.intl}>{containerWithStoreJSX}</IntlProvider>
      </Provider>
    );

    const containerSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(containerSnapshot).toMatchSnapshot();
    });
  });

  describe("Container mount", () => {
    const contextObject = {
      context: { intl: containerProps.intl },
      childContextTypes: { intl: intlShape.isRequired }
    };

    const functionKeysToReset = ["nextPage", "goBackToHomePage"];

    const componentPrototypeResets = functionKeysToReset.reduce(
      global.createComponentPrototypeResets({
        component: ConsumerRegistration
      }),
      {}
    );
    const containerMount = global.Enzyme.shallow(containerJSX, contextObject);

    afterEach(() => {
      functionKeysToReset.map(
        global.resetPropertyComponentProperty({
          component: ConsumerRegistration,
          componentMount: containerMount,
          componentPrototypeResets
        })
      );
    });

    describe("onValidSubmit", () => {
      it("should append values to the current signUpState ", () => {
        const currentSignUpState = { a: 0 };
        const valuesToAppend = { b: 1 };
        containerMount.setState({ signUpValues: currentSignUpState });
        containerMount.instance().onValidSubmit(valuesToAppend);

        expect(containerMount.state().signUpValues).toMatchObject({
          ...currentSignUpState,
          ...valuesToAppend
        });
      });

      it("should call nextPage function", () => {
        const nextPageSpy = jest.fn();
        containerMount.instance().nextPage = nextPageSpy;
        containerMount.setProps({ a: 2 });

        containerMount.instance().onValidSubmit({});
        expect(nextPageSpy).toHaveBeenCalled();
      });
    });

    describe("nextPage function", () => {
      it("should increment step in state", () => {
        const currentStepState = { step: 0 };
        containerMount.setState(currentStepState);
        containerMount.instance().nextPage({ scroll: () => {} });
        expect(containerMount.state().step).toBe(1);
      });

      it("should scroll to the top of the page", () => {
        const scrollWatchObject = {
          calledWithParams: []
        };
        const scroll = (...args) => {
          scrollWatchObject.calledWithParams = args;
        };

        containerMount.instance().nextPage({ scroll });
        expect(scrollWatchObject.calledWithParams).toEqual([0, 0]);
      });

      it("should reset state.step to 0 if step increment is equal total step", () => {
        const currentStepState = { step: 1 };
        containerMount.setState(currentStepState);
        containerMount.instance().nextPage({ scroll: () => {} });
        expect(containerMount.state().step).toBe(0);
      });
    });

    describe("previousPage function", () => {
      it("should decrement the step", () => {
        const currentStepState = { step: 1 };
        containerMount.setState(currentStepState);
        containerMount.instance().previousPage("oops", { scroll: () => {} });
        expect(containerMount.state().step).toBe(0);
      });

      it("should update signUpValues with value object", () => {
        const currentSignUpValueState = { a: 1 };
        const signUpValueToAppend = { b: 2 };
        containerMount.setState({ signUpValues: currentSignUpValueState });
        containerMount.instance().previousPage(signUpValueToAppend);

        const expectedObject = {
          ...currentSignUpValueState,
          ...signUpValueToAppend
        };
        expect(containerMount.state().signUpValues).toMatchObject(
          expectedObject
        );
      });

      it("should scroll to top", () => {
        const scrollWatchObject = {
          calledWithParams: []
        };
        const mockScroll = (...args) => {
          scrollWatchObject.calledWithParams = args;
        };
        containerMount.instance().previousPage({}, { scroll: mockScroll });

        expect(scrollWatchObject.calledWithParams).toEqual([0, 0]);
      });
    });

    describe("goBackToHomePage Function", () => {
      it("should call history prop with home url", () => {
        const mockHistoryProp = {
          calledWithParam: "",
          push: function(url) {
            this.calledWithParam = url;
          },
          locations: {}
        };
        containerMount.setProps({ history: mockHistoryProp });
        containerMount.instance().goBackToHomePage();
        expect(mockHistoryProp.calledWithParam).toBe(Routes.url.home);
      });
    });

    describe("componentDidUpdate lifecycle method", () => {
      it("should call history push with the home url if emailVerified is true", () => {
        const mockHistoryProp = {
          calledWithParam: "",
          push: function(url) {
            this.calledWithParam = url;
          },
          locations: {}
        };
        const mockCurrentUser = {
          emailVerified: true
        };

        containerMount.setProps({
          history: mockHistoryProp,
          currentUser: mockCurrentUser
        });
        expect(mockHistoryProp.calledWithParam).toBe(Routes.url.home);
      });

      it("should not call history push with the home url if emailVerified is true", () => {
        const mockHistoryProp = {
          calledWithParam: "",
          push: function(url) {
            this.calledWithParam = url;
          },
          locations: {}
        };
        const mockCurrentUser = {
          emailVerified: false
        };

        containerMount.setProps({
          history: mockHistoryProp,
          currentUser: mockCurrentUser
        });
        expect(mockHistoryProp.calledWithParam).toBe("");
      });
    });
    describe("render", () => {
      it("should render the correct registrationStep for the step", () => {
        const step = 1;
        containerMount.setState({
          step
        });
        expect(!!containerMount.find(RegistrationStepMap[step]).length).toBe(
          true
        );
      });
    });
  });
});
