import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { translate } from "../../../../../utilities/locale";

const UpgradeSubscription = ({ intl, subscriptionsUrl }) => (
  <div className="offer-settings__upgrade">
    <hr />
    <p>
      {translate(intl, "subscriptions.header")}
      <span>{translate(intl, "subscriptions.headerBold")}</span>
    </p>
    <p>{translate(intl, "subscriptions.monthlySubheader")}</p>
    <Button>
      <Link to={subscriptionsUrl}>{translate(intl, "button.upgrade")}</Link>
    </Button>
  </div>
);

UpgradeSubscription.propTypes = {
  intl: intlShape.isRequired,
  subscriptionsUrl: PropTypes.string
};

export default UpgradeSubscription;
