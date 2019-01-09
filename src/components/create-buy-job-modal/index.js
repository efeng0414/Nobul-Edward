import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import PropertyDescription from "../property-description";
import ConsumerJobCongratulations from "../consumer-job-congratulations";
import "./styles.scss";

class CreateBuyJobModal extends PureComponent {
  static propTypes = {
    intl: PropTypes.any,
    form: PropTypes.object.isRequired,
    visibility: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    submitPostingJob: PropTypes.func.isRequired,
    showCongratulations: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Modal
        visible={this.props.visibility}
        onCancel={this.props.closeModal}
        footer={null}
        className="create-posting-modal"
      >
        {this.props.showCongratulations ? (
          <ConsumerJobCongratulations
            intl={this.props.intl}
            closeModal={this.props.closeModal}
          />
        ) : (
          <PropertyDescription
            submitPostingJob={this.props.submitPostingJob}
            closeModal={this.props.closeModal}
            intl={this.props.intl}
          />
        )}
      </Modal>
    );
  }
}

export default CreateBuyJobModal;
