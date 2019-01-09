import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import { translate } from "../../utilities/locale";

import {
  OFFER_REJECTED,
  OFFER_ACCEPTED,
  OFFER_OPEN
} from "../../../core/constants/offers";

const OfferItem = props => {
  const {
    offer,
    intl,
    offerClick,
    jobType,
    offerId,
    isPremium = false
  } = props;

  let regions = [];
  if (offer.regions) {
    for (let key in offer.regions) {
      regions.push(offer.regions[key].name);
    }
  }

  const clickHandle = () => {
    offerClick(jobType, offer, offerId);
  };

  const showButton = () => {
    switch (offer.status) {
      case OFFER_REJECTED:
        return isPremium ? (
          <Button type="primary" onClick={clickHandle}>
            {translate(intl, "button.viewWinningOffer")}
          </Button>
        ) : null;
      case OFFER_OPEN:
        return (
          <Button type="primary" onClick={clickHandle}>
            {translate(intl, "button.updateOffer")}
          </Button>
        );
      case OFFER_ACCEPTED:
        return (
          <Button type="primary" onClick={clickHandle}>
            {translate(intl, "button.generateAgreement")}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Link
      to={
        offer.status === OFFER_ACCEPTED
          ? `/generateAgreement/buy/${offerId}`
          : `/agentViewOfferDetails/${jobType}/${offerId}`
      }
    >
      <Card bordered={false}>
        <p>
          {translate(intl, "offerId")} : {offerId}
        </p>
        <p>
          {translate(intl, "offerStatus")} : {offer.status}
        </p>
        {offer.priceRangeHigh &&
        (offer.priceRangeLow || offer.priceRangeLow === 0) ? (
          <p>
            {translate(intl, "priceRange")} :
            {` $${offer.priceRangeLow}-$${offer.priceRangeHigh}`}
          </p>
        ) : null}
        {offer.propertyType ? (
          <p>
            {translate(intl, "propertyType")} :
            {translate(intl, offer.propertyType)}
          </p>
        ) : null}
        {regions.length > 0 ? (
          <p>
            {translate(intl, "regions")} : {` ${regions.toString()}`}
          </p>
        ) : null}
        <p>{jobType}</p>
      </Card>
    </Link>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.object,
  intl: intlShape.isRequired,
  offerClick: PropTypes.func,
  jobType: PropTypes.string,
  offerId: PropTypes.string,
  isPremium: PropTypes.bool
};

export default OfferItem;
