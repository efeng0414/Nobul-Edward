import moment from "moment";
import React from "react";
import CalendarItem from "../components/events-calendar/calendar-item";
import { STATUS, SUBJECT, START_TIME } from "../../core/api-transform/events";
import { isValidStatus } from "./event-status";

export const CELL_TYPES = {
  MONTH: "month",
  DATE: "date"
};

export const shouldEventBeInCellMapper = ({ cellType, cellValue }) => ([
  ,
  event
]) => moment(event[START_TIME]).isSame(cellValue, cellType);

export const renderEventToCalendarItem = ([id, event]) => (
  <CalendarItem
    key={id}
    title={event[SUBJECT]}
    eventId={id}
    eventStatus={event[STATUS]}
  />
);

export const cellRender = ({ cellValue, cellType, events }) => {
  const shouldEventBeInCell = shouldEventBeInCellMapper({
    cellType,
    cellValue
  });
  const eventsForDate = events
    .filter(isValidStatus)
    .filter(shouldEventBeInCell);
  return eventsForDate.map(renderEventToCalendarItem);
};
