import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import MeetingTimePicker from "../time-picker";
import DatePicker from "../date-picker";
import { rescheduleFormFieldMap, getTimeStampsForValues } from "./utilities";
import { translate } from "../../utilities/locale";

@Form.create({})
@injectIntl
class RescheduleForm extends Component {
  state = {
    startTime: null
  };

  static propTypes = {
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    proposeNewTime: PropTypes.func.isRequired,
    eventId: PropTypes.string.isRequired,
    onSubmitSuccess: PropTypes.func,
    currentConsumerId: PropTypes.string.isRequired,
    getEventsForUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    onSubmitSuccess: () => {}
  };

  @bound
  handleValidateSuccess({ values }) {
    const [startTime, endTime] = getTimeStampsForValues({ values });
    return this.props.proposeNewTime({
      eventId: this.props.eventId,
      startTime,
      endTime
    });
  }

  @bound
  handleProposeNewTimeSuccess() {
    this.props.getEventsForUser({
      userId: this.props.currentConsumerId
    });
    this.props.onSubmitSuccess();
  }

  @bound
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields(
      Object.values(rescheduleFormFieldMap),
      {},
      (errors, values) =>
        !errors &&
        this.handleValidateSuccess({ values }).then(
          this.handleProposeNewTimeSuccess
        )
    );
  }

  @bound
  hasSelectedToday() {
    return (
      this.props.form.getFieldValue(rescheduleFormFieldMap.DATE) &&
      this.props.form
        .getFieldValue(rescheduleFormFieldMap.DATE)
        .isSame(new Date(), "day")
    );
  }

  @bound
  handleStartTimeChange(startTime) {
    this.setState({ startTime });
  }

  render() {
    const currDate = new Date();
    const currHour = currDate.getHours();
    const currMinute = currDate.getMinutes();

    const disableStartTime = this.hasSelectedToday()
      ? { hours: currHour, minutes: currMinute, offset: 30 }
      : null;

    const disableEndTime = this.state.startTime
      ? {
          hours: this.state.startTime.hour(),
          minutes: this.state.startTime.minute()
        }
      : null;

    return (
      <Form onSubmit={this.handleSubmit} className="reschedule-form">
        <DatePicker
          {...this.props.form}
          intl={this.props.intl}
          fieldKey={rescheduleFormFieldMap.DATE}
        />
        <div className="time-pickers">
          <MeetingTimePicker
            {...this.props.form}
            fieldKey={rescheduleFormFieldMap.START_TIME}
            label={translate(
              this.props.intl,
              "appointmentForm.startTimePicker.placeholder"
            )}
            placeholder={translate(
              this.props.intl,
              "appointmentForm.startTimePicker.placeholder"
            )}
            disableBefore={disableStartTime}
            onChange={this.handleStartTimeChange}
          />
          <MeetingTimePicker
            {...this.props.form}
            fieldKey={rescheduleFormFieldMap.END_TIME}
            label={translate(
              this.props.intl,
              "appointmentForm.endTimePicker.placeholder"
            )}
            placeholder={translate(
              this.props.intl,
              "appointmentForm.endTimePicker.placeholder"
            )}
            disableBefore={disableEndTime}
          />
        </div>
        <Button type="primary" htmlType="submit" className="submit-button">
          {translate(this.props.intl, "viewEventModal.rescheduleButton.text")}
        </Button>
      </Form>
    );
  }
}

export default RescheduleForm;
