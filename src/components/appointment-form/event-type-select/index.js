import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";

import { AppointmentFormFieldKeys } from "../../../utilities/forms";
import {
  EVENT_TYPE_INPERSON,
  EVENT_TYPE_PHONE_CALL
} from "../../../../core/constants/events";
import { translate } from "../../../utilities/locale";

class EventTypeSelect extends PureComponent {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    eventTypeSelectHandle: PropTypes.func
  };

  @bound
  eventTypeChange(e) {
    this.props.eventTypeSelectHandle({ eventType: e.target.value });
  }

  render() {
    const { intl } = this.props;
    return (
      <Form.Item
        label={translate(intl, "appointmentForm.eventTypeSelect.label")}
      >
        {this.props.getFieldDecorator(
          AppointmentFormFieldKeys.EVENT_TYPE_SELECT,
          {
            defaultValue: "",
            rules: [
              {
                required: true,
                message: translate(
                  intl,
                  "appointmentForm.eventTypeSelect.validationMessage"
                )
              }
            ]
          }
        )(
          <Radio.Group onChange={this.eventTypeChange} buttonStyle="solid">
            <Radio.Button value={EVENT_TYPE_INPERSON}>
              {translate(intl, "appointmentForm.eventTypeSelect.inPerson")}
            </Radio.Button>
            <Radio.Button value={EVENT_TYPE_PHONE_CALL}>
              {translate(intl, "appointmentForm.eventTypeSelect.phoneCall")}
            </Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
    );
  }
}

export default injectIntl(EventTypeSelect);
