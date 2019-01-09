import React from "react";
import PropTypes from "prop-types";
import {
  ICON_LISTING_CARD_BED,
  ICON_BEDROOM_NO_BORDER
} from "../../utilities/images";

const BedIconNoBorder = ({ width }) => (
  <img style={{ width }} src={ICON_BEDROOM_NO_BORDER} />
);

const BedIcon = ({ width }) => (
  <img style={{ width }} src={ICON_LISTING_CARD_BED} />
);

BedIcon.propTypes = { width: PropTypes.number };
BedIcon.defaultProps = { width: 12 };

export { BedIconNoBorder, BedIcon };
