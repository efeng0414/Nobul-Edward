import React from "react";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";

import { translate } from "../../utilities/locale";

const CreateSellJobComplete = props => {
  const { intl } = props;
  return (
    <div>
      <br />
      <br />
      <p>Thank you for making a sell job.</p>
      <br />
      <br />
      <br />
    </div>
  );
};
CreateSellJobComplete.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CreateSellJobComplete);
