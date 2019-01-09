import { STATUS, UNREAD } from "../../core/constants/notifications";
import { VISIBLE_TO_USER } from "../../core/api-transform/notifications";

export const isVisible = notification =>
  Object.values(notification)[0][VISIBLE_TO_USER];

export const isUnread = notification =>
  Object.values(notification)[0][STATUS] === UNREAD;

export const isUnreadAndVisible = notification =>
  isVisible(notification) && isUnread(notification);
