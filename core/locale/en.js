import {
  REBATE_COMMISSION_MIN,
  REBATE_COMMISSION_MAX,
  LISTING_COMMISSION_MIN,
  LISTING_COMMISSION_MAX,
  COOPERATING_COMMISSION_MIN,
  COOPERATING_COMMISSION_MAX
} from "../data/propertyData";

import {
  CREATED_AT,
  JOB_TYPE,
  PRICE_RANGE_LOW,
  PRICE_RANGE_HIGH,
  PROPERTY_TYPE
} from "../api-transform/jobs";

import {
  minPasswordLength,
  maxPasswordLength,
  premiumPrice,
  emailReminderDays
} from "../constants/shared";
import { ON_REGIONAL_CONTENT } from "./regionalization/ON/en";
import { FL_REGIONAL_CONTENT } from "./regionalization/FL/en";
import { GA_REGIONAL_CONTENT } from "./regionalization/GA/en";

const generateRegionalContent = ({ region, regionContent }) => {
  const CONTENT = {};
  regionContent &&
    Object.keys(regionContent).map(
      key => (CONTENT[`regionalContent.${region}.${key}`] = regionContent[key])
    );
  return CONTENT;
};

// Add the content specific to regions.
const regionalContent = {
  ...generateRegionalContent({
    region: "ON",
    regionContent: ON_REGIONAL_CONTENT
  }),
  ...generateRegionalContent({
    region: "FL",
    regionContent: FL_REGIONAL_CONTENT
  }),
  ...generateRegionalContent({
    region: "GA",
    regionContent: GA_REGIONAL_CONTENT
  })
};

