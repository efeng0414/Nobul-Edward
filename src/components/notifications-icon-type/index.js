import React, { PureComponent } from "react";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import EventsIcon from "react-icons/lib/ti/calendar-outline";
import SettingsIcon from "react-icons/lib/ti/cog";
import MessageIcon from "react-icons/lib/ti/mail";
import AcceptanceIcon from "react-icons/lib/ti/tick-outline";
import ProposalIcon from "react-icons/lib/ti/pen";
import JobIcon from "react-icons/lib/ti/briefcase";
import ContractIcon from "react-icons/lib/ti/document-text";
import {
  TYPE_JOB,
  TYPE_OFFER,
  TYPE_ACCEPTANCE,
  TYPE_SETTING,
  TYPE_CONTRACT,
  TYPE_EVENT,
  TYPE_MESSAGE
} from "../../../core/constants/notifications";
import "./styles.scss";

class NotificationsIconType extends PureComponent {
  static propTypes = {
    iconType: PropTypes.string
  };

  static defaultProps = {
    iconType: ""
  };

  @bound
  iconTypeHandle({ iconType }) {
    switch (iconType) {
      case TYPE_JOB:
        return <JobIcon className="type-icon" size={25} />;
      case TYPE_OFFER:
        return <ProposalIcon className="type-icon" size={25} />;
      case TYPE_ACCEPTANCE:
        return <AcceptanceIcon className="type-icon" size={25} />;
      case TYPE_MESSAGE:
        return <MessageIcon className="type-icon" size={25} />;
      case TYPE_SETTING:
        return <SettingsIcon className="type-icon" size={25} />;
      case TYPE_CONTRACT:
        return <ContractIcon className="type-icon" size={25} />;
      case TYPE_EVENT:
        return <EventsIcon className="type-icon" size={25} />;
      default:
        return;
    }
  }

  render() {
    const { iconType } = this.props;

    return <div className="icon">{this.iconTypeHandle({ iconType })}</div>;
  }
}

export default NotificationsIconType;
