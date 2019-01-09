import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
import { intlShape, injectIntl } from "react-intl";

import { AppointmentFormFieldKeys } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";

const EventTitleInput = ({ getFieldDecorator, intl }) => (
  <Form.Item label={translate(intl, "appointmentForm.titleInput.label")}>
    {getFieldDecorator(AppointmentFormFieldKeys.EVENT_TITLE, {
      initialValue: "",
      rules: [
        {
          required: true,
          message: translate(
            intl,
            "appointmentForm.titleInput.validationMessage"
          )
        }
      ]
    })(
      <Input
        placeholder={translate(intl, "appointmentForm.titleInput.label")}
      />
    )}
  </Form.Item>
);

EventTitleInput.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(EventTitleInput);
