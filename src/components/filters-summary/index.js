import React from "react";
import PropTypes from "prop-types";
import SummaryBadge from "./summary-badge";

import "./styles.scss";
import { PROPERTY_TYPE } from "../../../core/api-transform/jobs";
import { ALL } from "../../../core/constants/shared";

const FiltersSummary = props => {
  const { propertyType, setFilters } = props;

  // The function that removes the selcted filter option.
  const resetFilter = ({ filterType }) => {
    const filterValues = [...props[filterType]];
    return e => {
      setFilters(
        filterType,
        filterValues.filter(
          value => value !== e.currentTarget.value && value !== ALL
        )
      );
    };
  };

  return (
    <div className="filtersSummary">
      {propertyType.map(
        type =>
          type !== ALL && (
            <SummaryBadge
              key={type}
              value={type}
              display={type}
              onClick={resetFilter({ filterType: PROPERTY_TYPE })}
            />
          )
      )}
    </div>
  );
};

FiltersSummary.defaultProps = {
  propertyType: [],
  setFilters: () => {}
};

FiltersSummary.propTypes = {
  propertyType: PropTypes.array,
  setFilters: PropTypes.func
};

export default FiltersSummary;
