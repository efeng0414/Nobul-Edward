import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Tabs } from "antd";
import { intlShape, injectIntl } from "react-intl";
import AccountSettings from "../../components/account-settings";
import NotificationSettings from "../../components/notification-settings";
import { consumerConfig } from "../../components/notification-settings/config";
import { translate } from "../../utilities/locale";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { getSearchParamObject } from "../../utilities/get-search-params";
import { tabKeyMap } from "./utilities";
import "./styles.scss";

const { TabPane } = Tabs;

@withRouter
@injectIntl
class ConsumerSettings extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const tabSearchParam = getSearchParamObject({
      searchParamString: this.props.location.search
    })["tab"];

    return (
      <div className="consumer-settings">
        <MyDashboardMeta titleKey="helmet.myDashboard.settings" />
        <Tabs defaultActiveKey={tabKeyMap[tabSearchParam] || "1"}>
          <TabPane
            tab={translate(this.props.intl, "consumerSettings.account.title")}
            key={1}
          >
            <AccountSettings {...this.props} />
          </TabPane>
          <TabPane
            tab={translate(
              this.props.intl,
              "consumerSettings.notification.title"
            )}
            key={2}
          >
            <NotificationSettings
              {...this.props}
              fieldConfig={consumerConfig}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ConsumerSettings;
