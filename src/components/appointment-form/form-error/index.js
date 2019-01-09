import React from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";

import { translate } from "../../../utilities/locale";

const FormError = ({ isError, intl }) =>
  isError && <p>{translate(intl, "appointmentForm.formErrorMessage")}</p>;

FormError.propTypes = {
  isError: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(FormError);
