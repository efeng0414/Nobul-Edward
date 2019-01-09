import { url as TopLevelUrls } from "../../routes/routes";
import { url as MyNobulUrls } from "../../routes/myNobul";
import { humanReadableNameKeys } from "../../routes/human-readble-names";

const getUrlKeyForPrevHref = ({ prevHref }) =>
  Object.entries({
    ...TopLevelUrls,
    ...MyNobulUrls
  }).reduce(
    (accumulator, [urlKey, url]) => (url === prevHref ? urlKey : accumulator),
    "back"
  );

export const getHumanReadableNameKey = ({ prevHref }) => {
  const humanReadableHrefKey = getUrlKeyForPrevHref({
    prevHref
  });

  return humanReadableNameKeys[humanReadableHrefKey];
};
