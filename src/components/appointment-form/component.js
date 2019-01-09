import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Card, Button } from "antd";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";

import EventTitleInput from "./event-title-input";
import EventTypeSelect from "./event-type-select";
import MeetingDatePicker from "../date-picker";
import MeetingTimePicker from "../time-picker";
import LocationSearch from "./location-search";
import PhoneField from "../form-fields/phone-field";
import EventComment from "./event-comment";
import FormError from "./form-error";
import ActivityIndicator from "../activity-indicator";

import { getTimeStampsArray } from "../../../core/utilities/date";
import { EVENT_TYPE_INPERSON } from "../../../core/constants/events";
import { AppointmentFormFieldKeys } from "../../utilities/forms";
import { translate } from "../../utilities/locale";
import { CREATED_ON_WEB } from "../../../core/constants/shared";

import "./styles.scss";
import { gtmEvent } from "../../utilities/gtm-event";
import { CREATE_MEETING_COMPLETE } from "../../utilities/google-tag-variable";
import { Row, Col } from "antd";

@injectIntl
@Form.create({})
class AppointmentForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    postEvent: PropTypes.func,
    intl: intlShape.isRequired,
    offerId: PropTypes.string,
    agentId: PropTypes.string,
    consumerId: PropTypes.string,
    scheduleMeetingSubmitHandle: PropTypes.func,
    resetFormValue: PropTypes.bool.isRequired
  };

  static defaultProps = {
    form: {},
    postEvent: () => {},
    offerId: "",
    agentId: "",
    consumerId: "",
    scheduleMeetingSubmitHandle: () => {}
  };

  state = {
    isLocationLoading: false,
    formSentSuccess: false,
    formSentError: false,
    eventType: "",
    startTime: null
  };

  @bound
  eventTypeSelectHandle({ eventType }) {
    this.setState({
      eventType
    });
  }

  @bound
  handleFormSubmitSuccess() {
    this.props.scheduleMeetingSubmitHandle();
    this.resetFormValue();
    this.setState({
      formSentSuccess: true
    });
  }

  @bound
  handleFormSubmitError() {
    this.setState({ formSentError: true });
  }

  @bound
  onLocationChange(value) {
    this.setState({ isLocationLoading: value !== "" });
  }

  @bound
  onLocationSelect() {
    this.setState({ isLocationLoading: false });
  }

  @bound
  resetFormValue() {
    const fieldsArray = Object.values(AppointmentFormFieldKeys);
    this.props.form.resetFields(fieldsArray);
  }

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(
      Object.values(AppointmentFormFieldKeys),
      (errors, values) =>
        !errors &&
        this.props
          .postEvent({
            eventData: this.getPayload({ values })
          })
          .then(this.handleFormSubmitSuccess)
          .catch(this.handleFormSubmitError)
    );
    gtmEvent({
      name: CREATE_MEETING_COMPLETE
    });
  }

  getPayload({ values }) {
    const timeStampsArray = getTimeStampsArray({
      date: values[AppointmentFormFieldKeys.DATE_PICKER],
      startTime: values[AppointmentFormFieldKeys.START_TIME_PICKER],
      endTime: values[AppointmentFormFieldKeys.END_TIME_PICKER]
    });

    const location = values[AppointmentFormFieldKeys.LOCATION_SEARCH]
      ? values[AppointmentFormFieldKeys.LOCATION_SEARCH].formatted_address
      : "";

    return {
      createdOn: CREATED_ON_WEB,
      location,
      consumerId: this.props.consumerId,
      agentId: this.props.agentId,
      offerId: this.props.offerId,
      subject: values[AppointmentFormFieldKeys.EVENT_TITLE],
      eventType: values[AppointmentFormFieldKeys.EVENT_TYPE_SELECT],
      startTime: timeStampsArray[0],
      endTime: timeStampsArray[1],
      phone: values[AppointmentFormFieldKeys.PHONE_NUMBER] || "",
      phonePrefix: values[AppointmentFormFieldKeys.PHONE_NUMBER_PREFIX] || "",
      eventComment: values[AppointmentFormFieldKeys.EVENT_COMMENT] || ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetFormValue !== this.props.resetFormValue) {
      this.resetFormValue();
      this.setState({
        eventType: EVENT_TYPE_INPERSON
      });
    }
  }

  @bound
  hasSelectedToday() {
    return (
      this.props.form.getFieldValue(AppointmentFormFieldKeys.DATE_PICKER) &&
      this.props.form
        .getFieldValue(AppointmentFormFieldKeys.DATE_PICKER)
        .isSame(new Date(), "day")
    );
  }

  @bound
  startTimeChange(startTime) {
    this.setState({ startTime });
  }

  render() {
    const { intl } = this.props;

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const disableStartTime = this.hasSelectedToday()
      ? { hours: currentHour, minutes: currentMinute, offset: 30 }
      : null;

    const disableEndTime = this.state.startTime
      ? {
          hours: this.state.startTime.hour(),
          minutes: this.state.startTime.minute()
        }
      : null;

    return (
      <ActivityIndicator spinning={this.state.isLoading}>
        <Card className="event-form-card">
          <FormError isError={this.state.formSentError} />
          <Form
            layout="vertical"
            onSubmit={this.handleSubmit}
            className="event-form-card-form"
          >
            <EventTitleInput {...this.props.form} />
            <EventTypeSelect
              {...this.props.form}
              eventTypeSelectHandle={this.eventTypeSelectHandle}
            />
            {this.state.eventType === EVENT_TYPE_INPERSON && (
              <LocationSearch
                {...this.props.form}
                onLocationChange={this.onLocationChange}
                onLocationSelect={this.onLocationSelect}
                isLoading={this.state.isLocationLoading}
                resetLocationValue={this.props.resetFormValue}
              />
            )}
            <PhoneField
              required
              label={translate(intl, "phone")}
              form={this.props.form}
              name={AppointmentFormFieldKeys.PHONE_NUMBER}
            />
            <MeetingDatePicker
              {...this.props.form}
              fieldKey={AppointmentFormFieldKeys.DATE_PICKER}
            />
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <MeetingTimePicker
                  {...this.props.form}
                  fieldKey={AppointmentFormFieldKeys.START_TIME_PICKER}
                  label={translate(
                    intl,
                    "appointmentForm.startTimePicker.label"
                  )}
                  placeholder={translate(
                    intl,
                    "appointmentForm.startTimePicker.placeholder"
                  )}
                  disableBefore={disableStartTime}
                  onChange={this.startTimeChange}
                />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <MeetingTimePicker
                  {...this.props.form}
                  fieldKey={AppointmentFormFieldKeys.END_TIME_PICKER}
                  label={translate(intl, "appointmentForm.endTimePicker.label")}
                  placeholder={translate(
                    intl,
                    "appointmentForm.endTimePicker.placeholder"
                  )}
                  disableBefore={disableEndTime}
                />
              </Col>
            </Row>
            <EventComment {...this.props.form} />
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={this.state.isLocationLoading}
              className="submit-button googletag-consumer-create-meeting"
            >
              {translate(this.props.intl, "appointmentForm.button.text")}
            </Button>
          </Form>
        </Card>
      </ActivityIndicator>
    );
  }
}

export default AppointmentForm;
