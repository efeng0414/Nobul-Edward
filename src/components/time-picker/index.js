import React from "react";
import PropTypes from "prop-types";
import { TimePicker, Form } from "antd";
import moment from "moment";
import { intlShape, injectIntl } from "react-intl";

import { translate } from "../../utilities/locale";
import { STANDARD_TIME_FORMAT } from "../../../core/constants/shared";
import { getDisabledHours, getDisabledMinutes } from "./utilities";

const MeetingTimePicker = ({
  getFieldDecorator,
  intl,
  fieldKey,
  label,
  placeholder,
  disableBefore,
  onChange
}) => {
  const disabledHours = disableBefore
    ? getDisabledHours({
        maxHour: disableBefore.hours,
        maxMinute: disableBefore.minutes
      })
    : () => {};
  const disabledMinutes = disableBefore
    ? getDisabledMinutes({
        maxHour: disableBefore.hours,
        maxMinute: disableBefore.minutes,
        offset: disableBefore.offset
      })
    : () => {};

  return (
    <Form.Item label={label}>
      {getFieldDecorator(fieldKey, {
        defaultValue: disableBefore
          ? moment()
              .add(1, "hour")
              .format("HH::mm")
          : "",
        rules: [
          {
            required: true,
            message: translate(
              intl,
              "appointmentForm.timePicker.validationMessage"
            )
          }
        ]
      })(
        <TimePicker
          format={`${STANDARD_TIME_FORMAT}`}
          placeholder={placeholder}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          onChange={onChange}
        />
      )}
    </Form.Item>
  );
};

MeetingTimePicker.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  fieldKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  disableBefore: PropTypes.object,
  onChange: PropTypes.func
};

MeetingTimePicker.defaultProps = {
  disableBefore: null,
  onChange: () => {},
  disableByCurrentTime: false
};

export default injectIntl(MeetingTimePicker);
