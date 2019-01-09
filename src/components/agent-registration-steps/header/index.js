import React from "react";
import { Steps } from "antd";
import "../styles.scss";
const Step = Steps.Step;

const Header = ({ title, currentStep }) => {
  return (
    <div className="header-steps">
      <h2 className={`header-step ${getHeaderClassName(currentStep)}`}>
        {title}
      </h2>
      <Steps size="small" current={currentStep} labelPlacement="vertical">
        <Step />
        <Step />
        <Step />
      </Steps>
    </div>
  );
};

const getHeaderClassName = currentStep => {
  if (currentStep === 0) {
    return "header-step-1";
  } else if (currentStep === 1) {
    return "header-step-2";
  } else {
    return "header-step-3";
  }
};
export default Header;
