import React from "react";
import PropTypes from "prop-types";

import { Button, Row, Col, Icon } from "antd";

import LocationSearch from "../location-search";
import "./styles.scss";

const LocationSelector = ({
  buttonClassName,
  searchClick,
  mapNavigate,
  onLocationSelect,
  searchOptions,
  displaySearchButton,
  cachedLocation
}) => (
  <div className="location-selector">
    <div className="location-selector-search">
      <LocationSearch
        onLocationSelect={onLocationSelect}
        mapNavigate={mapNavigate}
        searchOptions={searchOptions}
        cachedLocation={cachedLocation}
      />
    </div>
    {displaySearchButton && (
      <div className="location-selector-button">
        <Button
          className={`search-button ${buttonClassName}`}
          onClick={searchClick}
        >
          <Icon className="search-button-icon" type="search" />
        </Button>
      </div>
    )}
  </div>
);

LocationSelector.propTypes = {
  onLocationSelect: PropTypes.func,
  searchClick: PropTypes.func,
  mapNavigate: PropTypes.func,
  buttonClassName: PropTypes.string.isRequired,
  searchOptions: PropTypes.object,
  displaySearchButton: PropTypes.bool,
  cachedLocation: PropTypes.object
};

LocationSelector.defaultProps = {
  buttonClassName: "",
  searchOptions: {},
  displaySearchButton: true,
  cachedLocation: {}
};

export default LocationSelector;
