import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Progress } from "antd";

import "./styles.scss";

class ProgressBar extends PureComponent {
  render() {
    return (
      <div className="progress-bar">
        <Progress
          percent={Math.round(
            this.props.currentStep * 100 / this.props.numberOfSteps
          )}
        />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  numberOfSteps: PropTypes.number.isRequired
};

export default ProgressBar;
