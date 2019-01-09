import React, { Component } from "react";
import { intlShape } from "react-intl";
import { Col, Row, Switch } from "antd";
import { translate } from "../../../../utilities/locale";

import "./styles.scss";

//TO-DO: Connect to backend eventually to find agent notif preferences

class NotificationSettings extends Component {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    return (
      <div className="account-settings">
        <Row className="account-settings-row">
          <Col span={10}>{translate(this.props.intl, "allNotifications")}</Col>
          <Col span={2}>
            <Switch defaultChecked />
          </Col>
        </Row>
        <Row className="account-settings-row">
          <Col span={6}>
            <Col span={10}>
              {translate(this.props.intl, "proposalNotification")}
            </Col>
            <Col span={2}>
              <Switch defaultChecked />
            </Col>
          </Col>
          <Col span={6}>
            <Col span={10}>
              {translate(this.props.intl, "postingNotification")}
            </Col>
            <Col span={2}>
              <Switch defaultChecked />
            </Col>
          </Col>
        </Row>
        <Row className="account-settings-row">
          <Col span={6}>
            <Col span={10}>
              {translate(this.props.intl, "reviewNotification")}
            </Col>
            <Col span={2}>
              <Switch defaultChecked />
            </Col>
          </Col>
          <Col span={6}>
            <Col span={10}>
              {translate(this.props.intl, "messageNotification")}
            </Col>
            <Col span={2}>
              <Switch defaultChecked />
            </Col>
          </Col>
        </Row>
        <Row className="account-settings-row">
          <Col span={6}>
            <Col span={10}>
              {translate(this.props.intl, "eventNotification")}
            </Col>
            <Col span={2}>
              <Switch defaultChecked />
            </Col>
          </Col>
          <Col span={6}>
            <Col span={10}>
              {translate(this.props.intl, "settingNotification")}
            </Col>
            <Col span={2}>
              <Switch defaultChecked />
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NotificationSettings;
