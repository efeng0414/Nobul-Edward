import moment from "moment";

export const disablePastDates = currentDate =>
  currentDate &&
  currentDate <
    moment(new Date())
      .add(-1, "days")
      .endOf("day");
