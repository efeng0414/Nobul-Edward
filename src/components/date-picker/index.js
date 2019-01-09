import React from "react";
import PropTypes from "prop-types";
import { DatePicker, Form } from "antd";
import { intlShape, injectIntl } from "react-intl";

import { translate } from "../../utilities/locale";
import { STANDARD_DATE_FORMAT } from "../../../core/constants/shared";
import { disablePastDates } from "./utilities";

const MeetingDatePicker = ({ getFieldDecorator, intl, fieldKey }) => (
  <Form.Item label={translate(intl, "appointmentForm.datePicker.label")}>
    {getFieldDecorator(fieldKey, {
      defaultValue: "",
      rules: [
        {
          required: true,
          message: translate(
            intl,
            "appointmentForm.datePicker.validationMessage"
          )
        }
      ]
    })(
      <DatePicker
        format={`${STANDARD_DATE_FORMAT}`}
        placeholder={translate(intl, "appointmentForm.datePicker.placeholder")}
        disabledDate={disablePastDates}
      />
    )}
  </Form.Item>
);

MeetingDatePicker.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  fieldKey: PropTypes.string.isRequired
};

export default injectIntl(MeetingDatePicker);