export const ENGLISH_TRANSLATION = {
  language: "en",
  messages: {
    ...regionalContent,

    // Header
    myNobul: "MY DASHBOARD",
    home: "Home",
    howNobulWorks: "HOW NOBUL WORKS",
    learnRealEstate: "LEARN ABOUT REAL ESTATE",
    corporate: "Corporate",

    loading: "Loading...",

    subscribes: "SUBSCRIBES",
    bids: "Bids",
    browse: "BROWSE",
    offers: "OFFERS",
    postings: "Postings",
    messages: "Messages",
    activities: "Activities",
    events: "Events",
    drafts: "Drafts",
    myFavorites: "My Favorites",
    consumerViewTaggedListings: "Tagged Properties",
    IAmAgent: "I AM AN AGENT",
    IAmConsumer: "I AM A BUYER / SELLER",
    postingDefaultName: "Posting #",
    open: "Open",
    expired: "Expired",
    deleted: "Deleted",
    pendingConfirmation: "Pending Confirmation",
    accepted: "Accepted",
    closed: "Closed",

    forAgent: "FOR AGENT",
    forConsumers: "FOR CONSUMERS",
    notifications: "NOTIFICATIONS",
    recents: "RECENTS",
    settings: "Settings",
    subscriptions: "Subscriptions",
    account: "ACCOUNT",
    profile: "PROFILE",
    myProfile: "My Profile",
    businessProfile: "Business Profile",
    filters: "Filters",
    filterBy: "Filter by",
    region: "Region",
    close: "Close",
    closed: "Closed",
    welcomeUser: "Hi {name}",
    browseProperties: "Browse Properties",
    seeAll: "See All",
    hireAgent: "Hire Agent",
    marketplaceChooseFirstRegion: "Where do you usually work?",
    regionsWhereYouWork: "Regions where you work",
    "mobile.regionsWhereYouWork": "Working Regions",
    marketplaceNotAgentProvinceOrStateError:
      "You cannot pick a location outside your province/state of operation",
    "marketplace.noSupportForLocation":
      "Sorry we currently do not support this location",
    "marketplace.mobile.step1": "Select your region by switching to map view",
    "marketplace.mobile.step2":
      "Enter a city and tap the map to select a neighbourhood(s)",
    "marketplace.mobile.step3": "Select Next",

    rememberMe: "Remember me",
    signIn: "Sign In",
    comingSoon: "Coming soon",

    //Firebase errors
    "There is no user record corresponding to this identifier. The user may have been deleted.":
      "Sorry, we cannot find this Email address in our records. Please try again or contact us.",
    "The password is invalid or the user does not have a password.":
      "Invalid password.",

    //Block EU
    "blockEU.copy1": "Thank you for visiting!",
    "blockEU.copy2":
      "Unfortunately, we are not currently available in your region.",

    "blockEU.copy3": "To learn more about nobul, visit us at ",

    //Numbers
    "1+": "1+",
    "2+": "2+",
    "3+": "3+",
    "4+": "4+",
    "5+": "5+",

    // Standard proposal
    "proposal.typeOfProperties":
      "What types of properties do you want to help prospective clients buy and sell?",
    "proposal.typeLocation": "Where do you typically work?",
    "proposal.selectedNeighborhood.listTitle": "My Neighborhoods",
    "proposal.selectNeighborhoods":
      "Please select the neighborhood(s) where you work",
    "proposal.selectNeighborhoodsSubtitle": "Is this where you work?",
    "proposal.tagLineTitle": "Tell us what makes your proposals stand out",
    "proposal.tagLineSubTitle":
      "What is the most important thing you want potential clients to know when they see your proposals? (max: 50 characters)",
    "proposal.tagLineText":
      "For example: Luxury market specialist! / All services offered! / Twenty years experience!",
    "proposal.tagLineTooltip": `Honesty is the best policy. Avoid false claims and sweeping statements (i.e. I’m number one…) unless you can provide proof. Don't worry: you can also change your statement with each proposal submission.`,
    "proposal.descriptionTitle": `Tell us what makes you stand out as an agent`,
    "proposal.descriptionSubTitle": `Make it personal. What is the most important thing you want potential clients to know about you? What sets you apart from the rest? (max: 100 characters) `,
    "proposal.descriptionText": `For example: "I specialize in helping growing families smoothly transition to larger homes in better school districts."`,
    "proposal.descriptionTooltip": `Honesty is the best policy. Avoid false claims and sweeping statements (i.e. I’m number one…) unless you can provide proof. This description can only be edited via your individual settings page—otherwise, it will be a permanent fixture on all of your proposal submissions.`,
    "proposal.congratulations": "Congratulations!",
    "proposal.congratulationsParagraph":
      "You are ready to start growing your business!",
    "proposal.cancelTitle": "Are you sure?",
    "proposal.cancelText":
      "Are you sure you want to leave this page? Your proposal and information will not be saved.",
    "proposal.buyerServices": "What services do you typically provide BUYERS?",
    "proposal.buyerServicesTooltip":
      "Be prepared to follow through on ALL services that you claim to offer. Clients are counting on you to be honest and transparent. These services can be amended once you’ve communicated with your potential buyer.",
    "proposal.sellerServices":
      "What services do you typically provide when LISTING a property?",
    "proposal.sellerServicesTooltip":
      "Be prepared to follow through on ALL services that you claim to offer. Clients are counting on you to be honest and transparent. These services can be amended once you’ve communicated with your potential seller.",

    "proposal.selectAll": "Please select all that apply:",
    "mobile.proposal.selectAll": "Select All",

    leavePage: "Leave this page",

    //Alt tags
    "alt.phoneIcon": "Phone Icon",

    //Footer
    aboutUs: "About us",
    ourTeam: "Our Team",
    nobulMagazine: "Nobul Blog",
    contactUs: "Contact Us",
    pressCenter: "Press Center",
    buyerSellerFaq: "Buyer/Seller FAQ",
    agentFaq: "Agent FAQ",
    joinOurTeam: "Join Our Team",
    privacy: "Privacy",
    siteMap: "Site Map",
    termsOfUse: "Terms of Use",
    downloadAppStore: "Download on the App Store",
    downloadGooglePlay: "Get it on Google Play",
    mlsTrademark:
      "The MLS® mark and associated logos identify professional services rendered by REALTOR® members of CREA to affect the purchase, sale and lease of real estate as part of a cooperative selling system.",
    copyright: " Copyright © 2018 Nobul Corporation. All rights reserved",
    nobul: "Nobul",
    facebook: "Facebook",
    twitter: "Twitter",
    instagram: "Instagram",

    //forgot password
    forgotYourPassword: "Forgot your password",
    forgotPassword: "Forgot password",
    resetPassword: "Reset Password",
    "mobile.forgotPassword.noUser":
      "Sorry, we cannot find this Email address in our records. Please try again or contact us.",

    //settings
    proposalSettings: "Proposal Settings",
    "mobile.proposalSetup": "Proposal Setup",
    defaultSettings: "Default Settings",
    accountSettings: "Account Settings",
    subscriptionSettings: "Subscription Settings",
    notificationSettings: "Notification Settings",
    profileSettings: "Profile",
    notificationsSettings: "Notifications",
    "newsletter.mobile": "Newsletter",
    regions: "Regions",
    editRegionsWebView:
      "Please log in via our website to edit your working regions",
    agentServices: "Agent Services",
    sellingServices: "Selling Services",
    buyingServices: "Buying Services",
    changePassword: "Change Password",
    "changePassword.mobile.rule1": "Password must contain:",
    "changePassword.mobile.rule2": "• Minimum 6 characters",
    "changePassword.mobile.rule3":
      "• New Password and Confirm Password should not be same as Current Password",
    "changePassword.mobile.rule4":
      "• New Password should be the same as Confirm Password",
    newOffers: "New Offers",
    messagesSettings: "Messages",
    newEvents: "New Events",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    confirm: "Confirm",
    listingRate: "Listing rate",
    listingRateDescription: "Listing rate description",
    cooperativeRate: "Cooperative rate",
    cooperativeRateDescription: "Cooperative rate description",
    rebate: "Rebate rate",

    propertyClass: "Property Class",

    firstName: "First Name",
    lastName: "Last Name",
    name: "Name",
    phone: "Phone Number",
    email: "Email",
    address: "Address",
    addressLine1: "Address Line 1",
    addressLine2: "Address Line 2",
    buy: "Buy",
    sell: "Sell",
    buyer: "Buyer",
    seller: "Seller",
    all: "All",
    password: "Password",
    createPassword: "Create Password",
    passwordConfirm: "Confirm Password",
    termsOfService: "Terms of Service",
    alreadyHaveAccount: "Already have an account?",
    login: "Login",
    dontHaveAccount: "Don't have an account yet?",
    registration: "Registration",
    registrationCap: "REGISTRATION",
    clickToUpload: "Click to upload",
    getStarted: "Get Started",
    province: "Province or State",
    state: "State",
    provinceLicense: "Province / State",
    provinceOrState: "Province or State",
    city: "City",
    postalOrZipCode: "Postal / Zip Code",
    postalCode: "Postal Code",
    zipCode: "Zip Code",
    country: "Country",
    countryLicense: "Country",
    skip: "Skip",
    goBack: "Go Back",
    addRegion: "Add Region",
    showAll: "Show all",
    map: "Map",
    sortBy: "Sort by",
    sortByDate: "Sort by date",
    sortByPrice: "Sort by price",
    highToLow: "High to Low",
    lowToHigh: "Low to High",
    newToOld: "New to Old",
    oldToNew: "Old to New",
    residential: "Residential",
    Residential: "Residential",
    commercial: "Commercial",
    Commercial: "Commercial",
    marketPlace: "MARKETPLACE",
    marketPlaceNoJobs:
      "There are no more postings for this region. Please choose another.",
    "mobile.noPostingsMade": "No postings created",
    "marketplaceFilterCount.mobile": "Postings Available",
    createPostingsForAgents:
      "Create postings to get offers from your matching agents",
    enterAddress: "Please enter your address",
    selectRegion: "Please select your region",
    "selectRegions.mobile": "Select your region",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    bedroom: "Bedroom",
    bathroom: "Bathroom",
    location: "Location",
    locations: "Locations",
    from: "from ",
    to: "to ",
    service: "Service",
    services: "Services",
    price: "Price",
    date: "Date",
    asc: "asc",
    any: "Any",
    more: "More",
    filter: "Filter",
    buyerPostings: "BUYER POSTINGS",
    sellerPostings: "SELLER POSTINGS",
    proposals: "Proposals",
    agentProposals: "Sent Proposals",
    myProposals: "My Proposals",
    addProposals: "All Proposals",
    defaultConsumerJobTitle: "New Posting",
    defaultPropertyDescription:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people.",
    defaultPropertyClosed:
      "The deal was closed on July 12 2018 with agent Placeholder",
    dealClosed: "The deal was closed on ",
    apply: "Apply",
    other: "Other",
    change: "Change",
    myStandardProposal: "MY STANDARD PROPOSAL",
    nobul101: "Nobul 101",
    findAnAgent: "Find an Agent",
    menu: "Menu",

    // Agreements
    property: "Property",
    createdOn: "Created on",
    version: "Version",
    clientName: "Client Name",
    secondClientName: "Second client Name",
    agentName: "Agent Name",
    agentPhone: "Agent phone number",
    agentEmail: "Agent email address",
    brokeragePhone: "Brokerage phone",
    clientAddress: "Client Address",
    clientPhone: "Client Phone",
    secondClientPhone: "Second client phone",
    propertyAddress: "Property Address",
    propertyArea: "Property area",
    brokerageName: "Brokerage Name",
    brokerageAddress: "Brokerage Address",
    brokerFax: "Broker fax",
    mlsNumber: "MLS®#",
    uploadAgreement: "Upload Agreement",
    startDate: "Start date",
    commission: "Commission",
    commissionAlternative: "Alternative to commission",
    holdoverPeriod: "Holdover period (days)",
    propertyPrice: "Property price",
    listingType: "Listing type",
    municipality: "Municipality",
    referralFee: "Referral fee",
    validFor: "Valid for (period of time)",
    payWithin: "Broker shall pay referring broker within number of days:",
    commissionType: "Commission type",
    approvalType: "Buyer has been",
    preferredTerms: "Preferred terms and conditions",
    approvalTerms: "Approval amount and terms",
    retainerAmount: "Retainer amount",
    retainerCredit: "Retainer credited to buyer",
    referralExtra: "plus (optional)",
    specialClauses: "Special clauses",
    chooseFormJurisdiction: "Choose form jurisdiction",
    chooseFormDefault: "Default contract",
    lookingFor: "is looking for ",
    lookingBuy: "Looking to Buy: ",
    lookingSell: "Looking to Sell: ",
    "agreements.buyerRepresentation": "Buyer Representation",
    "agreements.listingRepresentation": "Listing Representation",
    "agreements.documents": "Documents",
    "agreements.completed": "Completed",
    "agreements.needToSign": "Need to Sign",
    "agreements.waiting": "Waiting for Others",
    "agreements.province": "Province",
    "agreements.client": "Client",
    "agreements.agent": "Agent",
    "agreements.actionRequired": "Action Required",
    "agreements.waitingForOthers": "Waiting for Others",
    "agreements.contracts": "Contracts",
    scheduleText: "Text for schedule",
    rebatePercentage: "Rebate percentage",
    brokerOfRecordName: "Your broker of record's name",
    brokerOfRecordEmail: "Your broker of record's email address",
    contractHeaderListing:
      "Please enter details to fill out your MLS listing contract",
    contractHeaderRepresentation:
      "Please enter details to fill out your representation contract",
    referralAgreementText:
      "All price ranges, property types, and all locations for a period of two years from the date of Nobul Corporation's signature below.",
    enterPropertyAddress: "Enter property address",
    servicesToBeProvided: "Services to be provided",

    contractInstructionsRepresentation:
      "This form will be used to generate the representation contract between you and your client. They will then be able to use DocuSign to digitally sign the contract, which you can then download. Please check all data for accuracy before submitting.",
    contractInstructionsListing:
      "This form will be used to generate the listing contract between you and your client. They will then be able to use DocuSign to digitally sign the contract, which you can then download. Please check all data for accuracy before submitting.",
    "error.selectBuyOrSell":
      "Please select if you are looking to buy, sell, or both",
    "error.saveProposalError": "There has been an error saving your proposal",
    "error.brokerOfRecordEmail":
      "Please enter your broker of record's email address",
    "error.brokerOfRecordName": "Please enter your broker of record's name",
    "error.brokerageAddressIsRequired": "Brokerage address is required",

    "agreement.envelopeSent": "Envelope sent!",
    "agreement.successMessage": "We have successfully sent your envelope",

    "agreement.sendConfirmHeader": "You are about to send a contract",
    "agreement.sendConfirmText":
      "Please ensure all data in the contract is accurate. This will be sent to your client to digitally sign and will form part of your agreement with them.",
    "agreement.sendConfirmText2":
      'Press "OK" to send the contract, or "Cancel" to return to the document to make changes.',

    "contracts.noneHeader": "You have 0 contracts. Let's work on that!",
    "contracts.noneParagraph1": "Submit more proposals. Sign more contracts.",
    "contracts.noneParagraph2": "Browse buyers and sellers!",
    "contracts.noneButton": "Start now",
    "contracts.unavailable.header":
      "Digital contracts are not available for your region",
    "contracts.unavailable.text":
      "<p>Managing your contracts online with Nobul makes administration quicker, easier and more transparent.</p><p>Digital contracts for this region will be coming soon.</p>",

    // Form names
    referralAgreement: "Referral Agreement",
    buyersRepresentationAgreement: "Buyers representation agreement",
    sellersListingAgreement: "Sellers listing agreement",

    "relationship.singleAgent": "Single agent of the buyer",
    "relationship.transactionBroker": "Transaction broker",
    "relationship.singleAgentTransition":
      "Single agent of the buyer with consent to transition into a transaction broker",
    "relationship.nonrepresentative": "Nonrepresentative of buyer",

    //Select statements
    selectPriceRange: "Select Price Range",
    selectNeighbourhood: "Select neighborhood",
    selectAgentServices: "Select Agent Services",
    selectServicesRange: "Select Services Range",
    selectExactServices: "Select Exact Services",
    selectPropertyType: "Select Property Type",
    selectPropertyFeatures: "Select Property Features",

    //Auto-bidding
    propertyType: "Property Type",
    description: "Description",
    neighborhood: "Neighborhood",
    neighborhoods: "Neighborhoods",
    choosePriceRange: "Pick a price range",
    priceRange: "Price Range",
    rebateCommission: "Rebate Commission",
    listingCommission: "Listing Brokerage Commission",
    cooperatingCommission: "Buyer Brokerage Commission",
    listingCommissionField: "Listing commission",
    rebateCommissionHelp: `Percentage value between ${REBATE_COMMISSION_MIN} and ${REBATE_COMMISSION_MAX}`,
    listingCommissionHelp: `Percentage value between ${LISTING_COMMISSION_MIN} and ${LISTING_COMMISSION_MAX}`,
    cooperatingCommissionHelp: `Percentage value between ${COOPERATING_COMMISSION_MIN} and ${COOPERATING_COMMISSION_MAX}`,
    listingPreferences: "Listing Preferences",
    buyingPreferences: "Buying Preferences",
    brokerageCommission: "Brokerage Commissions",
    "mobile.workingRegions": "Working Regions",

    //Option Labels
    timeline1: "0-3 months",
    timeline2: "3-6 months",
    timeline3: "6-9 months",
    timeline4: "9-12 months",
    timeline5: "12+ months",

    // Listings sort
    "sort.listTimeHighLow": "Date newest to oldest",
    "sort.listTimeLowHigh": "Date oldest to newest",
    "sort.listPriceLowHigh": "Price low to high",
    "sort.listPriceHighLow": "Price high to low",
    "sort.lotSizeRawLowHigh": "Lot size smallest to largest",
    "sort.lotSizeRawHighLow": "Lot size largest to smallest",
    "sort.lotFrontageHighLow": "Frontage narrowest to widest",
    "sort.lotFrontageLowHigh": "Frontage widest to narrowest",

    offerOfServices:
      "You are offering services to the buyer. If the buyer accepts your offer, you will be directed to generate a Buyer's Representation Agreement with the buyer",
    fee: "Fee",
    listingCommissionDescription:
      "Let the seller know what your fee would be to offer your services in order to represent them.",
    cooperatingCommissionDescription:
      "Let the buyer know what your fee would be to offer your services in order to represent them",
    rebateDescription:
      "You can include a rebate i.e: a bonus to the buyer in return for closing a property with you",
    feeCalculator: "Fee calculator",
    servicesFor: "Services for {userType}",
    servicesForDescription:
      "Select the rant of services that you wish to offer to the {userType}",

    lowestCost: "Lowest Cost",
    lowerCost: "LowerCost",
    aBalance: "A Balance",
    moreServices: "More Services",
    mostServices: "Most Services",

    highestRebate: "Highest Rebate",
    moreRebates: "More Rebates",
    possible: "Possible",

    saveDraft: "Save Draft",
    getAgentsBidding: "Get Agents Bidding",

    // service range slider
    "serviceRange.buyer.1": "Highest rebate possible",
    "serviceRange.buyer.2": "More rebates",
    "serviceRange.buyer.3": "An equal amount of both",
    "serviceRange.buyer.4": "More services",
    "serviceRange.buyer.5": "Most services possible",

    "serviceRange.seller.1": "Lowest cost possible",
    "serviceRange.seller.2": "Lower cost",
    "serviceRange.seller.3": "An equal amount of both",
    "serviceRange.seller.4": "More services",
    "serviceRange.seller.5": "Most services possible",

    // create buy jobs
    feature: "Feature",
    features: "Features",
    benefits: "Benefits",
    personalize: "Personalize",
    "createBuyJob.lookingToBuy": "I am looking to buy a:",
    "createBuyJob.budget": "I am expecting to spend between:",
    priceRangeInMind: "Do you have a price range in mind?",
    "createBuyJob.chooseNeighborhood": "I want to live in these neighborhoods:",
    "createBuyJob.chooseNeighborhoodMobile": "I want to live in:",
    "createBuyJob.selectedNeighborhood.subText":
      "Choose a neighborhood. Your selection(s) will be highlighted in blue.",
    "createBuyJob.selectedNeighborhood.title": "Selected Neighborhoods",
    "createBuyJob.features": "I want the following features:",
    "createBuyJob.bedAndBath":
      "I want the following number of bedrooms and bathrooms:",
    "createBuyJob.bedrooms": "I want the following number of bedrooms",
    "createBuyJob.bathrooms": "I want the following number of bathrooms",
    "createBuyJob.serviceHintLine1":
      "Agents will review your posting. If they are interested in working with you, they will begin reaching out with proposals in order to get your business.",
    "createBuyJob.serviceHintLine2":
      "Proposals are comprised of benefits: rebates and services. If cash rebates (like low commissions) are attractive to you, stay to the left; if service options are more important, stay to the right. If you are unsure which option is right for you, stay in the middle.",
    "createBuyJob.servicesRange":
      "Let your buying agent know what matters to you — select the range of benefits that best suits your needs",
    "createBuyJob.servicesRange.mobile":
      "Let agents know the range of benefits that best suits your needs:",
    "createBuyJob.exactServices":
      "Create your own custom list of services that you would like buying agents to include in their offers",
    "createBuyJob.exactServices.Mobile":
      "Create your own list of services that agents should include in their proposals:",
    "createBuyJob.anythingElse.title":
      "Let agents know if there is anything else that you wish to share",
    "createBuyJob.anythingElse.mobile.title":
      "Is there anything else you want agents to know?",
    "createBuyJob.anythingElse.placeholder": "Anything else?",
    "createBuyJob.propertyFeaturesTip":
      "A little flexibility goes a long way — don’t let too few fireplaces serve as a dealbreaker. Searching with an open mind often yields the best results",
    "createBuyJob.propertyServicesRangeTip":
      "Agents will review your posting. If they are interested in working with you, they will begin reaching out with proposals in order to get your business. Proposals are comprised of benefits: rebates and services. If cash rebates (like low commissions) are attractive to you, stay to the left; if service options are more important, stay to the right. If you are unsure which option is right for you, stay to the middle.",
    "createBuyJob.characters": "characters remaining",
    "createJob.summary": "Posting Summary:",
    "createJob.clickToAdd": "Click to add",
    "createJob.clickToRemove": "Click to remove",

    // create sell jobs
    toolTipTitle: "Nobul Tip",
    toolTipPriceDescription:
      "If you are unsure of the value of your current property, please provide your best guess.",
    lookingToSell: "My property is a:",
    "sell.propertyWorth": "I am hoping to sell for the following amount:",
    sellAddress: "My property’s address is:",
    sellAddressMobile: "My property is here:",
    sellJobTip:
      "We don’t share your address with agents until a proposal has been accepted and you have entered into a contract with one.",
    propertyIsHere: "My property is here:",
    sellInNeighborhood: "My neighborhood is:",
    sellFeatures: "My property has the following features:",
    sellBedroomsAndBathrooms:
      "My property has the following number of bedrooms and bathrooms:",
    sellBedrooms: "My property has the following number of bedrooms:",
    sellBathrooms: "And the following number of bathrooms:",
    "sell.servicesRange":
      "Let your selling agent know what matters to you — select the range of benefits that best suits your needs",
    "sell.exactServices":
      "Create your own custom list of services that you would like selling agents to include in their offers",
    sellDescriptionTitle: "Tell agents what is special about your property",
    sellDescriptionSubtitle:
      "For your own safety, please do NOT share your current address, or any other personal information, in this space",
    sellDescriptionPlaceholder:
      "Do NOT share your current address in this space",
    marketplaceLocationSearchBar:
      "Start by entering a city, a neighborhood or ZIP code",
    locationSearchBar: "We will NOT share your address with third parties",
    locationPlaceholder: "Enter city, address or neighborhood",
    //Bid on Offers
    placeYourOrder: "Place Your Order",
    servicesProvided: "What services will you provide?",
    personalMessage: "Personal Message",
    offerId: "Offer ID",
    offerStatus: "Offer Status",
    updateYourOffer: "Update Your Offer",
    clientInfo: "Client Information",
    "createSellJob.noPolygon":
      "Please enter a valid address. Please note that only US and Canada addresses are currently supported.",
    "selectPolygonLoader.mobile":
      "Loading, please wait while we select your neighbourhood",

    // Consumer jobs and offers
    myPostings: "My Postings",
    learningCenter: "LEARNING CENTER",
    learningCenterBody: "Learn more about how Nobul can help you",
    selectedAgentServices: "Selected agent services",
    promotedProposals: "Promoted proposals",
    proposalsTitle: "Proposals",
    imInterestedInBuying: "I'm interested in buying",
    imInterestedInSelling: "I'm interested in selling",
    taggedProperties: "Tagged properties",
    preferences: "Preferences",
    servicesRange1: "Range 1",
    servicesRange2: "Range 2",
    servicesRange3: "Range 3",
    servicesRange4: "Range 4",
    servicesRange5: "Range 5",
    viewAllProposals: "View All Proposals",
    mortgageCalculator: "Mortgage Calculator",
    proposalsTitleBuy: "PROPOSALS FROM AGENTS WHO WANT TO HELP ME BUY",
    proposalsTitleSell: "PROPOSALS FROM AGENTS WHO WANT TO HELP ME SELL",
    buyProposals: "Buy Proposals",
    sellProposals: "Sell Proposals",
    noProposals: "There are no proposals for this posting",
    confirmDeletePosting: "Are you sure you want to delete this posting?",

    buyerProfile: "Buyer Profile",
    sellerProfile: "Seller Profile",
    buyerContracts: "Contracts for buyers",
    sellerContracts: "Contracts for Sellers",
    bidsOnProfile: "Bids on your Profile",
    interestedInBuying: "You are interested in buying",
    interestedInSelling: "You are interested in selling",
    servicesSelected: "Agent Services you have selected",
    propertyFeatures: "Property Features",
    agentId: "Agent ID",
    servicesOffered: "Services Offered",
    "mobile.noServicesOffered": "No services offered",
    rebateOffered: "Rebate Offered",
    agentRebateCommission: "Rebate Commission",
    agentListingCommission: "Listing Brokerage Commission",
    agentCooperatingCommission: "Co-operating Commission",
    aboutTheAgent: "About The Agent",
    aboutYou: "About you",
    consumerServices: "Services",
    servicesRange: "Services Range",
    taggedListings: "Tagged Listings",
    offerAll: "All",
    offerAccepted: "Accepted",
    offerWithdrawn: "Withdrawn",
    offerOpen: "Open",
    offerClosed: "Closed",
    offerRejected: "Declined",
    offerJobExpired: "Posting Expired",
    offerJobDeleted: "Posting Deleted",
    offerExpired: "Expired",
    offerUnread: "Unread",
    offerFavorite: "Favorite",
    offerJobExpired: "Posting Expired",
    offerPendingVerification: "Pending Verification",
    offerPendingVerificationRejected: "Verification Rejected",
    jobStatus: "Job Status",
    bidsForJob: "Bids For This Job",
    acceptedOfferNumber: "1 Accepted Proposal",
    acceptOffer: "Accept Proposal",
    declineOffer: "Decline Proposal",
    offerFilter: "Filters",
    confirmAcceptOffer: "Confirm to Accept Proposal",
    confirmRejectOffer: "Confirm to Decline Proposal",
    createJobs: "You don't have any postings, need some help to create?",
    jobDeleted: "This posting has been deleted",

    reviewProposal: "Review proposal",
    addDocuments: "Add documents",
    editPostingTitle: "Edit Posting Title",
    toolTipOfferDescription:
      "By clicking ACCEPT, I agree to schedule a meeting with this real estate agent based on their proposed offer. I acknowledge that doing so will dismiss all other offers (if applicable). I understand that the relationship between myself and the real estate agent is not binding until a Buyer Representation Agreement or Listing Agreement is signed by both parties.",
    jobDeleteConfirmation: "Are you sure you want to delete this posting?",

    // agent jobs
    "agentJobDetail.buyerInterestedIn":
      "This buyer is interested in the following",
    "agentJobDetail.buyerWantsFollowingFeatures":
      "This buyer is interested in the following features",
    "agentJobDetail.sellerInterestedIn": "This seller is interested in selling",
    "agentJobDetail.sellerWantsFollowingFeatures":
      "This property includes the following features",
    "agentJobDetail.priceRange": "Price Range",
    "agentJobDetail.thisbuyer":
      "This buyer is interested in the following services",
    "agentJobDetail.thisseller":
      "This seller is interested in the following services",
    "agentJobDetail.prefers": "Preferred range of services",
    "agentJobDetail.wantsFollowingServicesBuy":
      "This buyer wants the folllowing list of services:",
    "agentJobDetail.wantsFollowingServicesSell":
      "This seller wants the folllowing list of services:",
    "agentJobDetail.moreAboutThisConsumer": "More about this {userType}",
    "agentJobDetail.consumerMessage": "{userType}'s Message",
    "agentJobDetail.buyerHasTaggedTheseProperties":
      "This {userType} has tagged these properties",
    "agentJobDetail.consumerFrom": "{userType}{city}",
    "agentJobDetail.jobPosted": "Posted on {date}",
    "agentJobDetail.buyerFrom": "Buyer from {consumerCity}",
    "agentJobDetail.sellerFrom": "Seller from {consumerCity}",

    // offer list
    "offerList.noOffersFound": "No proposals found",

    // offers
    "offer.createOffer": "Create Proposal",
    "offer.editOffer": "Edit Proposal",
    "offer.createTitle": "Create A Proposal For This {userType}",
    "offer.promoteTitle": "Promote proposal",

    "offer.subscribeText":
      "Subscribe to premium to be able to edit your proposal",
    "offer.subscribeButton": "Subscribe To Premium",
    "offer.createTextBuy":
      "Do you want to create a proposal for this buyer's posting?",
    "offer.createTextSell": "Do you want to create a proposal for this seller?",
    "offer.createButton": "Start Now",
    "offer.declined": "Offer declined",
    "offer.editPremiumText":
      "You've already created a proposal for this {jobType} posting",
    "offer.editButton": "Edit",
    "offer.acceptedInProgressText": "Your proposal has been accepted",
    "offer.acceptedInProgressStatus": "In progress",
    "offer.acceptedReviewingText":
      "This {userType} is currently reviewing a proposal",
    "offer.acceptedInContractText": "Your proposal has been accepted",
    "offer.acceptedInContractTextStatus": "[in-contract]",
    "offer.acceptedOtherOfferText": "Your proposal has been declined",
    "offer.acceptedOtherOfferStatus":
      "[{userType has accepted another proposal]",
    "offer.rejectedText": "{userType} has declined your proposal",
    "offer.jobWithdrawnText": "{userType} has withdrawn the posting",
    "offer.jobDeletedText": "{userType} has deleted the posting",
    "offer.jobDeletedTag": "Posting Deleted",
    "offer.jobExpiredText": "This posting has expired",
    "offer.offerSubmitted": "Submitted",
    "offer.isLookingFor": "{userType} is looking for ",

    "offer.tagline": "Your Tagline",
    "offer.budget": "This buyer's budget is",
    "offer.priceRange": "Price range this seller is looking for",
    "offer.rebateTitle": "Rebate Percentage",
    "offer.rebateSubtitle":
      "You can offer a rebate (i.e. cashback bonus) to the buyer in return for closing a property with you",
    "offer.cooperatingTitle": "Buyer Brokerage Commission",
    "offer.cooperatingSubtitle":
      "Let the buyer know the co-operative fee that you charge for representation",
    "offer.listingTitle": "Listing Comission Rate:",
    "offer.listingSubtitle":
      "Let the buyer know the listing fee that you charge for representation",
    "offer.servicesfor": "Services for this {userType}",
    "offer.personalizedMessage": "Personalized Message",
    "offer.calculate": "Calculate",
    "offer.submitProposal": "Submit Proposal",
    "offer.successMessage": "Your proposal is on it's way!",
    "offer.promoteOffer": "Promote Proposal",
    "offer.promoteProposalLine1": "Get noticed — promote your proposal and",
    "offer.promoteProposalLine2": "bring it to the top",
    "offer.selectCardTitle": "Please select which card you would like to use",
    "offer.mobile.save":
      "If you wish to save this proposal as your standard, click SAVE",
    "offer.mobile.doNotSave":
      "If you do not wish to save this proposal as your standard, click SUBMIT",

    "offer.approvedMortgage":
      "This {userType} says they have been pre-approved for a mortgage of {mortgage}",
    "offer.confirmer": "PROMOTED PROPOSAL",
    "offer.message": "Message from Agent",

    // Agent offer detail
    "offerDetail.interestedIn":
      "This {userType} is interested in the following",
    "offerDetail.wantsFeatures":
      "This {userType} is interested in the following features",
    "offerDetail.wantsNeighbourhoods":
      "This {userType} is interested in the following neighbourhoods",
    "offerDetail.moreAbout": "More about this {userType}",
    "offerDetail.message": "{userType}'s Message",
    "offerDetail.thisUser": "This {userType}",
    "offerDetail.prefers": "Prefers",
    "offerDetail.wantsServices": "Wants the following services",
    "offerDetail.offerDetails": "Proposal Details",
    "offerDetail.acceptedOn": " Your proposal was acccepted on {date}",
    "offerDetail.rebate": "Rebate offer to {userType}",
    "offerDetail.listing": "Your listing brokerage commission",
    "offerDetail.cooperating": "Your buyer brokerage commission",
    "offerDetail.servicesOffered": "Services Offered",
    "offerDetail.messageToClients": "Your message to clients",
    "offerDetail.messageToClients.mobile": "Your message to potential clients",
    "offerDetails.messageToClientsWords.mobile": "words remaining",
    "offerDetail.whatIsNextTitle": "What's Next?",
    "offerDetail.whatIsNextStep1":
      "Schedule an appointment and meet your prospective client",
    "offerDetail.whatIsNextStep2":
      "Make sure that you will be comfortable working together",
    "offerDetail.whatIsNextStep3":
      "Review their wants & needs and the services that you committed to provide",
    "offerDetail.whatIsNextStep4": "Complete and execute:",
    "offerDetail.whatIsNextStep4-1":
      "the Online Buyer Representation Agreement (with them)",
    "offerDetail.whatIsNextStep4-2": "the Online Referral Agreement (with us)",
    "offerDetail.whatIsNextStep5":
      "Do a great job and help them find the home of their dreams!",
    "offerDetail.whatIsNextStep6": "Let others know about nobul",
    "offerDetail.clickBelow":
      "To begin the process of representation, click below.",
    "offerDetail.getStarted": "Get Started",
    "offerDetail.winningOffer": "Winning Proposal",
    "offerDetail.rebateOffered": "Rebate offered to {userType}",
    "offerDetail.listingOffered":
      "listing brokerage commission offered to {userType}",
    "offerDetail.cooperatingOffered":
      "Brokerage commission offered to {userType}",
    "offerDetail.jobWithdrawnByAgentText": "You have withdrawn your proposal",

    // offer settings
    "offerSettings.summary": "Summary",
    "offerSettings.overallRating": "Overall Rating",
    "offerSettings.totalAcceptedOffers": "Total Accepted Proposals",
    "offerSettings.totalAcceptedOffersInReview":
      "Total Accepted Proposals in Review",
    "offerSettings.totalAcceptedOffersInContract":
      "Total Accepted Proposals in Contract",
    "offerSettings.totalReviews": "Total Reviews",
    "offerSettings.standardOfferLocations": "Selected Neighborhoods",
    "offerSettings.standardOfferSettings": "Standard Proposal Settings",
    "offerSettings.autoBidOfferSettings": "Auto-bid Proposal Settings",
    "offerSettings.forBuyer": "For Buyer",
    "offerSettings.forSeller": "For Seller",
    "offerSettings.mobile.forBuyerAndSeller": "For Buyer and Seller",
    "offerSettings.premium": "Premium",
    "offerSettings.getMore": "Get more out of",
    "offerSettings.nobul": "nobul",
    "offerSettings.withPremiumLine1":
      "With nobul premium, you gain unparalleled",
    "offerSettings.withPremiumLine2": "access to features and tools",
    "offerSettings.upgrade": "Upgrade",
    "offerSettings.regions": "Regions",
    "offerSettings.propertyType": "Property Type",
    "offerSettings.residential": "Residential",
    "offerSettings.commercial": "Commercial",
    "offerSettings.priceRange": "Price Range",
    "offerSettings.rebateCommission": "Rebate Offer to Buyer",
    "offerSettings.cooperatingCommission": "Buyer Brokerage Commission",
    "offerSettings.listingCommission": "Listing Brokerage Commission",
    "offerSettings.services": "Services Offered",
    "offerSettings.messageToClient": "Your Message to Clients",
    "offerSettings.tagline": "Your Tagline",
    "offerSettings.submitBuySuccess": "Standard Proposal for Buyers was saved",
    "offerSettings.submitSellSuccess":
      "Standard Proposal for Sellers was saved",
    "offerSettings.submitError": "Something went wrong",
    "offerSettings.standardOfferForBuyer": "Standard Proposal for Buyer",
    "offerSettings.standardOfferForSeller": "Standard Proposal for Seller",
    "offerSettings.autobidOfferForBuyer": "Auto-bid Proposal for Buyer",
    "offerSettings.autobidOfferForSeller": "Auto-bid Proposal for Seller",
    "offerSettings.mobile.autobidOfferForBuyer": "Auto-Bid for Buyers",
    "offerSettings.mobile.autobidOfferForSeller": "Auto-bid for Sellers",
    "offerSettings.characters": "{number} characters",
    "offerSettings.mobile.autobidDescription":
      "Allow nobul to automatically bid on matching postings",
    "offerSettings.editRegionsTitle": "Change Regions",
    "offerSettings.editRegionsSearchTitle": "Search Regions",
    "offerSettings.editRegionsSearchPlaceholder":
      "Please specify a neighborhood, city, region, state or postal/zip code",
    "offerSettings.editRegionsSearchError":
      "You cannot pick a location outside your province/state of operation",
    "offerSettings.editRegionsSelectRegions": "Select Regions",
    "offerSettings.editRegionsYourRegions": "Your Regions",
    "offerSettings.editRegionsDone": "Done",

    // TODO:
    // Check if this is still needed
    dreamHouse: "Dream House",
    "offer.agentsFrom": "Agent's from",
    "offer.agentFrom": "Agent from",
    "offer.proposal": "Proposal",
    "offer.proposalDetails": "Proposal details",
    "offer.rebate": "Rebate",
    "offer.mobile.priceRangeDescription":
      "Select a price range that you wish to offer consumers",
    "offer.mobile.rebateDescription":
      "Select a rebate percentage that you wish to offer buyers",
    "offer.mobile.brokerageDescription":
      "Select a buyer brokerage commission percentage that you wish to offer sellers:",
    "offer.mobile.listingDescription":
      "Select a listing commission percentage that you wish to offer sellers:",
    "offer.rebateOffer": "Rebate offer",
    "offer.confirmation": "CONFIRMATION",
    "offer.orderSummary": "ORDER SUMMARY",
    "offer.confirmAccept": "You are about to accept the proposal.",
    "offer.confirmDecline": "You are about to decline the proposal.",
    "offer.confirmProceed": "Are you sure you want to proceed?",
    "offer.congratulations": "CONGRATULATIONS",
    "offer.decline": "THE PROPOSAL WAS DECLINED",
    "offer.acceptOffer": "You have just accepted a Proposal.",
    "offer.agentContact": "The Agent will soon be in touch with you.",
    "offer.declineOffer": "You've just declined this proposal.",
    "offer.agentReceiveUpdates": "The agent will receive updates on",
    "offer.agentProposalStatus": "their proposal status.",
    "offer.memberSince": "Member since",
    "offer.total": "TOTAL",
    // End TODO

    //Property Types
    anyPropertyType: "Any Property Type",
    residentialFreehold: "House, Townhouse, etc.",
    residentialNotFreehold: "Condo, Co-op, etc.",
    residentialRecreational: "Recreational",
    residentialParking: "Parking",
    commercialBusiness: "Business",
    commercialRetail: "Retail",
    commercialOffice: "Office",
    commercialHospitality: "Hospitality",
    commercialInstitutional: "Institutional",
    commercialIndustrial: "Industrial",
    commercialMultiFamily: "Multi Family Home",
    vacantLand: "Lots / Vacant Land",
    agriculture: "Agricultural",

    //New property types
    "House/Townhouse": "House/Townhouse",
    "Condo/Apartment": "Condo/Apartment",
    Recreational: "Recreational",
    Commercial: "Commercial",
    Other: "Other",
    "House/Townhouse.mobile": "House / Townhouse",
    "Condo/Apartment.mobile": "Condo / Apartment",

    subject: "Subject",
    location: "Location",
    time: "Time",
    yourPhoneNumber: "Your Phone Number",
    selectTime: "Select Time",
    selectDate: "Select Date",
    expiryDate: "Expiry Date",

    // Property Features
    pool: "Pool",
    locker: "Locker",
    airConditioning: "A/C",
    parking: "Parking",
    balcony: "Balcony",
    laundry: "Laundry",
    gym: "Gym",
    partyRoom: "Party Room",
    basement: "Basement",
    fireplace: "Fireplace",
    washrooms: "Washrooms",
    storage: "Storage",
    elevator: "Elevator",

    utilitiesAvailable: "Utilities available",
    ammentiesNearby: "Amenities Nearby",

    storageInfo: "Storage Info N/A",
    elevatorInfo: "Elevator Info N/A",
    washroomsInfo: "Washrooms Info N/A",

    // Services
    servicesSelectDescription:
      "Select the range of services that you wish to offer to the {userType}",
    servicesForBuyers: "Services for Buyer",
    servicesForSellers: "Services for Seller",

    // Services

    ourWorkingRelationShip: "Our Working Relationship",
    compareOptions: "Compare Options",
    getTheDealDone: "Get The Deal Done",
    getReady: "Get My Property Ready",
    planOfAction: "Set Up A Plan Of Action",
    getThePicture: "Make My Property Shine",
    showItOff: "Show It Off",
    getNoticed: "Find The Most Buyers Possible",

    //buy services
    carServices: "Car Services",
    "carServices.tooltip":
      "My agent agrees to drive me to showings and / or pay for a taxi / ride-sharing service",
    propertyValuationBuy: "Property Valuation",
    "propertyValuationBuy.tooltip":
      "My agent will prepare a report comparing properties I am interested in, to ones that sold recently in the surrounding neighbourhood; my agent may also include an informed opinion / calculation outlining what they believe the properties are “worth” and/or pay for and obtain one, on my behalf, from a certified appraiser",
    eveningHours: "Evening Hours",
    "eveningHours.tooltip":
      "My agent will make themselves available to me, on an as-needed basis between 6pm – 11pm on weeknights",
    weekendHours: "Weekend Hours",
    "weekendHours.tooltip":
      "My agent will make themselves available to me, on an as-needed basis, Saturdays and Sundays (as needed)",
    floorPlans: "Floorplans",
    "floorPlans.tooltip":
      "My agent will provide me with floorplans for all of properties I am interested in, if they are available",
    homeInspectionBuy: "Home Inspection",
    "homeInspectionBuy.tooltip":
      "My agent will provide me with a copy of a recent home inspection (if one exists) and/or pay for a certified professional to conduct a new home inspection (if none exist)",
    negotiationBuy: "Negotiation",
    "negotiationBuy.tooltip":
      "My agent will negotiate, on my behalf, the terms and conditions of associated with any offers that I make, if and when I designate",
    neighbourhoodProfiles: "Neighbourhood Profiles",
    "neighbourhoodProfiles.tooltip":
      "My agent will prepare or provide a written summary & analysis of the key features, benefits and concerns I should be aware of, when it comes to the neighbourhoods surrounding the properties I am interested in",
    postClosingServices: "Post-Closing Services",
    "postClosingServices.tooltip":
      "My agent will arrange and pay for a variety of services prior to move-in date that may include things such as cleaning, address changes / redirection and/or moving services",
    propertyMatchEmailsDaily: "Property Match Emails (Daily)",
    "propertyMatchEmailsDaily.tooltip":
      "My agent will send me a daily e-mail(s) that contains any new properties for sale that match my search criteria",
    propertyMatchEmailsInstant: "Property Match Emails (Instant)",
    "propertyMatchEmailsInstant.tooltip":
      "My agent will immediately send me an e-mail each and every time a new property , that matches my search criteria, comes up for sale ",
    previewProperties: "Preview Properties",
    "previewProperties.tooltip":
      "My agent will review new property listings and/or visit and assess (for suitability) properties in-person prior to notifying me about them",
    privateShowings: "Private Showings",
    "privateShowings.tooltip":
      "My agent will arrange for exclusive viewings / guided tours of properties I am interested in when no one else (other than the owner) is there",
    referrals: "Referrals",
    "referrals.tooltip":
      "My agent will provide me with the contact information for and/or provide an introduction to trusted lending, legal and home inspection professionals who are not paying my agent to do",
    translationServices: "Translation Services",
    "translationServices.tooltip":
      "My agent will arrange and pay for verbal and/or written translation services in a language of my choice, if necessary",

    //Sell services
    openHouseAgents: "Open House (Agents)",
    "openHouseAgents.tooltip":
      "My agent will host at least one open house 2 hours or more in duration, to showcase and promote my property to their fellow agents",
    propertyValuationSell: "Property Valuation",
    "propertyValuationSell.tooltip":
      "My agent will prepare a report comparing my property to ones that sold recently in the surrounding neighbourhood; my agent will also include an informed opinion / calculation outlining what they believe the properties are “worth” and/or pay for and obtain one, on my behalf, from a certified appraiser",
    photographyDrone: "Photography (Drone)",
    "photographyDrone.tooltip":
      "My agent will arrange and pay for photos and/or video of my property to be taken from a drone (i.e., a remote-controlled flying camera) that can be used in both printed and electronic / digital promotional materials (contingent on my approval)",
    photographyHD: "Photography (HD)",
    "photographyHD.tooltip":
      "My agent will arrange and pay for professional-quality high-resolution photographs to be taken of my property that can be used in both printed and electronic / digital promotional materials (pending my agreement / approval)",
    homeInspectionSell: "Home Inspection",
    "homeInspectionSell.tooltip":
      "My agent will arrange and pay for a certified professional to conduct a comprehensive home inspection and produce a report (that can be distributed to prospective buyers, pending my approval) of my property",
    advertisingLocal: "Advertising (Local)",
    "advertisingLocal.tooltip":
      "My agent will develop a comprehensive local marketing plan, present it for my approval and then arrange and pay to promote my property in and across a variety of locally-relevant channels, publications and sources",
    mlsListing: "MLS Listing",
    "mlsListing.tooltip":
      "My agent will create, write and post my property on MLS for other agents and/or the public",
    advertisingNational: "Advertising (National)",
    "advertisingNational.tooltip":
      "My agent will develop a comprehensive national marketing plan, present it for my approval and then arrange and pay to promote my property in and across a variety of nationally-relevant channels, publications and sources",
    advertisingInternational: "Advertising (International)",
    "advertisingInternational.tooltip":
      "My agent will develop a comprehensive marketing plan for specific foreign markets / countries, present it for my approval and then arrange and pay to promote my property in and across a variety of relevant channels, publications and sources",
    negotiationSell: "Negotiation",
    "negotiationSell.tooltip":
      "My agent will negotiate, on my behalf, the terms and conditions associated with any offers that I receive, if and when I designate",
    offsiteStorage: "Offsite Storage",
    "offsiteStorage.tooltip":
      "My agent will arrange and pay for the transportation and storage of a reasonable list of household items and/or possessions requiring temporary storage during the listing, showing and/or closing period",
    preListingPainting: "Pre-Listing (Painting)",
    "preListingPainting.tooltip":
      "My agent will arrange and pay for a reasonable mutually agreed-upon amount of painting (interior / exterior)",
    preListingCleaning: "Pre-Listing (Cleaning)",
    "preListingCleaning.tooltip":
      "My agent will arrange and pay for a reasonable mutually agreed-upon amount of cleaning (interior / exterior)",
    preListingLandscaping: "Pre-Listing (Landscaping)",
    "preListingLandscaping.tooltip":
      "My agent will arrange and pay for a reasonable mutually agreed-upon amount of landscaping",
    preListingMinorRepairs: "Pre-Listing (Minor Repairs)",
    "preListingMinorRepairs.tooltip":
      "My agent will arrange and pay for a reasonable mutually agreed-upon number of minor repairs to the property",
    photography: "Photography",
    "photography.tooltip":
      "My agent will arrange and pay for professional-quality standard-resolution interior and exterior photos of my property",
    propertyBrochures: "Property Brochures",
    "propertyBrochures.tooltip":
      "My agent will arrange and pay to have a brochure or feature sheet prepared for my property to be made available and distributed, subject to my approval, to any and all prospective buyers and agents who visit my property",
    openHousePublic: "Open House (Public)",
    "openHousePublic.tooltip":
      "My agent will schedule, arrange for, promote and host at least one or more 1-hour or longer open house for the general public to attend",
    socialMediaCampaign: "Social Media Campaign",
    "socialMediaCampaign.tooltip":
      "My agent will develop a comprehensive social media marketing plan, present it for my approval and then arrange and pay to promote my property on various social media platforms",
    stagingConsultation: "Staging (Consultation)",
    "stagingConsultation.tooltip":
      "My agent will recommend, arrange and pay for a professional stager to visit my property, discuss their services and/or develop a proposal / plan for how they would arrange and furnish my property in order to potentially increase it’s expected sale price",
    stagingFull: "Staging (Full)",
    "stagingFull.tooltip":
      "My agent will recommend, arrange and pay for a reasonable mutually agreed-upon professional staging of my property, that could include both changes to the arrangement and/or the incorporation of temporary furnishings",
    virtualTour: "Virtual Tour",
    "virtualTour.tooltip":
      "My agent will arrange and pay for a professional to record a high-quality professional video tour of my property that includes a reasonable mutually agreed-upon selection of rooms and/or features",
    video: "Video",
    "video.tooltip":
      "My agent will arrange and pay for a professional to record a high-quality professional video tour of my property that includes a reasonable mutually agreed-upon selection of rooms and/or features",

    advertisingOnline: "Advertising (Online)",
    "advertisingOnline.tooltip": "N/A",

    //OLD SERVICES - JUST FOR BACKWARD COMPATIBILITY
    propertyValuation: "Property Valuation",
    "propertyValuation.tooltip": "N/A",
    homeInspection: "Home Inspection",
    "homeInspection.tooltip": "N/A",
    negotiation: "Negotiation",
    "negotiation.tooltip": "N/A",
    carService: "Car Service",
    referBank: "Refer Bank",
    referLawyer: "Refer Lawyer",
    referMovers: "Refer Movers",
    showProperties: "Show Properties",
    financing: "Financing",
    brochure: "Colour Brochure",
    listing: "MLS® Listing",
    listingSign: "Listing Sign",
    cleaningOnClosing: "Cleaning On Closing",
    inspection: "Home Inspection",
    brokerLawyerReferals: "Referrals Mortgage Broker / Lawyer",
    onlineAd: "Online Ads",
    openHouses: "Open House(s)",
    instantEmails: "Property Match E-mail (Instant)",
    minorRepairsOnClosing: "Minor Repairs on closing",
    neighbourhoodProfile: "Neighbourhood Profiles",
    oncePerDayEmails: "Property Match E-mail (Daily)",
    previewingProperties: "Previewing Properties",
    windowCleaningOnClosing: "Window Cleaning on closing",
    agentOpenHouses: "Agent Open Houses",
    cleaning: "Cleaning",
    cmaMarketValuation: "CMA / Market Valuation",
    dronePhotography: "Drone Photography",
    hdPhotography: "HD photography",
    localAdvertising: "Local Advertising",
    minorRepairs: "Minor repairs",
    nationalAdvertising: "National Advertising",
    painting: "Painting",
    photographs: "Photographs",
    printAds: "Print Ads",
    publicOpenHouses: "Public Open Houses",
    referalToLawyer: "Referral to lawyers & other services",
    staging: "Home Staging",
    windowCleaning: "Window Cleaning",
    videoTour: "Video Tour",

    //Notifications
    notificationsTitle: "Notifications",
    allNotifications: "Notifications",
    hideNotification: "Hide this notification",
    turnOffNotifications: "Turn off Events Notifications",
    "notifications.viewAll": "View all",
    proposalNotification: "Proposal Notifications",
    postingNotification: "Posting Notifications",
    reviewNotification: "Review Notifications",
    messageNotification: "Message Notifications",
    eventNotification: "Event Notifications",
    settingNotification: "Setting Notifications",
    agentSubmittedProposal: "Most recent agent from {Brokerage} ",
    moreAgentHaveProposal:
      "and {X} more agents have proposals been submitted on ",

    //listing card
    "listingCard.location": "Location",
    "listingCard.MLS": "MLS®#",
    "listingCard.brokerage": "Brokerage",
    noFavoriteListings: "No Favorite Listings.",
    noTaggedListig: "No Tagged Listing",

    //Job Field Display Labels
    [JOB_TYPE]: "Job Type",
    [PRICE_RANGE_HIGH]: "Price Range (High)",
    [PRICE_RANGE_LOW]: "Price Range (Low)",
    [PROPERTY_TYPE]: "Property Type",
    [CREATED_AT]: "Created At",
    action: "Action",

    // Contracts
    contracts: "Contracts",
    contractGenerate: "Generate contract",
    contractAction: "Action required",
    contractWaiting: "Waiting for others",
    contractCompleted: "Completed",

    //Agent Proposal
    "proposal.tagline": "Your Slogan",
    "proposal.fee": "FEE",
    "proposal.priceRange": "This buyer's budget is",
    "proposal.calculate": "Calculate",
    "proposal.cooperatingTitle": "Buyer Brokerage Commission",
    "proposal.cooperatingSubtitle":
      "Let the buyer know the listing fee that you charge for representation",
    "proposal.listingCommission":
      "What commission(s) do you typically charge when LISTING a property?",
    "proposal.listingCommissionSubtitle":
      "Consider using cashback-style rebates to get noticed by buyers",
    "proposal.listingTitle": "Listing Brokerage Commission",
    "proposal.listingSubtitle":
      "Let the buyer know the listing fee that you charge for representation",
    "proposal.rebateTitle": "Your Rebate Rate",
    "proposal.rebateSubtitle":
      "You can offer a rebate (i.e. cashback bonus) to the buyer in return for closing a property with you",
    "proposal.personalizedMessage": "Personalized Message",
    "proposal.servicesfor": "Services for {userType}",
    "proposal.successMessage": "Your proposal is on it's way!",
    "proposal.promoteProposalLine1": "Get noticed — promote your proposal and",
    "proposal.promoteProposalLine2": "bring it to the top",
    "proposal.submitProposal": "Submit Proposal",
    "proposal.promotePaymentLine1": "Your card will be charged a one-time",
    "proposal.promotePaymentLine2": "payment of ${charge}",
    "proposal.services": "Services:",
    "proposal.promoted": "PROMOTED",
    "proposal.withdrawWarning":
      "Are you sure you want to withdraw this proposal? The buyer will receive a withdrawal notification",
    "proposal.viewProposalDetails": "View Proposal Details",
    "proposal.withdrawTitle": "Your proposal was withdrawn",
    "proposal.withdrawBody":
      "You’ve just withdraw this proposal. The buyer will receive a withdrawal notification.",

    //Button Labels
    "button.continue": "Continue",
    "button.showMore": "Show more",
    "button.registration": "Join Nobul",
    "button.previous": "Previous",
    "button.finish": "Finish",
    "button.finishRegistration": "Finish Registration",
    "button.submit": "Submit",
    "button.submitted": "Submitted",
    "button.next": "Next",
    "button.skip": "Skip",
    "button.back": "Back",
    "button.notifications": "Notifications",
    "button.done": "Done",
    "button.hide": "Hide",
    "button.cancel": "Cancel",
    "button.accept": "Accept",
    "button.decline": "Decline",
    "button.remove": "Remove",
    "button.edit": "Edit",
    "button.getNobulPremium": "Get Nobul Premium",
    "button.signUpForNobulPremium": "Sign-up for nobul premium",
    "button.promoteOffer": "Promote My Proposal",
    "button.termsAndConditions": " Terms & Conditions",
    "button.privacyPolicy": "Privacy Policy",
    "button.filterJobs": "Filter Jobs",
    "button.makeOffer": "Make a Proposal",
    "button.signIn": "Sign In",
    "button.register": "Join Nobul",
    "button.signOut": "Sign Out",
    "button.updateOffer": "Update Proposal",
    "button.viewWinningOffer": "View Winning Proposal",
    "button.generateAgreement": "Generate Agreement",
    "button.viewBids": "View Bids",
    "button.viewOffer": "View Proposal",
    "button.mls": "MLS",
    "button.exclusive": "Exclusive",
    "button.create": "Create",
    "button.generatePDF": "Generate PDF",
    "button.submitProfile": "Submit Profile",
    "button.save": "Save",
    "button.confirm": "Confirm",
    "button.scheduleMeeting": "Schedule Meeting",
    "button.instructions": "Instructions",
    "button.generateAgreements": "Generate agreements",
    "button.signedAgreements": "Signed agreements",
    "button.openAddCreditCard": "Add credit card",
    "button.addCreditCard": "Add card",
    "button.editProposal": "Edit Proposal",
    "button.unsubscribe": "Unsubscribe",
    "button.winningOffer": "View Winning Proposal",
    "button.promote": "Promote",
    "button.update": "Update",
    "button.withdraw": "Withdraw",
    "button.upgrade": "Upgrade",
    "button.view": "View",
    "button.addSignature": "Add Signature",
    "button.placeOrder": "Place Order",
    "button.changeAvatar": "Change",
    "button.saveAvatar": "Save",
    "button.signUp": "Sign Up",
    "button.customize": "Customize",
    "button.getVerified": "Get Verified",

    //Success Labels
    "success.autoBidPreferencesSaved": "Auto-bid preferences saved",
    "success.passwordReset": "Password reset email has been sent.",
    "success.subscriptionSuccess": "Your subscription was successful!",
    "success.promoteOfferSuccess": "Your proposal was successfully promoted",
    "success.mobile.jobTitleUpdateSuccess": "Posting title updated succesfully",
    "success.mobile.editAutoBidSuccess":
      "Your auto-bid settings were saved successfully",
    "success.mobile.unverifiedAutoBid":
      "You created an Auto bid proposal. Once you have been verified as an agent, you can activate your auto bid in settings and save time! Nobul will automatically submit a proposal to any postings that you want",
    "success.mobile.verifiedAutoBid":
      "You created an Auto bid proposal. Nobul will automatically submit a proposal to any postings that you want",

    //Error Labels
    "error.firstNameIsRequired": "First Name is required",
    "error.lastNameIsRequired": "Last Name is required",
    "error.brokerageNameIsRequired": "Brokerage Name is required",
    "error.passwordIsRequired": "Password is required",
    "error.passwordLengthMin": `Password must contain at least ${minPasswordLength} characters`,
    "error.passwordLengthMax": `Password could only contain at most ${maxPasswordLength} characters`,
    "error.passwordResetFailure": "Password reset fails",
    "error.passwordResetUserNotFound":
      "Sorry, we cannot find this Email address in our records. Please try again or contact us.",
    "error.userNotVerified": "Please verify your email first",
    "error.passwordUnmatch": "Two passwords do not match",
    "error.phoneIsRequired": "Phone number is required",
    "error.brokeragePhoneIsRequired": "Brokerage phone number is required",
    "error.brokerFaxIsRequired": "Broker fax is required",
    "error.emailIsRequired": "Email is required",
    "error.phoneIsInvalid": "Enter a valid phone number",
    "error.emailIsInvalid": "Enter a valid email",
    "error.addressIsRequired": "Address is required",
    "error.address1IsRequired": "Address line 1 is required",
    "error.address2IsRequired": "Address line 2 is required",
    "error.municipalityIsRequired": "Municipality is required",
    "error.propertyAddressIsRequired": "Property address is required",
    "error.propertyAreaIsRequired": "An area is required",
    "error.lookingForBuySellIsRequired": "Select what are you looking for",
    "error.timelineIsRequired": "Select what is your timeline",
    "error.provinceIsRequired": "Select a province/state",
    "error.licenseNumberIsRequired": "License Number is required",
    "error.licenseUploadIsRequired": "License Image is required",
    "error.licenseNotFound": "License not found. Please upload a license image",
    "error.profilePictureRequired": "Profile Picture is required",
    "error.nameIsRequired": "Name is required",
    "error.cityIsRequired": "City is required",
    "error.postalCodeIsRequired": "Postal Code is required",
    "error.postalCodeIsInvalid": "Enter a valid Postal Code",
    "error.zipCodeIsRequired": "Zip Code is required",
    "error.zipCodeIsInvalid": "Enter a valid Zip Code",
    "error.postalOrZipCodeIsRequired": "Postal Code or Zip Code is required",
    "error.postalOrZipCodeIsInvalid": "Enter a valid Postal Code or Zip Code",
    "error.countryIsRequired": "Country is required",
    "error.regionsIsRequired": "Please select the regions you work in",
    "error.rebateCommissionIsRequired":
      "Please enter a valid rebate commission",
    "error.listingCommissionisRequired":
      "Please enter a valid Listing Brokerage Commission",
    "error.cooperatingCommissionisRequired":
      "Please enter a valid Buyer Brokerage Commission",
    "error.commissionIsRequired": "Commission amount is required",
    "error.validRebateCommission":
      "Please enter a Rebate commission between 0% and 9.9%",
    "error.validListingCommission":
      "Please enter a Listing Brokerage Commission between 0% and 9.9%",
    "error.validCooperatingCommission":
      "Please enter a Buyer Brokerage Commission between 0% and 9.9%",
    "error.propertyTypeRequired": "Select how do you want to make money",
    "error.propertyTypeIsRequired": "Please select a valid property type",
    "error.priceRangeIsRequired": "Please select a valid price range",
    "error.bedroomsIsRequired": "Number of bedrooms is required",
    "error.bathroomsIsRequired": "Number of bathrooms is required",
    "error.agreeTermsOfUse": "Please agree to the Terms of Use",
    "error.selectNeighbourhoods": "Please select at least one neighbourhood",
    "error.phoneNumberIsRequired": "Please enter your phone number",
    "error.titleIsRequired": "Please enter the title",
    "error.locationIsRequired": "Please enter the location",
    "error.dateIsRequired": "Please select date",
    "error.timeIsRequired": "Please select time",
    "error.expiryDateIsRequired": "Please an expiry date for the agreement.",
    "error.paymentFailure":
      "Your payment could not be processed at the moment. Please try again later",
    "error.Adding card has timed out":
      "Your connection has timed out. Please try another card or try again later",
    "error.promoteOfferFailure":
      "There was a problem with promoting your proposal. Please try again later",
    "error.clientNameIsRequired": "Client name is required",
    "error.agentNameIsRequired": "Agent name is required",
    "error.uploadAgreementIsRequired": "You need to upload an agreement file",
    "error.holdoverPeriodIsRequired": "Holdover period is required",
    "error.listingTypeIsRequired": "Listing type is required",
    "error.referralFeeIsRequired": "Referral fee is required",
    "error.validForIsRequired": "Valid for is required (enter time period)",
    "error.payWithinIsRequired":
      "Pay within is required (enter number of days)",
    "error.locationNeeded": "Please enter a location",
    "error.discardChanges": "Are you sure you want to discard your changes?",
    "error.avatarFileType": "You can only upload JPG/PNG files",
    "error.avatarMaxSize": "Image must smaller than 2MB",
    "error.taglineIsRequired": "Tag line is required",
    "error.taglineMaxCharacters": "Please keep your tagline to 50 characters",
    "error.personalizedMessageIsRequired": "Personalized message is required",
    "error.personalizedMessageMaxCharacters":
      "Please keep your personalized message to 100 characters",
    "error.emailNotUnique": "This email is already registered",
    "error.enterValueBetween": "Please enter a value between {min}% and {max}%",
    "error.titleMaxCharacters": "Please keep your job title to 30 characters",
    "error.mobile.defaultInput": "Please enter a valid input",

    "message.phoneNumberSendToAgent":
      "This is the phone number the agent will reach you at",
    "message.offerAcceptedOn": "Proposal accepted on",
    "message.preferContactDate":
      "prefers to be contacted on the following date",
    "message.preferContactPhone": "Preferred to be contacted by phone at",
    "error.bedroomRequired": "Please indicate the number of bedrooms",
    "error.bathroomRequired": "Please indicate the number of bedrooms",
    "error.loginRequired": "You must be logged in to create a posting",
    "error.rebateIsRequired": "Rebate percentage is required",
    "error.cooperatingIsRequired": "Cooperating percentage is required",
    "error.listingIsRequired": "Listing percentage is required",
    "error.CouldNotLoadData":
      "Sorry we could not fetch your subscription data at this time. Please try again.",
    "error.CouldNotFindCount": "Proposal count could not be found",
    "error.noUserFound":
      "Sorry, we cannot find this Email address in our records. Please try again or contact us.",
    "error.mobile.noUserFound": "Email not found, please try again",

    //Agents
    "agent.area": "Area",
    "agent.avatar": "Upload a photo",
    "agent.avatarAlt": "Avatar",
    "agent.licenseNumber": "Real estate agent license ID",
    "agent.licenseUpload": "Include a photo of your license",
    "agent.licenseUploadExtra": "If not an API supported territory",
    "agent.licenseUploadDragDrop": "Drag & Drop Your License Photo",
    "agent.licenseUploadMobile": "Click to",
    "agent.brokerageName": "Brokerage Name",
    "agent.brokeragePhone": "Brokerage Phone Number",
    "agent.infoTitle": "Personal Information",
    "agent.verifyEmailTitle": "Verification Required",
    "agent.stepSubtitle":
      "Steps to making money. Complete more steps to maximize your benefits!",
    "agent.setSearchSettingTitle": "Set your default search settings",
    "agent.setServicesTitle": "Set your default services",
    "agent.thankyou":
      "Thank you for taking the time to complete your nobul profile.",
    "agent.continueRegistration": "Continue to set up default settings",
    "agent.verifyEmail": "A verification email has been sent to your mailbox.",
    "agent.whereYouWork": "Where do you work?",
    "agent.servicesYouOffer": "Services you offer",
    "agent.autobidSettings": "Auto-bid settings",
    "agent.whatMakesYouStandOut": "What makes you stand out as an agent",
    "offer.commissions": "Commissions",
    "agent.propertyTypeTitle": "How do you want Nobul to make money for you?",
    "agent.almostDone": "You are almost done!",
    "agent.createProfile": "Join Nobul",
    "agent.mobile.buyServicesYouOffer": "Services you offer to buyers",
    "agent.mobile.sellServicesYouOffer": "Services you offer to sellers",
    "agent.mobile.pendingVerification":
      "We are currently in the process of verifying your profile, please check back soon",

    //Consumers
    "consumer.lookingForBuySell": "Are you looking to:",
    "consumer.timeline": "What is your timeline?",
    "consumer.contestNewsletter":
      "I wish to participate in the Nobul $100k giveaway",
    "consumer.consent1":
      "By checking this box you confirm that you have read and agree to the ",
    "consumer.consent2": " and that you have read our Privacy Policy.",
    "consumer.consent3":
      "I consent to receiving news and updates about nobul’s products and services. More information can be found in our ",
    "consumer.consent4": " or ",
    "consumer.consent5":
      ". You may withdraw consent or unsubscribe at any time.",
    "consumer.agreeTerms": "I agree to the ",
    "consumer.almost_done": "YOU ARE ALMOST DONE!",
    "consumer.verification_required": "VERIFICATION REQUIRED",
    "consumer.thank_you":
      "Thank you for taking the time to complete your nobul profile",
    "consumer.verification_send":
      "A verification email has been sent to your mailbox",
    "consumer.buy_sell": "Are you looking to buy or sell?",
    "consumer.area_interest": "What is your area of interest?",
    "consumer.period": "When in the near future are you looking buy or sell?",
    "consumer.mobile.period": "When in the near future are you looking to",
    "consumer.under_contract_brokerage":
      "Are you currently under contract to a brokerage?",
    "consumer.mortgage": "Are you pre-approved for a mortgage?",
    "consumer.no": "No",
    "consumer.yes": "Yes",
    "consumer.both": "Both",
    "consumer.sell": "Sell",
    "consumer.buy": "Buy",
    "consumer.sell.caps": "SELL",
    "consumer.buy.caps": "BUY",
    "consumer.home": "A Home",
    "consumer.createPost": "Create posting",
    "consumer.investment": "An investment",
    "consumer.other": "Other",
    "consumer.email_notifications":
      "Allow Nobul to send you Email Notifications",
    "consumer.send_notifications": "Allow Nobul to send you Notifications",
    "consumer.accept_terms": "Accept Terms",
    "consumer.accept_terms_hint": "Agree the terms before sign up",
    "consumer.resend_email": "Resend Verification Email",
    "consumer.resend_email_error": "Resending Verification Email Fails",
    "consumer.resend_email_success": "Verification Email Sent",
    "consumer.resend_email_prompt":
      "Email is not verified. Please click the link below to resend a verification email",
    "consumer.wrong_password":
      "You already have an account, please use correct password",
    "consumer.unverified_user_title": "WE MEET AGAIN",
    "consumer.unverified_user_line_1":
      "An account with that email address already exists, but has not yet been verified.",
    "consumer.unverified_user_line_2":
      "Please click the link below to resend verification email.",
    "consumer.contract_to_brokerage_title": "WE'RE SORRY",
    "consumer.contract_to_brokerage_line1":
      "Unfortunately, while we would love to work with you, we think it is really important to respect your existing relationship with your agent/broker.",
    "consumer.contract_to_brokerage_line2":
      "Feel free to come back and let us know if things ever change and / or your contract expires. We would welcome the opportunity to reconnect with you anytime. Until then, tell your friends all about us.",
    "consumer.contract_to_brokerage_line3":
      "If you feel that you have been directed to this page in error, hit the help button and let us know. Our Support Team loves to fix problems almost as much as they love learning about our customers.",
    "consumer.contract_to_brokerage_line4": "I need ",
    "consumer.contract_to_brokerage_help": "help.",
    "consumer.createProfile": "Join Nobul",

    //Nobul Premium
    "premium.autobidding":
      "Auto-bidding eliminates the stress associated with collected buyer/seller proposals. Sign up for auto-bidding with nobul premium.",
    "premium.price":
      "For only $19.99/month, you and your client can expedite your deal, while simplifying and monitoring all others. Grow your business with nobul.",
    "premium.fee":
      "An introductory fee of $20/month will be applied to your iTunes account upon confirmation of purchase. After September 1, 2018, the purchase fee will revert to $40/month.",
    "premium.subscriptions":
      "Subscriptions will automatically renew unless cancel within 24-hours before the end of the current period. You can cancel anytime with your iTunes account settings. Any unused portion of a free trial will be forfeited if you purchase a subscription. For more information, select one of the links below:",
    "premium.givesYourControl": "Nobul Premium gives you the control",
    "premium.getStartedBelow": "Get Started Below",
    "premium.autoBid": "Auto bid",
    "premium.autoBidDescription": "Description",
    "premium.editBid": "Edit bid",
    "premium.editBidDescription": "Description",
    "premium.revealWinningBid": "Reveal winning bid",
    "premium.revealWinningBidDescription": "Description",
    "premium.alreadyAMember": "Already a member? ",
    "premium.enterHere": "Enter here",
    "premium.forFullDetails": "*For full details, please visit ",
    "premium.termsConditions": "terms & conditions",
    "premium.goTo": "Go to ",
    "premium.nobulHome": "nobul home",

    //Listing Details page
    "listingDetails.overviewTitle": "OVERVIEW",
    "listingDetails.featuresTitle": "FEATURES",
    "listingDetails.descriptionTitle": "DESCRIPTION",
    "listingDetails.createPosting": "Create Posting",
    "listingDetails.mlsNumber": "MLS® Number",
    "listingDetails.address": "Address",
    "listingDetails.brokerage": "Brokerage",
    "listingDetails.price": "Price",
    "listingDetails.propertyType": "PropertyType",
    "listingDetails.clientRemarks": "Client remarks",
    "listingDetails.extras": "Extras",
    "listingDetails.noSupportForLocation":
      "Sorry we currently do not support creating a posting in this location",
    "listingDetails.hireAgentCard.box.title": "Find the right agent",
    "listingDetails.hireAgentCard.box.title.2": "To help you buy this property",
    "listingDetails.hireAgentCard.box.subtitle.start": "In just ",
    "listingDetails.hireAgentCard.box.subtitle.number": "3",
    "listingDetails.hireAgentCard.box.subtitle.end": " steps",

    "listingDetails.hireAgentCardSubTitle1":
      "Select the range of agent services that most suits your needs",
    "listingDetails.hireAgentCardSubTitle2":
      "Create a custom list of services that you would like agents to include in their proposals",

    //Helmet Configuration
    "helmet.consumerRegistration": "Join nobul",
    "helmet.notFound": "Page not found",
    "helmet.permissionDenied": "Error",
    "helmet.createBuyerAgreement": "Create Buyer Registration Agreement",
    "helmet.createListingAgreement": "Create Listing Agreement",
    "helmet.createReferralAgreement": "Create Referral Agreement",
    "helmet.workingWithARealtor": "Create Working With a Realtor Agreement",
    "helmet.chooseContractType": "Choose contract type",
    "helmet.howItWorks": "How nobul Works",
    "helmet.login": "Login",
    "helmet.home": "Real Estate for Everyone",

    "helmet.agentRegistration": "Join nobul as an Agent",
    "helmet.contracts": "Contracts",
    "helmet.autoBidPreferences": "Auto-bid Preferences",
    "helmet.createBuyJob": "Buy real estate",
    "helmet.createSellJob": "Sell real estate",
    "helmet.nobulPremium": "Get Nobul Premium",
    "helmet.settings": "Settings",
    "helmet.payment": "Payment",
    "helmet.marketPlace": "Marketplace",
    "helmet.agentViewOffers": "Agent View Proposals",
    "helmet.editJob": "Edit Job",
    "helmet.agentViewOffer": "Agent View Proposal",
    "helmet.showDraftJob": "Draft Jobs",
    "helmet.listingDetails": "Listing Details",
    "helmet.consumerPostingDetail": "Consumer Posting Details",
    "helmet.agentPostingDetail": "Posting Details",
    "helmet.consumerJobOffers": "Job Postings",
    "helmet.consumerViewOfferDetails": "Consumer View Proposal Details",
    "helmet.myNobul": "My Dashboard",
    "helmet.notifications": "Notifications",
    "helmet.browseListings": "Browse Listings",

    "helmet.proposalSettings": "Proposal Settings",
    "helmet.accountSettings": "Account Settings",
    "helmet.notificationSettings": "Notification Settings",
    "helmet.subscriptionSettings": "Subscription Settings",
    "helmet.agentOfferDetails": "Proposal Details",

    //Helmet Description
    "helmet.createBuyJobDescription":
      "Buy real estate | Find the right real estate agent to help you buy a home today",
    "helmet.createSellJobDescription":
      "Sell real estate | Find the right real estate agent to help you sell your house today",
    "helmet.permissionDeniedDescription":
      "Error | Find the right real estate agent to help you buy or sell your home today",
    "helmet.consumerRegistrationDescription":
      "Join nobul | Find the right real estate agent to help you buy or sell your home today",
    "helmet.agentRegistrationDescription":
      "Join nobul as an Agent | Find the right real estate agent to help you buy or sell your home today",
    "helmet.howItWorksDescription":
      "How nobul Works | Find the right real estate agent to help you buy or sell your home today",
    "helmet.loginDescription":
      "Login | Find the right real estate agent to help you buy or sell your home today",
    "helmet.homeDescription":
      "Find the right real estate agent to help you buy or sell your home today",
    //My Dashboard Helmet
    "helmet.myDashboard.defaultTitle": "#title# | nobul",
    "helmet.myDashboard.defaultDescription":
      "#title# | Find the right real estate agent to help you buy or sell your home today",
    "helmet.myDashboard": "Dashboard",
    "helmet.myDashboard.postings": "Postings",
    "helmet.myDashboard.proposals": "Proposals",
    "helmet.myDashboard.contracts": "Contracts",
    "helmet.myDashboard.favourites": "Favourites",
    "helmet.myDashboard.events": "Events",
    "helmet.myDashboard.taggedProperties": "Tagged Properties",
    "helmet.myDashboard.activities": "Activities",
    "helmet.myDashboard.subscriptions": "Subscriptions",
    "helmet.myDashboard.postingDetails": "Posting Details",
    "helmet.myDashboard.allProposals": "All Proposals for Posting",
    "helmet.myDashboard.proposalDetails": "Proposal Details",
    "helmet.myDashboard.settings": "Settings",
    "helmet.myDashboard.contract.generate": "Generate New Contract",
    "helmet.myDashboard.contract.actionRequired": "Contract - Action Required",
    "helmet.myDashboard.contract.waiting": "Contract - Waiting",
    "helmet.myDashboard.contract.completed": "Contract - Completed",

    //Loading
    "loading.makingPayment": "Making payment...",

    //Rate Agents
    "rateAgents.didAgentDeliver.label": "Did they deliver what they promised?",
    "rateAgents.failureReason.help": "Reason for Failure cannot be empty",
    "rateAgents.failureReason.placeholder": "Reason for failure",
    "rateAgents.feedback.label": "Overall feedback",
    "rateAgents.feedback.help": "Feedback cannot be empty",
    "rateAgents.starRate.label": "How did you find the agent experience?",
    "rateAgents.thankYouMessage": "Thank you for rating your agent!",
    "rateAgents.error": "Oops something went wrong",
    "rateAgents.videoTour": "Video Tour",
    "rateAgents.printAds": "Print Ads",
    "rateAgents.onlineAds": "Online Ads",
    "rateAgents.homeStaging": "Home Staging",
    "rateAgents.listingSign": "Listing Sign",
    "rateAgents.photographs": "Photographs",
    "rateAgents.yes": "Yes",
    "rateAgents.no": "No",
    "rateAgent.rateTitle": "WRITE A REVIEW",
    "rateAgent.attribute1": "Attribute 1:",
    "rateAgent.attribute2": "Attribute 2:",
    "rateAgent.attribute3": "Attribute 3:",

    // home page
    "home.consumerTitle": "How can nobul help you?",
    "home.agentTitle": "Let’s get started growing your business!",
    "home.hireAgent": "Hire Agent",
    "home.browseProperties": "Browse Properties",
    "home.nobulMagazine": "Nobul Magazine",
    "home.buyOrSell": "Buy or Sell",
    "home.buyOrSellDescription": "Find an agent who will help",
    "home.browse": "Browse Properties",
    "home.browseDescription": "See what is out there",
    "home.learn": "Learning Center",
    "home.learnDescription": "Got questions? We have answers",
    "home.setStandardProposal": "Create a Standard Proposal",
    "home.setBrowseMarketplace": "Browse Marketplace",
    "home.marketplaceDescription": "Find prospective clients",
    "home.proposalDescription":
      "Tell prospective clients how you would serve them",
    "home-page.browse.title": "Search by neighborhood for your new home",
    //New Home page

    "home-page.search.title": "Find your ideal real estate agent",
    "home-page.findAgent": "Find an Agent",
    "home-page.browse": "Browse",
    "home-page.howNobulWorks": "How nobul works",
    "home-page.howNobulIsDifferent": "How nobul is different",
    "home-page.otherRealEstatePlatforms": "Other Real Estate Platforms",
    "home-page.whatPeopleAreSayingAboutNobul":
      "What people are saying about nobul",

    "home-page.1.title": "Join nobul",
    "home-page.2.title": "Create a posting",
    "home-page.3.title": "Match with an agent",
    "home-page.4.title": "Close the deal",
    "home-page.1.description":
      "Create your nobul account and immediately begin browsing properties already on the market.",
    "home-page.2.description":
      "Describe the type of property you are looking to buy or sell — and then post! In no time, interested agents will begin to reach out with proposals.",
    "home-page.3.description":
      "Review as many proposals as you want — before you commit to anything, you can meet agents in person.",
    "home-page.4.description":
      "Confident with your choice? Make it official! Now you and your agent are ready to begin your real estate journey.",
    "home-page.4.description1":
      "Confident with your choice? Make it official! Now you and ",
    "home-page.4.your": "your ",
    "home-page.4.description2":
      "agent are ready to begin your real estate journey.",

    "advantages-1": "Open real estate marketplace",
    "advantages-2": "No upfront costs to agents",
    "advantages-3": "No costs to consumers",
    "advantages-4": "Receive clear proposals directly from agents",
    "advantages-5": "Unlimited selection of independent agents",
    "advantages-6": "Leave and review agent feedback",

    "competitors-1": "Online brokerages only",
    "competitors-2": "Some platforms require payment upfront",
    "competitors-3": "Some platforms require payment",
    "competitors-4": "Minimal transparency from agents",
    "competitors-5": "Choose only from agents who work on the platform",
    "competitors-6": "Reviews not available on all platforms",

    "testimonial-title-1": "Marie",
    "testimonial-title-2": "Patrick",
    "testimonial-title-3": "Adam",
    "testimonial-qualification-1": "Home Buyer",
    "testimonial-qualification-2": "Home Seller",
    "testimonial-qualification-3": "Real Estate Agent",
    "testimonial-description-1":
      '"I’ve tried several ways to find a good real estate agent who would show more transparency when dealing with my real estate needs and I was pleasantly surprised when I gave Nobul a shot. I had no expectations but I ended up connecting with an agent through the platform who made things really easy. I’d definitely use it again in the future."',
    "testimonial-description-2":
      '"The peace of mind knowing what the agent has to offer before interviewing them to list my house was invaluable."',
    "testimonial-description-3":
      '"I’ve been using the platform for a few months and I think it’s a very innovative concept that provides agents with the real possibility of getting new clients in a way that it doesn’t require much effort, and the fact there’s no cost until a transaction actually happens is also very appealing. I recommend it!"',

    //Browse Listings
    "browseListings.title": "Where would you like to search?",
    "browseListings.subheader": "Subheader",
    "jobListing.congratulations": "CONGRATULATIONS",
    "jobListing.createPosting": "You have just created a posting.",
    "jobListing.agentContact": "An agent will soon be in touch with you.",

    // Anonymous User Login or Register
    "anonymous.signUp": "Sign up with Email",
    "anonymous.haveAccount": "Already have an account?",
    "anonymous.login": "Log in",
    "anonymous.or": "or",

    // get Started
    "getStarted.title": "I am looking to:",
    "getStarted.description": "Subheader",
    "getStarted.buy": "Buy",
    "getStarted.buyDescription": "Create a posting",
    "getStarted.sell": "Sell",
    "getStarted.sellDescription": "Create a posting",
    "getStarted.buyAndSell": "Buy and Sell",
    "getStarted.buyAndSellDescription": "Create my posting",

    //appointmentForm
    "appointmentForm.title": "Schedule Meeting",
    "appointmentForm.button.text": "Create Meeting",
    "appointmentForm.datePicker.label": "Event Date",
    "appointmentForm.startTimePicker.label": "Start Event Time",
    "appointmentForm.endTimePicker.label": "End Event Time",
    "appointmentForm.datePicker.validationMessage":
      "Please select an event date",
    "appointmentForm.timePicker.validationMessage":
      "Please select an event time",
    "appointmentForm.datePicker.placeholder": "Date",
    "appointmentForm.startTimePicker.placeholder": "Start Time",
    "appointmentForm.endTimePicker.placeholder": "End Time",
    "appointmentForm.phoneInput.label": "Phone Number",
    "appointmentForm.phoneInput.validationMessage":
      "Please provide a phone number the agent can contact",
    "appointmentForm.locationSearch.label": "Location Search",
    "appointmentForm.locationSearch.validationMessage":
      "Please select a location for the appointment",
    "appointmentForm.formSuccessMessage":
      "Thanks, the appointment has been sent to the agent for approval",
    "appointmentForm.formErrorMessage":
      "Oops, something went wrong. Please try again.",
    "appointmentForm.titleInput.label": "Event Title",
    "appointmentForm.titleInput.validationMessage":
      "Please give the event a title",
    "appointmentForm.eventTypeSelect.label": "Meeting Type",
    "appointmentForm.eventTypeSelect.inPerson": "In-Person Meeting",
    "appointmentForm.eventTypeSelect.phoneCall": "Phone Call",
    "appointmentForm.eventTypeSelect.validationMessage":
      "Please select a meeting type",
    "appointmentForm.eventComment.validationMessage": "Please leave a comment",
    "appointmentForm.eventComment.label": "Comment",
    "mobile.startTime.error": "Please enter a time before your end time",
    "mobile.endTime.error": "Please enter a time after your start time",

    //Consumer View My Events
    "myEvents.mobile": "My Events",
    "myEvents.calendarTitle": "CALENDAR",
    "myEvents.eventsListTitle": "UPCOMING EVENTS",
    "myEvents.createEventTitle": "CREATE NEW EVENT",
    "myEvents.confirmDelete": "Are you sure you want to cancel this event?",
    "myEvents.confirmHiding":
      "Are you sure you want to hide this event from the calendar?",
    "subject.mobile.error": "Please enter a subject",

    "appointment.congratulations": "CONGRATULATIONS",
    "appointment.meetingScheduleSentSuccessfully":
      "Thank you. We have sent your request to #name#. We will notify you when they respond.",

    //Mortgage Calculator
    "mortgageCalculator.header": "Payments",
    "mortgageCalculator.listingPrice.label": "Price",
    "mortgageCalculator.downpayment.label": "Downpayment",
    "mortgageCalculator.mortgageAmount.label": "Mortgage Amount",
    "mortgageCalculator.amorizationPeriod.label": "Amortization",
    "mortgageCalculator.interestRate.label": "Interest Rate",
    "mortgageCalculator.paymentFrequency.label": "Payment Frequency",
    "mortgageCalculator.listingPrice.placeholder": "Price...",
    "mortgageCalculator.downpayment.placeholder": "Downpayment...",
    "mortgageCalculator.mortgageAmount.placeholder": "Mortgage Amount...",
    "mortgageCalculator.amorizationPeriod.placeholder":
      "Select an amorization period...",
    "mortgageCalculator.interestRate.placeholder": "Interest Rate...",
    "mortgageCalculator.paymentFrequency.placeholder":
      "Select a payment frequency...",
    "mortgageCalculator.listingPrice.error": "Please input a listing price!",
    "mortgageCalculator.downpayment.error": "Please input a downpayment amount",
    "mortgageCalculator.downpayment.maxError":
      "Downpayment cannot be greater than listing price",
    "mortgageCalculator.amorizationPeriod.error":
      "Please input an amorization period!",
    "mortgageCalculator.interestRate.error": "Please input a interest rate",
    "mortgageCalculator.paymentFrequency.error":
      "Please select a payment frequency!",
    "mortgageCalculator.qualify": "Find out if you qualify",
    "mortgageCalculator.calculate": "Calculate",
    "mortgageCalculator.amorizationPeriod.5": "5 Years",
    "mortgageCalculator.amorizationPeriod.10": "10 Years",
    "mortgageCalculator.amorizationPeriod.15": "15 Years",
    "mortgageCalculator.amorizationPeriod.20": "20 Years",
    "mortgageCalculator.amorizationPeriod.25": "25 Years",
    "mortgageCalculator.amorizationPeriod.30": "30 Years",
    "mortgageCalculator.amorizationPeriod.35": "35 Years",
    "mortgageCalculator.paymentFrequency.biWeekly": "Bi-Weekly",
    "mortgageCalculator.paymentFrequency.monthly": "Monthly",

    "payment.cardholderName": "Cardholder Name",
    "payment.cardNumber": "Card Number",
    "payment.expiryDate": "Expiry Date",
    "payment.cvc": "CVC",
    "payment.postalCode": "Postal Code",
    "payment.done": "Done",
    "payment.promotePaymentLine1": "Your card will be charged a one-time",
    "payment.promotePaymentLine2": "payment of $3.99",

    "subscriptionSettings.unsubscribePremiumAccount":
      "Unsubscribe Premium Account",
    "subscriptionSettings.unsubscribePremiumAccountWarning":
      "Membership will end after the free trial expires on {endDate}",
    "subscriptionSettings.unsubscribePremiumAccountYes": "Yes",
    "subscriptionSettings.unsubscribePremiumAccountNo": "No",
    "subscriptionSettings.unsubscribePremiumAccountComplete":
      "Your Premium Account has been unsubscribed.",
    "subscriptionSettings.activateAutoBidServiceForbuyers":
      "Activate Auto-Bid Service for Buyers",
    "subscriptionSettings.activateAutoBidServiceForsellers":
      "Activate Auto-Bid Service for Sellers",
    "subscriptionSettings.premiumAccount": "Premium Account",
    "subscriptionSettings.premiumAccountSubscription":
      "Premium Account Subscription",
    "subscriptionSettings.autoBidService": "Auto-Bid Service",
    "payment.cardholderNamePlaceholder": "Please input the cardholder name",
    "payment.cardNumberPlaceholder": "Please input the card number",
    "payment.expiryPlaceholder": "Please input the expiry date",
    "payment.cvcPlaceholder": "Please input the cvc",

    //View Agent Proposals
    "agent.menuItem.autoBid": "Auto-Bid",
    //events
    "viewEventModal.title": "# would like to meet you.",
    "viewEventModal.rescheduleButton.text": "Submit",
    "viewEventModal.rescheduleToggle": "Reschedule",
    "viewEventModal.eventConfirmed":
      "Thank you! #name# has been notified of your confirmation.",
    "events.emptyEventsTitle": "You have no events scheduled",
    "events.emptyEventsAgentsDescription":
      "Once you begin working with clients, all events / meetings will appear here",
    "events.emptyEventsConsumerDescription":
      "Once you begin working with agents, all events / meetings will appear here",

    //Subscriptions
    "subscriptions.title": "NOBUL PREMIUM",
    "subscriptions.monthlyPrice": "$19.99",
    "subscriptions.yearlyPrice": "$229",
    "subscriptions.monthlyFrequency": "/month",
    "subscriptions.yearlyFrequency": "/year",
    "subscriptions.header": "Get more out of ",
    "subscriptions.headerBold": "nobul.",
    "subscriptions.yearlySubheader":
      "An annual nobul premium subscription is our best value—and your best option for unparalleled access to features and tools",
    "subscriptions.monthlySubheader":
      "With nobul premium, you gain unparalleled access to features and tools.",
    "subscriptions.featuresTitle": "All The Best Features",
    "subscriptions.firstFeatureTitle": "Auto-Bid",
    "subscriptions.mobile.secondFeatureTitle": "Flexibility",
    "subscription.mobile.thirdFeatureTitle": "Reveal",
    "subscriptions.firstFeatureDescription":
      "Save time and never miss an opportunity - have proposals submitted automatically to all new postings that match your profile",
    "subscriptions.secondFeatureTitle": "Dynamic Proposals",
    "subscriptions.secondFeatureDescription":
      "Discover the power of flexibility - update your proposals whenever you want and get noticed more often by prospective clients",
    "subscriptions.thirdFeatureTitle": "Reveal Your Opponent's Secrets",
    "subscriptions.thirdFeatureDescription":
      "Obtain competitive intelligence - view the winning proposals and use what you learn to adjust your approach next time",
    "subscriptions.upgraded": "Upgraded",
    "subscriptions.modalTitle": "Nobul Premium Account",
    "subscriptions.congratulationsTitle": "Upgrade confirmed",
    "subscriptions.congratulationsSubtitle":
      " is now active—start using it right away",
    "subscriptions.congratulationsSubtitleBold": "nobul premium",
    "subscriptions.stripeFooterMonthly": "Your card will be charged a monthly",
    "subscriptions.stripeFooterYearly": "Your card will be charged a yearly",
    "subscriptions.paymentConfirmFirstMonthly": "1-month Subscription:",
    "subscriptions.paymentConfirmFirstYearly": "1-year Subscription:",
    "subscriptions.paymentConfirmFirst": "Promote Offer",
    "subscriptions.paymentConfirmSecond": "Taxes:",
    "subscriptions.addCardSuccess":
      "You have successfully added a new credit card to your account",
    "subscriptions.deleteCardTitle": "Remove Credit Card",
    "subscriptions.deleteCardBody":
      "You have successfully removed your credit card.",
    "subscriptions.paymentMethod": "Payment Method",
    "subscriptions.addPaymentMethod": "Add Payment Method",
    "subscriptions.mobile.addOrUpdatePaymentMethod":
      "Add / Update payment method",
    "subscriptions.yearlyMembership": "Yearly Membership",
    "subscriptions.removeCardTitle": "REMOVE PAYMENT METHOD",
    "subscriptions.removeCardText":
      "Are you sure you want to remove this credit card?",
    "subscriptions.keepMembership": "Keep Membership",
    "subscriptions.cancelMembership": "Cancel Membership",
    "subscriptions.continueMembership": "Continue Membership",
    "subscriptions.sorryToLoseYou": "{User}, we are sorry to see you go",
    "subscriptions.membershipWillContinue1":
      "Your membership will continue after your free trial.",
    "subscriptions.membershipWillContinue2":
      "Your credit card will be charged on {Date}",
    "subscriptions.memberWillEnd": "Your membership will end on {Date}",
    "subscriptions.memberWillExpire": "Membership will expire after {Date}",
    "subscriptions.NotBeCharged": "At that time your card will not be charged",
    "subscriptions.mobile.getPremium": "Get Premium",
    "subscriptions.Charged": `At that time your card will be charged CDN$ ${premiumPrice} for a month of Nobul Premium.`,
    "subscriptions.memberContinueAfterTrial":
      "Your Nobul Premium membership will continue after {endDate}.",
    "subscriptions.memberEndAfterTrial":
      "Your Nobul Premium membership will end on {endDate}.",
    "subscriptions.NotBeChargedLossBenefits":
      "At that time your card will not be charged and you will lose access to your benefits.",
    "subscriptions.enjoyFeatures":
      "Enjoy All of the features of nobul premium:",
    "subscriptions.hello": "Hello {User},",
    "subscriptions.membership": "Membership:",
    "subscriptions.nobulPremiumFreeTrial": "nobul Premium",
    "subscriptions.reactivateMembership": "Re-activate Membership",
    "subscriptions.primeMembersEnjoy": "Prime Members Enjoy",
    "subscriptions.membershipInfo": "Membership Info",
    "subscriptions.noLongerPremium": "You are no longer a Nobul Premium member",
    "subscriptions.reactiveFor": "Re-activate your membership for ",
    "subscriptions.premiumPrice": `CDN$ ${premiumPrice} / month`,

    //Permission Denied
    "permissionDenied.title": "Oops, you're not authorized to be here!",
    "permissionDenied.text":
      "Some pages are restricted for consumers and agents, please double check you are logged in with the correct credentials.",

    //How it works modal
    "howItWorks.title": "How nobul works",
    "howItWorks.subtitle": "Nobul is real estate for everybody",
    "howItWorks.intro.1":
      "Buying or selling a property is one of the biggest investments you'll make — nobul provides you with options and allows you to choose the right ones for you.",
    "howItWorks.intro.2":
      "Simply tell nobul where you want to buy, or what you want to sell, and we’ll have agents bring their offers to you.",
    "howItWorks.buyer.title": "I am a buyer",
    "howItWorks.buyer.list.1":
      "Create a posting: tell us a little bit about what you are looking for. Or, browse active properties on our open marketplace — select any and all that interest you.",
    "howItWorks.buyer.list.2":
      "Agents who are interested in helping you buy will begin reaching out with attractive proposals.",
    "howItWorks.buyer.list.3":
      "Review these proposals and choose whichever one is best for you. Explore agent ratings and interview your favorite candidates over the phone, or in person.",
    "howItWorks.buyer.list.4":
      "Select the agent who is your best match — work together to find your dream home!",
    "howItWorks.seller.title": "I am a seller",
    "howItWorks.seller.list.1":
      "Create a posting: tell us about the property you wish to sell — what makes it special?",
    "howItWorks.seller.list.2":
      "Agents who are interested in helping you sell will begin reaching out with attractive proposals.",
    "howItWorks.seller.list.3":
      "Review these proposals and choose whichever one is best for you. Explore agent ratings and interview your favorite candidates over the phone, or in person.",
    "howItWorks.seller.list.4":
      "Select the agent who is your best match — work together to sell your home!",
    "howItWorks.agent.title": "I am an agent",
    "howItWorks.agent.list.1":
      "Register with nobul and view active buyer and seller postings within your region.",
    "howItWorks.agent.list.2":
      "Interested in a particular buyer or seller? Act! Create and submit attractive proposals highlighting the services and commission rates you are willing to offer.",
    "howItWorks.agent.list.3":
      "Find your match! Interested candidates will reach out and make it official.",
    "howItWorks.agent.list.4":
      "Do a great job, and clients will leave outstanding reviews and feedback. Build your business with nobul — it’s that simple!",

    //CONSUMER SETTINGS
    "consumerSettings.account.title": "ACCOUNT SETTINGS",
    "consumerSettings.account.firstName": "First Name",
    "consumerSettings.account.lastName": "Last Name",
    "consumerSettings.account.email": "Email",
    "consumerSettings.account.password": "Change Password",
    "consumerSettings.account.phoneNumber": "Phone Number",
    "consumerSettings.account.address1": "Address Line 1",
    "consumerSettings.account.address2": "Address Line 2",
    "consumerSettings.account.country": "Country",
    "consumerSettings.account.province": "Province/State",
    "consumerSettings.account.city": "City",
    "consumerSettings.account.postcode": "Postal/Zip Code",
    "consumerSettings.update": "Update",
    "consumerSettings.account.promotions": "Promotions / Newsletters",
    "consumerSettings.account.emailNotifications": "Email Notifications",
    "consumerSettings.notification.title": "NOTIFICATION SETTINGS",

    //AGENT SETTINGS
    Email: "Email", //TODO: Will be removed in email field refactor
    "agentSettings.account.title": "ACCOUNT SETTINGS",
    "agentSettings.account.firstName": "First Name",
    "agentSettings.account.lastName": "Last Name",
    "agentSettings.account.email": "Email",
    "agentSettings.account.password": "Change Password",
    "agentSettings.account.phoneNumber": "Phone Number",
    "agentSettings.account.address1": "Address Line 1",
    "agentSettings.account.address2": "Address Line 2",
    "agentSettings.account.country": "Country",
    "agentSettings.account.province": "Province/State",
    "agentSettings.account.city": "City",
    "agentSettings.account.postcode": "Postal/Zip Code",
    "agentSettings.update": "Update",
    "agentSettings.account.promotions": "Promotions / Newsletters",
    "agentSettings.account.emailNotifications": "Email Notifications",
    "agentSettings.notification.title": "NOTIFICATION SETTINGS",
    "agentSettings.account.brokerageName": "Brokerage Name",
    "agentSettings.account.brokeragePhone": "Brokerage Phone",
    "agentSettings.offer.createStandardProposalError":
      "Please create a standard proposal before modifying your settings",

    //Tag Listing dropdown
    "tagListingModal.title": "Tag Property to Posting",
    "tagListingModal.provinceOrStateInfo":
      "Please note that you can only tag properties to a posting in the same province/state as the property.",
    "tagListingModal.hint": "Create Posting?",
    "tagListingModal.createSellJob": "Create sell posting?",
    "tagListingModal.createBuyJob": "Create buy posting?",

    //consumer notificatinon settings
    "consumerSettings.notification.all.label": "All Notifications",
    "consumerSettings.notifications.event.label": "Event Notifications",
    "consumerSettings.notifications.event.subText":
      "We will let you know about any changes to meetings you schedule with agents.",
    "consumerSettings.notifications.proposal.label": "Proposal Notifications",
    "consumerSettings.notifications.proposal.subText":
      "We will let you know when you receive new proposals from agents.",
    "consumerSettings.notifications.posting.label": "Posting Notifications",
    "consumerSettings.notifications.posting.subText":
      "We will let you know when you create a new posting.",

    //agent notification settings
    "agentSettings.notifications.posting.label": "Posting Notifications",
    "agentSettings.notifications.posting.subText":
      "We will let you know when relevant postings are created by consumers.",
    "agentSettings.notifications.event.subText":
      "We will let you know about any changes to meetings that are scheduled with you.",
    "agentSettings.notifications.proposal.subText":
      "We will let you know when consumers accept or rejects your proposal.",

    //Share listing modal
    "shareListingModal.title": "Copy the url and share with your friends",

    "alt.marketingBanner": "Marketing Banner",

    //Free Trial
    "freeTrial.title": "NOBUL PREMIUM",
    "freeTrial.title2": "Free Trial",
    "freeTrial.title3": "Re-activate for ",
    "freeTrial.title2.sub": "for full 3 months",
    "freeTrial.subtitle-1": "Your free trial begins on ",
    "freeTrial.subtitle-2": " and will end on ",
    "freeTrial.subtitle-3": ". Cancel any time before ",
    "freeTrial.subtitle-4":
      " to avoid automatic renewal - don't worry! We'll send you a reminder email ",
    "freeTrial.subtitle-5": " your trial ends.",
    "freeTrial.emailReminderDays": `${emailReminderDays} days before`,
    "freeTrial.subtitle":
      "Your free trial begins on {beginDate} and will end on {endDate}. Cancel any time before {endDate} to avoid automatic renewal - don't worry! We'll send you a reminder email 7 days before your trial ends.",
    "freeTrial.subtitle2": `will end on {endDate}. After this date you will be charged $${premiumPrice} / month.`,
    "freeTrial.features": "Your Benefits",
    "freeTrial.feature1.title": " Set Up an Auto-Bid",
    "freeTrial.feature1.body":
      " Save time — have nobul automatically submit a proposal to any postings that you want",
    "freeTrial.feature2.title": "Edit Your Proposals",
    "freeTrial.feature2.body":
      "Get flexibility — go back into your original proposal and make as many updates and changes as you wish",
    "freeTrial.feature3.title": "Reveal a winning proposal",
    "freeTrial.feature3.body":
      "Learn more — view the winning proposal and adjust your strategy next time",
    "freeTrial.feature4.title": "Cancel Anytime",
    "freeTrial.feature4.body":
      "Too many transactions to handle? Unsubscribe from nobul premium whenever you like",
    "freeTrial.button": "Start my Free Trial",
    "freeTrial.faq": "Frequently Asked Questions",
    "freeTrial.faq.mobile": "FAQ",
    "freeTrial.faq1.title": "Will I be charged during my free trial?",
    "freeTrial.faq1.body":
      "You will not be charged any upfront fees. Once your free trial begins, you will have 90 days to sample all that nobul premium has to offer — for FREE.",
    "freeTrial.faq2.title": "What happens at the end of my free trial?",
    "freeTrial.faq2.body":
      "Your membership will automatically renew at the end of your free trial. You can cancel at any time prior to the renewal at nobul.com/my-dashboard/settings.",
    "freeTrial.faq3.title": "Can I change or cancel my plan later on?",
    "freeTrial.faq3.body":
      "Yes. You can downgrade or cancel anytime from your settings page. When you cancel, you will lose your Premium features at the end of your billing cycle.",
    "freeTrial.modal.months": "for 3 months",
    "freeTrial.modal.item": "3 months ($)",
    "freeTrial.modal.hst": "HST ($)",
    "freeTrial.modal.total": "Invoice Total ($)",
    "freeTrial.modal.footer": "Why do we need this for a free trial?",
    "freeTrial.yourTrial": "YOUR TRIAL",
    "freeTrial.expiresIn": "Expires in ",
    "freeTrial.yourSubscription": "You have subscribed for",
    "freeTrial.nobulPremium": "Nobul Premium",
    "freeTrial.price": "00.00",
    "freeTrial.footer": "After your free trial period, pay a monthly fee of ",
    "freeTrial.mobile.subtitle": "Free Trial for full three months",
    "freeTrial.footerPrice": `$${premiumPrice}`,

    // Landing page
    "landing.heading": "Nobul is real estate for everyone",
    "landing.paragraph":
      "Our open marketplace provides you with the transparency, flexibility and convenience you need when searching for your ideal real estate agent.",
    "landing.button": "Get Started",
    "landing.features.title": "How nobul can help",
    "landing.feature.1.title": "Join nobul",
    "landing.feature.1.description":
      "Create your nobul account and immediately begin browsing properties already on the market.",
    "landing.feature.2.title": "Create a Posting",
    "landing.feature.2.description":
      "In no time, interested agents will begin to reach out. Select the candidate with the most attractive commissions and services.",
    "landing.feature.3.title": "Match with an Agent",
    "landing.feature.3.description":
      "Review as many proposals as you want — before you commit to anything, you can meet agents in person.",
    "landing.feature.4.title": "Close the Deal",
    "landing.feature.4.description":
      "Confident with your choice? Make it official! Now your agent is ready to help you buy or sell your dream home!",
    "landing2.title":
      "Nobul is a real estate marketplace for buyers, sellers and agents.",
    "landing3.search.title": "Find Homes For Sale Near You",
    "landing3.or": "Or",
    "landing3.getStarted.title": "Get The Right Agent Searching For You",
    "landing4.findAgent": "Find Your Perfect Agent",
    "landing4.getStarted": "Let agents compete for your business",
    "landing.type.buy": "I'm a Buyer",
    "landing.type.sell": "I'm a Seller",
    "landing.browse": "BROWSE",
    "landing5.search.title": "Find Condos For Sale Near You",

    //auth-action
    "authAction.verifyEmail.title": "Verify your email",
    "authAction.verifyEmail.success": "You successfully verified your email.",
    "authAction.verifyEmail.error": "Oops. This link has expired.",
    "authAction.verifyEmail.success.login": "Login here",
    "authAction.resetPassword.title": "Redirecting you to reset password...",
    "authAction.recoverEmail.title": "Redirecting you to email recovery...",
    "authAction.invalidAction.title":
      "Oops something, went wrong. This link is not valid.",

    //Contact US
    "contactUs.mobile.title": "For more information, please contact us at",
    "contactUs.mobile.email": "support@nobul.com",
    "contactUs.mobile.or": "or",
    "contactUs.mobile.tollFree": "Toll Free",
    "contactUs.mobile.phone": "1-833-490-9042",
    "contactUs.mobile.callError":
      "There was an error when attempting to make this call",

    //update avatar
    changeProfilePicture: "Change Profile Picture",
    profilePicture: "PROFILE PICTURE",

    //Sign Out
    "signOut.mobile.description":
      "Are you sure you want to sign out of your account?",

    //errored component
    "errorComponent.title": "We're sorry — something's gone wrong.",
    "errorComponent.text":
      "Our team has been notified. You can also click here to give us more feedback.",

    "licenceForm.title": "Complete your agent profile!",
    "licenceForm.blurb":
      "Please complete your agent profile before you can continue",

    "brokerageForm.title": "Enter your Brokerage details",

    "socialProofBanner.1": "Thousands of active buyers and sellers",
    "socialProofBanner.2": "Hundreds of licensed agents looking to help",
    "socialProofBanner.3": "200,000+ listings across North America",

    "changeEmailForm.button": "Update Email",
    "changeEmailForm.prompt":
      "Please enter your new email address and your current password",
    "changeEmailForm.emailLabel": "New Email",

    "loginError.invalidEmail": "Please enter a valid email",
    "loginError.invalidPassword": "Please enter a password",
    "loginError.wrongCredentials":
      "Your email or password is incorrect, please try again",
    "loginError.oops": "Oops something went wrong",
    "password.input.error": "Password must be between 6 and 16 characters",

    selectToronto: "All Toronto Neighborhoods",
    showNeighborhoods: "Show neighborhoods",
    selectedNeighborhoods: "{count} neighborhoods selected",

    "mobile.photo": "Upload Options",
    "mobile.menu": "Menu",
    "mobile.browse": "Browse",
    "mobile.marketplace": "Marketplace",
    "mobile.createBuyJob": "Create BUY posting",
    "mobile.createSellJob": "Create SELL posting",
    "mobile.cameraPermissionDialogTitle": "Permission to use camera",
    "mobile.cameraPermissionDialogMessage":
      "We need your permission to use your camera",
    "mobile.gallery": "Gallery",
    "mobile.camera": "Camera",
    "mobile.profileUpdateFailure":
      "There was an issue updating your profile, please make sure all fields are filled out correctly",
    "mobile.profileUpdateSuccess": "Your profile was saved successfully",
    "mobile.profileUpdateImageFailure":
      "Oops, we could not update the image at this time. Sorry.",
    "mobile.licensePhoto": "License Photo",
    "mobile.financial": "Financial",
    "mobile.proposalSummary": "Proposal Summary",
    "mobile.saveProposal": "Save Proposal",
    "mobile.createProposal.helperTitle":
      "Creating a proposal is easy and only takes a few minutes.",
    "mobile.createProposal.helperText":
      "Tell us about you, the services and rebate you want to offer",
    "mobile.standardProposal": "Standard Proposal",
    "mobile.agentVerification.title":
      "You must complete your agent profile before you can submit a proposal to this client",
    "mobile.licenseImageUploadSuccess": "License photo successfully saved!",
    "mobile.proposals.readFullMessage": "Read full message",
    "mobile.proposals.hideFullMessage": "Minimise message",
    "mobile.autoBidSettings": "Auto-Bid Settings",
    "mobile.editProposal.validation.tagline":
      "Please provide a tagline for the consumer",
    "mobile.editProposal.validation.message":
      "Please provide a message for the consumer",

    //Mobile Modals
    "mobile.confirmation.title": "Confirmation",
    "mobile.warning.title": "Warning",
    "mobile.comingSoon.text1":
      "We are working hard to bring you a first-rate browsing feature",
    "mobile.comingSoon.text2": "Please check back soon!",
    "mobile.rescheduleMeeting": "Reschedule Meeting",
    "mobile.event.acceptSuccess": "Event accepted!",
    "mobile.event.deleteSuccess": "Event deleted!",
    "mobile.invalidPostalCode": "Invalid code for country",
    "mobile.profilePictureSave.success": "Profile picture saved successfully!",
    "mobile.posting.customise":
      " If you wish to make changes to the default information below, click CUSTOMIZE",
    "mobile.bedroomsAndBathrooms": "Bedrooms & Bathrooms",
    "mobile.changePassword.incorrectPassword":
      "The password you entered does not match our records, please try again",
    "mobile.changePassword.correctPassword":
      "Your password has been succesfully changed",
    "mobile.contractsComingSoon":
      "In the meantime, you can access Contracts on our Website",
    "mobile.linkToWeb": "Open on web",
    "mobile.learnMore": "Learn More",
    "button.phone": "Phone",
    "button.inPerson": "In Person",
    "mobile.createProposal.description":
      "Visit the marketplace and browse postings from buyers and sellers. Like what you see? Create proposals based on postings that interest you",
    "mobile.createProposal.noProposals": "You have created no proposals",
    "mobile.polygonMap.instructions.title": "How to select neighborhoods",
    "map.instruction.mobile.step1": "Enter a city in the search bar",
    "map.instruction.mobile.step2": "Tap the map to select a neighborhood(s)",
    "map.instruction.mobile.step3":
      "You can deselect any neighborhood(s) by tapping the map again or by opening the slider",
    "button.contact": "Contact",
    "mobile.offerSuccess.unVerified":
      "Your proposal will be on its way once your agent license has been verified. You can call our customer success team for more details.",
    "mobile.autoBid.unVerified.1": "Auto-bidding makes life easier",
    "mobile.autoBid.unVerified.2":
      "You cannot use Nobul's auto-bid feature until you have been verified as an agent.",
    posting: "Posting",
    "mobile.createNewPosting":
      "You created a posting. Agents will begin reaching out with proposals. In the meantime, you can manage your posting, events and more on My Dashboard",
    "mobile.locationPlaceholder.buy": "Enter city or neighborhood",
    "mobile.locationPlaceholder.sell": "Enter address",
    "mobile.standardProposal.create.success":
      "You have successfully created your standard proposal. Start bidding on postings in the marketplace.",
    "mobile.diabledDropdown": "Cannot edit the value. Please contact Nobul",
    "mobile.defaultDiabledDropdown":
      "This feature is disabled. Please contact Nobul",

    //Proposal details
    "proposalDetails.doYouWantToAccept":
      "Do you want to accept the agent's offer?",
    "proposalDetails.disclaimer":
      "By clicking ACCEPT, I agree to schedule a meeting with this real estate agent based on their proposed offer. I acknowledge that doing so will dismiss all other offers(if applicable); I understand that the relationship between myself and the real estate agent is not binding until a Buyer Representation Agreement or Listing Agreement is signed by both parties.",
    "proposalDetails.contactTheAgent": "Contact the Agent",
    "proposalDetails.contactAgentExplanation":
      "Set up a meeting to interview the agent before you decide to work with them.",
    "mobile.delete.posting.title": "Delete Posting",
    "mobile.delete.posting.description":
      "Are you sure you want to delete this posting",
    "mobile.delete.posting.success": "Posting deleted successfully",
    "mobile.withdraw.proposal.title": "Withdraw Proposal",
    "mobile.withdraw.proposal.description":
      "Are you sure you want to withdraw this proposal?",
    "myEvents.meetingWith": "Meeting with {userType} {place}",
    "myEvents.phoneCallWithClient": "Phone Call with {userType} {place}",

    //TextArea Constraints
    "constraints.phone": "No phone number should be included.",
    "constraints.email": "No email should be included.",
    "constraints.link": "No external link should be included.",
    "constraints.mls": "No MLS number should be included."
  }
};
