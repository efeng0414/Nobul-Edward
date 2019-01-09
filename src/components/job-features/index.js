import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import BedroomIcon from "../../assets/images/icon_bedroom_small.svg";
import BathroomIcon from "../../assets/images/icon_bathrooms_small.svg";
import { PROPERTY_FEATURES_IMAGES } from "../../utilities/property-data-web";

import "./styles.scss";

const JobFeatures = ({
  bedrooms,
  bathrooms,
  propertyFeatures,
  intl,
  displayTitle
}) => {
  const bedroomsLabel = bedrooms === 1 ? "bedroom" : "bedrooms";
  const bathroomsLabel = bathrooms === 1 ? "bathroom" : "bathrooms";

  return (
    <div className="job-features-icons">
      {displayTitle && <h5>{translate(intl, "features")}</h5>}
      <Row>
        <Col sm={12} md={6}>
          <img src={BedroomIcon} />
          <span>{`${bedrooms} ${translate(intl, bedroomsLabel)}`}</span>
        </Col>
        <Col sm={12} md={6}>
          <img src={BathroomIcon} />
          <span>{`${bathrooms} ${translate(intl, bathroomsLabel)}`}</span>
        </Col>
        {Object.keys(propertyFeatures).map((key, index) => (
          <Col key={index} sm={12} md={6}>
            <img src={PROPERTY_FEATURES_IMAGES[key]} />
            <span>{translate(intl, key)}</span>
          </Col>
        ))}
      </Row>
    </div>
  );
};

JobFeatures.propTypes = {
  intl: intlShape.isRequired,
  bedrooms: PropTypes.number,
  bathrooms: PropTypes.number,
  propertyFeatures: PropTypes.object,
  displayTitle: PropTypes.bool
};

JobFeatures.defaultProps = {
  bedrooms: 0,
  bathrooms: 0,
  propertyFeatures: {},
  displayTitle: true
};

export default JobFeatures;
