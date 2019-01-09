import React, { Component } from "react";
import { Form, Button, message, Card, Breadcrumb, Modal } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { withRouter } from "react-router-dom";
import { bound } from "class-bind";
import leafletPip from "@mapbox/leaflet-pip";
import L from "leaflet";

import { url } from "../../../../routes/myNobul";
import {
  BUY,
  SELL,
  CREATED_ON_WEB
} from "../../../../../core/constants/shared";
import { AUTOBIDS_STATUS_ACTIVE } from "../../../../../core/constants/users";
import { AGENT_PERSONAL_MESSAGE_LIMIT } from "../../../../../core/constants/agents";
import { OFFER_LANDING } from "../../../../../core/constants/offers";
import BrokerageDetails from "../../../forms/agent/brokerage-details";
import { showCityCheckbox } from "../../../city-select-checkbox/utilities";

import {
  AUTOBID_PRICE_RANGE,
  AUTOBID_PROPERTY_TYPE,
  LISTING_COMMISSION_PERCENTAGE,
  REBATE_COMMISSION_PERCENTAGE,
  COOPERATING_COMMISSION_PERCENTAGE,
  STATUS,
  AGENT_ID,
  LOCATIONS,
  REBATE_COMMISSION,
  COOPERATING_COMMISSION,
  LISTING_COMMISSION
} from "../../../../../core/api-transform/users";
import {
  TAGLINE,
  PERSONALIZED_MESSAGE,
  SERVICES
} from "../../../../../core/api-transform/offers";
import { mapResidentialOrCommercialToPropertyTypes } from "../../../../../core/data/propertyData";
import { translate } from "../../../../utilities/locale";
import { getProvinceOrStateFromPlaces } from "../../../../../core/utilities/parse-places-result";
import { createObjectFromArray } from "../../../../../core/utilities/array-to-object";
import TaglineFormItem from "./tagline-form-item";
import RegionFormItem from "./region-form-item";
import PropertyTypeFormItem from "./property-type-form-item";
import MessageFormItem from "./message-form-item";
import ServicesFormItem from "./services-form-item";
import PriceRangeSlider from "../../../price-range-slider";
import CommissionFormItem from "./commission-form-item";
import UpgradeSubscription from "./upgrade-subscription";
import EditRegions from "./edit-regions";
import TextAreaField from "../../../form-fields/textarea-field";

import "./styles.scss";

@withRouter
@Form.create({})
class StandardOfferSettingsForm extends Component {
  state = {
    displayMap: false,
    selectedPolygons: {},
    defaultAddress: {},
    notAgentProvinceOrStateError: false,
    showSelectCity: false,
    isPolygonSelected: false
  };

  static propTypes = {
    form: PropTypes.any,
    intl: intlShape.isRequired,
    currentUser: PropTypes.object,
    jobType: PropTypes.string,
    locations: PropTypes.object,
    propertyTypes: PropTypes.array,
    buyAutoBidPropertyTypes: PropTypes.array.isRequired,
    sellAutoBidPropertyTypes: PropTypes.array.isRequired,
    priceRangeLow: PropTypes.number,
    priceRangeHigh: PropTypes.number,
    defaultCommissions: PropTypes.object,
    services: PropTypes.object,
    personalizedMessage: PropTypes.string,
    tagline: PropTypes.string,
    updateStandardBuyOffer: PropTypes.func,
    updateStandardSellOffer: PropTypes.func,
    onClick: PropTypes.func,
    isAutobid: PropTypes.bool,
    isPremium: PropTypes.bool,
    autoBidSettings: PropTypes.bool,
    polygons: PropTypes.object.isRequired,
    getPolygonBoundaries: PropTypes.func,
    provinceOrState: PropTypes.string,
    updateCurrentUserRegionsThunk: PropTypes.func.isRequired,
    postAutoBids: PropTypes.func.isRequired,
    autoBidBuyServices: PropTypes.object,
    autoBidSellServices: PropTypes.object,
    autoBidBuyPriceRange: PropTypes.array,
    autoBidSellPriceRange: PropTypes.array,
    autoBidRebateCommissionPercentage: PropTypes.number.isRequired,
    autoBidListingCommissionPercentage: PropTypes.number.isRequired,
    autoBidCooperatingCommissionPercentage: PropTypes.number.isRequired,
    autoBidBuyTagline: PropTypes.string.isRequired,
    autoBidSellTagline: PropTypes.string.isRequired,
    autoBidBuyPersonalizedMessage: PropTypes.string.isRequired,
    autoBidSellPersonalizedMessage: PropTypes.string.isRequired,
    autoBidBuySelectedPolygons: PropTypes.object.isRequired,
    autoBidSellSelectedPolygons: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    form: {},
    locations: {},
    currentUser: {},
    propertyTypes: [],
    priceRangeLow: 0,
    defaultCommissions: {},
    services: {
      [BUY]: {},
      [SELL]: {}
    },
    personalizedMessage: "",
    tagline: "",
    isAutobid: false,
    isPremium: false,
    autoBidSettings: false,
    autoBidBuyPriceRange: [0, 0],
    autoBidSellPriceRange: [0, 0],
    updateStandardBuyOffer: () => {},
    updateStandardSellOffer: () => {},
    onClick: () => {}
  };

