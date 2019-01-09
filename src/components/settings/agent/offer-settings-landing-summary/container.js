import React, { Component } from "react";
import { Row, Col, Rate } from "antd";
import { intlShape } from "react-intl";
import StartIcon from "react-icons/lib/fa/star";
import PropTypes from "prop-types";

import { translate } from "../../../../utilities/locale";
import { BUY, SELL } from "../../../../../core/constants/shared";
import { getFixedRating } from "../../../../../core/utilities/getFixedRating";

import "./styles.scss";

class OfferSettingsLandingSummary extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    getAgentBuyOffers: PropTypes.func,
    getAgentSellOffers: PropTypes.func,
    getAgentAutobidOffers: PropTypes.func,
    getAgentRating: PropTypes.func,
    authUserId: PropTypes.string.isRequired,
    agentRatings: PropTypes.object,
    totalAcceptedOffers: PropTypes.number,
    totalAcceptedConfirmedOffers: PropTypes.number
  };

  static defaultProps = {
    getAgentBuyOffers: () => {},
    getAgentSellOffers: () => {},
    getAgentRating: () => {},
    getAgentAutobidOffers: () => {},
    totalAcceptedOffers: 0,
    totalAcceptedConfirmedOffers: 0,
    agentRatings: {
      averageRating: 0,
      ratingsData: {}
    }
  };

  componentDidMount() {
    this.props.getAgentBuyOffers({
      jobType: BUY,
      userId: this.props.authUserId
    });
    this.props.getAgentSellOffers({
      jobType: SELL,
      userId: this.props.authUserId
    });
    this.props.getAgentAutobidOffers(this.props.authUserId);
    this.props.getAgentRating({ agentId: this.props.authUserId });
  }

  //TO-DO: Add agent ratings to this page

  render() {
    return (
      <div className="landing-header">
        <h2>{translate(this.props.intl, "offerSettings.summary")}</h2>
        {/* <div>
          <div className="landing-header-summary">
            <div className="landing-header-summary-rating">4.7</div>
            <div className="landing-header-summary-stars">
              <Rate
                allowHalf
                character={<StartIcon size={30} />}
                value={getFixedRating(this.props.agentRatings.averageRating)}
                disabled
              />
            </div>
          </div>
          <span>
            {translate(this.props.intl, "offerSettings.overallRating")}
          </span>
        </div> */}
        <div className="landing-header-stadistics">
          <Row>
            <Col span={8}>
              {translate(
                this.props.intl,
                "offerSettings.totalAcceptedOffersInReview"
              )}
            </Col>
            <Col span={4}>
              <span>
                {this.props.totalAcceptedOffers +
                  this.props.totalAcceptedConfirmedOffers}
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              {translate(
                this.props.intl,
                "offerSettings.totalAcceptedOffersInContract"
              )}
            </Col>
            <Col span={4}>
              <span>{this.props.totalAcceptedConfirmedOffers}</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              {translate(this.props.intl, "offerSettings.totalReviews")}
            </Col>
            <Col span={4}>
              <span>{this.props.totalAcceptedOffers}</span>
            </Col>
          </Row>
          {/* <Row>
            <Col span={8}>
              {translate(this.props.intl, "offerSettings.totalReviews")}
            </Col>
            <Col span={4}>
              <span>
                {Object.keys(this.props.agentRatings.ratingsData).length}
              </span>
            </Col>
          </Row> */}
        </div>
      </div>
    );
  }
}

export default OfferSettingsLandingSummary;
