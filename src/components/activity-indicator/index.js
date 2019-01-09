import React from "react";

import PropTypes from "prop-types";
import { Spin } from "antd";
import "./styles.scss";

const ActivityIndicator = props => {
  const {
    children,
    type = "loading",
    size = "large",
    spinning = false
  } = props;

  return (
    <Spin
      tip={`${type}...`}
      size={size}
      spinning={spinning}
      wrapperClassName={"spinner-wrapper"}
    >
      {children}
    </Spin>
  );
};

ActivityIndicator.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  size: PropTypes.string,
  spinning: PropTypes.bool
};

export default ActivityIndicator;
