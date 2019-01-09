import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import { bound } from "class-bind";
import { Button } from "antd";
import "./styles.scss";

class ConsumerJobDeleteConfirmation extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    closeModal: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    jobType: PropTypes.string.isRequired,
    jobId: PropTypes.string.isRequired
  };

  @bound
  clickHandle() {
    this.props
      .deleteJob({
        jobType: this.props.jobType,
        jobId: this.props.jobId
      })
      .then(this.props.closeModal);
  }

  render() {
    return (
      <div className="modal-confirm">
        <div className="modal-confirm-text">
          <p>{translate(this.props.intl, "jobDeleteConfirmation")}</p>
        </div>
        <div className="modal-confirm-button">
          <Button type="primary" onClick={this.clickHandle}>
            {translate(this.props.intl, "button.confirm")}
          </Button>
        </div>
      </div>
    );
  }
}

export default ConsumerJobDeleteConfirmation;
