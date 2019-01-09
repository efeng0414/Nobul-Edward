import { url } from "../../routes/myNobul";
import {
  POSTINGS_ICON,
  PROPOSALS_ICON,
  EVENTS_ICON,
  FAVOURITED_ICON,
  TAGGED_ICON,
  ACTIVITY_ICON,
  SETTINGS_ICON,
  CONTRACTS_ICON,
  SUBSCRIPTIONS_ICON
} from "../../utilities/images";

export const globalConfig = {
  events: {
    url: url.events,
    textKey: "events",
    iconType: EVENTS_ICON
  },
  notifications: {
    url: url.notifications,
    textKey: "activities",
    iconType: ACTIVITY_ICON
  },
  settings: {
    url: url.settings,
    textKey: "settings",
    iconType: SETTINGS_ICON
  }
};

export const agentConfig = {
  offers: {
    url: url.offers,
    textKey: "agentProposals",
    iconType: PROPOSALS_ICON
  },
  contracts: {
    url: url.contracts,
    textKey: "contracts",
    iconType: CONTRACTS_ICON,
    submenu: {
      generate: {
        url: url.contractGenerate,
        textKey: "contractGenerate"
      },
      action: {
        url: url.contractActionRequired,
        textKey: "contractAction",
        className: "agreements-only"
      },
      waiting: {
        url: url.contractWaitingForOthers,
        textKey: "contractWaiting",
        className: "agreements-only"
      },
      completed: {
        url: url.contractCompleted,
        textKey: "contractCompleted",
        className: "agreements-only"
      }
    }
  },
  ...globalConfig
};

export const consumerConfig = {
  postings: {
    url: url.jobs,
    textKey: "postings",
    iconType: POSTINGS_ICON
  },
  offers: {
    url: url.offers,
    textKey: "proposals",
    iconType: PROPOSALS_ICON
  },
  contracts: {
    url: url.contracts,
    textKey: "contracts",
    iconType: CONTRACTS_ICON,
    className: "agreements-only",
    submenu: {
      action: {
        url: url.contractActionRequired,
        textKey: "contractAction",
        className: "agreements-only"
      },
      waiting: {
        url: url.contractWaitingForOthers,
        textKey: "contractWaiting",
        className: "agreements-only"
      },
      completed: {
        url: url.contractCompleted,
        textKey: "contractCompleted",
        className: "agreements-only"
      }
    }
  },
  events: globalConfig.events,
  favourites: {
    url: url.myFavorites,
    textKey: "myFavorites",
    iconType: FAVOURITED_ICON
  },
  taggedListings: {
    url: url.taggedListings,
    textKey: "consumerViewTaggedListings",
    iconType: TAGGED_ICON
  },
  notifications: globalConfig.notifications,
  settings: globalConfig.settings
};
