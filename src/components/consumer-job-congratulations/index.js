import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { translate } from "../../utilities/locale";
import CongratulationsIcon from "../../assets/images/congratulations_icon.svg";
import "./styles.scss";

class ConsumerJobCongratulations extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  render() {
    const { intl } = this.props;
    return (
      <Modal
        visible={this.props.visible}
        footer={null}
        onCancel={this.props.onCancel}
      >
        <div className="congratulations">
          <div className="congratulations-image">
            <img
              src={CongratulationsIcon}
              alt={translate(intl, "jobListing.congratulations")}
            />
          </div>
          <div className="congratulations-text">
            <p className="congratulations-text-title">
              {translate(intl, "jobListing.congratulations")}
            </p>
            <p className="congratulations-text-content">
              {translate(intl, "jobListing.createPosting")}
            </p>
            <p className="congratulations-text-content">
              {translate(intl, "jobListing.agentContact")}
            </p>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ConsumerJobCongratulations;
