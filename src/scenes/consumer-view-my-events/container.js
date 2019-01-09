import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { STATUS_AGENT_HAS_PROPOSED } from "../../../core/constants/events";
import EventList from "../../components/event-list";
import EventsCalendar from "../../components/events-calendar";
import ViewEventModal from "../../components/view-event-modal";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { translate } from "../../utilities/locale";

import "./styles.scss";

@injectIntl
class ConsumerViewMyEvents extends Component {
  static propTypes = {
    getConsumerOffers: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    authUserId: PropTypes.string.isRequired,
    getConsumerEvents: PropTypes.func.isRequired,
    agentProfile: PropTypes.object.isRequired,
    getAgentProfile: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
    proposeNewTime: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getConsumerOffers({
      consumerId: this.props.authUserId
    });
  }

  @bound
  shouldShowModalConfirm({ eventStatus }) {
    return eventStatus === STATUS_AGENT_HAS_PROPOSED;
  }

  render() {
    return (
      <div className="consumer-view-my-events">
        <MyDashboardMeta titleKey="helmet.myDashboard.events" />
        <ViewEventModal
          userProfile={this.props.agentProfile}
          getUserProfile={this.props.getAgentProfile}
          userType={this.props.userType}
          proposeNewTime={this.props.proposeNewTime}
          getEventsForUser={this.props.getConsumerEvents}
          shouldShowConfirm={this.shouldShowModalConfirm}
        />
        <div className="full-width-container">
          <EventList
            title={translate(this.props.intl, "myEvents.eventsListTitle")}
            userId={this.props.authUserId}
            getEventThunk={this.props.getConsumerEvents}
          />
        </div>
        <div className="full-width-container">
          <h6>{translate(this.props.intl, "myEvents.calendarTitle")}</h6>
          <EventsCalendar
            userId={this.props.authUserId}
            getEventThunk={this.props.getConsumerEvents}
          />
        </div>
      </div>
    );
  }
}

export default ConsumerViewMyEvents;
