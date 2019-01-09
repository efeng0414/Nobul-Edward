import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import RegistrationFormWrapped from "./index";
import { CONSUMER_SIGN_UP_SUBMIT } from "../../../utilities/google-tag-variable";
import { CONSUMER_USER_TYPE } from "../../../../core/constants/users";
import { AUTH_WRONG_PASSWORD } from "../../../../core/constants/firebaseErrorCode";

const {
  WrappedComponent: { WrappedComponent: RegistrationForm }
} = RegistrationFormWrapped;

describe("Registration Form", () => {
  const componentProps = {
    intl: global.getIntl(),
    goBackToHomePage: () => {},
    previousPage: () => {},
    signUpUser: () => {},
    nextPage: () => {},
    error: {},
    currentUser: {},
    hasContractToBrokerage: () => {},
    form: {
      getFieldDecorator: config => jsx => jsx,
      setFieldsValue: function(values) {
        this.setFieldValueCalledWith = values;
      },
      validateFieldsAndScroll: callback => {
        callback();
      },
      setFieldValueCalledWith: {}
    },
    signUpValues: {}
  };

  const mockEvent = {
    preventDefault: () => {}
  };

  const componentJSX = <RegistrationForm {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.getIntl()}>{componentJSX}</IntlProvider>
    );

    it("should match stored snapshot", () => {
      const componentSnapshot = renderer.create(snapshotJSX).toJSON();

      expect(componentSnapshot).toMatchSnapshot();
    });
  });

  describe("Component Render", () => {
    const functionsToReset = ["handleFormValidationCallback", "handleSignUp"];
    const componentPrototypeResets = functionsToReset.reduce(
      global.createComponentPrototypeResets({ component: RegistrationForm }),
      {}
    );
    const componentMount = Enzyme.mount(
      componentJSX,
      global.getIntlContext({ intl: componentProps.intl })
    );

    beforeEach(() => {
      functionsToReset.map(
        global.resetPropertyComponentProperty({
          component: RegistrationForm,
          componentMount,
          componentPrototypeResets
        })
      );
    });

    describe("ComponentDidMount", () => {
      it("should call form.setFieldsValue with the signUpValues or state values", () => {
        componentProps.signUpValues = {
          lookingFor: "bloop",
          areaOfInterest: "hey",
          consent: []
        };

        const componentMount = Enzyme.mount(
          <RegistrationForm {...componentProps} />,
          global.getIntlContext({ intl: componentProps.intl })
        );

        const expectedObject = {
          ...componentProps.signUpValues,
          timeline: componentMount.state().timeline,
          contractToBrokerage: componentMount.state().contractToBrokerage
        };

        expect(componentProps.form.setFieldValueCalledWith).toMatchObject(
          expectedObject
        );
      });
    });

    describe("inputMortgage function", () => {
      it("should set the allowInputMortage state value to that of the event.target.value", () => {
        componentMount.setState({ allowInputMortgage: false });
        const mockEvent = {
          target: {
            value: true
          }
        };

        componentMount.instance().inputMortgage(mockEvent);

        expect(componentMount.state().allowInputMortgage).toBe(
          mockEvent.target.value
        );
      });
    });

    describe("validateTerm function", () => {
      it("should callback with an error message if value does not include accept_term", () => {
        const watchObject = {
          errorMessageReceived: null
        };

        const mockCallback = errorMessage => {
          watchObject.errorMessageReceived = errorMessage;
        };

        const mockValue = [];

        componentMount.instance().validateTerm(null, mockValue, mockCallback);

        expect(watchObject.errorMessageReceived).toBeTruthy();
      });

      it("should not callback with an error message if value does include accept_term ", () => {
        const watchObject = {
          errorMessageReceived: null
        };

        const mockCallback = errorMessage => {
          watchObject.errorMessageReceived = errorMessage;
        };

        const mockValue = ["accept_term"];

        componentMount.instance().validateTerm(null, mockValue, mockCallback);

        expect(watchObject.errorMessageReceived).toBe(undefined);
      });
    });

    describe("handleSignUp function", () => {
      beforeEach(() => {
        componentMount.setProps({ getFormPayload: undefined });
      });

      it("should call preventDefault on the event", () => {
        const mockEvent = {
          preventDefault: function() {
            this.preventDefaultCalled = true;
          },
          preventDefaultCalled: false
        };

        componentMount.setProps({ getFormPayload: () => ({}) });

        componentMount.instance().handleSignUp(mockEvent);

        expect(mockEvent.preventDefaultCalled).toBe(true);
      });

      it("should call validateFieldsAndScroll", () => {
        const watchObject = {
          validateFieldsAndScroll: false
        };

        const mockValidateAndScroll = () => {
          watchObject.validateFieldsAndScroll = true;
        };
        componentProps.form.validateFieldsAndScroll = mockValidateAndScroll;
        componentMount.setProps(componentProps);
        componentMount.instance().handleSignUp(mockEvent);

        expect(watchObject.validateFieldsAndScroll).toBe(true);
      });

      it("should call handleFormValidationCallback", () => {
        const mockHandleFormValidationCallback = jest.fn();
        componentMount.instance().handleFormValidationCallback = mockHandleFormValidationCallback;

        const mockValidateAndScroll = callback => {
          callback();
        };
        componentProps.form.validateFieldsAndScroll = mockValidateAndScroll;
        componentMount.setProps(componentProps);
        componentMount.instance().handleSignUp(mockEvent);

        expect(mockHandleFormValidationCallback).toHaveBeenCalled();
      });
    });

    describe("handleFormValidation function", () => {
      it("should not update isSubmitted state if there are errors", () => {
        componentMount.setState({ hasSubmitted: false });
        componentMount
          .instance()
          .handleFormValidationCallback({ message: "error" }, { value: "a " });

        expect(componentMount.state().hasSubmitted).toBe(false);
      });

      it("should update isSubmitted state if there is no error", () => {
        componentMount.setState({ hasSubmitted: false });
        componentMount
          .instance()
          .handleFormValidationCallback(false, { value: "a " });

        expect(componentMount.state().hasSubmitted).toBe(true);
      });

      it("should call hasContractToBrokerage and nextPage if contractToBrokerage is true", () => {
        const hasContractToBrokerageMock = jest.fn();
        componentProps.hasContractToBrokerage = hasContractToBrokerageMock;

        const nextPageMock = jest.fn();
        componentProps.nextPage = nextPageMock;

        componentMount.setProps(componentProps);
        componentMount
          .instance()
          .handleFormValidationCallback(false, { contractToBrokerage: true });

        expect(hasContractToBrokerageMock).toHaveBeenCalled();
        expect(nextPageMock).toHaveBeenCalled();
      });

      it("should call gtmEvent with correct event if no contractToBrokerage", () => {
        componentProps.gtmEvent = jest.fn();
        componentMount.setProps(componentProps);

        componentMount
          .instance()
          .handleFormValidationCallback(false, { contractToBrokerage: false });

        const expectedObject = {
          name: CONSUMER_SIGN_UP_SUBMIT
        };
        expect(componentProps.gtmEvent).toHaveBeenCalledWith(
          expect.objectContaining(expectedObject)
        );
      });

      it("should call signUp user with the post data and consumer user type", () => {
        componentProps.signUpUser = jest.fn();
        componentProps.signUpValues = {
          a: 1,
          timeline: 1,
          contractToBrokerage: false,
          areaOfInterest: "hey",
          lookingFor: "both"
        };

        componentMount.setProps(componentProps);

        const values = {
          contractToBrokerage: false,
          consent: [],
          preApprovedMortgage: false
        };
        componentMount.instance().handleFormValidationCallback(false, values);

        const expectedObject = {
          postData: {
            ...values,
            ...componentProps.signUpValues,
            allowEmailNotifications: false,
            consentForNews: false,
            mortgageAmount: "0",
            lookingFor: ["buy", "sell"]
          },
          userType: CONSUMER_USER_TYPE
        };
        expect(
          componentProps.signUpUser.mock.calls[0][0].postData
        ).toMatchObject(expectedObject.postData);
        expect(componentProps.signUpUser.mock.calls[0][0].userType).toEqual(
          expectedObject.userType
        );
      });
    });

    describe("ComponentDidUpdate function", () => {
      it("should call props.goBackToHomePage if user is emailVerified", () => {
        componentProps.currentUser = {
          emailVerified: true
        };
        componentProps.goBackToHomePage = jest.fn();

        componentMount.setProps(componentProps);

        expect(componentProps.goBackToHomePage).toHaveBeenCalled();
      });

      it("should not call goBackToHomePage if user is not emailVerified", () => {
        componentProps.currentUser = {
          emailVerified: false
        };
        componentProps.goBackToHomePage = jest.fn();

        componentMount.setProps(componentProps);

        expect(componentProps.goBackToHomePage).not.toHaveBeenCalled();
      });

      it("should call message.info if error introduced in update", () => {
        componentProps.error = {};
        componentMount.setProps(componentProps);
        componentProps.error = { code: AUTH_WRONG_PASSWORD };
        componentProps.message = {
          info: jest.fn()
        };
        componentMount.setProps(componentProps);
        expect(componentProps.message.info).toHaveBeenCalled();
      });
    });

    describe("render function", () => {
      describe("Form", () => {
        it("should call handleSignUp function on form submit", () => {
          const handleSignUpMock = jest.fn();
          componentMount.instance().handleSignUp = handleSignUpMock;
          componentMount.setProps({ a: 1 });

          componentMount
            .find(".consumer-registration-form-form")
            .at(0)
            .simulate("submit");

          expect(handleSignUpMock).toHaveBeenCalled();
        });
      });
    });
  });
});
