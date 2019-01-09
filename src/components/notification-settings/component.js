import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { injectIntl, intlShape } from "react-intl";
import { withRouter } from "react-router";
import { translate } from "../../utilities/locale";
import SettingsSwitchFieldItem from "../settings-switch-field-item";
import { isNotAll, setParamToEntryKey, ALL } from "./utilities";
import * as MyNobulRoutes from "../../routes/myNobul";
import { CONSENT_EMAIL_NOTIFICATIONS } from "../../../core/api-transform/users";
import "./styles.scss";

@injectIntl
@withRouter
class NotificationSettings extends Component {
  static propTypes = {
    isEventNotificationChecked: PropTypes.bool,
    isProposalNotificationChecked: PropTypes.bool,
    isPostingNotificationChecked: PropTypes.bool,
    isEmailNotificationChecked: PropTypes.bool,
    updateNotificationSetting: PropTypes.func.isRequired,
    updateConsentForEmailNotifications: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    currentUserType: PropTypes.string.isRequired,
    fieldConfig: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    isPostingNotificationChecked: false,
    isEventNotificationChecked: false,
    isProposalNotificationChecked: false,
    isEmailNotificationChecked: false
  };

  state = {
    allNotificationsOn: this.isAllNotificationsOn()
  };

  handleSwitchMap = Object.keys(this.props.fieldConfig).reduce(
    (accumulator, fieldConfigKey) => ({
      ...accumulator,
      [fieldConfigKey]:
        fieldConfigKey !== ALL
          ? this.handleSwitchChange({ key: fieldConfigKey })
          : this.handleAllSwitchChange
    }),
    {}
  );

  @bound
  stayOnNotificationPage() {
    this.props.history.push({
      pathname: MyNobulRoutes.url.settings,
      search: "?tab=notification"
    });
  }

  @bound
  isAllNotificationsOn() {
    return Object.entries(this.props.fieldConfig)
      .filter(setParamToEntryKey(isNotAll))
      .every(([, { isCheckedProp }]) => this.props[isCheckedProp]);
  }

  @bound
  handleSwitchChange({ key }) {
    return isChecked => {
      let notification = null;

      if (key === CONSENT_EMAIL_NOTIFICATIONS) {
        notification = this.props.updateConsentForEmailNotifications({
          userId: this.props.currentUserId,
          emailNotifications: isChecked,
          userType: this.props.currentUserType
        });
      } else {
        notification = this.props.updateNotificationSetting({
          key,
          value: isChecked,
          userId: this.props.currentUserId,
          userType: this.props.currentUserType
        });
      }

      notification.then(() => {
        this.setState({
          allNotificationsOn: this.isAllNotificationsOn()
        });
      });

      this.stayOnNotificationPage();
    };
  }

  @bound
  handleAllSwitchChange() {
    this.stayOnNotificationPage();
    Object.keys(this.props.fieldConfig)
      .filter(isNotAll)
      .map(fieldKey => {
        this.handleSwitchMap[fieldKey](!this.state.allNotificationsOn);
      });
    this.setState({
      allNotificationsOn: !this.state.allNotificationsOn
    });
  }

  @bound
  renderSettingsSwitchFieldItem([key, { label, subText, isCheckedProp }]) {
    return (
      <SettingsSwitchFieldItem
        key={key}
        label={translate(this.props.intl, label)}
        subText={subText ? translate(this.props.intl, subText) : undefined}
        onChange={this.handleSwitchMap[key]}
        checked={
          key === ALL
            ? this.state.allNotificationsOn
            : this.props[isCheckedProp]
        }
      />
    );
  }

  render() {
    return (
      <div className="consumer-notification-settings">
        {Object.entries(this.props.fieldConfig).map(
          this.renderSettingsSwitchFieldItem
        )}
      </div>
    );
  }
}

export default NotificationSettings;
