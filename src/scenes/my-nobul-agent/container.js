import React, { Component } from "react";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import SideMenu from "../../components/side-menu";
import { agentConfig } from "../../components/side-menu/config";
import AgentMyNobulSubRoutes from "../../components/my-nobul-sub-routes";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import EditAvatarAgent from "../../components/side-menu/edit-avatar-agent";
import catchSceneError from "../../utilities/catch-scene-error";
import "./styles.scss";

@requireAuth()
@validateUser({ fn: isAgent })
@catchSceneError
@injectIntl
class AgentMyNobul extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    profile: PropTypes.object.isRequired,
    eventCount: PropTypes.number.isRequired,
    getEventsForAgent: PropTypes.func.isRequired,
    authUserId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.getEventsForAgent({ agentId: this.props.authUserId });
  }

  render() {
    return (
      <div className="my-nobul">
        <MyDashboardMeta titleKey="helmet.myDashboard" />
        <SideMenu
          intl={this.props.intl}
          profile={this.props.profile}
          menuConfig={agentConfig}
          eventCount={this.props.eventCount}
          renderEditAvatar={props => <EditAvatarAgent {...props} />}
          renderSubRoutes={() => <AgentMyNobulSubRoutes />}
        />
      </div>
    );
  }
}

export default AgentMyNobul;
