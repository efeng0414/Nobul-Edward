import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Calendar } from "antd";
import { bound } from "class-bind";

import { CELL_TYPES, cellRender } from "../../utilities/event-calendar";
import ActivityIndicator from "../activity-indicator";
import "./styles.scss";

class EventsCalendar extends Component {
  static propTypes = {
    getEventsForConsumer: PropTypes.func,
    events: PropTypes.object,
    currentUser: PropTypes.object,
    eventsIsLoading: PropTypes.bool,
    userId: PropTypes.string.isRequired,
    getEventThunk: PropTypes.func.isRequired
  };

  static defaultProps = {
    getEventsForConsumer: () => {},
    events: {},
    currentUser: {},
    eventsIsLoading: false
  };

  componentDidMount() {
    this.props.getEventThunk({
      userId: this.props.userId
    });
  }

  @bound
  dateCellRender(cellValue) {
    return cellRender({
      cellType: CELL_TYPES.DATE,
      cellValue,
      events: Object.entries(this.props.events)
    });
  }

  @bound
  monthCellRender(cellValue) {
    return cellRender({
      cellType: CELL_TYPES.MONTH,
      cellValue,
      events: Object.entries(this.props.events)
    });
  }

  render() {
    return (
      <ActivityIndicator spinning={this.props.eventsIsLoading}>
        <Card className="event-calendar">
          <Calendar
            dateCellRender={this.dateCellRender}
            monthCellRender={this.monthCellRender}
          />
        </Card>
      </ActivityIndicator>
    );
  }
}

export default EventsCalendar;
