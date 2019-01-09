import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import PropertyLogoIcon from "../property-logo-icon";

import "./mls-footer-styles.scss";

const MLSFooter = props => {
  return (
    <div className="mls-footer">
      <div className="mls-footer__container">
        <PropertyLogoIcon iconSrc={props.mlsIcon} />
        <div className="mls-footer__content">
          <p>{translate(props.intl, "mlsTrademark")}</p>
        </div>
      </div>
      <div className="mls-footer__container">
        <PropertyLogoIcon
          iconSrc={props.realtorIcon}
          labelKeyForProvinceOrState={props.labelKeyForProvinceOrState}
        />

        <div className="mls-footer__content">
          <p>
            {translate(
              props.intl,
              `regionalContent.${props.labelKeyForProvinceOrState}.listingTerms`
            )}
          </p>
          <p>
            {translate(
              props.intl,
              `regionalContent.${
                props.labelKeyForProvinceOrState
              }.trademarkTerms`
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

MLSFooter.propTypes = {
  intl: intlShape,
  labelKeyForProvinceOrState: PropTypes.string,
  realtorIcon: PropTypes.string,
  mlsIcon: PropTypes.string
};

export default injectIntl(MLSFooter);
