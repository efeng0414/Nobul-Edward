import { getTimeStampsArray } from "../../../core/utilities/date";

export const rescheduleFormFieldMap = {
  START_TIME: "reschedule-start-time",
  END_TIME: "reschedule-end-time",
  DATE: "reschedule-date"
};

export const getTimeStampsForValues = ({ values }) =>
  getTimeStampsArray({
    date: values[rescheduleFormFieldMap.DATE],
    startTime: values[rescheduleFormFieldMap.START_TIME],
    endTime: values[rescheduleFormFieldMap.END_TIME]
  });
