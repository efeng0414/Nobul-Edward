import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { bound } from "class-bind";
import { injectIntl, intlShape } from "react-intl";
import DidAgentDeliverSwitch from "./did-agent-deliver-switch";
import FeedbackInput from "./feedback-input";
import StarRateInput from "./star-rate-input";
import FailureReasonInput from "./failure-reason-input";
import SubmitButton from "./submit-button";
import ThankYou from "./thank-you";
import { VALIDATION_MAP, validateTextInput } from "./validation";
import { translate } from "../../utilities/locale";

import "./styles.scss";

class AgentRatingForm extends Component {
  state = {
    formData: {
      rating1: 3,
      rating2: 3,
      rating3: 3,
      didAgentDeliver: true,
      feedback: "",
      reasonForFailure: ""
    },
    validationStatus: {
      feedback: VALIDATION_MAP.INITIAL,
      reasonForFailure: VALIDATION_MAP.PASS
    }
  };

  static propTypes = {
    pushAgentRating: PropTypes.func.isRequired,
    currentOffer: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    agentRatings: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  @bound
  rateAgentOnChange1(rating) {
    const formData = { ...this.state.formData, rating1: rating };
    this.setState({ formData });
  }

  @bound
  rateAgentOnChange2(rating) {
    const formData = { ...this.state.formData, rating2: rating };
    this.setState({ formData });
  }

  @bound
  rateAgentOnChange3(rating) {
    const formData = { ...this.state.formData, rating3: rating };
    this.setState({ formData });
  }

  @bound
  deliveredPromisedSwitchOnChange({ target: { value: didAgentDeliver } }) {
    const formData = { ...this.state.formData, didAgentDeliver };

    const validationStatus = { ...this.state.validationStatus };
    if (didAgentDeliver) {
      validationStatus.reasonForFailure = VALIDATION_MAP.PASS;
    } else {
      validationStatus.reasonForFailure =
        validateTextInput({
          textInput: this.state.formData.reasonForFailure
        }) || VALIDATION_MAP.INITIAL;
    }

    this.setState({ formData, validationStatus });
  }

  @bound
  feedbackOnChange({ target: { value: feedback } }) {
    const formData = { ...this.state.formData, feedback };

    const validationStatus = {
      ...this.state.validationStatus,
      feedback: validateTextInput({ textInput: feedback })
    };

    this.setState({
      formData,
      validationStatus
    });
  }

  @bound
  failureReasonOnChange({ target: { value: reasonForFailure } }) {
    const formData = { ...this.state.formData, reasonForFailure };
    const validationStatus = {
      ...this.state.validationStatus,
      reasonForFailure: validateTextInput({ textInput: reasonForFailure })
    };
    this.setState({ formData, validationStatus });
  }

  @bound
  isFormValid() {
    return Object.values(this.state.validationStatus).every(
      validationStatus => validationStatus === VALIDATION_MAP.PASS
    );
  }

  @bound
  submitAgentRating() {
    const agentRatingData = { ...this.state.formData };
    if (agentRatingData.didAgentDeliver) agentRatingData.reasonForFailure = "";
    this.props.pushAgentRating({
      agentRatingData: this.state.formData,
      offer: this.props.currentOffer
    });
  }

  @bound
  getStringForValidationStatus({ status }) {
    return status === VALIDATION_MAP.FAIL ? "error" : "";
  }

  render() {
    const hasError = !!Object.entries(this.props.agentRatings.error).length;
    const { intl } = this.props;

    return (
      <div>
        {hasError && <p>{translate(intl, "rateAgents.error")}</p>}
        {this.props.agentRatings.success && (
          <ThankYou
            thankYouText={translate(intl, "rateAgents.thankYouMessage")}
          />
        )}
        {!this.props.agentRatings.success && (
          <Form layout="vertical" className="text-center">
            <p className="agent-rate-form-review-title">{`1.${translate(
              intl,
              "rateAgents.starRate.label"
            )}`}</p>
            <StarRateInput
              value={this.state.formData.rating1}
              onChange={this.rateAgentOnChange1}
              labelText={translate(intl, "rateAgent.attribute1")}
            />
            <StarRateInput
              value={this.state.formData.rating2}
              onChange={this.rateAgentOnChange2}
              labelText={translate(intl, "rateAgent.attribute2")}
            />
            <StarRateInput
              value={this.state.formData.rating3}
              onChange={this.rateAgentOnChange3}
              labelText={translate(intl, "rateAgent.attribute3")}
            />
            <p className="agent-rate-form-review-title">{`2.${translate(
              intl,
              "rateAgents.didAgentDeliver.label"
            )}`}</p>
            <DidAgentDeliverSwitch
              onChange={this.deliveredPromisedSwitchOnChange}
              intl={intl}
            />
            {!this.state.formData.didAgentDeliver && (
              <FailureReasonInput
                value={this.state.formData.reasonForFailure}
                onChange={this.failureReasonOnChange}
                validationStatus={this.getStringForValidationStatus({
                  status: this.state.validationStatus.reasonForFailure
                })}
                helpText={translate(intl, "rateAgents.failureReason.help")}
                placeholder={translate(
                  intl,
                  "rateAgents.failureReason.placeholder"
                )}
              />
            )}
            <p className="agent-rate-form-review-title">{`3.${translate(
              intl,
              "rateAgents.feedback.label"
            )}`}</p>
            <FeedbackInput
              validationStatus={this.getStringForValidationStatus({
                status: this.state.validationStatus.feedback
              })}
              value={this.state.formData.feedback}
              onChange={this.feedbackOnChange}
              helpText={translate(intl, "rateAgents.feedback.help")}
            />
            <SubmitButton
              isDisabled={!this.isFormValid()}
              onClick={this.submitAgentRating}
              loading={this.props.agentRatings.isLoading}
            />
          </Form>
        )}
      </div>
    );
  }
}

export default injectIntl(AgentRatingForm);
