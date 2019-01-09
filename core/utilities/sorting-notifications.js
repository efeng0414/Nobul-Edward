import { CREATED_AT } from "../api-transform/notifications";

export const descendingSort = ({ notifications }) => {
  return Object.entries(notifications)
    .sort(
      (notificationEntryPrev, notificationEntryNext) =>
        notificationEntryNext[1][CREATED_AT] -
        notificationEntryPrev[1][CREATED_AT]
    )
    .map(([key, value]) => ({ [key]: value }));
};

export const sortByDate = ({ unsortedObjects, descending }) => {
  return Object.entries(unsortedObjects)
    .sort(
      (unsortedEntryPrev, unsortedEntryNext) =>
        descending
          ? unsortedEntryNext[1][CREATED_AT] - unsortedEntryPrev[1][CREATED_AT]
          : unsortedEntryPrev[1][CREATED_AT] - unsortedEntryNext[1][CREATED_AT]
    )
    .map(([key, values]) => ({ ...values, id: key }));
};
