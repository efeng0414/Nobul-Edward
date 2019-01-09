import React from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import Service from "../service";
import { translate } from "../../../utilities/locale";

const ServiceGroups = ({ serviceType, serviceGroup, services, intl }) => {
  return (
    <div className={`${serviceType}-services`}>
      <div className="render-group">
        <div className="render-group-services">
          {Object.entries(serviceGroup).map(([key, group]) => (
            <div key={key} className="service-group">
              <h4>{translate(intl, key)}</h4>
              {group.map(value => (
                <Service
                  key={value}
                  value={value}
                  label={services[value].label}
                  tooltip={services[value].tooltip}
                  serviceType={serviceType}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ServiceGroups.propTypes = {
  serviceType: PropTypes.string,
  serviceGroup: PropTypes.object,
  services: PropTypes.object,
  intl: intlShape.isRequired
};

export default ServiceGroups;
