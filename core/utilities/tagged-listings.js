export const getJobsDropdownData = ({ rawjobsObject, listingId }) =>
  Object.entries(rawjobsObject).map(([uid, { taggedListings = {}, name }]) => ({
    uid,
    isTagged: Object.keys(taggedListings).includes(listingId),
    name
  }));
