import React from "react";
import EventListItem from "../event-list-item";
import { isInPersonEvent } from "../../utilities/event-types";
import {
  SUBJECT,
  LOCATION,
  STATUS,
  START_TIME,
  END_TIME,
  PHONE,
  EVENT_TYPE,
  COMMENT
} from "../../../core/api-transform/events";

export const renderEventListItem = ([id, event]) => (
  <EventListItem
    key={id}
    title={event[SUBJECT]}
    location={
      isInPersonEvent({ eventType: event[EVENT_TYPE] }) ? event[LOCATION] : ""
    }
    phoneNumber={event[PHONE]}
    startTime={event[START_TIME]}
    endTime={event[END_TIME]}
    eventId={id}
    status={event[STATUS]}
    comment={event[COMMENT]}
  />
);

export const sortByStartTime = ([, eventA], [, eventB]) =>
  eventA[START_TIME] - eventB[START_TIME];

export const filterByCurrentDate = ([, event]) => {
  const currentDate = new Date().getTime();
  const eventDate = new Date(event[START_TIME]).getTime();
  return eventDate >= currentDate;
};
