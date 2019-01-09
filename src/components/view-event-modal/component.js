import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";

import {
  STATUS,
  EVENT_TYPE,
  PHONE,
  LOCATION,
  CONSUMER_ID,
  AGENT_ID,
  COMMENT
} from "../../../core/api-transform/events";
import { convertToTimeZone } from "../../../core/utilities/date";
import { translate } from "../../utilities/locale";
import { isInPersonEvent } from "../../utilities/event-types";
import { AGENT_USER_TYPE } from "../../../core/constants/users";
import EventModalCongratulations from "../event-modal-congratulations";
import EventDetails from "../event-modal-details";
import ModalFooter from "../event-modal-footer";
import RescheduleToggle from "../reschedule-toggle";
import RescheduleForm from "../reschedule-form";
import { AGENT_MEETING_ACCEPT } from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";

import "./styles.scss";

@injectIntl
class ViewEventModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    isEventLoading: PropTypes.bool.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    acceptEventInvite: PropTypes.func.isRequired,
    eventId: PropTypes.string.isRequired,
    getEventsForUser: PropTypes.func.isRequired,
    proposeNewTime: PropTypes.func.isRequired,
    userProfile: PropTypes.object.isRequired,
    userType: PropTypes.string.isRequired,
    shouldShowConfirm: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    currentUserTimeZone: PropTypes.string.isRequired
  };

  state = {
    isRescheduleFormVisible: false,
    eventRescheduleSuccess: false,
    eventConfirmSuccess: false
  };

  @bound
  handleConfirm() {
    this.props.acceptEventInvite({ eventId: this.props.eventId }).then(() => {
      this.props.getEventsForUser({ userId: this.props.currentUserId });
    });
    this.setState({
      eventConfirmSuccess: true
    });

    // GTM event
    gtmEvent({ name: AGENT_MEETING_ACCEPT });
  }

  @bound
  handleRescheduleSuccess() {
    this.setState({ eventRescheduleSuccess: true });
  }

  @bound
  toggleRescheduleForm(e) {
    e.preventDefault();
    this.setState({
      isRescheduleFormVisible: !this.state.isRescheduleFormVisible
    });
  }

  @bound
  handleCancel() {
    this.setState({
      isRescheduleFormVisible: false,
      eventRescheduleSuccess: false,
      eventConfirmSuccess: false
    });
    this.props.closeModal();
  }

  componentDidUpdate(prevProps) {
    const userHasLoaded = Object.keys(this.props.userProfile).length;
    const eventHasChanged = this.props.eventId !== prevProps.eventId;

    const userIdField =
      this.props.userType === AGENT_USER_TYPE ? CONSUMER_ID : AGENT_ID;
    (!userHasLoaded || eventHasChanged) &&
      this.props.isOpen &&
      this.props.getUserProfile({
        userId: this.props.event[this.props.eventId][userIdField]
      });
  }

  @bound
  getDateTimeString({ startTime, endTime }) {
    const localStartTimeString = convertToTimeZone({
      timestamp: startTime,
      timezone: this.props.currentUserTimeZone,
      format: "MMM Do [@] HH:mm"
    });
    const localEndTimeString = convertToTimeZone({
      timestamp: endTime,
      timezone: this.props.currentUserTimeZone,
      format: "HH:mm"
    });
    return `${localStartTimeString} - ${localEndTimeString}`;
  }

  render() {
    const event = this.props.isOpen && this.props.event[this.props.eventId];

    const proposedUserName = `${this.props.userProfile.firstName} ${
      this.props.userProfile.lastName
    }`;

    const showConfirm =
      this.props.shouldShowConfirm({ eventStatus: event[STATUS] }) &&
      !this.state.isRescheduleFormVisible &&
      !this.state.eventRescheduleSuccess &&
      !this.state.eventConfirmSuccess;
    const showRescheduleForm =
      this.state.isRescheduleFormVisible &&
      !this.state.eventRescheduleSuccess &&
      !this.state.eventConfirmSuccess;
    const showEventDetails =
      !this.state.eventRescheduleSuccess && !this.state.eventConfirmSuccess;

    const modalFooter = showConfirm
      ? ModalFooter({
          handleConfirm: this.handleConfirm
        })
      : null;

    return (
      <Modal
        visible={!!this.props.isOpen}
        title="Event Confirmation"
        onCancel={this.handleCancel}
        wrapClassName="event-modal"
        footer={modalFooter}
      >
        {showEventDetails && (
          <div>
            <h3 className="modal-title">
              {translate(this.props.intl, "viewEventModal.title").replace(
                "#",
                proposedUserName
              )}
            </h3>
            <EventDetails
              location={
                isInPersonEvent({ eventType: event[EVENT_TYPE] })
                  ? event[LOCATION]
                  : ""
              }
              phoneNumber={event[PHONE]}
              comment={event[COMMENT]}
              date={this.getDateTimeString({
                startTime: event.startTime,
                endTime: event.endTime
              })}
            />
            <RescheduleToggle onClick={this.toggleRescheduleForm} />
          </div>
        )}
        {showRescheduleForm && (
          <RescheduleForm
            onSubmitSuccess={this.handleRescheduleSuccess}
            getEventsForUser={this.props.getEventsForUser}
            proposeNewTime={this.props.proposeNewTime}
          />
        )}
        {this.state.eventRescheduleSuccess && (
          <EventModalCongratulations
            intl={this.props.intl}
            proposedUserName={proposedUserName}
            textLocaleKey={"appointment.meetingScheduleSentSuccessfully"}
          />
        )}
        {this.state.eventConfirmSuccess && (
          <EventModalCongratulations
            intl={this.props.intl}
            proposedUserName={proposedUserName}
            textLocaleKey={"viewEventModal.eventConfirmed"}
          />
        )}
      </Modal>
    );
  }
}

export default ViewEventModal;
