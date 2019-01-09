import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { Form } from "antd";
import { withRouter } from "react-router";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../../../utilities/locale";
import {
  COUNTRY,
  PASSWORD,
  EMAIL
} from "../../../../../core/api-transform/users";
import * as MyNobulRoutes from "../../../../routes/myNobul";
import { AGENT_USER_TYPE } from "../../../../../core/constants/users";
import { AGENTS, CONSUMERS } from "../../../../../core/api-transform";
import SettingsSwitchFieldItem from "../../../settings-switch-field-item";
import FormModal from "../../common/form-modal";
import { generateSettingFieldsItemForProfile, fieldsMap } from "./utilities";
import PaymentModal from "../../../payment-modal";
import AgentSelectCard from "../../../payment-modal/steps/payment-step-one/components/agent-select-card";
import "./styles.scss";

@injectIntl
@Form.create({})
@withRouter
class AccountSettings extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    authUserId: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    updatePassword: PropTypes.func.isRequired,
    consentForNews: PropTypes.bool.isRequired,
    updateConsentForNews: PropTypes.func.isRequired,
    userId: PropTypes.string,
    getStripeCards: PropTypes.func,
    stripeCards: PropTypes.array,
    updateConsentForEmailNotifications: PropTypes.func.isRequired,
    consentForEmailNotifications: PropTypes.bool.isRequired,
    updateEmail: PropTypes.func.isRequired,
    isEmailUnique: PropTypes.func.isRequired,
    deleteCardAsync: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    isModalOpen: false,
    paymentModalVisible: false
  };

  componentDidMount() {
    this.props.getStripeCards(this.props.authUserId);
  }

  renderModalField = () => <div />;
  activeFieldKey = "";

  @bound
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    this.props.form.resetFields(Object.keys(fieldsMap));
  }

  @bound
  updateEmail({ email, password }) {
    return this.props.updateEmail({
      email,
      password,
      userId: this.props.authUserId,
      userType: this.getUserTypeNode()
    });
  }

  @bound
  onEditClick(event) {
    const fieldKey = event.target.getAttribute("id");
    const InputToRender = fieldsMap[fieldKey].type;
    this.renderModalField = () => (
      <InputToRender
        form={this.props.form}
        initialValue={this.props.userProfile[fieldKey]}
        label={translate(this.props.intl, fieldsMap[fieldKey].labelKey)}
        name={fieldKey}
        country={this.props.userProfile[COUNTRY]}
        updatePassword={this.props.updatePassword}
        updateEmail={this.updateEmail}
        onDoneClick={this.toggleModal}
        error={this.props.error}
        checkIfEmailUnique
        required={fieldsMap[fieldKey].required}
      />
    );
    this.activeFieldKey = fieldKey;
    this.toggleModal();
  }

  @bound
  getUserTypeNode() {
    return this.props.userType === AGENT_USER_TYPE ? AGENTS : CONSUMERS;
  }

  @bound
  onUpdateClick(event) {
    const fieldKey = event.target.getAttribute("data-active-field-key");
    this.props.form.validateFields([fieldKey], (error, values) => {
      if (!error) {
        this.props
          .updateProfile({
            userId: this.props.authUserId,
            userType: this.getUserTypeNode(),
            key: fieldKey,
            value: values[fieldKey]
          })
          .then(this.toggleModal);
      }
    });

    this.props.history.push({
      pathname: MyNobulRoutes.url.settings,
      search: "?tab=account"
    });
  }

  @bound
  shouldHideFooter() {
    return [PASSWORD, EMAIL].includes(this.activeFieldKey);
  }

  @bound
  toggleConsentForNews() {
    this.props.updateConsentForNews({
      consentForNews: !this.props.consentForNews,
      agentId: this.props.authUserId
    });
  }

  @bound
  togglePaymentModal() {
    this.setState({
      paymentModalVisible: !this.state.paymentModalVisible
    });
  }

  @bound
  toggleConsentForEmailNotifications() {
    this.props.updateConsentForEmailNotifications({
      agentId: this.props.authUserId,
      emailNotifications: !this.props.consentForEmailNotifications
    });
  }

  render() {
    return (
      <div className="agent-account-settings">
        <FormModal
          isModalOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          onUpdateClick={this.onUpdateClick}
          activeFieldKey={this.activeFieldKey}
          hideFooter={this.shouldHideFooter()}
        >
          {this.renderModalField()}
        </FormModal>
        <div className="field-items">
          {generateSettingFieldsItemForProfile({
            userProfile: this.props.userProfile,
            onEditClick: this.onEditClick,
            isAgent: this.props.userType === AGENT_USER_TYPE
          })}
          <SettingsSwitchFieldItem
            label={translate(
              this.props.intl,
              "consumerSettings.account.promotions"
            )}
            checked={this.props.consentForNews}
            onChange={this.toggleConsentForNews}
          />
        </div>
        {/*
        // REMOVE_PREMIUM
        this.props.userType === AGENT_USER_TYPE && (
          <div className="payment-container">
            <label className="payment-container-label">
              {translate(this.props.intl, "subscriptions.paymentMethod")}
            </label>
            {
              <p
                className="payment-container-link"
                onClick={this.togglePaymentModal}
              >
                {translate(this.props.intl, "subscriptions.addPaymentMethod")}
              </p>
            }

            <PaymentModal
              transactionNeeded={false}
              userId={this.props.authUserId}
              intl={this.props.intl}
              visibility={this.state.paymentModalVisible}
              toggleVisibility={this.togglePaymentModal}
            />
            <AgentSelectCard
              footerNeeded={false}
              transactionNeeded={false}
              cards={this.props.stripeCards}
              intl={this.props.intl}
              userId={this.props.authUserId}
              deleteCard={this.props.deleteCardAsync}
            />
          </div>
          )*/}
      </div>
    );
  }
}

export default AccountSettings;
