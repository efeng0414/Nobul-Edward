export const getLocation = locationObject =>
  locationObject && locationObject.search.slice(1);

// Creates a key/value object from the params passed to the URL
export const createObjectFromSearchParams = () => {
  const paramsObject = {};
  window.location.search
    .substr(1)
    .split("&")
    .map(part => part.split("="))
    .map(partObj => (paramsObject[partObj[0]] = partObj[1]));
  return paramsObject;
};
