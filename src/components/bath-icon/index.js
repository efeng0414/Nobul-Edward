import React from "react";
import PropTypes from "prop-types";
import {
  ICON_BATHROOM_NO_BORDER,
  ICON_LISTING_CARD_BATH,
  ICON_BATHROOM_1,
  ICON_BATHROOM_2,
  ICON_BATHROOM_3,
  ICON_BATHROOM_4,
  ICON_BATHROOM_5
} from "../../utilities/images";

const BathroomNoBorder = ({ width }) => (
  <img style={{ width }} src={ICON_BATHROOM_NO_BORDER} />
);

const BathIcon = ({ width }) => (
  <img style={{ width }} src={ICON_LISTING_CARD_BATH} />
);

const FirstBathroom = ({ width }) => (
  <img style={{ width }} src={ICON_BATHROOM_1} />
);

const SecondBathroom = ({ width }) => (
  <img style={{ width }} src={ICON_BATHROOM_2} />
);

const ThirdBathroom = ({ width }) => (
  <img style={{ width }} src={ICON_BATHROOM_3} />
);

const FourthBathroom = ({ width }) => (
  <img style={{ width }} src={ICON_BATHROOM_4} />
);

const FifthBathroom = ({ width }) => (
  <img style={{ width }} src={ICON_BATHROOM_5} />
);

BathIcon.propTypes = { width: PropTypes.number };
BathIcon.defaultProps = { width: 12 };

export {
  BathroomNoBorder,
  BathIcon,
  FirstBathroom,
  SecondBathroom,
  ThirdBathroom,
  FourthBathroom,
  FifthBathroom
};
