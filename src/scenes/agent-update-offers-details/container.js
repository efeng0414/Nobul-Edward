import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import { intlShape, injectIntl } from "react-intl";

import ActivityIndicator from "../../components/activity-indicator";
import { translate } from "../../utilities/locale";
import { BUY, SELL } from "../../../core/constants/shared";
import { getFormLayout } from "../../utilities/forms";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import Services from "../../components/services";
import { bound } from "../../../node_modules/class-bind";

@requireAuth()
@validateUser({ fn: isAgent })
@Form.create({})
@injectIntl
class AgentUpdateOffersDetails extends Component {
  constructor(props) {
    super(props);

    const { location = {} } = props;
    const { state = {} } = location;
    const {
      isWinningOffer = false,
      offerValue = {},
      offerId = "",
      jobType = ""
    } = state;
    const { jobId = "", services = {} } = offerValue;
    if (isWinningOffer === true) props.getWinningOffer({ jobType, jobId });

    const servicesArray = [];
    for (let prop in services) {
      servicesArray.push(prop);
    }

    this.state = {
      services: isWinningOffer === true ? [] : servicesArray,
      checkedValues: [],
      offerId: offerId,
      offerValue: offerValue,
      jobType: jobType,
      isLoading: true,
      isPremium: false,
      isWinningOffer: isWinningOffer
    };
  }

  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    location: PropTypes.object,
    getWinningOffer: PropTypes.func,
    clearWinningOffer: PropTypes.func,
    updateSellOffer: PropTypes.func,
    updateBuyOffer: PropTypes.func,
    isLoading: PropTypes.bool,
    winningOffer: PropTypes.object,
    history: PropTypes.object
  };

  @bound
  handleCancel() {
    const { isWinningOffer } = this.state;
    if (isWinningOffer === true) {
      this.props.clearWinningOffer();
    }
    this.props.history.goBack();
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

  @bound
  handleSubmit(e) {
    const { validateFields } = this.props.form;
    const { updateSellOffer, updateBuyOffer } = this.props;
    const { offerId, checkedValues, services, jobType } = this.state;
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
    });
  }

  static getDerivedStateFromProps(nextProps) {
    if (
      nextProps.winningOffer === true &&
      Object.keys(nextProps.winningOffer).length > 0
    ) {
      const services = [];
      for (let prop in nextProps.winningOffer.services) {
        services.push(prop);
      }
      return {
        offerValue: nextProps.winningOffer,
        services: services,
        isLoading: false
      };
    } else {
      return { isLoading: false };
    }
  }

  render() {
    const { intl } = this.props;
    const {
      isLoading,
      services,
      offerValue,
      jobType,
      isWinningOffer
    } = this.state;
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
                    })(<Input disabled={isWinningOffer} />)}
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
                      })(<Input disabled={isWinningOffer} />)}
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
                      })(<Input disabled={isWinningOffer} />)}
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
                    disabled={isWinningOffer}
                  />
                </FormItem>
                <FormItem {...paddedFieldLayout}>
                  <p>{translate(intl, "personalMessage")}</p>
                  {getFieldDecorator("message", {
                    initialValue: offerValue.message
                  })(<TextArea rows={4} disabled={isWinningOffer} />)}
                </FormItem>
                <FormItem {...paddedFieldLayout} className="buttonGroup">
                  <Button onClick={this.handleCancel}>
                    {translate(intl, "button.back")}
                  </Button>
                  {!isWinningOffer ? (
                    <Button type="primary" htmlType="submit" className="button">
                      {translate(intl, "button.submit")}
                    </Button>
                  ) : null}
                </FormItem>
              </Form>
            </div>
          )}
        </div>
      </ActivityIndicator>
    );
  }
}

export default AgentUpdateOffersDetails;
