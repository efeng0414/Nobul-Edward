import React, { Component } from "react";
import { Card, Tabs } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";
import PropTypes from "prop-types";

import requireAuth from "../../utilities/require-auth";
import { isAgent } from "../../utilities/route-verification";
import validateUser from "../../utilities/validate-user";
import AccountSettings from "../../components/settings/agent/account-settings";
//import SubscriptionSettings from "../../components/settings/agent/subscriptions-settings";

import OfferSettings from "../../components/settings/agent/offer-settings";
import NotificationSettings from "../../components/notification-settings";
import { agentConfig } from "../../components/notification-settings/config";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { getSearchParamObject } from "../../utilities/get-search-params";
import { tabKeyMap } from "./utilities";
import "./styles.scss";

const TabPane = Tabs.TabPane;

@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
class AgentSettings extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    userType: PropTypes.string.isRequired,
    authUserId: PropTypes.string.isRequired,
    isPremium: PropTypes.bool,
    autoBidBuyPriceRange: PropTypes.array.isRequired,
    autoBidSellPriceRange: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    businessProfileCreated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    autoBidStatusForBuyers: PropTypes.string,
    autoBidStatusForSellers: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    changeAutoBidStatus: PropTypes.func.isRequired,
    unsubscribeFromStripePlanAsync: PropTypes.func.isRequired,
    checkUserHasStripeAsync: PropTypes.func.isRequired,
    getAutoBidStatusAsync: PropTypes.func.isRequired,
    subscriptionId: PropTypes.string,
    hasLicenceData: PropTypes.bool.isRequired
  };

  static defaultProps = {
    user: {},
    updateProfile: () => {},
    isPremium: false
  };

  render() {
    const tabSearchParam = getSearchParamObject({
      searchParamString: this.props.location.search
    })["tab"];
    return (
      <div>
        <div className="settings">
          <MyDashboardMeta titleKey="helmet.myDashboard.settings" />
          <div className="settings-menu">
            <Tabs defaultActiveKey={tabKeyMap[tabSearchParam] || "1"}>
              <TabPane
                tab={translate(this.props.intl, "proposalSettings")}
                key="1"
              >
                <OfferSettings
                  intl={this.props.intl}
                  authUserId={this.props.authUserId}
                  businessProfileCreated={this.props.businessProfileCreated}
                  isPremium={this.props.isPremium}
                  autoBidBuyPriceRange={this.props.autoBidBuyPriceRange}
                  autoBidSellPriceRange={this.props.autoBidSellPriceRange}
                  isLoading={this.props.isLoading}
                  autoBidStatusForBuyers={this.props.autoBidStatusForBuyers}
                  autoBidStatusForSellers={this.props.autoBidStatusForSellers}
                  currentUser={this.props.currentUser}
                  changeAutoBidStatus={this.props.changeAutoBidStatus}
                  unsubscribeFromStripePlanAsync={
                    this.props.unsubscribeFromStripePlanAsync
                  }
                  checkUserHasStripeAsync={this.props.checkUserHasStripeAsync}
                  getAutoBidStatusAsync={this.props.checkUserHasStripeAsync}
                  subscriptionId={this.props.subscriptionId}
                  hasLicenceData={this.props.hasLicenceData}
                />
              </TabPane>
              <TabPane
                tab={translate(this.props.intl, "accountSettings")}
                key="2"
              >
                <Card bordered={false}>
                  <AccountSettings
                    authUserId={this.props.authUserId}
                    userType={this.props.userType}
                  />
                </Card>
              </TabPane>
              {/*
              // REMOVE_PREMIUM
              <TabPane
                tab={translate(this.props.intl, "subscriptionSettings")}
                key="3"
              >
                <Card bordered={false}>
                  <SubscriptionSettings
                    intl={this.props.intl}
                    isPremium={this.props.isPremium}
                  />
                </Card>
              </TabPane>*/}
              <TabPane
                tab={translate(this.props.intl, "notificationSettings")}
                key="4"
              >
                <Card bordered={false}>
                  <NotificationSettings fieldConfig={agentConfig} />
                </Card>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default AgentSettings;
