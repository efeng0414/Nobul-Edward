import React from "react";
import PropTypes from "prop-types";
import {
  ICON_BEDROOOM_1,
  ICON_BEDROOOM_2,
  ICON_BEDROOOM_3,
  ICON_BEDROOOM_4,
  ICON_BEDROOOM_5
} from "../../utilities/images";

const FirstBedroom = ({ width }) => (
  <img style={{ width }} src={ICON_BEDROOOM_1} />
);

const SecondBedroom = ({ width }) => (
  <img style={{ width }} src={ICON_BEDROOOM_2} />
);

const ThirdBedroom = ({ width }) => (
  <img style={{ width }} src={ICON_BEDROOOM_3} />
);

const FourthBedroom = ({ width }) => (
  <img style={{ width }} src={ICON_BEDROOOM_4} />
);

const FifthBedroom = ({ width }) => (
  <img style={{ width }} src={ICON_BEDROOOM_5} />
);

export {
  FirstBedroom,
  SecondBedroom,
  ThirdBedroom,
  FourthBedroom,
  FifthBedroom
};
