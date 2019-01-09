import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";

import {
  REBATE_COMMISSION,
  COOPERATING_COMMISSION,
  LISTING_COMMISSION
} from "../../../../../../core/api-transform/users";
import Commission from "../../../../form-fields/commission";
import { translate } from "../../../../../utilities/locale";
import { BUY, SELL } from "../../../../../../core/constants/shared";

const CommissionFormItem = ({ intl, jobType, form }) => (
  <div>
    {jobType === BUY && (
      <div className="offer-settings__commission">
        <Commission
          form={form}
          intl={intl}
          label={translate(intl, "offerSettings.rebateCommission")}
          name={REBATE_COMMISSION}
        />
      </div>
    )}

    {jobType === SELL && (
      <div className="offer-settings__commission">
        <Commission
          form={form}
          required
          intl={intl}
          label={translate(intl, "offerSettings.cooperatingCommission")}
          name={COOPERATING_COMMISSION}
        />
        <Commission
          form={form}
          required
          intl={intl}
          label={translate(intl, "offerSettings.listingCommission")}
          name={LISTING_COMMISSION}
        />
      </div>
    )}
  </div>
);

CommissionFormItem.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.object,
  jobType: PropTypes.string
};

export default CommissionFormItem;
