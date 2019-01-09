import moment from "moment-timezone";
import { REFERRAL, BUY, SELL } from "../constants/shared";
import { getCountryName } from "./location";

/****************************************** 
    Take in string components for a date,
    join and parse into unix timestamp.
*******************************************/
const constructDateFromComponents = components => {
  const { Day, Month, Year } = components;
  let unixTimestamp = "";

  let momentObj = moment(`${Day} ${Month} ${Year}`, "Do MMMM YY"); // Do checking on date string.
  if (momentObj.isValid()) {
    unixTimestamp = momentObj.unix();
  }

  return unixTimestamp;
};

const constructAddressString = ({
  address1,
  address2,
  city,
  country,
  provinceOrState
}) => {
  const addressElems = [
    address1,
    address2,
    city,
    provinceOrState,
    getCountryName(country)
  ];
  return addressElems.filter(el => !!el).join(", ");
};

/****************************************** 
    Format data from PDF and parse the 
    interesting bits to store formatted
*******************************************/
const generateFormMetadata = agreementData => {
  const formData = agreementData.formData;
  let startDateComponents = {};
  let expiryDateComponents = {};

  // Loop form data elems
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    if (!value) return; // If there's no value, we dont need it.

    let dateMoment, commissionFloat;

    // if we're interested in the key, parse the value
    switch (key) {
      case "holdoverPeriod":
        agreementData[key] = parseInt(value);
        break;
      case "expiryDate":
      case "startDate":
        dateMoment = moment(formData[key]);
        agreementData[key] = dateMoment ? dateMoment.unix() : value;
        break;
      case "commission":
      case "listingCommission":
      case "cooperatingCommission":
      case "rebateCommission":
        commissionFloat = parseFloat(value);
        agreementData[key] = isNaN(commissionFloat) ? null : commissionFloat;
        break;
      // Collect date parts from form, eg. "23rd"  "october" "18"
      case "startDay":
      case "startMonth":
      case "startYear":
        startDateComponents[key.replace("start", "")] = formData[key];
        break;
      case "expiryDay":
      case "expiryMonth":
      case "expiryYear":
        expiryDateComponents[key.replace("expiry", "")] = formData[key];
        break;
    }
  });

  // Check for split up dates
  if (Object.keys(startDateComponents).length > 0) {
    agreementData.startDate = constructDateFromComponents(startDateComponents);
  }

  if (Object.keys(expiryDateComponents).length > 0) {
    agreementData.expiryDate = constructDateFromComponents(
      expiryDateComponents
    );
  }

  return agreementData;
};

/*****************************************
    Get data from webform and process
    it to be put auto-filled into a pdf 
*******************************************/
const formatValueForPdf = ({ agreementData, key, intl, translate }) => {
  const value = agreementData[key];
  let formattedDate, formattedTime, timeZone;
  let result = value;

  switch (key) {
    case "expiryDate":
      result = value.format("Do MMMM YYYY");
      agreementData["expiryTime"] = value.format("HH:mm");
      agreementData["expiryDay"] = value.format("Do");
      agreementData["expiryMonth"] = value.format("MMMM");
      agreementData["expiryYear"] = value.format("YY");
      break;
    case "startDate":
      result = value.format("Do MMMM YYYY");
      agreementData["startTime"] = value.format("HH:mm");
      agreementData["startDay"] = value.format("Do");
      agreementData["startMonth"] = value.format("MMMM");
      agreementData["startYear"] = value.format("YY");
      break;
    case "todaysDate":
      formattedDate = value.format("MMM-DD-YYYY");
      formattedTime = value.format("hh:mm A");
      timeZone = moment.tz(moment.tz.guess()).zoneAbbr();
      agreementData["documentCreatedOn"] = `${translate(
        intl,
        "createdOn"
      )} ${formattedDate} at ${formattedTime} (${timeZone})`;
      result = formattedDate;
      break;
    case "documentVersion":
      result = `${translate(intl, "version")} ${value}`;
      break;
    case "commission":
      if (agreementData["rebateCommission"]) {
        // TODO: Template
        agreementData["commissionAlternative"] = `${
          agreementData["commission"]
        }% of the sale price of the property + applicable taxes with ${
          agreementData["rebateCommission"]
        }% rebate (cashback)`;
        result = "---- N/A ----";
      } else {
        result = `${agreementData["commission"]}% `;
      }
    case "listingCommission": // eslint-disable-line
    case "cooperatingCommission":
      if (!agreementData["totalCommission"]) {
        agreementData["totalCommission"] = `${parseFloat(
          agreementData["listingCommission"]
        ) + parseFloat(agreementData["cooperatingCommission"])}`;
      }
      break;
  }

  agreementData[key] = result;
  return agreementData;
};

const timestampToMoment = value => {
  return moment.isMoment(value) ? value : moment.unix(value);
};

// Matches up with strings in es/es language files.
const getAgreementFormName = shortString => {
  let formName = "";
  switch (shortString) {
    case REFERRAL:
      formName = "referralAgreement";
      break;
    case BUY:
      formName = "buyersRepresentationAgreement";
      break;
    case SELL:
      formName = "sellersListingAgreement";
      break;
  }
  return formName;
};

export {
  generateFormMetadata,
  formatValueForPdf,
  timestampToMoment,
  getAgreementFormName,
  constructAddressString
};
