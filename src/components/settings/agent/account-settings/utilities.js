import React from "react";
import SettingsFieldItem from "../../common/settings-field-item";
import {
  FIRST_NAME,
  LAST_NAME,
  PHONE,
  ADDRESS1,
  ADDRESS2,
  COUNTRY,
  PROVINCE_OR_STATE,
  CITY,
  POSTAL_OR_ZIP_CODE,
  PASSWORD,
  BROKERAGE_NAME,
  BROKERAGE_PHONE,
  EMAIL
} from "../../../../../core/api-transform/users";
import TextField from "../../../form-fields/text-field";
import PostalField from "../../../form-fields/postal-field";
import PhoneField from "../../../form-fields/phone-field";
import CountryField from "../../../form-fields/country-field";
import ProvinceField from "../../../form-fields/province-field";
import ChangePasswordForm from "../../../forms/common/change-password-form";
import ChangeEmailForm from "../../../forms/common/change-email-form";

const LOCALE_KEY_PREFIX = "agentSettings.account.";

export const fieldsMap = {
  [FIRST_NAME]: {
    labelKey: "firstName",
    type: TextField,
    required: true
  },
  [LAST_NAME]: {
    labelKey: "lastName",
    type: TextField,
    required: true
  },
  [EMAIL]: {
    labelKey: "email",
    type: ChangeEmailForm,
    required: true
  },
  [PASSWORD]: {
    labelKey: "password",
    type: ChangePasswordForm,
    required: true
  },
  [PHONE]: {
    labelKey: "phoneNumber",
    type: PhoneField,
    required: true
  },
  [ADDRESS1]: {
    labelKey: "address1",
    type: TextField,
    halfWidth: true,
    required: true
  },
  [ADDRESS2]: {
    labelKey: "address2",
    type: TextField,
    halfWidth: true,
    required: false
  },
  [COUNTRY]: {
    labelKey: "country",
    type: CountryField,
    halfWidth: true,
    required: true
  },
  [PROVINCE_OR_STATE]: {
    labelKey: "province",
    type: ProvinceField,
    halfWidth: true,
    required: true
  },
  [CITY]: {
    labelKey: "city",
    type: TextField,
    halfWidth: true,
    required: false
  },
  [POSTAL_OR_ZIP_CODE]: {
    labelKey: "postcode",
    type: PostalField,
    halfWidth: true,
    required: true
  },
  [BROKERAGE_NAME]: {
    labelKey: "brokerageName",
    type: TextField,
    halfWidth: true,
    required: true
  },
  [BROKERAGE_PHONE]: {
    labelKey: "brokeragePhone",
    type: PhoneField,
    halfWidth: true,
    required: true
  }
};

export const generateSettingFieldsItemForProfile = ({
  userProfile,
  onEditClick,
  isAgent
}) => {
  return Object.entries(fieldsMap).map(([key, { labelKey, halfWidth }]) => {
    return (
      <SettingsFieldItem
        labelKey={`${LOCALE_KEY_PREFIX}${labelKey}`}
        value={userProfile[key]}
        onEditClick={onEditClick}
        isAgent={isAgent}
        key={key}
        id={key}
        halfWidth={halfWidth}
      />
    );
  });
};
