import React from "react";
import PropTypes from "prop-types";
import { CURRENCY_SYMBOLS } from "./utilities";
import "./styles.scss";
import { DEFAULT_COUNTRY } from "../../../core/constants/shared";

const hasDecimal = number => (number * 100) % 100 > 0;

const Currency = props => (
  <span className="currency">
    <span
      className="currency__identifier"
      dangerouslySetInnerHTML={{ __html: CURRENCY_SYMBOLS[props.currency] }} // We might have <span> in symbol
    />
    {props.value && (
      <span className="currency__value">
        {hasDecimal(parseFloat(props.value))
          ? parseFloat(props.value).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          : parseFloat(props.value).toLocaleString("en-US")}
      </span>
    )}
  </span>
);

Currency.propTypes = {
  currency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.any
};

Currency.defaultProps = {
  currency: DEFAULT_COUNTRY,
  value: false
};

export default Currency;
