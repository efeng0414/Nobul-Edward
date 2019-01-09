import React, { Component } from "react";
import PropTypes from "prop-types";
import UnsubscribePremiumModal from "../../../unsubscribe-premium-modal";
import { connect } from "react-redux";
import { intlShape } from "react-intl";
import { Col, Row, Switch, Button } from "antd";
import { Link } from "react-router-dom";
import { translate } from "../../../../utilities/locale";
import {
  changeAutoBidStatusAsync,
  getAgentAutoBidStatusAsync
} from "../../../../../core/thunk/autoBids";
import {
  unsubscribeFromStripePlanAsync,
  checkIfUserHasStripeAsync
} from "../../../../../core/thunk/stripeCustomers";
import { url } from "../../../../routes/myNobul";
import {
  AUTOBIDS_STATUS_ACTIVE,
  AUTOBIDS_STATUS_PAUSED
} from "../../../../../core/constants/users";
import { BUY, SELL } from "../../../../../core/constants/shared";
import { bound } from "class-bind";

import "./styles.scss";

class SubscriptionSettings extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    isLoading: PropTypes.bool,
    autoBidStatusForBuyers: PropTypes.string,
    autoBidStatusForSellers: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    changeAutoBidStatus: PropTypes.func.isRequired,
    unsubscribeFromStripePlanAsync: PropTypes.func.isRequired,
    checkUserHasStripeAsync: PropTypes.func.isRequired,
    getAutoBidStatusAsync: PropTypes.func.isRequired,
    isPremium: PropTypes.bool.isRequired,
    subscriptionId: PropTypes.string
  };

  static defaultProps = {
    isLoading: true,
    subscriptionId: ""
  };

  state = {
    visibility: false,
    showPaymentModal: false,
    currentStep: 1,
    subscriptionId: "",
    autoBidStatusForBuyers: "",
    autoBidStatusForSellers: ""
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
  handleUpgradeButtonClick() {
    this.setState({
      showPaymentModal: true
    });
  }

  @bound
  nextStepForAgentPayment() {
    this.setState({
      currentStep: 2
    });
  }

  @bound
  handleModalClose() {
    this.setState({
      showPaymentModal: false
    });
  }

  @bound
  handleAutoBidServiceToggle({ jobType }) {
    const toggle = arguments[1];
    const agentId = this.props.currentUser.uid;
    if (toggle) {
      this.setState({ autoBidStatus: AUTOBIDS_STATUS_ACTIVE });
      this.props.changeAutoBidStatus({
        agentId,
        status: AUTOBIDS_STATUS_ACTIVE,
        jobType
      });
    } else {
      this.setState({ autoBidStatus: AUTOBIDS_STATUS_PAUSED });
      this.props.changeAutoBidStatus({
        agentId,
        status: AUTOBIDS_STATUS_PAUSED,
        jobType
      });
    }
  }

  @bound
  toggleVisibility() {
    this.setState({
      visibility: !this.state.visibility
    });
  }

  renderUnsubscribeOption() {
    return (
      <Row className="subscription-settings-row">
        <Col span={12}>
          <Col span={10}>
            <div>
              <span className="subscription-settings-row-title">
                {translate(
                  this.props.intl,
                  "subscriptionSettings.premiumAccount"
                )}
              </span>
              <br />

              <p
                className="subscription-settings-link"
                onClick={this.toggleVisibility}
              >
                {translate(
                  this.props.intl,
                  "subscriptionSettings.unsubscribePremiumAccount"
                )}
              </p>
            </div>
            <UnsubscribePremiumModal
              visibility={this.state.visibility}
              toggleVisibility={this.toggleVisibility}
              unsubscribeFromStripePlanAsync={
                this.props.unsubscribeFromStripePlanAsync
              }
              subscriptionId={this.state.subscriptionId}
              userId={this.props.currentUser.uid}
              intl={this.props.intl}
            />
          </Col>
        </Col>
      </Row>
    );
  }

  renderUpgradeOption() {
    return (
      <Row className="subscription-settings-row upgrade-options">
        <Col span={12}>
          <Col span={12}>
            <div className="subscription-settings-row-upgrade">
              <p className="subscription-settings-row-upgrade-bold">
                {translate(
                  this.props.intl,
                  "subscriptionSettings.premiumAccountSubscription"
                )}
              </p>
              <div className="subscription-settings-row-upgrade-button">
                <Link to={url.subscriptions}>
                  <Button onClick={this.handleUpgradeButtonClick}>
                    {translate(this.props.intl, "button.upgrade")}
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    );
  }

  @bound
  renderStatusToggle({ jobType }) {
    const isAutoForBuyersBidActive =
      this.state.autoBidStatusForBuyers === AUTOBIDS_STATUS_ACTIVE;
    const isAutoForSellersBidActive =
      this.state.autoBidStatusForSellers === AUTOBIDS_STATUS_ACTIVE;

    return (
      <div className="subscription-settings-row-content">
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
            disabled={!this.props.isPremium}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="subscription-settings">
        {this.props.isPremium
          ? this.renderUnsubscribeOption()
          : this.renderUpgradeOption()}
        <div className="subscription-settings-row">
          <div className="subscription-settings-row-title">
            {translate(this.props.intl, "subscriptionSettings.autoBidService")}
          </div>
          <div>
            {this.renderStatusToggle({ jobType: BUY })}
            {this.renderStatusToggle({ jobType: SELL })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.users.isLoading,
  autoBidStatusForBuyers:
    state.authentication.autoBid && state.authentication.autoBid.buy
      ? state.authentication.autoBid.buy.status
      : "",
  autoBidStatusForSellers:
    state.authentication.autoBid && state.authentication.autoBid.sell
      ? state.authentication.autoBid.sell.status
      : "",
  currentUser: state.authentication.currentUser,
  subscriptionId: state.stripeCustomers.subscriptionId
});

const mapDispatchToProps = dispatch => ({
  changeAutoBidStatus: ({ agentId, status, jobType }) =>
    dispatch(changeAutoBidStatusAsync({ agentId, status, jobType })),
  unsubscribeFromStripePlanAsync: (userId, subscriptionId) =>
    dispatch(unsubscribeFromStripePlanAsync(userId, subscriptionId)),
  checkUserHasStripeAsync: ({ userId }) =>
    dispatch(checkIfUserHasStripeAsync({ userId })),
  getAutoBidStatusAsync: ({ userId }) =>
    dispatch(getAgentAutoBidStatusAsync({ userId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SubscriptionSettings
);
