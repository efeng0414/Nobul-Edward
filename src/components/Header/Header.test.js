import React from "react";
import HeaderComponentWrapped from "./index";
import { intlShape } from "react-intl";
import { shape } from "prop-types";
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";

describe("Header", () => {
  const { WrappedComponent: Header } = HeaderComponentWrapped;

  const componentProps = {
    intl: global.getCustomIntl({
      home: "Logo alt text"
    }),
    currentUser: {
      uid: "123abc"
    },
    toggle: true,
    history: { location: {}, push: () => {} },
    signOut: () => {},
    loginTrigger: false,
    triggerLogin: () => {},
    isUserLoading: true,
    currentBreakPoint: "tablet",
    isAgent: true
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
        currentUser: { uid: "123" },
        profile: {},
        avatarUrl: "",
        userType: "agent"
      },
      anonymousEventListeners: {
        loginTrigger: true
      }
    })
  };

  const componentJSX = <Header {...componentProps} />;

  describe("Component Render", () => {
    const router = {
      history: new BrowserRouter().history || "",
      route: {
        location: {},
        match: {}
      }
    };
    const contextObject = {
      context: { intl: componentProps.intl, store: mockStore, router },
      childContextTypes: {
        router: shape({}),
        intl: intlShape.isRequired,
        store: PropTypes.object
      }
    };
    const functionsToReset = [
      "toggleMenu",
      "hideMenu",
      "onLoginCancel",
      "onLoginClick",
      "onRegistrationCancel",
      "onRegistrationClick",
      "onJoinNobulFromLogin"
    ];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({ component: Header }),
      {}
    );

    const componentMount = Enzyme.shallow(componentJSX, contextObject);

    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: Header,
          componentMount,
          componentPrototypeResets
        })
      );
    });

    describe("Component Snapshot", () => {
      it("should match stored snapshot", () => {
        expect(componentMount).toMatchSnapshot();
      });
    });

    describe("component Render", () => {
      let wrapper;
      beforeEach(() => {
        wrapper = Enzyme.shallow(componentJSX, contextObject);
        wrapper.setState({
          showMenu: false,
          showLoginModal: false,
          showRegistrationModal: false
        });
      });

      describe("ToggleMenu", () => {
        it("should set State of showMenu correctly", () => {
          const expectedState = {
            showMenu: !wrapper.state().showMenu
          };
          wrapper.instance().toggleMenu();

          expect(wrapper.state().showMenu).toEqual(expectedState.showMenu);
        });
      });

      describe("hideMenu function", () => {
        it("should set state of showMenu to false", () => {
          wrapper.setState({ showMenu: true });
          wrapper.instance().hideMenu();
          expect(wrapper.state().showMenu).toBe(false);
        });
      });

      describe("onLoginCancel", () => {
        it("should set state of showLoginModal as false", () => {
          wrapper.setState({ showLoginModal: true });
          wrapper.instance().onLoginCancel();

          expect(wrapper.state().showLoginModal).toBe(false);
        });

        it("should call props.triggerLogin function", () => {
          const MockTriggerLogin = jest.fn();
          wrapper.setProps({ triggerLogin: MockTriggerLogin });
          const expectedObj = {
            trigger: false
          };
          wrapper.instance().onLoginCancel();

          expect(MockTriggerLogin).toHaveBeenCalledWith(
            expect.objectContaining(expectedObj)
          );
        });
      });

      describe("onRegistrationCancel", () => {
        it("should set state of showRegistrationModal as false", () => {
          wrapper.setState({ showRegistrationModal: true });
          wrapper.instance().onRegistrationCancel();

          expect(wrapper.state().showRegistrationModal).toBe(false);
        });
      });

      describe("onJoinNobulFromLogin", () => {
        it("should call onLoginCancel", () => {
          const onLoginCancelMock = jest.fn();
          wrapper.instance().onLoginCancel = onLoginCancelMock;
          wrapper.instance().onJoinNobulFromLogin();
          expect(onLoginCancelMock).toBeCalled();
        });
        it("should call onRegistrationClick", () => {
          const onRegistrationClickMock = jest.fn();
          wrapper.instance().onRegistrationClick = onRegistrationClickMock;
          wrapper.instance().onJoinNobulFromLogin();
          expect(onRegistrationClickMock).toBeCalled();
        });
      });

      describe("onLoginClick", () => {
        it("should set state of showLoginModel as true", () => {
          wrapper.setProps({ currentUser: {} });
          wrapper.instance().onLoginClick({ target: { checked: true } });
          expect(wrapper.state().showLoginModal).toBe(true);
        });

        it("should set the state of showRegistrationModel", () => {
          wrapper.setProps({ currentUser: {} });
          wrapper.setState({ showRegistrationModal: true });
          wrapper.instance().onLoginClick({ target: { checked: true } });

          expect(wrapper.state().showRegistrationModal).toBe(false);
        });
      });
    });

    describe("ComponentDidUpdate", () => {
      let wrapper;
      beforeEach(() => {
        componentProps.currentUser.uid = "consumer123";
        componentProps.loginTrigger = false;

        wrapper = Enzyme.shallow(<Header {...componentProps} />);
      });

      it("should set state of showLoginModal correctly if user is logged in", () => {
        wrapper.setState({ showLoginModal: true });
        componentProps.currentUser.uid = "agent123";
        wrapper = Enzyme.shallow(<Header {...componentProps} />);

        expect(wrapper.state().showLoginModal).toBe(false);
      });

      it("should set state of showLoginModal correctly if loginTrigger is true", () => {
        wrapper.setState({ showLoginModal: false });
        wrapper.setProps({ loginTrigger: true });

        expect(wrapper.state().showLoginModal).toBe(true);
      });
    });
  });
});
