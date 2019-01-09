import React from "react";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import { BathroomNoBorder } from "../bath-icon";
import { BedIconNoBorder } from "../bed-icon";
import LimitedList from "../limited-list";
import "./styles.scss";

const PropertyCriteria = props => {
  const regionsList = props.job.regions && Object.values(props.job.regions);
  const propertyTypesList = [
    props.job.propertyType && translate(props.intl, props.job.propertyType)
  ];

  return (
    <div className="property-criteria">
      <div className="property-criteria-group">
        <span className="property-criteria-header">
          {props.priceRange
            ? translate(props.intl, "price")
            : translate(props.intl, "propertyType")}
        </span>
        {!props.priceRange ? (
          <LimitedList intl={props.intl} data={propertyTypesList} />
        ) : (
          <div className="property-criteria-group-price">
            {props.priceRange}
          </div>
        )}

        <div className="property-criteria-group-countIcon">
          {props.bath !== false && <BathroomNoBorder />}
          {props.bath !== false && (
            <span className="property-criteria-group-countIcon-bathCount">
              {props.bath}
            </span>
          )}

          {props.bed !== false && <BedIconNoBorder />}
          {props.bed !== false && (
            <span className="property-criteria-group-countIcon-bedCount">
              {props.bed}
            </span>
          )}
        </div>
      </div>
      <div className="property-criteria-group">
        <span className="property-criteria-header">
          {translate(
            props.intl,
            regionsList && regionsList.length === 1
              ? "neighborhood"
              : "neighborhoods"
          )}
        </span>
        {regionsList && (
          <LimitedList intl={props.intl} data={regionsList} datakey="name" />
        )}
      </div>
    </div>
  );
};

PropertyCriteria.propTypes = {
  job: PropTypes.object,
  intl: PropTypes.any.isRequired,
  priceRange: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  bed: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  bath: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

PropertyCriteria.defaultProps = {
  job: {},
  bed: false,
  bath: false,
  priceRange: false
};

export default PropertyCriteria;
