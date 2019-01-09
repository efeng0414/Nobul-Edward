import * as myNobul from "./myNobul";
import { url } from "./routes";
import {
  EMAIL_WELCOME_BROWSE_PROPERTIES_TOP,
  EMAIL_WELCOME_FIND_AGENT_TOP,
  EMAIL_WELCOME_BROWSE_PROPERTIES_BOTTOM,
  EMAIL_WELCOME_FIND_AGENT_BOTTOM,
  EMAIL_WELCOME_FACEBOOK,
  EMAIL_WELCOME_TWITTER,
  EMAIL_WELCOME_INSTAGRAM,
  EMAIL_WELCOME_LINKEDIN,
  EMAIL_BIWEEKLY_INCOMPLETE_COMPLETEPROFILE_TOP,
  EMAIL_BIWEEKLY_INCOMPLETE_COMPLETEPROFILE_MIDDLETOPLEFT,
  EMAIL_BIWEEKLY_INCOMPLETE_FAVORITE_MIDDLETOPRIGHT,
  EMAIL_BIWEEKLY_INCOMPLETE_POSTING_MIDDLEBOTTOMLEFT,
  EMAIL_BIWEEKLY_INCOMPLETE_TAGPROPERTY_MIDDLEBOTTOMRIGHT,
  EMAIL_BIWEEKLY_INCOMPLETE_BROWSE_BOTTOM,
  EMAIL_BIWEEKLY_INCOMPLETE_FACEBOOK,
  EMAIL_BIWEEKLY_INCOMPLETE_TWITTER,
  EMAIL_BIWEEKLY_INCOMPLETE_INSTAGRAM,
  EMAIL_BIWEEKLY_INCOMPLETE_LINKEDIN,
  EMAIL_BIWEEKLY_BUYER_POSTING_TOP,
  EMAIL_BIWEEKLY_BUYER_FAVORITE_MIDDLETOPLEFT,
  EMAIL_BIWEEKLY_BUYER_POSTING_MIDDLETOPRIGHT,
  EMAIL_BIWEEKLY_BUYER_TAGPROPERTY_MIDDLEBOTTOMLEFT,
  EMAIL_BIWEEKLY_BUYER_PROPOSALS_MIDDLEBOTTOMRIGHT,
  EMAIL_BIWEEKLY_BUYER_POSTING_BOTTOM,
  EMAIL_BIWEEKLY_BUYER_FACEBOOK,
  EMAIL_BIWEEKLY_BUYER_TWITTER,
  EMAIL_BIWEEKLY_BUYER_INSTAGRAM,
  EMAIL_BIWEEKLY_BUYER_LINKEDIN,
  EMAIL_BIWEEKLY_SELLER_POSTING_TOP,
  EMAIL_BIWEEKLY_SELLER_FAVORITE_MIDDLETOPLEFT,
  EMAIL_BIWEEKLY_SELLER_POSTING_MIDDLETOPRIGHT,
  EMAIL_BIWEEKLY_SELLER_TAGPROPERTY_MIDDLEBOTTOMLEFT,
  EMAIL_BIWEEKLY_SELLER_PROPOSALS_MIDDLEBOTTOMRIGHT,
  EMAIL_BIWEEKLY_SELLER_POSTING_BOTTOM,
  EMAIL_BIWEEKLY_SELLER_FACEBOOK,
  EMAIL_BIWEEKLY_SELLER_TWITTER,
  EMAIL_BIWEEKLY_SELLER_INSTAGRAM,
  EMAIL_BIWEEKLY_SELLER_LINKEDIN
} from "../utilities/google-tag-variable";

