import {
  STATUS_ACCEPTED,
  STATUS_AGENT_HAS_PROPOSED,
  STATUS_CONSUMER_HAS_PROPOSED,
  STATUS_DELETED
} from "../../core/constants/events";
import { STATUS } from "../../core/api-transform/events";
import {
  CONSUMER_USER_TYPE,
  AGENT_USER_TYPE
} from "../../core/constants/users";

const statusStringMap = {
  [AGENT_USER_TYPE]: {
    [STATUS_ACCEPTED]: "Accepted",
    [STATUS_CONSUMER_HAS_PROPOSED]: "Requires Attention",
    [STATUS_AGENT_HAS_PROPOSED]: "Pending",
    [STATUS_DELETED]: "Cancelled"
  },
  [CONSUMER_USER_TYPE]: {
    [STATUS_ACCEPTED]: "Accepted",
    [STATUS_AGENT_HAS_PROPOSED]: "Requires Attention",
    [STATUS_CONSUMER_HAS_PROPOSED]: "Pending",
    [STATUS_DELETED]: "Cancelled"
  }
};

const statusClassNameMap = {
  [CONSUMER_USER_TYPE]: {
    [STATUS_ACCEPTED]: "accepted",
    [STATUS_AGENT_HAS_PROPOSED]: "attention",
    [STATUS_CONSUMER_HAS_PROPOSED]: "pending",
    [STATUS_DELETED]: "deleted"
  },
  [AGENT_USER_TYPE]: {
    [STATUS_ACCEPTED]: "accepted",
    [STATUS_CONSUMER_HAS_PROPOSED]: "attention",
    [STATUS_AGENT_HAS_PROPOSED]: "pending",
    [STATUS_DELETED]: "deleted"
  }
};

export const getStringForStatus = ({ status, userType }) =>
  statusStringMap[userType][status];

export const getClassNameForStatus = ({ status, userType }) =>
  statusClassNameMap[userType][status];

const validStatus = [
  STATUS_ACCEPTED,
  STATUS_AGENT_HAS_PROPOSED,
  STATUS_CONSUMER_HAS_PROPOSED,
  STATUS_DELETED
];

export const isValidStatus = ([, event]) => validStatus.includes(event[STATUS]);

export const doesRequireAttentionForConsumer = ([, event]) =>
  event[STATUS] === STATUS_AGENT_HAS_PROPOSED;
export const doesRequireAttentionForAgent = ([, event]) =>
  event[STATUS] === STATUS_CONSUMER_HAS_PROPOSED;
