import React, { Component } from "react";
import { Form, Button } from "antd";

import EmailField from "../../../form-fields/email-field";
import PhoneField from "../../../form-fields/phone-field";
import TextField from "../../../form-fields/text-field";

import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { getFormLayout } from "../../../../utilities/forms";
import { translate } from "../../../../utilities/locale";

import { bound } from "class-bind";

const FormItem = Form.Item;
class AccountSettingsForm extends Component {
  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    user: PropTypes.object,
    updateProfile: PropTypes.func
  };

  static defaultProps = {
    form: {},
    user: {},
    updateProfile: () => {}
  };

  componentDidMount() {
    const {
      email,
      firstName,
      lastName,
      address,
      phone,
      phonePrefix
    } = this.props.user.profile;

    this.props.form.setFieldsValue({
      email,
      firstName,
      lastName,
      address,
      phone,
      phonePrefix
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

  render() {
    const paddedFieldLayout = getFormLayout(true);
    return (
      <Form id="agent-profile" layout="horizontal" onSubmit={this.handleSubmit}>
        <EmailField required form={this.props.form} />

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

        <PhoneField
          required
          name={"phone"}
          label={translate(this.props.intl, "phone")}
          form={this.props.form}
        />

        <TextField
          required
          name={"address"}
          label={translate(this.props.intl, "address")}
          form={this.props.form}
        />

        <FormItem {...paddedFieldLayout}>
          <Button type="primary" htmlType="submit">
            {translate(this.props.intl, "button.submit")}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(injectIntl(AccountSettingsForm));
