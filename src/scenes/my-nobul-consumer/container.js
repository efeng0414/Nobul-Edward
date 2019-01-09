import React, { Component } from "react";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import SideMenu from "../../components/side-menu";
import { consumerConfig } from "../../components/side-menu/config";
import MyNobuleSubRoutes from "../../components/my-nobul-sub-routes";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isConsumer } from "../../utilities/route-verification";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import EditAvatarConsumer from "../../components/side-menu/edit-avatar-consumer";
import catchSceneError from "../../utilities/catch-scene-error";
import ErrorBoundary from "../../components/error-boundary";
import "./styles.scss";

@requireAuth()
@validateUser({ fn: isConsumer })
@injectIntl
@catchSceneError
class MyNobul extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    profile: PropTypes.object.isRequired,
    getEventsForConsumer: PropTypes.func.isRequired,
    eventCount: PropTypes.number.isRequired,
    authUserId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.getEventsForConsumer({ consumerId: this.props.authUserId });
  }

  render() {
    return (
      <div className="my-nobul">
        <MyDashboardMeta titleKey="helmet.myDashboard" />
        <ErrorBoundary>
          <SideMenu
            profile={this.props.profile}
            menuConfig={consumerConfig}
            eventCount={this.props.eventCount}
            renderSubRoutes={() => <MyNobuleSubRoutes />}
            renderEditAvatar={props => <EditAvatarConsumer {...props} />}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default MyNobul;
