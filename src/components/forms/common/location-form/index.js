import React from "react";
import { intlShape } from "react-intl";

import CountryField from "../../../form-fields/country-field";
import PostalField from "../../../form-fields/postal-field";
import ProvinceField from "../../../form-fields/province-field";
import TextField from "../../../form-fields/text-field";
import PropTypes from "prop-types";
import { translate } from "../../../../utilities/locale";
import "../styles.scss";

const LocationForm = ({ form, intl }) => (
  <div className="registration-form-location">
    <div className="registration-form-row">
      <CountryField required form={form} />
      <ProvinceField
        required
        country={form.getFieldValue("country")}
        form={form}
      />
    </div>
    <div className="registration-form-row">
      <TextField
        required
        name={"address1"}
        label={translate(intl, "addressLine1")}
        form={form}
      />
      <TextField
        name={"address2"}
        label={translate(intl, "addressLine2")}
        form={form}
      />
    </div>
    <div className="registration-form-row">
      <TextField
        required
        name={"city"}
        label={translate(intl, "city")}
        form={form}
      />
      <PostalField
        required
        country={form.getFieldValue("country")}
        form={form}
      />
    </div>
  </div>
);

LocationForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired
};

export default LocationForm;
