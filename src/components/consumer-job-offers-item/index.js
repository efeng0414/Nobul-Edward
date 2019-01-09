import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { List, Avatar } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { injectIntl, intlShape } from "react-intl";
import { OFFER_STATUS_CLASSNAME } from "../../utilities/constants";

import "./styles.scss";
import { translate } from "../../utilities/locale";
import {
  OFFER_OPEN,
  OFFER_ACCEPTED,
  OFFER_WITHDRAWN,
  OFFER_REJECTED,
  OFFER_PENDING_VERIFICATION_REJECTED,
  OFFER_JOBEXPIRED,
  OFFER_JOBDELETED
} from "../../../core/constants/offers";
import {
  COOPERATING_COMMISSION,
  SERVICES,
  STATUS
} from "../../../core/api-transform/offers";

@injectIntl
class ConsumerJobOffersItem extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    offerDetail: PropTypes.object,
    agentData: PropTypes.object,
    offerID: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    offerDetail: {},
    agentData: {},
    onClick: () => {}
  };

  offerStatus({ status }) {
    switch (status) {
      case OFFER_OPEN:
        return translate(this.props.intl, "offerOpen");
      case OFFER_ACCEPTED:
        return translate(this.props.intl, "offerAccepted");
      case OFFER_WITHDRAWN:
        return translate(this.props.intl, "offerWithdrawn");
      case OFFER_REJECTED:
        return translate(this.props.intl, "offerRejected");
      case OFFER_JOBEXPIRED:
        return translate(this.props.intl, "offerJobExpired");
      case OFFER_JOBDELETED:
        return translate(this.props.intl, "offerJobDeleted");
      default:
        return status;
    }
  }

  @bound
  handleClick() {
    this.props.onClick({
      offerId: this.props.offerID,
      readStatus: !this.props.offerDetail.consumerHasRead
    });
  }

  @bound
  renderCommision() {
    const offerDetail = this.props.offerDetail;

    const isSell = offerDetail.hasOwnProperty(COOPERATING_COMMISSION);

    const serviceNum = offerDetail.hasOwnProperty(SERVICES)
      ? Object.keys(offerDetail.services).length
      : 0;

    if (isSell) {
      const cooperatingCommission = offerDetail.cooperatingCommission || 0;
      const listingCommission = offerDetail.listingCommission || 0;

      return (
        <div className="offer-commission__sector-wrapper">
          <div className="offer-commission__sector">
            <div className="offer-commission__number">{`${cooperatingCommission}%`}</div>
            <div>{translate(this.props.intl, "cooperatingCommission")}</div>
          </div>
          <div className="offer-commission__sector">
            <div className="offer-commission__number">{`${listingCommission}%`}</div>
            <div>{translate(this.props.intl, "proposal.listingTitle")}</div>
          </div>
          <div className="offer-commission__sector">
            <div className="offer-commission__number">{`${serviceNum}`}</div>
            <div>
              {translate(this.props.intl, "offerDetail.servicesOffered")}
            </div>
          </div>
        </div>
      );
    } else {
      const rebateCommission = offerDetail.rebateCommission || 0;

      return (
        <div className="offer-commission__sector-wrapper">
          <div className="offer-commission__sector">
            <div className="offer-commission__number">{`${rebateCommission}%`}</div>
            <div>{translate(this.props.intl, "rebateOffered")}</div>
          </div>
          <div className="offer-commission__sector">
            <div className="offer-commission__number">{`${serviceNum}`}</div>
            <div>
              {translate(this.props.intl, "offerDetail.servicesOffered")}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { offerDetail, agentData } = this.props;
    const offerClassNameRead = !offerDetail.consumerHasRead ? "offer-read" : "";
    if (offerDetail[STATUS] === OFFER_PENDING_VERIFICATION_REJECTED)
      return null;

    return (
      <div className="offer-item">
        <List.Item
          className={`offer-list-item ${offerClassNameRead}`}
          onClick={this.handleClick}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                className="offer-list-item-avatar"
                src={agentData.avatarUrl}
                icon={!agentData.avatarUrl && "user"}
              />
            }
            title={`Agent from ${agentData.brokerageName || ""}`}
            description={this.renderCommision()}
          />
          <div
            className={`offer-list-item-status ${
              OFFER_STATUS_CLASSNAME[offerDetail.status]
            }`}
          >
            {this.offerStatus({ status: offerDetail.status })}
          </div>
          {offerDetail.isPromoted && (
            <div className="offer-list-item-promoted">
              {translate(this.props.intl, "proposal.promoted")}
            </div>
          )}
        </List.Item>
      </div>
    );
  }
}

export default withRouter(ConsumerJobOffersItem);
