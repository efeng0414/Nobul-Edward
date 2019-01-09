import React, { Component } from "react";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, message } from "antd";

import PersonalForm from "../../../components/forms/common/personal-form";
import { translate } from "../../../utilities/locale";
import { CONSUMER_USER_TYPE } from "../../../../core/constants/users";
import { AUTH_WRONG_PASSWORD } from "../../../../core/constants/firebaseErrorCode";
import { gtmEvent } from "../../../utilities/gtm-event";
import {
  CONSUMER_SIGN_UP_SUBMIT,
  ANONYMOUS_CONSUMER_SIGN_UP_END
} from "../../../utilities/google-tag-variable";

import ContractToBrokerageFormItem from "./contract-to-brokerage";
import LookingForFormItem from "./looking-for-form-item";
import TimelineFormItem from "./timeline-form-item";
import TermsFormItem from "./terms-form-item";
import ButtonGroupFormItem from "./button-group-form-item";
import RegistrationLogo from "./registration-logo";
import { fieldMap, getFormPayload } from "./utilities";
import "../styles.scss";

@injectIntl
@Form.create({})
class ConsumerRegistrationForm extends Component {
  state = {
    timeline: 1,
    contractToBrokerage: false,
    term: [],
    hasSubmitted: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    goBackToHomePage: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
    signUpUser: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    hasContractToBrokerage: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    signUpValues: PropTypes.object.isRequired,
    gtmEvent: PropTypes.func,
    getFormPayload: PropTypes.func,
    message: PropTypes.object,
    hasJobToSave: PropTypes.bool
  };

  static defaultProps = {
    gtmEvent,
    message,
    getFormPayload,
    hasJobToSave: false
  };

  componentDidMount() {
    const {
      timeline = this.state.timeline,
      contractToBrokerage = this.state.contractToBrokerage,
      areaOfInterest = this.state.areaOfInterest,
      lookingFor = this.state.lookingFor
    } = this.props.signUpValues;

    this.props.form.setFieldsValue({
      lookingFor,
      areaOfInterest,
      timeline,
      contractToBrokerage,
      consent: []
    });
  }

  @bound
  inputMortgage(event) {
    this.setState({ allowInputMortgage: event.target.value });
  }

  @bound
  validateTerm(rule, value, callback) {
    const acceptTermsChecked = !!value && value.includes("accept_term");
    !acceptTermsChecked
      ? callback(translate(this.props.intl, "consumer.accept_terms_hint"))
      : callback();
  }

  @bound
  handleFormValidationCallback(error, formValues) {
    if (!error) {
      const payload = this.props.getFormPayload({
        formValues,
        signUpValues: this.props.signUpValues
      });
      this.setState({ hasSubmitted: true });

      if (payload.contractToBrokerage) {
        this.props.hasContractToBrokerage();
        this.props.nextPage();
      } else {
        this.props.gtmEvent({
          name: CONSUMER_SIGN_UP_SUBMIT
        });
        this.props.signUpUser({
          postData: payload,
          userType: CONSUMER_USER_TYPE
        });
      }
    }
  }

  @bound
  handleSignUp(event) {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll(this.handleFormValidationCallback);
  }

  componentDidUpdate(prevProps) {
    Object.keys(this.props.currentUser).length &&
      this.props.currentUser.emailVerified &&
      this.props.goBackToHomePage();

    !Object.keys(prevProps.error).length &&
      Object.keys(this.props.error).length &&
      this.props.error.code === AUTH_WRONG_PASSWORD &&
      this.props.message.info(
        translate(this.props.intl, "consumer.wrong_password")
      );

    Object.keys(this.props.currentUser).length && this.props.nextPage();
  }

  render() {
    return (
      <div className="consumer-registration">
        <RegistrationLogo />
        <div className="consumer-registration-form registration-container">
          <h2 className={`header-step header-step-2`}>
            {translate(this.props.intl, "consumer.createProfile")}
          </h2>

          <Form
            onSubmit={this.handleSignUp}
            className="consumer-registration-form-form"
          >
            <PersonalForm
              intl={this.props.intl}
              form={this.props.form}
              signUpValues={this.props.signUpValues}
            />
            <ContractToBrokerageFormItem
              {...this.props.form}
              fieldName={fieldMap.CONTRACT_TO_BROKERAGE}
              intl={this.props.intl}
            />
            <LookingForFormItem
              {...this.props.form}
              fieldName={fieldMap.LOOKING_FOR}
              intl={this.props.intl}
            />
            <TimelineFormItem
              {...this.props.form}
              fieldName={fieldMap.TIMELINE}
              intl={this.props.intl}
            />
            <TermsFormItem
              {...this.props.form}
              intl={this.props.intl}
              termsFieldName={fieldMap.TERM}
              consentFieldName={fieldMap.CONSENT}
              consentForNewsValue={fieldMap.CONSENT_FOR_NEWS}
              termsValidator={this.validateTerm}
            />
            <ButtonGroupFormItem
              formHasSubmitted={this.state.hasSubmitted}
              intl={this.props.intl}
              signUpUser={this.handleSignUp}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default ConsumerRegistrationForm;
