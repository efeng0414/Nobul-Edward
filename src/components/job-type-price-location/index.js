import React from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import { getRegionsNames } from "../../../core/utilities/misc";
import {
  MAX_CURRENT_LISTING_PRICE,
  MAX_DISPLAY_PRICE
} from "../../../core/constants/shared";

import Currency from "../currency";
import LimitedList from "../limited-list";

import "./styles.scss";
import { getCountryFromRegions } from "../../../core/utilities/location";

const JobTypePriceLocation = ({
  price,
  propertyType,
  regions,
  intl,
  description
}) => {
  const locations = getRegionsNames(regions);
  const country = getCountryFromRegions(Object.values(regions));
  const formatPriceDisplay = ({ priceRangeLow, priceRangeHigh }) => { // eslint-disable-line
    if (
      priceRangeLow === priceRangeHigh &&
      priceRangeLow === MAX_CURRENT_LISTING_PRICE
    ) {
      return (
        <span>
          <Currency value={priceRangeHigh} currency={country} />+
        </span>
      );
    }
    if (priceRangeLow === priceRangeHigh) {
      return <Currency value={priceRangeHigh} currency={country} />;
    }
    if (priceRangeHigh === MAX_CURRENT_LISTING_PRICE) {
      return (
        <span>
          <Currency value={priceRangeLow} currency={country} /> -{" "}
          <Currency value={MAX_DISPLAY_PRICE} currency={country} />+{" "}
        </span>
      );
    }
    return (
      <span>
        <Currency value={priceRangeLow} currency={country} /> -{" "}
        <Currency value={priceRangeHigh} currency={country} />
      </span>
    );
  };

  const priceRange = formatPriceDisplay({
    priceRangeLow: price.priceRangeLow,
    priceRangeHigh: price.priceRangeHigh
  });

  return (
    <div>
      <div className="job-type-price-location">
        <div className="job-type-price-location-left">
          <div className="job-type-price-location-item">
            <h5>{translate(intl, "propertyType")}</h5>
            {propertyType && <span>{translate(intl, propertyType)}</span>}
          </div>
          <div className="job-type-price-location-item">
            <h5>{translate(intl, "agentJobDetail.priceRange")}</h5>
            <span>{priceRange}</span>
          </div>
        </div>
        <div className="job-type-price-location-right">
          <div className="job-type-price-location-item">
            <h5>{translate(intl, "location")}</h5>
            <LimitedList intl={intl} data={locations} />
          </div>
          {description && (
            <div className="job-type-price-location-item">
              <h5>{translate(intl, "description")}</h5>
              <span>{description}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

JobTypePriceLocation.propTypes = {
  intl: intlShape.isRequired,
  price: PropTypes.object,
  propertyType: PropTypes.string,
  regions: PropTypes.object,
  jobType: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  formatPriceDisplay: PropTypes.func
};

JobTypePriceLocation.defaultProps = {
  price: {},
  propertyType: "",
  regions: {}
};

export default JobTypePriceLocation;
