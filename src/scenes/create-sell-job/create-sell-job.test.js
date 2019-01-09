import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { IntlProvider, intlShape } from "react-intl";
import CreateSellJobWrapped from "./container";
import {
  SERVICES_EXACT,
  BATHROOMS,
  BEDROOMS,
  DESCRIPTION,
  REGIONS_FIELD
} from "../../../core/constants/shared";
import { MOBILE } from "../../../core/constants/breakpoints";
import { CONDO_APARTMENT } from "../../../core/constants/listings";

describe("Create Sell Job", () => {
  const containerProps = {
    intl: global.getIntl(),
    history: { location: {}, push: () => {} },
    jobs: { sell: {}, buy: {} },
    saveJob: () => {},
    users: { currentUser: { uid: "123" } },
    polygons: {},
    getAllConsumerSellJobs: () =>
      new Promise(resolve => {
        resolve();
      }),
    getPolygonBoundaries: () => {},
    currentBreakPoint: MOBILE
  };

  const containerState = {
    test: 0,
    currentStep: 1,
    currentScreen: 1,
    fields: {
      [BATHROOMS]: 0,
      [BEDROOMS]: 0,
      [SERVICES_EXACT]: [],
      [DESCRIPTION]: "",
      [REGIONS_FIELD]: {}
    },
    serviceRange: 3,
    selectedPropertyClass: "",
    showCongratulationsModal: false,
    showAnonymousUserModal: false,
    showLoginModal: false
  };

  const {
    WrappedComponent: CreateSellJob
  } = CreateSellJobWrapped.WrappedComponent.WrappedComponent;

  const mockStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
      breakpoints: {
        currentBreakPoint: ""
      },
      authentication: {
        isLoading: false,
        currentUser: { uid: "123" }
      },
      anonymousEventListeners: {
        favoriteList: {}
      },
      jobs: {
        sell: {},
        buy: {}
      }
    })
  };

  const contextObject = {
    context: { intl: containerProps.intl, store: mockStore },
    childContextTypes: {
      intl: intlShape.isRequired,
      store: PropTypes.object
    }
  };
  const containerJSX = <CreateSellJob {...containerProps} />;

  const containerStoreJSX = (
    <Provider store={mockStore}>
      <CreateSellJob {...containerProps} />
    </Provider>
  );

  const containerShallow = global.Enzyme.shallow(containerJSX, contextObject);

  describe("Container Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{containerStoreJSX}</IntlProvider>
    );

    const containerSnapshot = renderer.create(snapshotJSX).toJSON();
    it("should match stored snapshot", () => {
      expect(containerSnapshot).toMatchSnapshot();
    });
  });

  describe("Container mount", () => {
    containerShallow.setProps({ scroll: () => ({}) });

    afterEach(() => {
      containerShallow.setState(containerState);
    });

    describe("determine screen count", () => {});

    describe("handle previous step", () => {
      const matchObject = {
        ...containerState
      };

      it("first screen", () => {});

      it("other screens", () => {});
    });

    describe("handle next step", () => {
      const matchObject = {
        ...containerState,
        fields: {
          priceRange: [0, 3],
          propertyType: CONDO_APARTMENT,
          [DESCRIPTION]: DESCRIPTION
        }
      };

      it("handleSaveJob is called", () => {
        containerShallow.setState({
          currentStep: 5,
          currentScreen: 1
        });

        const spy = jest.fn();
        Object.defineProperties(containerShallow.instance(), {
          handleSaveJob: {
            value: spy
          }
        });
        containerShallow.instance().handleNextStep(matchObject.fields);
        expect(spy).toHaveBeenCalled();
      });

      it("currentScreen equals numberOfScreens", () => {
        const stepObj = { currentStep: 3, currentScreen: 2 };

        containerShallow.setState({
          currentStep: stepObj.currentStep,
          currentScreen: stepObj.currentScreen
        });
        containerShallow.instance().handleNextStep(matchObject.fields);
        matchObject.currentStep = stepObj.currentStep + 1;
        matchObject.currentScreen = 1;
        matchObject.selectedPropertyClass = matchObject.fields.propertyType;
        expect(containerShallow.instance().state).toMatchObject(matchObject);
      });

      it("currentScreen not equals numberOfScreens", () => {
        const stepObj = { currentStep: 3, currentScreen: 1 };

        containerShallow.setState({
          currentStep: stepObj.currentStep,
          currentScreen: stepObj.currentScreen
        });
        containerShallow.instance().handleNextStep(matchObject.fields);
        matchObject.currentStep = stepObj.currentStep;
        matchObject.currentScreen = stepObj.currentScreen + 1;
        matchObject.selectedPropertyClass = matchObject.fields.propertyType;
        expect(containerShallow.instance().state).toMatchObject(matchObject);
      });
    });
  });
});
