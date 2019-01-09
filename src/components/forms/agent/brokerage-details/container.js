import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { Button, Form } from "antd";
import { bound } from "class-bind";

import LicenceFormFields from "../licence-form/fields";

import { translate } from "../../../../utilities/locale";

import "../../common/styles.scss";

@injectIntl
@Form.create({})
class BrokerageDetails extends Component {
  state = {
    isLoading: false
  };

  static propTypes = {
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    afterSubmit: PropTypes.func,
    updateAgentVerificationData: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string,
    verification: PropTypes.object,
    profile: PropTypes.object,
    continueIfFilled: PropTypes.bool
  };

  static defaultProps = {
    verification: {},
    profile: {},
    afterSubmit: () => {},
    continueIfFilled: false
  };

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        return this.props
          .updateAgentVerificationData({
            verificationData: values
          })
          .then(() => this.props.afterSubmit());
      }
    });
  }

  componentDidMount() {
    if (this.props.continueIfFilled && this.checkIsFilled()) {
      this.props.afterSubmit();
    }
  }

  checkIsFilled() {
    const agentBrokerageData = {
      ...this.props.verification,
      ...this.props.profile
    };

    return (
      agentBrokerageData.brokerageName &&
      agentBrokerageData.brokeragePhone &&
      agentBrokerageData.country &&
      agentBrokerageData.provinceOrState &&
      agentBrokerageData.address1 &&
      agentBrokerageData.city &&
      agentBrokerageData.postalOrZipCode
    );
  }

  render() {
    return (
      <div className="licence-form">
        <div className="licence-form__header">
          <h5 className="licence-form__title">
            {translate(this.props.intl, "brokerageForm.title")}
          </h5>
        </div>

        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <LicenceFormFields
            form={this.props.form}
            validationData={{
              ...this.props.verification,
              ...this.props.profile
            }}
          />

          <div className="licence-form__buttons">
            <Button type="primary" size="large" htmlType="submit">
              {this.props.submitButtonText ||
                translate(this.props.intl, "button.submit")}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default BrokerageDetails;
