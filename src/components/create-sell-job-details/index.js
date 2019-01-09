import React from "react";
import { Button } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";

import { translate } from "../../utilities/locale";

const CreateSellJobDetails = props => {
  const { intl } = props;
  return (
    <div>
      <p>{translate(intl, "createSellJobDetails")}</p>
      <Button type="primary" onClick={props.onNextStep}>
        {translate(intl, "getStarted")}
      </Button>
    </div>
  );
};
CreateSellJobDetails.propTypes = {
  intl: intlShape.isRequired,
  onNextStep: PropTypes.func.isRequired
};

export default injectIntl(CreateSellJobDetails);
