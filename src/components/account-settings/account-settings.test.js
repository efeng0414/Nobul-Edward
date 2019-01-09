import React from "react";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import { fieldsMap } from "./utilities";
import { translate } from "../../utilities/locale";
import {
  COUNTRY,
  FIRST_NAME,
  PASSWORD
} from "../../../core/api-transform/users";

import AccountSettingsWrapped from "./component";
import { AGENTS, CONSUMERS } from "../../../core/api-transform";
import {
  AGENT_USER_TYPE,
  CONSUMER_USER_TYPE
} from "../../../core/constants/users";

describe("Account Settings", () => {
  const {
    WrappedComponent: { WrappedComponent: AccountSettings }
  } = AccountSettingsWrapped;

  const componentProps = {
    intl: global.getIntl(),
    userProfile: {},
    form: {
      getFieldDecorator: config => jsx => jsx,
      setFieldsValue: function(values) {
        this.setFieldValueCalledWith = values;
      },
      validateFieldsAndScroll: callback => {
        callback();
      },
      resetFields: () => {},
      setFieldValueCalledWith: {}
    },
    authUserId: "userId",
    userType: "consumer",
    consentForNews: false,
    consentForEmailNotifications: false,
    updateProfile: () => {},
    updatePassword: () => {},
    updateConsentForNews: jest.fn(),
    updateConsentForEmailNotifications: jest.fn(),
    updateEmail: () => {},
    isEmailUnique: () => {}
  };

  const componentJSX = <AccountSettings {...componentProps} />;

  describe("Component Snapshot", () => {
    const snapshotJSX = (
      <IntlProvider {...global.intl}>{componentJSX}</IntlProvider>
    );

    const componentSnapshot = renderer.create(snapshotJSX).toJSON();
    it("Should match stored snapshot", () => {
      expect(componentSnapshot).toMatchSnapshot();
    });

    describe("Component mount", () => {
      const functionKeysToReset = ["toggleModal"];
      const componentPrototypeResets = functionKeysToReset.reduce(
        global.createComponentPrototypeResets({
          component: AccountSettings
        }),
        {}
      );
      const componentMount = global.Enzyme.mount(
        componentJSX,
        global.getIntlContext({ intl: componentProps.intl })
      );

      const componentInstance = componentMount.instance();

      beforeEach(() => {
        functionKeysToReset.map(
          global.resetPropertyComponentProperty({
            component: AccountSettings,
            componentMount: componentMount,
            componentPrototypeResets
          })
        );
      });

      describe("toggleModal", () => {
        it("Should toggle the boolean value of isModalOpen", () => {
          const isModalOpen = false;
          const currentState = { isModalOpen };
          const newState = { isModalOpen: !isModalOpen };

          componentInstance.setState(currentState);
          componentInstance.toggleModal();
          expect(componentMount.state()).toEqual(newState);
        });

        it("Should call the resetFields function with the keys of the fieldsMap object", () => {
          const mockResetFields = jest.fn();
          componentProps.form.resetFields = mockResetFields;
          componentMount.setProps(componentProps);
          componentInstance.toggleModal();
          expect(mockResetFields).toBeCalledWith(Object.keys(fieldsMap));
        });
      });

      describe("onEditClick", () => {
        const mockEvent = {
          id: "eventId",
          target: {
            getAttribute: jest.fn()
          }
        };
        const testOnEditClick = fieldKey => {
          const InputToRender = fieldsMap[fieldKey].type;
          mockEvent.target.getAttribute.mockReturnValue(fieldKey);
          const getAttrSpy = jest.spyOn(mockEvent.target, "getAttribute");
          const toggleModalSpy = jest.spyOn(componentInstance, "toggleModal");
          componentInstance.onEditClick(mockEvent);
          expect(getAttrSpy).toHaveBeenCalledWith("id");

          const test = componentInstance.renderModalField();
          const renderModalField = JSON.stringify(test);

          const modalFieldComponent = JSON.stringify(
            <InputToRender
              form={componentProps.form}
              initialValue={componentProps.userProfile[fieldKey]}
              label={translate(
                componentProps.intl,
                fieldsMap[fieldKey].labelKey
              )}
              name={fieldKey}
              country={componentProps.userProfile[COUNTRY]}
              updatePassword={componentProps.updatePassword}
              onDoneClick={componentInstance.toggleModal}
              checkIfEmailUnique
              required
            />
          );
          expect(renderModalField).toEqual(modalFieldComponent);
          expect(componentInstance.activeFieldKey).toEqual(fieldKey);
          expect(toggleModalSpy).toBeCalled();
        };
        it("Should set the field key to the event's target id", () => {
          testOnEditClick(FIRST_NAME);
        });
      });

      describe("getUserTypeNode", () => {
        it("Should return the correct user type for agents", () => {
          const agentPropUserType = AGENT_USER_TYPE;
          componentMount.setProps({ userType: agentPropUserType });
          expect(componentInstance.getUserTypeNode()).toEqual(AGENTS);
        });

        it("Should return the correct user type for consumer", () => {
          const agentPropUserType = CONSUMER_USER_TYPE;
          componentMount.setProps({ userType: agentPropUserType });
          expect(componentInstance.getUserTypeNode()).toEqual(CONSUMERS);
        });
      });

      describe("shouldHideFooter", () => {
        const passwordFieldKey = PASSWORD;
        const notPasswordFieldKey = "username";

        it("Should return true if activeKey is password", () => {
          componentInstance.activeFieldKey = passwordFieldKey;
          expect(componentInstance.shouldHideFooter()).toEqual(true);
        });

        it("Should return false if activeKey is not password", () => {
          componentInstance.activeFieldKey = notPasswordFieldKey;
          expect(componentInstance.shouldHideFooter()).toEqual(false);
        });
      });

      describe("toggleConsentForNews", () => {
        it("Should call updateConsentforNews with correct data", () => {
          const expectedArg = {
            consentForNews: !componentInstance.props.consentForNews,
            consumerId: componentInstance.props.authUserId
          };

          componentInstance.toggleConsentForNews();
          expect(
            componentInstance.props.updateConsentForNews
          ).toHaveBeenCalledWith(expectedArg);
        });
      });

      describe("toggleConsentForEmailNotificatoins", () => {
        it("Should call updateConsentForEmailNotifications with correct data", () => {
          const expectedArg = {
            consumerId: componentInstance.props.authUserId,
            emailNotifications: !componentInstance.props
              .consentForEmailNotifications
          };

          componentInstance.toggleConsentForEmailNotifications();
          expect(
            componentInstance.props.updateConsentForEmailNotifications
          ).toHaveBeenCalledWith(expectedArg);
        });
      });
    });
  });
});
