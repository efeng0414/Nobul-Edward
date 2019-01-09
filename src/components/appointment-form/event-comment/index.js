import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
import { intlShape, injectIntl } from "react-intl";

import { AppointmentFormFieldKeys } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";

const EventComment = ({ getFieldDecorator, intl }) => (
  <Form.Item label={translate(intl, "appointmentForm.titleInput.label")}>
    {getFieldDecorator(AppointmentFormFieldKeys.EVENT_COMMENT, {
      initialValue: "",
      rules: [
        {
          required: true,
          message: translate(
            intl,
            "appointmentForm.eventComment.validationMessage"
          )
        }
      ]
    })(
      <Input.TextArea
        autosize={{ minRows: 1, maxRows: 3 }}
        placeholder={translate(intl, "appointmentForm.eventComment.label")}
      />
    )}
  </Form.Item>
);

EventComment.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(EventComment);
