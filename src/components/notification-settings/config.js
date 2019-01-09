import {
  EVENT,
  PROPOSAL_NOTIFICATION,
  POSTING_NOTIFICATION,
  CONSENT_EMAIL_NOTIFICATIONS
} from "../../../core/api-transform/users";
import { ALL } from "./utilities";

export const consumerConfig = {
  [ALL]: {
    label: "consumerSettings.notification.all.label"
  },
  [EVENT]: {
    label: "consumerSettings.notifications.event.label",
    subText: "consumerSettings.notifications.event.subText",
    isCheckedProp: "isEventNotificationChecked"
  },
  [PROPOSAL_NOTIFICATION]: {
    label: "consumerSettings.notifications.proposal.label",
    subText: "consumerSettings.notifications.proposal.subText",
    isCheckedProp: "isProposalNotificationChecked"
  },
  [POSTING_NOTIFICATION]: {
    label: "consumerSettings.notifications.posting.label",
    subText: "consumerSettings.notifications.posting.subText",
    isCheckedProp: "isPostingNotificationChecked"
  },
  [CONSENT_EMAIL_NOTIFICATIONS]: {
    label: "consumerSettings.account.emailNotifications",
    isCheckedProp: "isEmailNotificationChecked"
  }
};

export const agentConfig = {
  [ALL]: {
    label: "consumerSettings.notification.all.label"
  },
  [EVENT]: {
    label: "consumerSettings.notifications.event.label",
    subText: "agentSettings.notifications.event.subText",
    isCheckedProp: "isEventNotificationChecked"
  },
  [PROPOSAL_NOTIFICATION]: {
    label: "consumerSettings.notifications.proposal.label",
    subText: "agentSettings.notifications.proposal.subText",
    isCheckedProp: "isProposalNotificationChecked"
  },
  [POSTING_NOTIFICATION]: {
    label: "agentSettings.notifications.posting.label",
    subText: "agentSettings.notifications.posting.subText",
    isCheckedProp: "isPostingNotificationChecked"
  },
  [CONSENT_EMAIL_NOTIFICATIONS]: {
    label: "agentSettings.account.emailNotifications",
    isCheckedProp: "isEmailNotificationChecked"
  }
};
