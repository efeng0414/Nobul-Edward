import React from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import CongratulationsIcon from "../../assets/images/congratulations_icon.svg";
import { translate } from "../../utilities/locale";

import "./styles.scss";

const AgentOfferCongratulations = ({ intl, onNext }) => (
  <div className="proposal-congratulations">
    <img
      src={CongratulationsIcon}
      alt={translate(intl, "offer.congratulations")}
    />
    <p className="proposal-congratulations-title">
      {translate(intl, "offer.congratulations")}
    </p>
    <p className="proposal-congratulations-subtitle">
      {translate(intl, "offer.successMessage")}
    </p>
    {/* // REMOVE_PROMOTED
    <Button
      onClick={onNext}
      size="large"
      key={translate(intl, "offer.promoteOffer")}
      className="proposal-congratulations-button"
    >
      {translate(intl, "button.promoteOffer")}
    </Button>
    <p className="proposal-congratulations-footer">
      {translate(intl, "offer.promoteProposalLine1")}
      <br />
      {translate(intl, "offer.promoteProposalLine2")}
    </p> */}
  </div>
);

AgentOfferCongratulations.propTypes = {
  intl: intlShape.isRequired,
  onNext: PropTypes.func
};

AgentOfferCongratulations.defaultProps = {
  onNext: () => {}
};

export default AgentOfferCongratulations;