// Use route /r/[path] to redirect to the required URL
export const redirectAliases = {
  /******************************** 
      Internal links - use url object
    *********************************/

  // bi-weekly: seg 1, incomplete
  "email-biweekly-incomplete-completeprofile-top": {
    path: `${myNobul.url.settings}?tab=account`,
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_COMPLETEPROFILE_TOP
  },
  "email-biweekly-incomplete-completeprofile-middletopleft": {
    path: `${myNobul.url.settings}?tab=account`,
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_COMPLETEPROFILE_MIDDLETOPLEFT
  },
  "email-biweekly-incomplete-favorite-middletopright": {
    path: myNobul.url.myFavorites,
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_FAVORITE_MIDDLETOPRIGHT
  },
  "email-biweekly-incomplete-posting-middlebottomleft": {
    path: `${url.createBuyJob}?ref=landing`,
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_POSTING_MIDDLEBOTTOMLEFT
  },
  "email-biweekly-incomplete-tagproperty-middlebottomright": {
    path: myNobul.url.taggedListings,
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_TAGPROPERTY_MIDDLEBOTTOMRIGHT
  },
  "email-biweekly-incomplete-browse-bottom": {
    path: url.browseListings,
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_BROWSE_BOTTOM
  },

  // bi-weekly: seg 2, buyer
  "email-biweekly-buyer-posting-top": {
    path: `${url.createBuyJob}?ref=landing`,
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_POSTING_TOP
  },
  "email-biweekly-buyer-favorite-middletopleft": {
    path: myNobul.url.myFavorites,
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_FAVORITE_MIDDLETOPLEFT
  },
  "email-biweekly-buyer-posting-middletopright": {
    path: `${url.createBuyJob}?ref=landing`,
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_POSTING_MIDDLETOPRIGHT
  },
  "email-biweekly-buyer-tagproperty-middlebottomleft": {
    path: myNobul.url.taggedListings,
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_TAGPROPERTY_MIDDLEBOTTOMLEFT
  },
  "email-biweekly-buyer-proposals-middlebottomright": {
    path: url.getStarted,
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_PROPOSALS_MIDDLEBOTTOMRIGHT
  },
  "email-biweekly-buyer-posting-bottom": {
    path: `${url.createBuyJob}?ref=landing`,
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_POSTING_BOTTOM
  },

  // bi-weekly: seg 2, seller
  "email-biweekly-seller-posting-top": {
    path: `${url.createSellJob}?ref=landing`,
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_POSTING_TOP
  },
  "email-biweekly-seller-favorite-middletopleft": {
    path: myNobul.url.myFavorites,
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_FAVORITE_MIDDLETOPLEFT
  },
  "email-biweekly-seller-posting-middletopright": {
    path: `${url.createSellJob}?ref=landing`,
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_POSTING_MIDDLETOPRIGHT
  },
  "email-biweekly-seller-tagproperty-middlebottomleft": {
    path: myNobul.url.taggedListings,
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_TAGPROPERTY_MIDDLEBOTTOMLEFT
  },
  "email-biweekly-seller-proposals-middlebottomright": {
    path: url.getStarted,
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_PROPOSALS_MIDDLEBOTTOMRIGHT
  },
  "email-biweekly-seller-posting-bottom": {
    path: `${url.createSellJob}?ref=landing`,
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_POSTING_BOTTOM
  },

  // welcome email
  "email-welcome-browse-properties-top": {
    path: url.browseListings,
    GTM_EVENT: EMAIL_WELCOME_BROWSE_PROPERTIES_TOP
  },
  "email-welcome-find-agent-top": {
    path: url.getStarted,
    GTM_EVENT: EMAIL_WELCOME_FIND_AGENT_TOP
  },
  "email-welcome-browse-properties-bottom": {
    path: url.browseListings,
    GTM_EVENT: EMAIL_WELCOME_BROWSE_PROPERTIES_BOTTOM
  },
  "email-welcome-find-agent-bottom": {
    path: url.getStarted,
    GTM_EVENT: EMAIL_WELCOME_FIND_AGENT_BOTTOM
  },
  "email-welcome-dashboard-footer": {
    path: url.myNobul
  },
  "email-welcome-find-agent-footer": {
    path: url.getStarted
  },
  "email-welcome-browse-properties-footer": {
    path: url.browseListings
  },

  /**************************************** 
     External links - must begin with "http"
    *****************************************/

  // bi-weekly: seg 1, incomplete
  "email-biweekly-incomplete-facebook": {
    path: "http://www.facebook.com/nobulrealestate",
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_FACEBOOK
  },
  "email-biweekly-incomplete-linkedin": {
    path: "https://www.linkedin.com/company/nobul",
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_LINKEDIN
  },
  "email-biweekly-incomplete-twitter": {
    path: "https://twitter.com/nobul",
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_TWITTER
  },
  "email-biweekly-incomplete-instagram": {
    path: "http://www.instagram.com/nobulrealestate",
    GTM_EVENT: EMAIL_BIWEEKLY_INCOMPLETE_INSTAGRAM
  },
  "email-biweekly-incomplete-contact-bottom": {
    path: "https://corp.nobul.com/contact-us"
  },

  // bi-weekly: seg 2, buyer
  "email-biweekly-buyer-facebook": {
    path: "http://www.facebook.com/nobulrealestate",
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_FACEBOOK
  },
  "email-biweekly-buyer-linkedin": {
    path: "https://www.linkedin.com/company/nobul",
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_LINKEDIN
  },
  "email-biweekly-buyer-twitter": {
    path: "https://twitter.com/nobul",
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_TWITTER
  },
  "email-biweekly-buyer-instagram": {
    path: "http://www.instagram.com/nobulrealestate",
    GTM_EVENT: EMAIL_BIWEEKLY_BUYER_INSTAGRAM
  },
  "email-biweekly-buyer-contact-bottom": {
    path: "https://corp.nobul.com/contact-us"
  },

  // bi-weekly: seg 2, seller
  "email-biweekly-seller-facebook": {
    path: "http://www.facebook.com/nobulrealestate",
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_FACEBOOK
  },
  "email-biweekly-seller-linkedin": {
    path: "https://www.linkedin.com/company/nobul",
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_LINKEDIN
  },
  "email-biweekly-seller-twitter": {
    path: "https://twitter.com/nobul",
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_TWITTER
  },
  "email-biweekly-seller-instagram": {
    path: "http://www.instagram.com/nobulrealestate",
    GTM_EVENT: EMAIL_BIWEEKLY_SELLER_INSTAGRAM
  },
  "email-biweekly-seller-contact-bottom": {
    path: "https://corp.nobul.com/contact-us"
  },

  // welcome email
  "email-welcome-twitter": {
    path: "https://twitter.com/nobul",
    GTM_EVENT: EMAIL_WELCOME_TWITTER
  },
  "email-welcome-facebook": {
    path: "http://www.facebook.com/nobulrealestate",
    GTM_EVENT: EMAIL_WELCOME_FACEBOOK
  },
  "email-welcome-instagram": {
    path: "http://www.instagram.com/nobulrealestate",
    GTM_EVENT: EMAIL_WELCOME_INSTAGRAM
  },
  "email-welcome-linkedin": {
    path: "https://www.linkedin.com/company/nobul",
    GTM_EVENT: EMAIL_WELCOME_LINKEDIN
  },
  "email-welcome-terms-footer": {
    path: "https://corp.nobul.com/legal/terms-and-conditions/"
  },
  "email-welcome-privacy-footer": {
    path: "https://corp.nobul.com/legal/privacy-policy/"
  }
};
