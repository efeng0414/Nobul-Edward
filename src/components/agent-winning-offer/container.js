import React, { Component } from "react";
import { Card } from "antd";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import TrophyIcon from "react-icons/lib/fa/trophy";

import SelectedServices from "../selected-services";
import { BUY, BUYER, SELLER } from "../../../core/constants/shared";
import { translate } from "../../utilities/locale";

import "./styles.scss";

class AgentWinningOffer extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    jobType: PropTypes.string,
    jobId: PropTypes.string,
    winningOffer: PropTypes.object,
    getJobWinningOffer: PropTypes.func,
    callThunk: PropTypes.bool,
    displayBackground: PropTypes.bool
  };

  static defaultProps = {
    winningOffer: {},
    getJobWinningOffer: () => {},
    callThunk: true,
    displayBackground: true
  };

  getCommissions() {
    if (this.props.jobType === BUY) {
      return (
        <div className="agent-winning-offer-commissions">
          <h5>
            {translate(this.props.intl, "offerDetail.rebateOffered", {
              userType: BUYER
            })}
          </h5>
          {`${this.props.winningOffer.rebateCommission}%`}
        </div>
      );
    }
    return (
      <div className="agent-winning-offer-commissions">
        <h5>
          {translate(this.props.intl, "offerDetail.listingOffered", {
            userType: SELLER
          })}%
        </h5>
        {`${this.props.winningOffer.listingCommission}%`}
        <h5>
          {translate(this.props.intl, "offerDetail.cooperatingOffered", {
            userType: SELLER
          })}%
        </h5>
        {`${this.props.winningOffer.cooperatingCommission}%`}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.callThunk) {
      this.props.getJobWinningOffer({
        jobType: this.props.jobType,
        jobId: this.props.jobId
      });
    }
  }

  render() {
    const hideBackgroundClass =
      !this.props.displayBackground && "hide-background";
    return (
      <div className="agent-winning-offer">
        <Card className={hideBackgroundClass}>
          <div className="agent-winning-offer-title">
            <TrophyIcon size="20" />
            <span>
              {translate(this.props.intl, "offerDetail.winningOffer")}
            </span>
          </div>
          <div className="agent-winning-offer-info">
            {this.getCommissions()}
            <h5>{translate(this.props.intl, "offerDetail.servicesOffered")}</h5>
            <SelectedServices
              intl={this.props.intl}
              selectedServices={Object.keys(
                this.props.winningOffer.services || []
              )}
              displayCheckbox={false}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default AgentWinningOffer;