  @bound
  handleBreadcrumbClick(e) {
    e.preventDefault();
    this.props.onClick({ stage: OFFER_LANDING });
  }

  @bound
  handleSubmitSuccess() {
    message.success(
      translate(
        this.props.intl,
        this.props.jobType === BUY
          ? "offerSettings.submitBuySuccess"
          : "offerSettings.submitSellSuccess"
      )
    );
    this.props.onClick({ stage: OFFER_LANDING });
  }

  @bound
  handleSubmitError() {
    message.success(translate(this.props.intl, "offerSettings.submitError"));
  }

  @bound
  handleStandardBuyOfferSubmit({ values }) {
    this.props
      .updateStandardBuyOffer({
        agentData: {
          [PERSONALIZED_MESSAGE]: values[PERSONALIZED_MESSAGE],
          [REBATE_COMMISSION]: values[REBATE_COMMISSION],
          [TAGLINE]: values[TAGLINE],
          [SERVICES]: values[SERVICES]
        }
      })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitError);
  }

  @bound
  handleStandardSellOfferSubmit({ values }) {
    this.props
      .updateStandardSellOffer({
        agentData: {
          [COOPERATING_COMMISSION]: values[COOPERATING_COMMISSION],
          [LISTING_COMMISSION]: values[LISTING_COMMISSION],
          [PERSONALIZED_MESSAGE]: values[PERSONALIZED_MESSAGE],
          [TAGLINE]: values[TAGLINE],
          [SERVICES]: values[SERVICES]
        }
      })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitError);
  }

  @bound
  handleAutoBidPreferencesSubmit({ values, jobType }) {
    const postData = {
      [jobType]: {
        [AUTOBID_PROPERTY_TYPE]: mapResidentialOrCommercialToPropertyTypes({
          propertyTypesArray: this.props.propertyTypes
        }),
        [LOCATIONS]: this.state.selectedPolygons,
        [TAGLINE]: values.tagline,
        [PERSONALIZED_MESSAGE]: values.personalizedMessage,
        [STATUS]: AUTOBIDS_STATUS_ACTIVE,
        [AGENT_ID]: this.props.currentUser.uid
      }
    };

    if (jobType === BUY) {
      postData[BUY][SERVICES] = createObjectFromArray(values.services);

      postData[BUY][REBATE_COMMISSION_PERCENTAGE] = values[REBATE_COMMISSION];
      postData[BUY][AUTOBID_PRICE_RANGE] = this.state.autoBidBuyPriceRange;
    }
    if (jobType === SELL) {
      postData[SELL][SERVICES] = createObjectFromArray(values.services);

      postData[SELL][LISTING_COMMISSION_PERCENTAGE] =
        values[LISTING_COMMISSION];
      postData[SELL][COOPERATING_COMMISSION_PERCENTAGE] =
        values[COOPERATING_COMMISSION];
      postData[SELL][AUTOBID_PRICE_RANGE] = this.state.autoBidSellPriceRange;
    }

    this.props.postAutoBids({
      postData: postData,
      onSuccess: this.showSuccess,
      createdOn: CREATED_ON_WEB,
      agentId: this.props.currentUser.uid
    });
  }

  @bound
  goToSettings({ state }) {
    this.props.history.push({
      pathname: url.settings,
      state
    });
  }

  @bound
  showSuccess() {
    this.goToSettings({ state: { afterSubscribeAutobid: true } });
    message.success(
      translate(this.props.intl, "success.autoBidPreferencesSaved")
    );
  }

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (!err) {
        if (!this.props.autoBidSettings && this.props.jobType === BUY) {
          this.handleStandardBuyOfferSubmit({ values });
        }
        if (!this.props.autoBidSettings && this.props.jobType === SELL) {
          this.handleStandardSellOfferSubmit({ values });
        }
        if (this.props.autoBidSettings && this.props.jobType === BUY) {
          this.handleAutoBidPreferencesSubmit({ values, jobType: BUY });
        }
        if (this.props.autoBidSettings && this.props.jobType === SELL) {
          this.handleAutoBidPreferencesSubmit({ values, jobType: SELL });
        }
      }
    });
  }

  @bound
  onAutoBidBuyPriceRangeChange(value) {
    this.setState({ autoBidBuyPriceRange: value });
    value && this.props.form.setFieldsValue({ autoBidBuyPriceRange: value });
  }

  @bound
  onAutoBidSellPriceRangeChange(value) {
    this.setState({ autoBidSellPriceRange: value });
    value && this.props.form.setFieldsValue({ autoBidSellPriceRange: value });
  }

  @bound
  toggleDisplayMap() {
    this.setState({ displayMap: !this.state.displayMap });
  }

  @bound
  setSelectedPolygons(selectedPolygons) {
    this.setState({ selectedPolygons });
  }

  @bound
  handlePolygonClick(e) {
    const polygonId = e.layer.feature.properties["polygonId"];
    let selectedPolygons = Object.assign({}, this.state.selectedPolygons);
    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    } else {
      selectedPolygons[polygonId] = { name: e.layer.feature.properties.name };
    }
    this.setState({
      selectedPolygons,
      isPolygonSelected: !this.state.isPolygonSelected
    });
  }

  @bound
  setMapData(map) {
    this.map = map;
  }

  @bound
  handleRemoveRegion(e) {
    const polygonId = e.currentTarget.value;
    let selectedPolygons = this.state.selectedPolygons;
    delete selectedPolygons[polygonId];
    this.setState({ selectedPolygons });
  }

  @bound
  handleLocationInputChange(result, latLng) {
    this.setSelectedPolygons({}); //reset selected polygons on location change
    const provinceOrState = getProvinceOrStateFromPlaces(result);
    this.setState({
      notAgentProvinceOrStateError:
        provinceOrState !== this.props.provinceOrState,
      showSelectCity: showCityCheckbox({ placesApiResult: result })
    });

    this.loadLocationOnMap({
      result,
      latLng
    });
  }

  @bound
  loadLocationOnMap({ latLng, result }) {
    if (this.map) {
      const { lat, lng } = latLng;
      const includedPolygons = leafletPip.pointInLayer([lng, lat], this.map);
      if (includedPolygons.length) {
        this.setState({ defaultAddress: result });
        const polygon = includedPolygons[0];
        const bounds = L.featureGroup([polygon]).getBounds();
        this.map.flyToBounds([bounds]);
      } else {
        this.setState({ selectedPolygons: {} });
      }
    }
  }

  @bound
  updateLocations() {
    !this.props.autoBidSettings &&
      this.props.updateCurrentUserRegionsThunk({
        selectedPolygons: this.state.selectedPolygons
      });

    this.toggleDisplayMap();
  }

  @bound
  restoreLocationsFromProps() {
    this.setState({
      selectedPolygons: Object.assign({}, this.getLocations())
    });
  }

  @bound
  discardLocationChanges() {
    this.restoreLocationsFromProps();
    this.toggleDisplayMap();
  }

  @bound
  isPolygonBoundariesAvailable() {
    return this.props.polygons.boundaries[this.props.provinceOrState];
  }

  @bound
  didMountForBuyJobs() {
    if (this.props.autoBidSettings) {
      this.props.form.setFieldsValue({
        [REBATE_COMMISSION]: this.props.autoBidRebateCommissionPercentage
      });
      this.setState({
        autoBidBuyPriceRange: this.props.autoBidBuyPriceRange,
        selectedPolygons: this.props.autoBidBuySelectedPolygons
      });
    } else {
      const rebateExists = !!this.props.defaultCommissions[REBATE_COMMISSION];
      this.props.form.setFieldsValue({
        [REBATE_COMMISSION]: rebateExists
          ? this.props.defaultCommissions[REBATE_COMMISSION]
          : 0
      });
    }
  }

  @bound
  didMountForSellJobs() {
    if (this.props.autoBidSettings) {
      this.props.form.setFieldsValue({
        [COOPERATING_COMMISSION]: this.props
          .autoBidCooperatingCommissionPercentage,
        [LISTING_COMMISSION]: this.props.autoBidListingCommissionPercentage
      });
      this.setState({
        autoBidSellPriceRange: this.props.autoBidSellPriceRange,
        selectedPolygons: this.props.autoBidSellSelectedPolygons
      });
    } else {
      this.props.form.setFieldsValue({
        [COOPERATING_COMMISSION]: this.props.defaultCommissions[
          COOPERATING_COMMISSION
        ],
        [LISTING_COMMISSION]: this.props.defaultCommissions[LISTING_COMMISSION]
      });
    }
  }

  getBreadCrumbText() {
    if (this.props.jobType === BUY)
      return this.props.autoBidSettings
        ? "offerSettings.autobidOfferForBuyer"
        : "offerSettings.standardOfferForBuyer";
    if (this.props.jobType === SELL)
      return this.props.autoBidSettings
        ? "offerSettings.autobidOfferForSeller"
        : "offerSettings.standardOfferForSeller";
  }

  getTaglineContent() {
    if (this.props.autoBidSettings) {
      if (this.props.jobType === BUY) return this.props.autoBidBuyTagline;
      if (this.props.jobType === SELL) return this.props.autoBidSellTagline;
    } else return this.props.tagline;
  }

  getPersonalizedMessageContent() {
    if (this.props.autoBidSettings) {
      if (this.props.jobType === BUY)
        return this.props.autoBidBuyPersonalizedMessage;
      if (this.props.jobType === SELL)
        return this.props.autoBidSellPersonalizedMessage;
    } else return this.props.personalizedMessage;
  }

  getServices() {
    if (this.props.autoBidSettings) {
      if (this.props.jobType === BUY)
        return { [BUY]: this.props.autoBidBuyServices };
      if (this.props.jobType === SELL)
        return { [SELL]: this.props.autoBidSellServices };
    } else return this.props.services;
  }

  getLocations() {
    return this.props.autoBidSettings
      ? this.state.selectedPolygons
      : this.props.locations;
  }

  @bound
  handlePolygonMouseOver(polygonId) {
    let isPolygonSelected = false;

    if (this.state.selectedPolygons) {
      isPolygonSelected = Object.keys(this.state.selectedPolygons).some(
        selectedPolygonId => selectedPolygonId === polygonId
      );
    }

    this.setState({
      isPolygonSelected
    });
  }

  componentDidMount() {
    this.restoreLocationsFromProps();

    if (this.props.jobType === BUY) this.didMountForBuyJobs();
    if (this.props.jobType === SELL) this.didMountForSellJobs();

    if (this.props.provinceOrState && !this.isPolygonBoundariesAvailable())
      this.props.getPolygonBoundaries({
        provinceOrState: this.props.provinceOrState
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locations !== this.props.locations) {
      this.restoreLocationsFromProps();
    }
  }

  render() {
    const { form = {} } = this.props;
    const { getFieldDecorator } = form;
    const FormItem = Form.Item;

    return (
      <div className="offer-settings">
        {!this.props.provinceOrState && (
          <Modal visible={true} footer={null} onCancel={this.goToSettings}>
            <BrokerageDetails continueIfFilled />
          </Modal>
        )}

        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <a onClick={this.handleBreadcrumbClick}>
              {translate(this.props.intl, "proposalSettings")}
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {translate(this.props.intl, this.getBreadCrumbText())}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Form
            id="standard-offer-settings-form"
            layout="horizontal"
            onSubmit={this.handleSubmit}
          >
            <div className="offer-settings__grid">
              <div className="offer-settings__tagline">
                <TextAreaField
                  form={form}
                  intl={this.props.intl}
                  initialValue={this.getTaglineContent()}
                  className={"tagline"}
                  label={translate(this.props.intl, "offerSettings.tagline")}
                  id={TAGLINE}
                  isTextArea={false}
                  child={
                    <div className="chars">
                      {translate(this.props.intl, "offerSettings.characters", {
                        number: "50"
                      })}
                    </div>
                  }
                  isRequired
                />
              </div>

              <div className="offer-settings__fields">
                <RegionFormItem
                  intl={this.props.intl}
                  locations={this.getLocations()}
                  getFieldDecorator={getFieldDecorator}
                  onEditClick={this.toggleDisplayMap}
                />

                <PropertyTypeFormItem
                  intl={this.props.intl}
                  propertyTypes={this.props.propertyTypes}
                />

                {this.props.autoBidSettings && (
                  <div>
                    <FormItem
                      colon={false}
                      label={translate(
                        this.props.intl,
                        "offerSettings.priceRange"
                      )}
                    />
                    <PriceRangeSlider
                      isForPosting
                      value={
                        this.props.jobType === BUY
                          ? this.state.autoBidBuyPriceRange
                          : this.state.autoBidSellPriceRange
                      }
                      onPriceRangeChange={
                        this.props.jobType === BUY
                          ? this.onAutoBidBuyPriceRangeChange
                          : this.onAutoBidSellPriceRangeChange
                      }
                      defaultValue={
                        this.props.jobType === BUY
                          ? this.props.autoBidBuyPriceRange
                          : this.props.autoBidSellPriceRange
                      }
                    />
                  </div>
                )}

                <CommissionFormItem
                  intl={this.props.intl}
                  jobType={this.props.jobType}
                  form={this.props.form}
                />
              </div>

              <div className="offer-settings__message">
                <TextAreaField
                  form={form}
                  intl={this.props.intl}
                  initialValue={this.getPersonalizedMessageContent()}
                  className={"offer-settings__message"}
                  label={translate(
                    this.props.intl,
                    "offerSettings.messageToClient"
                  )}
                  id={PERSONALIZED_MESSAGE}
                  child={
                    <div className="chars">
                      {translate(this.props.intl, "offerSettings.characters", {
                        number: AGENT_PERSONAL_MESSAGE_LIMIT
                      })}
                    </div>
                  }
                  isTextArea
                  isRequired
                />
              </div>
              <div className="offer-settings__services">
                <ServicesFormItem
                  intl={this.props.intl}
                  jobType={this.props.jobType}
                  services={this.getServices()}
                  getFieldDecorator={getFieldDecorator}
                />
              </div>

              <div className="offer-settings__buttons">
                <Button type="primary" htmlType="submit">
                  {translate(this.props.intl, "button.save")}
                </Button>
              </div>

              {!this.props.isPremium && (
                <UpgradeSubscription
                  intl={this.props.intl}
                  subscriptionsUrl={url.subscriptions}
                />
              )}
            </div>
          </Form>
        </Card>

        <EditRegions
          provinceOrState={this.props.provinceOrState}
          intl={this.props.intl}
          polygons={this.props.polygons}
          selectedPolygons={this.state.selectedPolygons}
          handleLocationInputChange={this.handleLocationInputChange}
          onPolygonClick={this.handlePolygonClick}
          setMapData={this.setMapData}
          onRemoveRegion={this.handleRemoveRegion}
          displayMap={this.state.displayMap}
          discardLocationChanges={this.discardLocationChanges}
          updateLocations={this.updateLocations}
          notAgentProvinceOrStateError={this.state.notAgentProvinceOrStateError}
          setSelectedPolygons={this.setSelectedPolygons}
          showSelectCity={this.state.showSelectCity}
          handlePolygonMouseOver={this.handlePolygonMouseOver}
          isPolygonSelected={this.state.isPolygonSelected}
        />
      </div>
    );
  }
}

export default StandardOfferSettingsForm;
