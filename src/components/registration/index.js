import React, { Component } from "react";
import { Modal, Radio, Button } from "antd";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import { gtmEvent } from "../../utilities/gtm-event";
import { url } from "../../routes/routes";
import { gtmEventNames } from "./utilities";
import "./styles.scss";

const RadioGroup = Radio.Group;

class Registration extends Component {
  state = {
    choice: 1
  };

  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object,
    isRegistrationVisible: PropTypes.bool,
    onRegistrationClick: PropTypes.func,
    onRegistrationCancel: PropTypes.func
  };

  @bound
  onModalCancel() {
    this.props.onRegistrationCancel();
  }

  @bound
  onChange(e) {
    this.setState({ choice: e.target.value });
  }

  @bound
  goToRegistrationPage() {
    gtmEvent({ name: gtmEventNames[this.state.choice - 1] });
    this.props.onRegistrationCancel();

    const destinationUrl =
      this.state.choice === 1
        ? url.consumerRegistration
        : url.agentRegistration;
    this.props.history.push(destinationUrl);
  }

  render() {
    return (
      <Modal
        visible={this.props.isRegistrationVisible}
        width={380}
        footer=""
        title={translate(this.props.intl, "registrationCap")}
        onCancel={this.onModalCancel}
      >
        <Helmet title={translate(this.props.intl, "registration")} />
        <div>
          <RadioGroup onChange={this.onChange} value={this.state.choice}>
            <div className="registration-modal-radio-group">
              <Radio className="registration-modal-radio-button" value={1}>
                {translate(this.props.intl, "IAmConsumer")}
              </Radio>
              <Radio className="registration-modal-radio-button" value={2}>
                {translate(this.props.intl, "IAmAgent")}
              </Radio>
            </div>
          </RadioGroup>
          <Button
            className="registration-modal-continue-button"
            type="primary"
            onClick={this.goToRegistrationPage}
          >
            {translate(this.props.intl, "button.continue")}
          </Button>
        </div>
      </Modal>
    );
  }
}

export default Registration;
