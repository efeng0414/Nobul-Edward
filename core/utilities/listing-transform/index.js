import * as Canada from "./canada";
import * as Florida from "./florida";
import * as Georgia from "./georgia";

const provinceTransform = {
  AB: Canada,
  BC: Canada,
  MB: Canada,
  NB: Canada,
  NL: Canada,
  NS: Canada,
  NT: Canada,
  NU: Canada,
  ON: Canada,
  PE: Canada,
  QC: Canada,
  SK: Canada,
  YT: Canada,
  FL: Florida,
  GA: Georgia
};

export const transformListing = ({ provinceOrState, listing }) => {
  if (provinceOrState && provinceTransform[provinceOrState])
    return provinceTransform[provinceOrState].transformListingForRegion({
      listing
    });

  return listing;
};
