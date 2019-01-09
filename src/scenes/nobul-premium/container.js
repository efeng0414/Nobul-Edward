import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Button } from "antd";
import { injectIntl, intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import {
  NOBUL_PREMIUM,
  ICON_AUTOBID,
  ICON_AUTOBID_EDIT,
  ICON_AUTOBID_REVEAL
} from "../../utilities/images";
import { AUTOBID, PROMOTE_OFFER } from "../../../core/constants/shared";

import "./styles.scss";

const NobulPremium = props => {
  const { intl } = props;

  const handleGetNobulPremium = () => {
    props.history.push({
      pathname: "/payment",
      state: { paymentType: AUTOBID }
    });
  };

  const handlePromoteOffer = () => {
    props.history.push({
      pathname: "/payment",
      state: { paymentType: PROMOTE_OFFER }
    });
  };

  const handleTermsAndConditions = e => {
    e.PreventDefault();
    // TODO:
    // redicted to terms and conditions
    // is this a new page? existing page? modal?
  };

  const handlePrivacyPolicy = e => {
    e.PreventDefault();
    // TODO:
    // redicted to privacy policy
    // is this a new page? existing page? modal?
  };

  return (
    <div className="nobulPremium">
      <Helmet title={translate(intl, "helmet.nobulPremium")} />

      <img className="nobulPremiumImg" src={NOBUL_PREMIUM} />

      <h1 className="underline">
        {translate(intl, "premium.givesYourControl")}
      </h1>
      <p>{translate(intl, "premium.autobidding")}</p>
      <p>{translate(intl, "premium.price")}</p>

      <img className="autoBidIcon" src={ICON_AUTOBID} />
      <h3>{`1.${translate(intl, "premium.autoBid")}`}</h3>
      <p>{translate(intl, "premium.autoBidDescription")}</p>

      <img className="autoBidIcon" src={ICON_AUTOBID_EDIT} />
      <h3>{`2.${translate(intl, "premium.editBid")}`}</h3>
      <p>{translate(intl, "premium.editBidDescription")}</p>

      <img className="autoBidIcon" src={ICON_AUTOBID_REVEAL} />
      <h3>{`3.${translate(intl, "premium.revealWinningBid")}`}</h3>
      <p>{translate(intl, "premium.revealWinningBidDescription")}</p>

      <div className="getStartedBelow">
        <h2>{translate(intl, "premium.getStartedBelow")}</h2>
        <p className="small">{translate(intl, "premium.fee")}</p>
        <p className="small">{translate(intl, "premium.subscriptions")}</p>
        <Button type="primary" onClick={handleGetNobulPremium}>
          {translate(intl, "button.signUpForNobulPremium")}
        </Button>

        <p className="small">
          {translate(intl, "premium.alreadyAMember")}
          <span className="underline">
            <a>{translate(intl, "premium.enterHere")}</a>
          </span>
        </p>
      </div>

      <p className="small">
        {translate(intl, "premium.forFullDetails")}
        <span className="underline">
          <a>{translate(intl, "premium.termsConditions")}</a>
        </span>
      </p>

      <p className="small">
        {translate(intl, "premium.goTo")}
        <span className="underline">
          <a>{translate(intl, "premium.nobulHome")}</a>
        </span>
      </p>
    </div>
  );
};

NobulPremium.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object,
  currentUser: PropTypes.object
};

NobulPremium.defaultProps = {
  history: {},
  currentUser: { uid: "" }
};

export default injectIntl(NobulPremium);
