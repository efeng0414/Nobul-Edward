import loadable from "loadable-components";

/**************************
    Consumer components
/**************************/

export const ConsumerSettings = loadable(() =>
  import("../scenes/consumer-settings")
);

export const Notifications = loadable(() => import("../scenes/notifications"));

export const ConsumerJobs = loadable(() => import("../scenes/consumer-jobs"));

export const Contracts = loadable(() => import("../scenes/contracts"));

export const AgentOffers = loadable(() => import("../scenes/agent-offers"));

export const Subscriptions = loadable(() =>
  import("../scenes/agent-subscriptions")
);

export const ConsumerOffers = loadable(() =>
  import("../scenes/consumer-offers")
);

export const ConsumerJobDetails = loadable(() =>
  import("../scenes/consumer-job-details")
);

export const ConsumerJobOffers = loadable(() =>
  import("../scenes/consumer-job-offers")
);

export const ConsumerMyFavorites = loadable(() =>
  import("../scenes/consumer-my-favorites")
);

export const ConsumerViewTaggedListings = loadable(() =>
  import("../scenes/consumer-view-tagged-listings")
);

export const GenerateAgreement = loadable(() =>
  import("../scenes/create-agreement")
);

export const ConsumerViewMyEvents = loadable(() =>
  import("../scenes/consumer-view-my-events")
);

export const ConsumerOfferDetails = loadable(() =>
  import("../scenes/consumer-offer-details")
);

export const ConsumerProposalDetails = loadable(() =>
  import("../scenes/consumer-proposal-details")
);

export const NotFound = loadable(() => import("../scenes/not-found"));

/**************************
    Agent components
/**************************/

export const AgentSettings = loadable(() => import("../scenes/agent-settings"));

export const AgentViewMyEvents = loadable(() =>
  import("../scenes/agent-view-my-events")
);

export const AgentOfferDetails = loadable(() =>
  import("../scenes/agent-offer-details")
);

/**************************
    Unused components
/**************************/

// Used in contracts to switch paths.
export const contractPaths = {
  generate: "generate",
  actionRequired: "action-required",
  waitingForOthers: "waiting",
  completed: "completed"
};

/**************************
    Routes
/**************************/
export const url = {
  root: "/my-dashboard",
  settings: "/my-dashboard/settings",
  contracts: "/my-dashboard/contracts",
  jobs: "/my-dashboard/postings",
  offers: "/my-dashboard/proposals",
  myFavorites: "/my-dashboard/favourites",
  events: "/my-dashboard/events",
  subscriptions: "/my-dashboard/subscriptions",
  notifications: "/my-dashboard/activities",
  consumerViewTaggedListings: "/my-dashboard/tagged-properties",
  consumerViewMyEvents: "/my-dashboard/events",
  offerDetails: "/my-dashboard/proposals/:jobType/:offerId",
  taggedListings: "/my-dashboard/tagged-properties",

  // Contract
  contractDefault: "/my-dashboard/contracts/:path?",
  contractGenerate: `/my-dashboard/contracts/${contractPaths.generate}`,
  contractActionRequired: `/my-dashboard/contracts/${
    contractPaths.actionRequired
  }`,
  contractWaitingForOthers: `/my-dashboard/contracts/${
    contractPaths.waitingForOthers
  }`,
  contractCompleted: `/my-dashboard/contracts/${contractPaths.completed}`,

  //not currently linked in my-dashboard page
  consumerJobDetails: "/my-dashboard/postings/:jobType/:jobId",
  consumerJobOffers: "/my-dashboard/postings/:jobType/:jobId/proposals",
  generateAgreementRoot: "/my-dashboard/generate-agreement",
  generateAgreement:
    "/my-dashboard/generate-agreement/:format?/:formType?/:offerId?",

  //partial url
  partialConsumerJobDetails: "/my-dashboard/postings",
  partialConsumerJobOffers: "/my-dashboard/proposals",
  accountSettings: "/my-dashboard/settings?tab=account"
};

/**************************
    Routes helper functions
/**************************/
export const getUserPostingUrl = ({ jobType, jobId }) => {
  return url.consumerJobDetails
    .replace(":jobType", jobType)
    .replace(":jobId", jobId);
};

export const getAgentProposalUrl = ({ jobType, offerId }) => {
  return url.offerDetails
    .replace(":jobType", jobType)
    .replace(":offerId", offerId);
};
