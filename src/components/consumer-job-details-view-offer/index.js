import React from "react";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ConsumerJobDetailsViewOffer = props => {
  const { intl, jobType, offerId } = props;

  return (
    <div>
      <h2>{translate(intl, "bidsOnProfile")}</h2>
      <div>
        <span className="bids">{translate(intl, "acceptedOfferNumber")}</span>
      </div>
      <div>
        <Link to={`/consumerViewOfferDetails/${jobType}/${offerId}`}>
          <Button type="primary">{translate(intl, "button.viewOffer")}</Button>
        </Link>
      </div>
    </div>
  );
};

ConsumerJobDetailsViewOffer.propTypes = {
  intl: PropTypes.any,
  jobType: PropTypes.string,
  offerId: PropTypes.string
};

ConsumerJobDetailsViewOffer.defaultProps = {
  jobType: "",
  offerId: ""
};

export default ConsumerJobDetailsViewOffer;
