import React, { Component } from "react";
import { Card, Row, Col, Collapse, Switch, Modal } from "antd";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import PropTypes from "prop-types";

import {
  OFFER_STANDARD_BUYER,
  OFFER_STANDARD_SELLER,
  OFFER_AUTOBID_BUYER,
  OFFER_AUTOBID_SELLER
} from "../../../../../core/constants/offers";
import {
  SELL_PROPOSAL_ICON,
  BUY_PROPOSAL_ICON,
  AUTO_BID_BUY_ICON,
  AUTO_BID_SELL_ICON
} from "../../../../../core/constants/agents";
import { BUY, SELL } from "../../../../../core/constants/shared";
import { AGENT_LICENCE_INFO_AUTO_BID } from "../../../../utilities/google-tag-variable";
import {
  AUTOBIDS_STATUS_ACTIVE,
  AUTOBIDS_STATUS_PAUSED
} from "../../../../../core/constants/users";
import { translate } from "../../../../utilities/locale";
import OfferSettingsLandingSummary from "../offer-settings-landing-summary";
import OfferSettingsIcon from "../offer-settings-icon";
import OfferSettingsPremium from "../offer-settings-premium";
import LicenceForm from "../../../forms/agent/licence-form";
import { AgentRequestSetStandardProposal } from "../../../agent-request-set-standard-proposal";

import "./styles.scss";

const Panel = Collapse.Panel;

