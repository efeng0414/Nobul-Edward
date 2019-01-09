import React, { Component } from "react";
import { translate } from "../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { Form, Input, Row, Col, Button } from "antd";
import "./styles.scss";

const FormItem = Form.Item;

//TO-DO: Process payment on submit

class AgentOfferPayment extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.any
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { intl } = this.props;
    return (
      <Form
        id="payment-form"
        className="payment-form"
        onSubmit={this.handleSubmit}
      >
        <FormItem>
          <label>{translate(intl, "payment.cardholderName")}</label>
          {getFieldDecorator("cardholder", {
            rules: [
              {
                required: true,
                message: translate(intl, "payment.cardholderNamePlaceholder")
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem>
          <label>{translate(intl, "payment.cardNumber")}</label>
          {getFieldDecorator("cardNumber", {
            rules: [
              {
                required: true,
                message: translate(intl, "payment.cardNumberPlaceholder")
              }
            ]
          })(<Input />)}
        </FormItem>

        <Row className="columns">
          <Col span={6}>
            <FormItem>
              <label>{translate(intl, "payment.expiryDate")}</label>
              {getFieldDecorator("expiryDate", {
                rules: [
                  {
                    required: true,
                    message: translate(intl, "payment.expiryPlaceholder")
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <label>{translate(intl, "payment.cvc")}</label>
              {getFieldDecorator("cvc", {
                rules: [
                  {
                    required: true,
                    message: translate(intl, "payment.cvcPlaceholder")
                  }
                ]
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Row>
            <Col span={12}>
              <div className="payment-form-submit-container">
                <Button className="payment-form-submit" size="large">
                  {translate(intl, "button.promoteOffer")}
                </Button>
              </div>
              <p className="payment-form-footer">
                {translate(intl, "payment.promotePaymentLine1")}
                <br />
                {translate(intl, "payment.promotePaymentLine2")}
              </p>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AgentOfferPayment);
