import moment from "moment-timezone";
import {
  AM_PM_TIME_FORMAT,
  DATE_YEAR_FORMAT,
  SAFE_DATE_FORMAT,
  STANDARD_TIME_FORMAT
} from "../constants/shared";

const formatContactTime = ({ date, time, dateFormat, timeFormat }) => {
  const dateString = moment(date).format(dateFormat);
  const timeString = moment(time).format(timeFormat);
  const dateAndTimeString = `${dateString} ${timeString}`;

  return dateAndTimeString;
};

const formatTime = (time, timeFormat) => {
  return moment(time).format(timeFormat);
};

const formatDate = (date, dateFormat) => {
  return moment(date).format(dateFormat);
};

const getUTCTimes = ({ dateAndTimeString }) => {
  if (!dateAndTimeString || dateAndTimeString.length === 0) {
    return dateAndTimeString;
  }

  return moment(dateAndTimeString).valueOf();
};

const getLocalTimesString = ({ utcTimes }) => {
  if (!utcTimes || utcTimes.length === 0) {
    return utcTimes;
  }
  const dateObj = new Date(utcTimes);
  const dateString = dateObj.toLocaleDateString();
  const timeString = dateObj.toLocaleTimeString();

  return { dateString, timeString };
};

const getDateString = timestamp => {
  return new Date(timestamp).toLocaleDateString();
};

const getTimeString = timestamp => {
  return new Date(timestamp).toLocaleTimeString();
};

const getYear = timestamp => {
  return new Date(timestamp).getFullYear();
};

const formatTimestampDate = ({ timestamp, dateFormat }) => {
  return moment.unix(timestamp / 1000).format(dateFormat); // timestamp from firebase is in ms.
};

const isToday = timestamp => {
  const timestampOfToday = getUTCTimes({ dateAndTimeString: new Date() });
  const dateStringOfToday = new Date(timestampOfToday).toLocaleDateString();
  const dateStringOfRecord = getDateString(timestamp);

  return dateStringOfToday === dateStringOfRecord;
};

const getDateOrTime = ({ timestamp, timezone }) => {
  if (!timestamp || timestamp.length === 0) {
    return timestamp;
  }

  const today = isToday(timestamp);

  return today
    ? convertToTimeZone({ timestamp, timezone, format: AM_PM_TIME_FORMAT })
    : convertToTimeZone({ timestamp, timezone, format: DATE_YEAR_FORMAT });
};

const getTimeStampsArray = ({ date, startTime, endTime }) => {
  const startDateAndTimeString = formatContactTime({
    date,
    time: startTime,
    dateFormat: SAFE_DATE_FORMAT,
    timeFormat: STANDARD_TIME_FORMAT
  });

  const endDateAndTimeString = formatContactTime({
    date,
    time: endTime,
    dateFormat: SAFE_DATE_FORMAT,
    timeFormat: STANDARD_TIME_FORMAT
  });

  const startDateAndTimeStamp = getUTCTimes({
    dateAndTimeString: startDateAndTimeString
  });

  const endDateAndTimeStamp = getUTCTimes({
    dateAndTimeString: endDateAndTimeString
  });

  return [startDateAndTimeStamp, endDateAndTimeStamp];
};

export const convertToTimeZone = ({ timestamp, timezone, format }) =>
  moment(timestamp)
    .tz(timezone)
    .format(format);

export {
  formatContactTime,
  getUTCTimes,
  getLocalTimesString,
  getDateOrTime,
  getYear,
  formatTimestampDate,
  getTimeStampsArray,
  getTimeString,
  formatDate
};
