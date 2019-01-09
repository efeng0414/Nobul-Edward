import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Collapse } from "antd";
import { intlShape, injectIntl } from "react-intl";

import ActivityIndicator from "../../components/activity-indicator";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isPremiumAgent } from "../../utilities/route-verification";
import { translate } from "../../utilities/locale";
import { BUY, SELL } from "../../../core/constants/shared";
import { getFormLayout } from "../../utilities/forms";
import Services from "../../components/services";
import "./styles.scss";
import { bound } from "../../../node_modules/class-bind";

const Panel = Collapse.Panel;

const initialState = {
  modalVisible: true,
  services: [],
  checkedValues: [],
  offerId: "",
  offerValue: {},
  isLoading: true,
  isPremium: false,
  isWinningOffer: false,
  consumerProfile: {}
};

@requireAuth()
@validateUser({ fn: isPremiumAgent })
@injectIntl
class EditOffer extends Component {
  state = initialState;

  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    jobType: PropTypes.string,
    closeModal: PropTypes.func,
    saveSellOffer: PropTypes.func.isRequired,
    saveBuyOffer: PropTypes.func.isRequired,
    buyOffer: PropTypes.object,
    sellOffer: PropTypes.object,
    updateSellOffer: PropTypes.func,
    updateBuyOffer: PropTypes.func,
    isLoading: PropTypes.bool,
    winningOffer: PropTypes.object
  };

  @bound
  handleCancel() {
    const isUpdated = false;
    this.props.closeModal(isUpdated);
    this.setState(initialState);
  }

  @bound
  handleSubmit(e) {
    const { validateFields } = this.props.form;
    const { jobType, updateSellOffer, updateBuyOffer } = this.props;
    const { offerId, checkedValues, services } = this.state;
    const isUpdated = true;
    let postOfferData = {};
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      const updatedServices = checkedValues.length ? checkedValues : services;
      if (jobType === SELL) {
        postOfferData = {
          cooperatingCommission: values.cooperatingCommission,
          listingCommission: values.listingCommission,
          message: values.message,
          services: updatedServices
        };
        updateSellOffer(jobType, offerId, postOfferData);
      } else if (jobType === BUY) {
        postOfferData = {
          rebate: values.rebate,
          message: values.message,
          services: updatedServices
        };
        updateBuyOffer(jobType, offerId, postOfferData);
      }

      this.setState(initialState);
    });
    this.props.closeModal(isUpdated);
  }

  @bound
  getServices(data) {
    const services = [];
    for (let prop in data) {
      services.push(prop);
    }
    return services;
  }

  @bound
  changeHandle(checkedValues) {
    this.setState({
      checkedValues
    });
  }

  static getDerivedStateFromProps(nextProps) {
    if (Object.keys(nextProps.winningOffer).length > 0) {
      const services = [];
      for (let prop in nextProps.winningOffer.services) {
        services.push(prop);
      }
      return {
        offerValue: nextProps.winningOffer,
        services: services,
        isWinningOffer: true,
        isLoading: nextProps.isLoading,
        consumerProfile: nextProps.consumerProfile
      };
    } else {
      return {
        isWinningOffer: false,
        consumerProfile: {}
      };
    }
  }

  componentDidMount() {
    const { jobType, sellOffer, buyOffer, isLoading } = this.props;
    let offerId = "";
    let offerValue = {};
    let services = [];

    if (jobType === SELL) {
      offerId = Object.keys(sellOffer)[0];
      offerValue = Object.values(sellOffer)[0];
    } else {
      offerId = Object.keys(buyOffer)[0];
      offerValue = Object.values(buyOffer)[0];
    }

    if (offerValue) services = this.getServices(offerValue.services);

    this.setState({
      services,
      offerId,
      offerValue,
      isLoading
    });
  }

  componentDidUpdate(prevProps) {
    const { jobType, sellOffer, buyOffer, isLoading } = this.props;
    let offerId = "";
    let offerValue = {};
    let services = [];

    if (jobType === SELL) {
      if (sellOffer === prevProps.sellOffer) {
        return;
      }
      offerId = Object.keys(sellOffer)[0];
      offerValue = Object.values(sellOffer)[0];
    } else if (jobType === BUY) {
      if (buyOffer === prevProps.buyOffer) {
        return;
      }
      offerId = Object.keys(buyOffer)[0];
      offerValue = Object.values(buyOffer)[0];
    }

    services = this.getServices(offerValue.services);

    this.setState({
      services,
      offerId,
      offerValue,
      isLoading
    });
  }

  render() {
    const { intl, jobType } = this.props;
    const { isLoading, services, offerValue, isWinningOffer } = this.state;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const { TextArea } = Input;
    const fieldLayout = getFormLayout();
    const paddedFieldLayout = getFormLayout(true);

    return (
      <ActivityIndicator spinning={isLoading} type="loading">
        <div className="wrapper">
          {services.length && (
            <div>
              <Form
                layout="horizontal"
                hideRequiredMark={true}
                onSubmit={this.handleSubmit}
              >
                {isWinningOffer ? (
                  <Collapse>
                    <Panel header={translate(intl, "clientInfo")} key="1">
                      <p>{this.state.consumerProfile.name}</p>
                      <p>{this.state.consumerProfile.email}</p>
                      <p>{this.state.consumerProfile.phone}</p>
                      <p>{this.state.consumerProfile.address}</p>
                    </Panel>
                  </Collapse>
                ) : null}

                {jobType === BUY ? (
                  <FormItem {...fieldLayout}>
                    <p>{translate(intl, "rebateCommission")}</p>
                    {getFieldDecorator("rebate", {
                      rules: [
                        {
                          required: true,
                          message: translate(
                            intl,
                            "error.rebateCommissionIsRequired"
                          )
                        }
                      ],
                      initialValue: offerValue.rebate
                    })(<Input />)}
                  </FormItem>
                ) : (
                  <div>
                    <FormItem {...fieldLayout}>
                      <p>{translate(intl, "listingCommission")}</p>
                      {getFieldDecorator("listingCommission", {
                        rules: [
                          {
                            required: true,
                            message: translate(
                              intl,
                              "error.listingCommissionisRequired"
                            )
                          }
                        ],
                        initialValue: offerValue.listingCommission
                      })(<Input />)}
                    </FormItem>
                    <FormItem {...fieldLayout}>
                      <p>{translate(intl, "cooperatingCommission")}</p>
                      {getFieldDecorator("cooperatingCommission", {
                        rules: [
                          {
                            required: true,
                            message: translate(
                              intl,
                              "error.cooperatingCommissionisRequired"
                            )
                          }
                        ],
                        initialValue: offerValue.cooperatingCommission
                      })(<Input />)}
                    </FormItem>
                  </div>
                )}
                <FormItem {...paddedFieldLayout}>
                  <p>{translate(intl, "servicesProvided")}</p>
                  <Services
                    selectedServices={services}
                    serviceType={jobType}
                    intl={intl}
                    onServiceClick={this.changeHandle}
                  />
                </FormItem>
                <FormItem {...paddedFieldLayout}>
                  <p>{translate(intl, "personalMessage")}</p>
                  {getFieldDecorator("message", {
                    initialValue: offerValue.message
                  })(<TextArea rows={4} />)}
                </FormItem>
                <FormItem {...paddedFieldLayout} className="buttonGroup">
                  <Button onClick={this.handleCancel}>
                    {translate(intl, "button.cancel")}
                  </Button>
                  {isWinningOffer ? null : (
                    <Button type="primary" htmlType="submit" className="button">
                      {translate(intl, "button.submit")}
                    </Button>
                  )}
                </FormItem>
              </Form>
            </div>
          )}
        </div>
      </ActivityIndicator>
    );
  }
}

export default Form.create()(injectIntl(EditOffer));
