import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Avatar } from "antd";
import { bound } from "class-bind";

import { translate } from "../../utilities/locale";
import { getFixedRating } from "../../../core/utilities/getFixedRating";
import "./styles.scss";
import { gtmEvent } from "../../utilities/gtm-event";
import { CREATE_MEETING_START } from "../../utilities/google-tag-variable";
class ConsumerOfferDetailsAgent extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    agentProfile: PropTypes.object,
    scheduleMeetingHandle: PropTypes.func,
    message: PropTypes.string,
    shouldShowScheduleMeetingButton: PropTypes.bool,
    getFixedRating: PropTypes.func
  };

  static defaultProps = {
    agentAvatarAndRating: {},
    agentProfile: {},
    scheduleMeetingHandle: () => {},
    message: "",
    shouldShowScheduleMeetingButton: false,
    getFixedRating
  };

  @bound
  clickHandle() {
    this.props.scheduleMeetingHandle();
    gtmEvent({
      name: CREATE_MEETING_START
    });
  }

  render() {
    const { intl, agentProfile } = this.props;
    const {
      avatarUrl,
      agentStartYear,
      agentInformation = { firstName: "", lastName: "", brokerageName: "" }
    } = agentProfile;

    return (
      <div className="about-agent">
        <div className="about-agent-profile">
          <Avatar size="large" src={avatarUrl} />
          <div className="about-agent-profile-information">
            <div className="about-agent-profile-information-rating">
              <span>{translate(intl, "offer.agentFrom")}</span>
            </div>
            <div className="about-agent-profile-information-brokerage">
              {agentInformation.brokerageName}
            </div>
          </div>
        </div>
        {this.props.message && (
          <div className="about-agent-message">
            <h5>{translate(intl, "offer.message")}</h5>
            <p>{this.props.message}</p>
          </div>
        )}
        <div className="about-agent-member">
          <span className="about-agent-member-since">
            {translate(intl, "offer.memberSince")}:
          </span>
          <span className="about-agent-member-year">{agentStartYear}</span>
        </div>
        {this.props.shouldShowScheduleMeetingButton && (
          <div className="about-agent-button">
            <Button
              type="primary"
              size="large"
              onClick={this.clickHandle}
              className="googletag-consumer-schedule-meeting"
            >
              {translate(intl, "button.scheduleMeeting")}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ConsumerOfferDetailsAgent;
