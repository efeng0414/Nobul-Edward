/*
    Display the value provided in the currency the page is set to via URL.
*/

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Currency from "./";
import { withRouter } from "react-router-dom";

import { getLocation } from "../../utilities/url";
import { COUNTRY_FROM_STATE } from "../../../core/data/provinces";

@withRouter
class PageCurrency extends PureComponent {
  state = {
    stateCode: getLocation(this.props.location)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      // Update currency
      this.setState({
        stateCode: getLocation(this.props.location)
      });
    }
  }

  render() {
    return (
      <Currency
        value={this.props.value}
        currency={COUNTRY_FROM_STATE[this.state.stateCode]}
      />
    );
  }
}

PageCurrency.propTypes = {
  location: PropTypes.object,
  value: PropTypes.any
};

PageCurrency.defaultProps = {
  value: false
};

export default PageCurrency;
