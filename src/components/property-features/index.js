import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { intlShape, injectIntl } from "react-intl";

import { PROPERTY_CLASS_FEATURES } from "../../utilities/property-data-web";

import "./styles.scss";

const PropertyFeatures = ({
  onFeaturesChange,
  selectedFeatures,
  selectedPropertyClass,
  jobType
}) => {
  return (
    <div className="property-feature">
      <Checkbox.Group
        onChange={onFeaturesChange}
        defaultValue={selectedFeatures}
      >
        {PROPERTY_CLASS_FEATURES[selectedPropertyClass].map(
          (feature, index) => (
            <Checkbox
              key={index}
              value={feature.value}
              className="property-feature-item"
            >
              <div className={`property-feature-type-${jobType}`}>
                <div className="property-feature-icon">
                  <img src={feature.icon} />
                </div>
              </div>
            </Checkbox>
          )
        )}
      </Checkbox.Group>
    </div>
  );
};

PropertyFeatures.propTypes = {
  intl: intlShape.isRequired,
  onFeaturesChange: PropTypes.func.isRequired,
  selectedFeatures: PropTypes.array,
  selectedPropertyClass: PropTypes.string,
  jobType: PropTypes.string.isRequired
};

export default injectIntl(PropertyFeatures);
