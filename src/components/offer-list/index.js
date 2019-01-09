import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { intlShape } from "react-intl";

import OfferItem from "../offer-item";

const OfferList = props => {
  const { offers, intl, offerClick, jobType, isPremium = false } = props;
  return (
    <Row>
      {Object.keys(offers).map(id => (
        <Col xs={24} sm={12} md={8} key={id}>
          <OfferItem
            offer={offers[id]}
            intl={intl}
            offerClick={offerClick}
            jobType={jobType}
            offerId={id}
            isPremium={isPremium}
          />
        </Col>
      ))}
    </Row>
  );
};

OfferList.propTypes = {
  offers: PropTypes.object,
  intl: intlShape.isRequired,
  offerClick: PropTypes.func,
  jobType: PropTypes.string,
  isPremium: PropTypes.bool
};

export default OfferList;
