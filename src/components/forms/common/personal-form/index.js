import React from "react";
import { intlShape } from "react-intl";

import EmailField from "../../../form-fields/email-field";
import PasswordField from "../../../form-fields/password-field";
import PasswordConfirmField from "../../../form-fields/password-confirm-field";
import PhoneField from "../../../form-fields/phone-field";
import TextField from "../../../form-fields/text-field";
import PropTypes from "prop-types";
import { translate } from "../../../../utilities/locale";
import "../styles.scss";
import { Row, Col } from "antd";

const PersonalForm = ({ form, intl }) => (
  <div>
    <Row>
      <Col xs={12} sm={6} mg={6} lg={6}>
        <TextField
          required
          name={"firstName"}
          label={translate(intl, "firstName")}
          form={form}
        />
      </Col>
      <Col xs={12} sm={6} mg={6} lg={6}>
        <TextField
          required
          name={"lastName"}
          label={translate(intl, "lastName")}
          form={form}
        />
      </Col>
    </Row>

    <Row>
      <Col xs={12} sm={6} mg={6} lg={6}>
        <EmailField required checkIfEmailUnique form={form} />
      </Col>
      <Col xs={12} sm={6} mg={6} lg={6}>
        <PhoneField
          required
          name={"phone"}
          label={translate(intl, "phone")}
          form={form}
        />
      </Col>
    </Row>

    <Row>
      <Col xs={12} sm={6} mg={6} lg={6}>
        <PasswordField
          required
          form={form}
          name={"password"}
          comparedFieldName={"confirmNewPassword"}
        />
      </Col>
      <Col xs={12} sm={6} mg={6} lg={6}>
        <PasswordConfirmField
          required
          name={"confirmNewPassword"}
          comparedFieldName={"password"}
          form={form}
        />
      </Col>
    </Row>
  </div>
);

PersonalForm.propTypes = {
  form: PropTypes.object,
  intl: intlShape.isRequired
};

export default PersonalForm;
