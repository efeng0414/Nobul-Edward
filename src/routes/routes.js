import loadable from "loadable-components";

export const NotFound = loadable(() => import("../scenes/not-found"));

export const PermissionDenied = loadable(() =>
  import("../scenes/permission-denied")
);
export const HomePage = loadable(() => import("../scenes/home-page"));

export const BlockEU = loadable(() => import("../scenes/block-eu"));

export const ConsumerRegistration = loadable(() =>
  import("../scenes/consumer-registration")
);

export const AgentRegistration = loadable(() =>
  import("../scenes/agent-registration")
);

export const StandardProposalFlow = loadable(() =>
  import("../scenes/standard-proposal-flow")
);

export const CreateBuyJob = loadable(() => import("../scenes/create-buy-job"));
export const CreateSellJob = loadable(() =>
  import("../scenes/create-sell-job")
);
export const NobulPremium = loadable(() => import("../scenes/nobul-premium"));
export const AgentSettings = loadable(() => import("../scenes/agent-settings"));
export const ConsumerSettings = loadable(() =>
  import("../scenes/consumer-settings")
);

export const MarketPlace = loadable(() => import("../scenes/market-place"));
export const ShowDraftJob = loadable(() => import("../scenes/show-draft-job"));

export const AgentUpdateOffersDetails = loadable(() =>
  import("../scenes/agent-update-offers-details")
);

export const EditJob = loadable(() => import("../scenes/edit-job"));
export const BrowseListingsMap = loadable(() =>
  import("../scenes/browse-listings-map")
);
export const BrowseListings = loadable(() =>
  import("../scenes/browse-listings")
);

export const ViewAgreement = loadable(() => import("../scenes/view-agreement"));
export const ListingDetails = loadable(() =>
  import("../scenes/listing-details")
);

export const ConsumerMyNobul = loadable(() =>
  import("../scenes/my-nobul-consumer")
);

export const AgentJobDetails = loadable(() =>
  import("../scenes/agent-job-details")
);

export const AgentMyNobul = loadable(() => import("../scenes/my-nobul-agent"));

export const AgentRatingView = loadable(() =>
  import("../scenes/agent-rating-view")
);

export const Notifications = loadable(() => import("../scenes/notifications"));

export const GetStarted = loadable(() => import("../scenes/get-started"));

export const ConsumerHomePage = loadable(() =>
  import("../scenes/consumer-home")
);

export const AgentHomePage = loadable(() => import("../scenes/agent-home"));

export const Landing1 = loadable(() => import("../scenes/landing-1"));
export const Landing2 = loadable(() => import("../scenes/landing-2"));
export const Landing3 = loadable(() => import("../scenes/landing-3"));
export const Landing4 = loadable(() => import("../scenes/landing-4"));
export const Landing5 = loadable(() => import("../scenes/landing-5"));
export const FirebaseAuthActionHandler = loadable(() =>
  import("../scenes/firebase-auth-action-handler")
);

export const ErrorPage = loadable(() => import("../scenes/error-page"));
export const Redirect = loadable(() => import("../components/redirect"));
export const InternalVerification = loadable(() =>
  import("../components/internal-verification")
);

export const partialUrl = {
  landing: "real-estate-for-everyone",
  homePage: "/"
};

export const url = {
  home: "/",
  blockEU: "/nobul-eu",
  // homePage: "/",
  landing1: "/real-estate-for-everyone-01",
  landing2: "/real-estate-for-everyone-02",
  landing3: "/real-estate-for-everyone-03",
  landing4: "/real-estate-for-everyone-04",
  landing5: "/real-estate-for-everyone-05",
  homeWithLogin: "/login",
  howItWorks: "/how-it-works",
  permissionDenied: "/permission-denied",
  createBuyJob: "/buy-real-estate",
  contracts: "/contracts",
  createSellJob: "/sell-real-estate",
  consumerRegistration: "/consumer-create-profile",
  agentRegistration: "/agent-create-profile",
  receiveMeetingInvitation: "/receiveMeetingInvitation",
  nobulPremium: "/nobulPremium",
  agentSettings: "/agentSettings",
  consumerSettings: "/consumerSettings",
  marketPlace: "/marketplace",
  showDraftJob: "/showDraftJob",
  browseListings: "/search-real-estate",
  browseListingsMap: "/search-real-estate-map",
  listingDetails: "/property-details/:listingId",
  agentViewOffers: "/my-dashboard/offers",
  agentViewJobDetails: "/proposals/:jobType/:jobId",
  editJob: "/editJob",
  agentViewOfferDetails: "/agentViewOfferDetails/:jobType/:offerId",
  agentUpdateOfferDetails: "/agentUpdateOfferDetails",
  agentRatingView: "/agent-rating/:jobType/:offerId",
  viewAgreement: "/viewAgreement/:agreementType/:agreementId",
  mortgageCalculator: "/mortgageCalculator",
  getStarted: "/get-started",
  standardProposalFlow: "/standard-proposal-flow/step/:step?/:stage?",
  authActionHandler: "/auth-action",
  firebaseAuthActionHandler: "/__/auth/action",

  // Add myDashboard sub-routes to myDashboard routes file
  myNobul: "/my-dashboard",
  notifications: "/myDashboard/activities",

  //agent my nobul
  agentMyNobul: "/agentMyNobul",
  error: "/error",
  internalVerification: "/internal-verification",
  redirect: "/r/:page"
};

export const externalLinks = {
  learnRealEstate: "https://wp.nobul.com/"
};
