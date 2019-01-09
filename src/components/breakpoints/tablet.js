import React from "react";
import PropTypes from "prop-types";

import Devices from "./devices";
import { TABLET } from "../../../core/constants/breakpoints";

const Tablet = ({ children }) => <Devices sizes={[TABLET]}>{children}</Devices>;

Tablet.propTypes = {
  children: PropTypes.any
};

export default Tablet;
