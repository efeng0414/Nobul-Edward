import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BUY } from "../../../core/constants/shared";
import { translate } from "../../utilities/locale";
import "./styles.scss";
import { Row, Col } from "antd";

class ConsumerOfferDetailsServicese extends PureComponent {
  static propTypes = {
    offer: PropTypes.object,
    intl: PropTypes.any,
    jobType: PropTypes.string
  };

  static defaultProps = {
    offer: {},
    jobType: ""
  };

  render() {
    return (
      <div className="consumer-offer-details-services" >
      <Row className="consumer-offer-details-services-container">
      {this.props.offer.services && (
        <Col xs={12} md={6} className="consumer-offer-details-services-container-col">
          <React.Fragment>
            <Row className="consumer-offer-details-services-offered-title">
              {translate(this.props.intl, "servicesOffered")}
            </Row>
            <Row className="consumer-offer-details-services-offered-content">
              {Object.keys(this.props.offer.services).map((service, index) => (
                <Col xs={6} md={6} lg={6} key={index} className="consumer-offer-details-services-offered-content-col">
                  {translate(this.props.intl, service)}
                </Col>
              ))}
            </Row>
          </React.Fragment>
        </Col>
      )}
        <Col xs={12} md={6} className="consumer-offer-details-services-container-col">
          {this.props.jobType === BUY ? (
            <React.Fragment>
              <Row className="consumer-offer-details-services-offered-title">
                {translate(this.props.intl, "offer.rebate")}
              </Row>
              <Row className="consumer-offer-details-services-offered-content">
                {this.props.offer.rebateCommission || '0'}%
              </Row>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Row className="consumer-offer-details-services-offered-title">
                {translate(this.props.intl, "agentListingCommission")}
              </Row>
              <Row className="consumer-offer-details-services-offered-content">
                {this.props.offer.listingCommission || '0'}%
              </Row>
              <Row className="consumer-offer-details-services-offered-title">
                {translate(this.props.intl, "agentCooperatingCommission")}
              </Row>
              <Row className="consumer-offer-details-services-offered-content">
                {this.props.offer.cooperatingCommission || '0'}%
              </Row>
            </React.Fragment>
          )}
        </Col>
      </Row>
      </div>
    );
  }
}

export default ConsumerOfferDetailsServicese;
