import React from "react";
import PropTypes from "prop-types";
import { Collapse } from "antd";
import { intlShape } from "react-intl";

import Service from "../service";
import { translate } from "../../../utilities/locale";

const ServiceAccordion = ({ serviceType, serviceGroup, services, intl }) => {
  return (
    <div className={`${serviceType}-services`}>
      <Collapse className="render-accordion">
        {Object.entries(serviceGroup).map(([key, group], index) => (
          <Collapse.Panel header={translate(intl, key)} key={index}>
            {group.map(value => (
              <Service
                key={value}
                value={value}
                label={services[value].label}
                tooltip={services[value].tooltip}
                serviceType={serviceType}
              />
            ))}
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

ServiceAccordion.propTypes = {
  serviceType: PropTypes.string.isRequired,
  serviceGroup: PropTypes.object.isRequired,
  services: PropTypes.object,
  intl: intlShape.isRequired
};

export default ServiceAccordion;
