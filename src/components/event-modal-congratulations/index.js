import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import CongratulationsIcon from "../../assets/images/congratulations_icon.svg";
import "./styles.scss";

class EventModalCongratulations extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    proposedUserName: PropTypes.string.isRequired,
    textLocaleKey: PropTypes.string.isRequired
  };

  render() {
    const { intl } = this.props;
    return (
      <div className="congratulations">
        <div className="congratulations-image">
          <img
            src={CongratulationsIcon}
            alt={translate(intl, "appointment.congratulations")}
          />
        </div>
        <div className="congratulations-text">
          <p className="congratulations-text-title">
            {translate(intl, "appointment.congratulations")}
          </p>
          <p className="congratulations-text-content">
            {translate(intl, this.props.textLocaleKey).replace(
              "#name#",
              this.props.proposedUserName
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default EventModalCongratulations;
