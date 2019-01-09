import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";

import { STATUS_CONSUMER_HAS_PROPOSED } from "../../../core/constants/events";
import EventList from "../../components/event-list";
import EventsCalendar from "../../components/events-calendar";
import ViewEventModal from "../../components/view-event-modal";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import { translate } from "../../utilities/locale";

import "./styles.scss";

@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
class AgentViewMyEvents extends Component {
  static propTypes = {
    getAgentOffers: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    authUserId: PropTypes.string.isRequired,
    getAgentEvents: PropTypes.func.isRequired,
    consumerProfile: PropTypes.object.isRequired,
    getConsumerProfile: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
    proposeNewTime: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getAgentOffers({
      agentId: this.props.authUserId
    });
  }

  @bound
  shouldShowModalConfirm({ eventStatus }) {
    return eventStatus === STATUS_CONSUMER_HAS_PROPOSED;
  }

  render() {
    return (
      <div className="agent-view-my-events">
        <MyDashboardMeta titleKey="helmet.myDashboard.events" />
        <ViewEventModal
          userProfile={this.props.consumerProfile}
          getUserProfile={this.props.getConsumerProfile}
          userType={this.props.userType}
          proposeNewTime={this.props.proposeNewTime}
          getEventsForUser={this.props.getAgentEvents}
          shouldShowConfirm={this.shouldShowModalConfirm}
        />
        <div className="full-width-container">
          <EventList
            title={translate(this.props.intl, "myEvents.eventsListTitle")}
            userId={this.props.authUserId}
            getEventThunk={this.props.getAgentEvents}
          />
        </div>
        <div className="full-width-container">
          <h6>{translate(this.props.intl, "myEvents.calendarTitle")}</h6>
          <EventsCalendar
            userId={this.props.authUserId}
            getEventThunk={this.props.getAgentEvents}
          />
        </div>
      </div>
    );
  }
}

export default AgentViewMyEvents;
