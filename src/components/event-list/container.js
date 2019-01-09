import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  renderEventListItem,
  sortByStartTime,
  filterByCurrentDate
} from "./utilities";

import EventListTitle from "./event-list-title";
import ActivityIndicator from "../activity-indicator";
import { isValidStatus } from "../../utilities/event-status";

class EventList extends PureComponent {
  static propTypes = {
    events: PropTypes.object,
    getEventThunk: PropTypes.func,
    currentUser: PropTypes.object,
    title: PropTypes.string,
    eventsIsLoading: PropTypes.bool,
    userId: PropTypes.string.isRequired
  };

  static defaultProps = {
    events: {},
    getEventThunk: () => {},
    currentUser: {},
    title: "",
    eventsIsLoading: false
  };

  componentDidMount() {
    this.props.getEventThunk({
      userId: this.props.userId
    });
  }

  render() {
    const eventsToDisplay = Object.entries(this.props.events)
      .filter(isValidStatus)
      .filter(filterByCurrentDate);

    return (
      <ActivityIndicator spinning={this.props.eventsIsLoading}>
        <EventListTitle
          title={this.props.title}
          eventCount={Object.keys(eventsToDisplay).length}
          condition={!!this.props.title.length}
        />
        <div className="event-list-container">
          {this.props.events &&
            eventsToDisplay.sort(sortByStartTime).map(renderEventListItem)}
        </div>
      </ActivityIndicator>
    );
  }
}

export default EventList;
