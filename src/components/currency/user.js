/*
    Display the value provided in the currency pof the location of the current user.
*/

import React from "react";
import PropTypes from "prop-types";
import Currency from "./";

const UserCurrency = props => <Currency value={props.value} />;

UserCurrency.propTypes = {
  value: PropTypes.any
};

UserCurrency.defaultProps = {
  value: false
};

export default UserCurrency;
