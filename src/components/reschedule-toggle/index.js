import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";

const RescheduleToggle = ({ onClick, intl }) => (
  <Button onClick={onClick} className="reschedule-toggle">
    {translate(intl, "viewEventModal.rescheduleToggle")}
  </Button>
);

RescheduleToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default injectIntl(RescheduleToggle);
