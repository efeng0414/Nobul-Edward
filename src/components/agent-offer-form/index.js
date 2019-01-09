import React, { PureComponent } from "react";
import { Button, Form, Row, Col, message } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { bound } from "class-bind";

import TextAreaField from "../form-fields/textarea-field";
import { translate } from "../../utilities/locale";
import {
  getBrowsePriceStepsId,
  objectIsEmpty
} from "../../../core/utilities/misc";
import AgentSummary from "../agent-summary";
import PriceRangeSlider from "../price-range-slider";
import AgentOfferCommission from "../agent-offer-commission";
import Services from "../services";
import {
  BUY,
  SELL,
  BUYER,
  SELLER,
  CREATED_ON_WEB
} from "../../../core/constants/shared";
import { COMMERCIAL } from "../../../core/constants/listings";
import {
  OFFER_OPEN,
  OFFER_PENDING_VERIFICATION
} from "../../../core/constants/offers";
import { DEFAULT_COMMISSIONS } from "../../../core/data/commissions";
import { AGENT_LICENCE_INFO_OFFER } from "../../utilities/google-tag-variable";
import "./styles.scss";
import { getCountryFromJob } from "../../../core/utilities/location";
import LicenceForm from "../forms/agent/licence-form";
import BrokerageDetails from "../forms/agent/brokerage-details";
import { checkLicenceData } from "../../utilities/check-licence-data";

import {
  REBATE_COMMISSION,
  PERSONALIZED_MESSAGE,
  SERVICES,
  LISTING_COMMISSION,
  COOPERATING_COMMISSION,
  TAGLINE
} from "../../../core/api-transform/offers";

import {
  VERIFICATION,
  STATUS,
  VERIFIED
} from "../../../core/api-transform/users";

const FormItem = Form.Item;

