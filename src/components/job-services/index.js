import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import { getToolTips } from "./utilities";
import { SERVICES_RANGE } from "../../../core/data/jobs";
import { getObjectByKey } from "../../../core/utilities/misc";
import ActivityIndicator from "../activity-indicator";
import SelectedServices from "../selected-services";
import ServiceRangePicker from "../service-range-picker";

import "./styles.scss";

const JobServices = ({
  intl,
  servicesRange,
  services,
  isLoading,
  title,
  titleRange,
  titleServices,
  jobType,
  servicesToolTips
}) => {
  const serviceRangeLabel = getObjectByKey({
    array: SERVICES_RANGE,
    key: "value",
    value: servicesRange
  });
  if (!servicesRange && !services) return null;

  const labelKey = jobType === "buy" ? "buyer" : "seller";

  return (
    <div>
      {title}
      <Card className="agent-services-card" bordered={false}>
        <ActivityIndicator
          spinning={isLoading}
          type={translate(intl, "loading")}
        >
          {servicesRange && (
            <div className="agent-services-card-range">
              {titleRange}
              <ServiceRangePicker
                minVal={1}
                maxVal={5}
                defaultVal={serviceRangeLabel.value}
                intl={intl}
                labelKey={labelKey}
                isDisabled
              />
            </div>
          )}
          {services && (
            <div className="agent-services-card-items">
              {titleServices}
              <SelectedServices
                intl={intl}
                selectedServices={Object.keys(services)}
                displayCheckbox={false}
                toolTips={getToolTips({ jobType, servicesToolTips })}
              />
            </div>
          )}
        </ActivityIndicator>
      </Card>
    </div>
  );
};

JobServices.propTypes = {
  intl: intlShape.isRequired,
  servicesRange: PropTypes.number,
  services: PropTypes.object,
  isLoading: PropTypes.bool,
  title: PropTypes.any,
  titleRange: PropTypes.any,
  titleServices: PropTypes.any,
  jobType: PropTypes.string.isRequired,
  servicesToolTips: PropTypes.object
};

JobServices.defaultProps = {
  isLoading: false
};

export default JobServices;
