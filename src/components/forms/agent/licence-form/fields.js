import React from "react";

import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";

import TextField from "../../../form-fields/text-field";
import PhoneField from "../../../form-fields/phone-field";
import CountryField from "../../../form-fields/country-field";
import ProvinceField from "../../../form-fields/province-field";
import PostalField from "../../../form-fields/postal-field";

import { translate } from "../../../../utilities/locale";

const LicenceFormFields = props => {
  return (
    <div className="licence-form__container">
      <TextField
        required
        form={props.form}
        label={translate(props.intl, "agent.brokerageName")}
        name={"brokerageName"}
        initialValue={props.validationData.brokerageName}
      />

      <PhoneField
        required
        form={props.form}
        label={translate(props.intl, "agent.brokeragePhone")}
        name={"brokeragePhone"}
        initialValue={props.validationData.brokeragePhone}
      />

      <CountryField
        required
        name={"country"}
        labelKey={"countryLicense"}
        form={props.form}
        initialValue={props.validationData.country}
      />

      <ProvinceField
        required
        name={"province"}
        labelKey={"provinceLicense"}
        country={props.form.getFieldValue("country")}
        onChange={props.handleProvinceChange}
        form={props.form}
        initialValue={props.validationData.provinceOrState}
      />

      <TextField
        required
        name={"address1"}
        label={translate(props.intl, "addressLine1")}
        form={props.form}
        initialValue={props.validationData.address1}
      />

      <TextField
        name={"address2"}
        label={translate(props.intl, "addressLine2")}
        form={props.form}
        initialValue={props.validationData.address2}
      />

      <TextField
        name={"city"}
        label={translate(props.intl, "city")}
        form={props.form}
        initialValue={props.validationData.city}
      />

      <PostalField
        required
        country={props.form.getFieldValue("country")}
        form={props.form}
        initialValue={props.validationData.postalOrZipCode}
      />
    </div>
  );
};

LicenceFormFields.propTypes = {
  form: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  handleProvinceChange: PropTypes.func,
  validationData: PropTypes.object
};

LicenceFormFields.defaultProps = {
  handleProvinceChange: () => {},
  validationData: {}
};

export default injectIntl(LicenceFormFields);
