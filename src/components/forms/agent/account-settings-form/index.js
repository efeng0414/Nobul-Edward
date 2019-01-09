import React, { Component } from "react";
import { Button, Form, Modal } from "antd";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";

import CountryField from "../../../form-fields/country-field";
import EmailField from "../../../form-fields/email-field";
import PhoneField from "../../../form-fields/phone-field";
import PostalField from "../../../form-fields/postal-field";
import ProvinceField from "../../../form-fields/province-field";
import TextField from "../../../form-fields/text-field";
import ChangePasswordForm from "../../common/change-password-form";

import { getFormLayout } from "../../../../utilities/forms";
import { translate } from "../../../../utilities/locale";

import "./styles.scss";

const FormItem = Form.Item;
class AccountSettingsForm extends Component {
  state = { passwordModalVisible: false };

  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired
  };

  static defaultProps = {
    form: {}
  };

  componentDidMount() {
    const { user = {}, form = {} } = this.props;
    const { profile } = user;
    const {
      firstName,
      lastName,
      address1,
      address2,
      email,
      phone,
      city,
      country,
      provinceOrState
    } = profile;
    form.setFieldsValue({
      firstName,
      lastName,
      address1,
      address2,
      email,
      phone,
      city,
      country,
      provinceOrState
    });
  }

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { user = {} } = this.props;
        const userProfile = { ...user, ...values };
        this.props.updateProfile(userProfile);
      }
    });
  }

  @bound
  handleClosePasswordModal() {
    this.setState({
      passwordModalVisible: false
    });
  }

  @bound
  handleChangePasswordClick(e) {
    e.preventDefault();
    this.setState({
      passwordModalVisible: true
    });
  }

  @bound
  handleChangePasswordCancel(e) {
    this.handleClosePasswordModal();
  }

  render() {
    const paddedFieldLayout = getFormLayout(true);
    return (
      <div className="agent-account-settings-form">
        <Form
          id="agent-profile"
          layout="horizontal"
          onSubmit={this.handleSubmit}
        >
          <TextField
            required
            name={"firstName"}
            label={translate(this.props.intl, "firstName")}
            form={this.props.form}
          />

          <TextField
            required
            name={"lastName"}
            label={translate(this.props.intl, "lastName")}
            form={this.props.form}
          />

          <EmailField required form={this.props.form} />

          <a
            href="#"
            className="change-password-link"
            onClick={this.handleChangePasswordClick}
          >
            {translate(this.props.intl, "changePassword")}
          </a>

          <Modal
            title={translate(this.props.intl, "changePassword")}
            visible={this.state.passwordModalVisible}
            onCancel={this.handleChangePasswordCancel}
            footer={null}
            destroyOnClose
          >
            <ChangePasswordForm
              updatePassword={this.props.updatePassword}
              user={this.props.user}
              onDoneClick={this.handleClosePasswordModal}
            />
          </Modal>

          <PhoneField
            required
            name={"phone"}
            label={translate(this.props.intl, "phone")}
            form={this.props.form}
          />

          <TextField
            required
            name={"address1"}
            label={translate(this.props.intl, "addressLine1")}
            form={this.props.form}
          />

          <TextField
            name={"address2"}
            label={translate(this.props.intl, "addressLine2")}
            form={this.props.form}
          />

          <PostalField
            required
            country={this.props.form.getFieldValue("country")}
            initialValue={this.props.user.profile.postalOrZipCode}
            form={this.props.form}
          />

          <TextField
            required
            name={"city"}
            label={translate(this.props.intl, "city")}
            form={this.props.form}
          />

          <CountryField required form={this.props.form} />

          <ProvinceField
            required
            name={"provinceOrState"}
            country={this.props.form.getFieldValue("country")}
            form={this.props.form}
          />

          <FormItem {...paddedFieldLayout}>
            <Button type="primary" htmlType="submit">
              {translate(this.props.intl, "button.submit")}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(injectIntl(AccountSettingsForm));
