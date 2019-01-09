import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { intlShape } from "react-intl";

import ActivityIndicator from "../activity-indicator";
import { translate } from "../../utilities/locale";
import JobFeatures from "../job-features";
import JobTypePriceLocation from "../job-type-price-location";

import "./styles.scss";

const ConsumerJobDetailsFeatures = ({
  price,
  propertyType,
  regions,
  bedrooms,
  bathrooms,
  propertyFeatures,
  intl,
  isLoading,
  title,
  jobType,
  address,
  description
}) => {
  return (
    <div>
      {title}
      <Card className="interested-in" bordered={false}>
        <ActivityIndicator
          spinning={isLoading}
          type={translate(intl, "loading")}
        >
          <JobTypePriceLocation
            jobType={jobType}
            price={price}
            propertyType={propertyType}
            regions={regions}
            intl={intl}
            address={address}
            description={description}
          />

          <div className="interested-in-icons">
            <JobFeatures
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              propertyFeatures={propertyFeatures}
              intl={intl}
            />
          </div>
        </ActivityIndicator>
      </Card>
    </div>
  );
};

ConsumerJobDetailsFeatures.propTypes = {
  intl: intlShape.isRequired,
  price: PropTypes.object,
  propertyType: PropTypes.string,
  regions: PropTypes.object,
  bedrooms: PropTypes.number,
  bathrooms: PropTypes.number,
  propertyFeatures: PropTypes.object,
  isLoading: PropTypes.bool,
  title: PropTypes.any,
  jobType: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string
};

ConsumerJobDetailsFeatures.defaultProps = {
  isLoading: false,
  price: {},
  propertyType: "",
  regions: {},
  bedrooms: 0,
  bathrooms: 0,
  propertyFeatures: {}
};

export default ConsumerJobDetailsFeatures;
