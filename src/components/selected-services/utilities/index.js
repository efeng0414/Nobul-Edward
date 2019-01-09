import React from "react";
import { Icon } from "antd";
import CheckedIcon from "react-icons/lib/fa/check-square";
import { translate } from "../../../utilities/locale";

export const renderServices = (
  service,
  index,
  toolTips,
  intl,
  displayCheckbox
) => {
  const serviceDetails =
    !!toolTips && toolTips.filter(item => item.value === service);

  const tooltip =
    !!serviceDetails && serviceDetails.length > 0 && serviceDetails[0].tooltip;

  return (
    <div key={index} className="selected-services-item">
      {displayCheckbox && <CheckedIcon />}
      <span>{translate(intl, service)}</span>
      {tooltip && (
        <div className="tool-tip">
          <Icon type="info-circle-o" />
          {tooltip}
        </div>
      )}
    </div>
  );
};
