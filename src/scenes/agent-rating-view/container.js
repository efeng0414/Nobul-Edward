import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import requireAuth from "../../utilities/require-auth";
import AgentRatingForm from "../../components/agent-rating-form";
import validateUser from "../../utilities/validate-user";
import { isConsumer } from "../../utilities/route-verification";
import "./styles.scss";

@requireAuth()
@validateUser({ fn: isConsumer })
@injectIntl
class AgentRatingView extends Component {
  static propTypes = {
    currentOffer: PropTypes.object.isRequired,
    getOffer: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  componentDidMount() {
    const { jobType, offerId } = this.props.match.params;
    this.props.getOffer({
      jobType,
      offerId
    });
  }

  @bound
  onModalCancel() {
    //TODO:Push use to my dashboard
  }

  render() {
    return (
      <div className="agent-rating-view">
        <Modal
          title={translate(this.props.intl, "rateAgent.rateTitle")}
          destroyOnClose={true}
          visible={true}
          footer={null}
          onCancel={this.onModalCancel}
        >
          <AgentRatingForm currentOffer={this.props.currentOffer} />
        </Modal>
      </div>
    );
  }
}

export default AgentRatingView;
