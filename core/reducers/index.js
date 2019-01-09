import jobs from "./jobs";
import events from "./events";
import users from "./users";
import authentication from "./authentication";
import locale from "./locale";
import stripeCustomers from "./stripeCustomers";
import offers from "./offers";
import listings from "./listings";
import notifications from "./notifications";
import agreements from "./agreements";
import agentRatings from "./agentRatings";
import anonymousEventListeners from "./anonymousEventListeners";
import browseListingMap from "./browseListingMap";
import polygons from "./polygons";
import breakpoints from "./breakpoints";
import createBuyJob from "./createBuyJob";
import createSellJob from "./createSellJob";
import buyStandardProposal from "./buyStandardProposal";
import sellStandardProposal from "./sellStandardProposal";
import buyAutobidProposal from "./buyAutobidProposal";
import sellAutobidProposal from "./sellAutobidProposal";
import config from "./config";

const appReducer = {
  jobs,
  events,
  users,
  authentication,
  locale,
  stripeCustomers,
  offers,
  listings,
  notifications,
  agreements,
  agentRatings,
  anonymousEventListeners,
  browseListingMap,
  polygons,
  breakpoints,
  createBuyJob,
  createSellJob,
  buyStandardProposal,
  sellStandardProposal,
  buyAutobidProposal,
  sellAutobidProposal,
  config
};

export default appReducer;