class OfferSettingsLanding extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onClick: PropTypes.func,
    isPremium: PropTypes.bool,
    authUserId: PropTypes.string.isRequired,
    afterSubscribeAutobid: PropTypes.bool,
    isLoading: PropTypes.bool,
    autoBidStatusForBuyers: PropTypes.string,
    autoBidStatusForSellers: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    changeAutoBidStatus: PropTypes.func.isRequired,
    unsubscribeFromStripePlanAsync: PropTypes.func.isRequired,
    checkUserHasStripeAsync: PropTypes.func.isRequired,
    getAutoBidStatusAsync: PropTypes.func.isRequired,
    subscriptionId: PropTypes.string,
    hasLicenceData: PropTypes.bool.isRequired,
    businessProfileCreated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    onClick: () => {},
    isPremium: false,
    afterSubscribeAutobid: false
  };

  state = {
    subscriptionId: "",
    autoBidStatusForBuyers: "",
    autoBidStatusForSellers: "",
    showLicenceModal: false
  };

  componentDidMount() {
    this.props.getAutoBidStatusAsync({ userId: this.props.currentUser.uid });
    this.props.checkUserHasStripeAsync({ userId: this.props.currentUser.uid });
    this.setState({
      autoBidStatusForBuyers: this.props.autoBidStatusForBuyers,
      autoBidStatusForSellers: this.props.autoBidStatusForSellers
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subscriptionId !== this.props.subscriptionId) {
      this.setState({ subscriptionId: this.props.subscriptionId });
    }

    prevProps.autoBidStatusForBuyers !== this.props.autoBidStatusForBuyers &&
      this.setState({
        autoBidStatusForBuyers: this.props.autoBidStatusForBuyers
      });

    prevProps.autoBidStatusForSellers !== this.props.autoBidStatusForSellers &&
      this.setState({
        autoBidStatusForSellers: this.props.autoBidStatusForSellers
      });
  }

  @bound
  handleAutoBidServiceToggle({ jobType }) {
    if (!this.props.hasLicenceData) {
      return this.setState({ showLicenceModal: true });
    }

    if (!this.props.businessProfileCreated) {
      return AgentRequestSetStandardProposal({
        history: this.props.history,
        intl: this.props.intl,
        errorText: "agentSettings.offer.createStandardProposalError"
      });
    }

    const toggle = arguments[1];
    const agentId = this.props.currentUser.uid;

    if (toggle) {
      this.props.changeAutoBidStatus({
        agentId,
        status: AUTOBIDS_STATUS_ACTIVE,
        jobType
      });
    } else {
      this.props.changeAutoBidStatus({
        agentId,
        status: AUTOBIDS_STATUS_PAUSED,
        jobType
      });
    }
  }

  @bound
  getStandardOfferLinks() {
    return (
      <Row className="landing-links">
        <Col span={6}>
          <OfferSettingsIcon
            intl={this.props.intl}
            data={OFFER_STANDARD_BUYER}
            text={translate(this.props.intl, "offerSettings.forBuyer")}
            onClick={this.props.onClick}
            icon={BUY_PROPOSAL_ICON}
          />
        </Col>
        <Col span={6}>
          <OfferSettingsIcon
            intl={this.props.intl}
            data={OFFER_STANDARD_SELLER}
            text={translate(this.props.intl, "offerSettings.forSeller")}
            onClick={this.props.onClick}
            icon={SELL_PROPOSAL_ICON}
          />
        </Col>
      </Row>
    );
  }

  @bound
  getPremiumOfferLinks() {
    if (this.props.isPremium) {
      return (
        <Row className="landing-links">
          <Col span={6}>
            <OfferSettingsIcon
              intl={this.props.intl}
              data={OFFER_AUTOBID_BUYER}
              text={translate(this.props.intl, "offerSettings.forBuyer")}
              onClick={this.props.onClick}
              icon={AUTO_BID_BUY_ICON}
              displayPremium
            />
            {this.renderStatusToggle({ jobType: BUY })}
          </Col>
          <Col span={6}>
            <OfferSettingsIcon
              intl={this.props.intl}
              data={OFFER_AUTOBID_SELLER}
              text={translate(this.props.intl, "offerSettings.forSeller")}
              onClick={this.props.onClick}
              icon={AUTO_BID_SELL_ICON}
              displayPremium
            />
            {this.renderStatusToggle({ jobType: SELL })}
          </Col>
        </Row>
      );
    }
    return <OfferSettingsPremium intl={this.props.intl} />;
  }

  @bound
  closeModal() {
    this.setState({ showLicenceModal: false });
  }

  @bound
  renderStatusToggle({ jobType }) {
    const isAutoForBuyersBidActive =
      this.props.autoBidStatusForBuyers === AUTOBIDS_STATUS_ACTIVE;
    const isAutoForSellersBidActive =
      this.props.autoBidStatusForSellers === AUTOBIDS_STATUS_ACTIVE;

    return (
      <div className="autobid-toggle-group">
        <div>
          {translate(
            this.props.intl,
            `subscriptionSettings.activateAutoBidServiceFor${jobType}ers`
          )}
        </div>
        <div>
          <Switch
            checked={
              jobType === BUY
                ? isAutoForBuyersBidActive
                : isAutoForSellersBidActive
            }
            onChange={this.handleAutoBidServiceToggle.bind(this, { jobType })}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="landing">
        <Card>
          <OfferSettingsLandingSummary
            intl={this.props.intl}
            authUserId={this.props.authUserId}
          />
        </Card>

        <Card className="landing-collapse">
          <Collapse
            defaultActiveKey={[this.props.afterSubscribeAutobid ? "2" : "1"]}
          >
            <Panel
              header={translate(
                this.props.intl,
                "offerSettings.standardOfferSettings"
              )}
              key="1"
            >
              {this.getStandardOfferLinks()}
            </Panel>
            <Panel
              header={translate(
                this.props.intl,
                "offerSettings.autoBidOfferSettings"
              )}
              key="2"
            >
              {this.getPremiumOfferLinks()}
            </Panel>
          </Collapse>
        </Card>

        <Modal
          visible={!this.props.hasLicenceData && this.state.showLicenceModal}
          onCancel={this.closeModal}
          footer={null}
        >
          <LicenceForm GTM_EVENT={AGENT_LICENCE_INFO_AUTO_BID} />
        </Modal>
      </div>
    );
  }
}

export default OfferSettingsLanding;
