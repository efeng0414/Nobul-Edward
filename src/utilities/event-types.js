import {
  EVENT_TYPE_INPERSON,
  EVENT_TYPE_PHONE_CALL
} from "../../core/constants/events";

export const isPhoneEvent = ({ eventType }) =>
  eventType === EVENT_TYPE_PHONE_CALL;
export const isInPersonEvent = ({ eventType }) =>
  eventType === EVENT_TYPE_INPERSON;