class AgentOfferForm extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    jobDetail: PropTypes.object,
    offerDetail: PropTypes.object,
    offerId: PropTypes.string,
    authentication: PropTypes.object,
    form: PropTypes.object,
    saveBuyOffer: PropTypes.func.isRequired,
    saveSellOffer: PropTypes.func.isRequired,
    refreshOffer: PropTypes.func,
    onNext: PropTypes.func
  };

  static defaultProps = {
    form: {},
    jobDetail: {},
    authentication: {},
    offerDetail: {},
    onNext: () => {},
    refreshOffer: () => {}
  };

  state = {
    showLicenceForm: false,
    offer: {}
  };

  isAgentVerified() {
    return this.props.authentication[VERIFICATION][STATUS] === VERIFIED;
  }

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const offerExists = !objectIsEmpty(this.props.offerDetail);

        if (!offerExists) {
          const offer = {
            createdOn: CREATED_ON_WEB,
            status: this.isAgentVerified()
              ? OFFER_OPEN
              : OFFER_PENDING_VERIFICATION,
            agentId: this.props.authentication.currentUser.uid,
            cooperatingCommission: values.cooperatingCommission,
            listingCommission: values.listingCommission,
            rebateCommission: values.rebateCommission,
            consumerId: this.props.jobDetail.consumerId,
            jobId: this.props.jobDetail.jobId,
            personalizedMessage: values.personalizedMessage,
            tagline: values.tagline,
            services: values.services
          };

          if (
            checkLicenceData({
              verification: this.props.authentication.verification
            })
          ) {
            this.setState({ offer }, this.showBrokerageForm);
          } else {
            this.setState({ showLicenceForm: true, offer });
          }
        } else {
          const postData = {
            [COOPERATING_COMMISSION]: values.cooperatingCommission,
            [LISTING_COMMISSION]: values.listingCommission,
            [REBATE_COMMISSION]: values.rebateCommission,
            [PERSONALIZED_MESSAGE]: values.personalizedMessage,
            [SERVICES]: values.services,
            [TAGLINE]: values.tagline
          };

          const updateOfferDetails =
            this.props.jobDetail.jobType === BUY
              ? this.props.saveBuyOffer({
                  jobType: BUY,
                  offerId: this.props.offerId,
                  postData
                })
              : this.props.saveSellOffer({
                  jobType: SELL,
                  offerId: this.props.offerId,
                  postData
                });

          updateOfferDetails.then(() => {
            this.props.refreshOffer();
            this.props.onNext();
          });
        }
      }
    });
  }

  @bound
  showBrokerageForm() {
    this.setState({ showBrokerageDataForm: true, showLicenceForm: false });
  }

  @bound
  saveNewOffer() {
    this.setState({ showLicenceForm: false, showBrokerageDataForm: false });

    const savePromise =
      this.props.jobDetail.jobType === BUY
        ? this.props.saveBuyOffer({ jobType: BUY, offer: this.state.offer })
        : this.props.saveSellOffer({ jobType: SELL, offer: this.state.offer });

    savePromise.then(this.props.onNext).catch(error => {
      message.error(
        error.message || translate(this.props.intl, "error.saveProposalError")
      );
    });
  }

  @bound
  validateCommission(rule, value, callback) {
    if ((!value && value !== 0) || value < 0 || value > 9.9) {
      switch (rule.field) {
        case "rebateCommission":
          callback(translate(this.props.intl, "error.validRebateCommission"));
          break;
        case "listingCommission":
          callback(translate(this.props.intl, "error.validListingCommission"));
          break;
        default:
          callback(
            translate(this.props.intl, "error.validCooperatingCommission")
          );
          break;
      }
      return;
    }
    callback();
  }

  @bound
  getSelectedServices() {
    const jobType = this.props.jobDetail.jobType;
    const offerExists = !objectIsEmpty(this.props.offerDetail);
    const hasSelectedServices = offerExists && this.props.offerDetail.services;

    if (hasSelectedServices)
      return Object.keys(this.props.offerDetail.services || []);
    return !objectIsEmpty(this.props.authentication) &&
      !objectIsEmpty(this.props.authentication.services) &&
      this.props.jobDetail.propertyType !== COMMERCIAL
      ? Object.keys(this.props.authentication.services[jobType] || [])
      : [];
  }

  componentDidMount() {
    const offerExists = !objectIsEmpty(this.props.offerDetail);

    let selectedServices = this.getSelectedServices();

    this.props.form.setFieldsValue({
      tagline: offerExists
        ? this.props.offerDetail.tagline
        : this.props.authentication.tagline,
      personalizedMessage: offerExists
        ? this.props.offerDetail.personalizedMessage
        : this.props.authentication.personalizedMessage,
      services: selectedServices
    });

    this.price = {
      priceRangeLow: parseInt(
        getBrowsePriceStepsId({
          price: this.props.jobDetail.priceRangeLow
        })
      ),
      priceRangeHigh: parseInt(
        getBrowsePriceStepsId({
          price: this.props.jobDetail.priceRangeHigh
        })
      )
    };
  }

  renderBuyCommissions() {
    const { getFieldDecorator } = this.props.form;
    const offerExists = !objectIsEmpty(this.props.offerDetail);

    let initialRebateCommission = 0;

    if (offerExists) {
      initialRebateCommission = this.props.offerDetail.rebateCommission;
    } else {
      initialRebateCommission =
        this.props.jobDetail.propertyType === COMMERCIAL
          ? 0
          : DEFAULT_COMMISSIONS.rebate;
    }

    return (
      <FormItem
        colon={false}
        label={
          <div>
            <div className="offer-form-sub-title">
              {translate(this.props.intl, "offer.rebateTitle")}
            </div>
            <div className="offer-form-description">
              {translate(this.props.intl, "offer.rebateSubtitle")}
            </div>
          </div>
        }
      >
        {getFieldDecorator("rebateCommission", {
          initialValue: initialRebateCommission,
          rules: [{ validator: this.validateCommission }]
        })(
          <AgentOfferCommission
            priceLow={this.props.jobDetail.priceRangeLow}
            priceHigh={this.props.jobDetail.priceRangeHigh}
            intl={this.props.intl}
            country={getCountryFromJob({ jobDetail: this.props.jobDetail })}
          />
        )}
      </FormItem>
    );
  }

  renderSellCommissions() {
    const { getFieldDecorator } = this.props.form;
    const offerExists = !objectIsEmpty(this.props.offerDetail);

    let initialCooperatingCommission = 0;
    let initialListingCommission = 0;

    if (offerExists) {
      initialCooperatingCommission = this.props.offerDetail
        .cooperatingCommission;
      initialListingCommission = this.props.offerDetail.listingCommission;
    } else {
      initialCooperatingCommission =
        this.props.jobDetail.propertyType === COMMERCIAL
          ? 0
          : this.props.authentication.defaultCommissions
            ? this.props.authentication.defaultCommissions.cooperating
            : DEFAULT_COMMISSIONS.cooperating;

      initialListingCommission =
        this.props.jobDetail.propertyType === COMMERCIAL
          ? 0
          : this.props.authentication.defaultCommissions
            ? this.props.authentication.defaultCommissions.listing
            : DEFAULT_COMMISSIONS.listing;
    }

    return (
      <div>
        <FormItem
          colon={false}
          label={
            <div>
              <div className="offer-form-sub-title">
                {translate(this.props.intl, "offer.cooperatingTitle")}
              </div>
              <div className="offer-form-description">
                {translate(this.props.intl, "offer.cooperatingSubtitle")}
              </div>
            </div>
          }
        >
          {getFieldDecorator("cooperatingCommission", {
            initialValue: initialCooperatingCommission,
            rules: [{ validator: this.validateCommission }]
          })(
            <AgentOfferCommission
              priceLow={this.props.jobDetail.priceRangeLow}
              priceHigh={this.props.jobDetail.priceRangeHigh}
              intl={this.props.intl}
              country={getCountryFromJob({ jobDetail: this.props.jobDetail })}
            />
          )}
        </FormItem>

        <FormItem
          colon={false}
          label={
            <div>
              <div className="offer-form-sub-title">
                {translate(this.props.intl, "offer.listingTitle")}
              </div>
              <div className="offer-form-description">
                {translate(this.props.intl, "offer.listingSubtitle")}
              </div>
            </div>
          }
        >
          {getFieldDecorator("listingCommission", {
            initialValue: initialListingCommission,
            rules: [{ validator: this.validateCommission }]
          })(
            <AgentOfferCommission
              priceLow={this.props.jobDetail.priceRangeLow}
              priceHigh={this.props.jobDetail.priceRangeHigh}
              intl={this.props.intl}
              country={getCountryFromJob({ jobDetail: this.props.jobDetail })}
            />
          )}
        </FormItem>
      </div>
    );
  }

  renderServices() {
    const { getFieldDecorator } = this.props.form;

    return (
      <FormItem
        colon={false}
        label={
          <h5>
            {translate(this.props.intl, "offer.servicesfor", {
              userType: this.props.jobDetail.jobType === BUY ? BUYER : SELLER
            })}
          </h5>
        }
      >
        {getFieldDecorator("services")(
          <Services
            serviceType={this.props.jobDetail.jobType}
            intl={this.props.intl}
          />
        )}
      </FormItem>
    );
  }

  render() {
    const priceLow = this.price ? this.price.priceRangeLow : 0;
    const priceHigh = this.price ? this.price.priceRangeHigh : 0;
    const offerExists = !objectIsEmpty(this.props.offerDetail);
    const { form = {} } = this.props;

    return (
      <div>
        {this.state.showBrokerageDataForm && (
          <BrokerageDetails afterSubmit={this.saveNewOffer} continueIfFilled />
        )}

        {this.state.showLicenceForm && (
          <LicenceForm
            afterSubmit={this.showBrokerageForm}
            GTM_EVENT={AGENT_LICENCE_INFO_OFFER}
            showCompleteProfileText
          />
        )}

        {!this.state.showLicenceForm &&
          !this.state.showBrokerageDataForm && (
            <div className="offer-form">
              <Form id="agent-offer" onSubmit={this.handleSubmit}>
                <div className="offer-form-agent-summary">
                  <AgentSummary
                    avatarUrl={this.props.authentication.avatarUrl}
                    firstName={this.props.authentication.profile.firstName}
                    lastName={this.props.authentication.profile.lastName}
                    averageRating={this.props.authentication.averageRating}
                    brokerageName={
                      this.props.authentication.profile.brokerageName
                    }
                  />
                </div>

                {/* Tag line */}
                <TextAreaField
                  form={form}
                  intl={this.props.intl}
                  initialValue={
                    offerExists ? this.props.offerDetail.tagline : ""
                  }
                  label={<h5>{translate(this.props.intl, "offer.tagline")}</h5>}
                  id={TAGLINE}
                  isTextArea={false}
                  isRequired
                />

                {/* Price range */}
                <h5>
                  {translate(
                    this.props.intl,
                    this.props.jobDetail.jobType === BUY
                      ? "offer.budget"
                      : "offer.priceRange"
                  )}
                </h5>
                <PriceRangeSlider
                  defaultValue={[priceLow, priceHigh]}
                  disabled
                />

                {/* Commissions */}
                {this.props.jobDetail.jobType === BUY &&
                  this.renderBuyCommissions()}
                {this.props.jobDetail.jobType === SELL &&
                  this.renderSellCommissions()}

                {/* Services */}
                {this.renderServices()}

                {/* Personalized message */}
                <TextAreaField
                  form={form}
                  intl={this.props.intl}
                  label={
                    <h5>
                      {translate(this.props.intl, "offer.personalizedMessage")}
                    </h5>
                  }
                  id={PERSONALIZED_MESSAGE}
                  isTextArea
                  isRequired
                />

                <FormItem>
                  <Row>
                    <Col span={12}>
                      <Button type="primary" size="large" htmlType="submit">
                        {translate(this.props.intl, "offer.submitProposal")}
                      </Button>
                    </Col>
                  </Row>
                </FormItem>
              </Form>
            </div>
          )}
      </div>
    );
  }
}

export default Form.create()(AgentOfferForm);
