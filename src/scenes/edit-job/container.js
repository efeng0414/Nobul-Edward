import React, { Component } from "react";
import { Form, Row, Button, InputNumber, Collapse, Slider } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import leafletPip from "@mapbox/leaflet-pip";
import Services from "../../components/services";
import LocationSearch from "../../components/location-search";
import PolygonMap from "../../components/polygon-map";
import PropertyFeatures from "../../components/property-features";
import PriceRanges from "../../components/price-ranges";
import PropertyTypes from "../../components/property-types";
import { createObjectFromArray } from "../../../core/utilities/array-to-object";
import ontarioPolygons from "../../../core/data/polygon-boundaries/data-ontario-level-6.json";
import torontoPolygons from "../../../core/data/polygon-boundaries/data-toronto-neighbourhoods.json";
import { PRICE_RANGES } from "../../../core/data/propertyData";
import { parseAddressParts } from "../../../core/utilities/parse-places-result";
import { bound } from "../../../node_modules/class-bind";
import "./styles.scss";

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class EditJob extends Component {
  //TODO: Check if all this logic actually needs to go in the constructor
  constructor(props) {
    super(props);

    const { location = {}, form } = props;
    const { state = {} } = location;
    const { job = {}, jobKey = "" } = state;
    const {
      priceRangeHigh = 0,
      priceRangeLow = 0,
      services = {},
      propertyFeatures = {},
      servicesRange = 3,
      propertyType = "",
      regions = {},
      address = "",
      bathrooms = 0,
      bedrooms = 0
    } = job;
    const priceRange = PRICE_RANGES.find(price => {
      return price.high === priceRangeHigh && price.low === priceRangeLow;
    });
    const selectedFeatures = Object.keys(propertyFeatures).map(key =>
      key.toString()
    );
    const selectedServices = Object.keys(services).map(key => key.toString());

    this.state = {
      selectedPolygons: regions,
      address: address,
      serviceRangeOrExact: "range",
      priceRangeMin: priceRangeLow,
      priceRangeMax: priceRangeHigh,
      priceRangeDefault: priceRange.key,
      servicesRange: servicesRange,
      selectedFeatures: selectedFeatures,
      selectedServices: selectedServices,
      propertyType: propertyType,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      job: job,
      jobKey: jobKey,
      jobTypeSell: !!(job && job.jobType === "sell")
    };
  }

  static propTypes = {
    form: PropTypes.any,
    location: PropTypes.object,
    intl: intlShape.isRequired,
    jobs: PropTypes.object,
    editJob: PropTypes.func
  };

  componentDidMount() {
    const { form } = this.props;
    const {
      selectedPolygons,
      propertyType,
      priceRangeDefault,
      bathrooms,
      bedrooms,
      selectedServices,
      selectedFeatures
    } = this.state;

    form.setFieldsValue({
      regions: selectedPolygons,
      propertyType: propertyType,
      priceRange: priceRangeDefault,
      propertyFeatures: selectedFeatures,
      bathrooms: bathrooms,
      bedroom: bedrooms,
      services: selectedServices
    });
  }

  @bound
  mergePolygonLayers() {
    return {
      [ontarioPolygons.layerId]: ontarioPolygons,
      [torontoPolygons.layerId]: torontoPolygons
    };
  }

  @bound
  setPriceRange(value) {
    const { form } = this.props;
    form.setFieldsValue({ priceRange: value });
  }

  @bound
  setPropertyType(value) {
    const { form } = this.props;
    form.setFieldsValue({ propertyType: value });
  }

  @bound
  setPropertyFeatures(value) {
    const { form } = this.props;
    form.setFieldsValue({ propertyFeatures: value });
  }

  @bound
  handleServiceRangeOrExactChange(serviceRangeOrExact) {
    if (serviceRangeOrExact) {
      this.setState({ serviceRangeOrExact });
    }
  }

  @bound
  handleServicesChange(selectedServices) {
    this.setState({ selectedServices });
  }

  @bound
  handleServicesRangeChange(servicesRange) {
    this.setState({ servicesRange });
  }

  @bound
  handleRemoveRegion(e) {
    const polygonId = e.target.value;
    let selectedPolygons = Object.assign(this.state.selectedPolygons);
    delete selectedPolygons[polygonId];
    this.setState({ selectedPolygons });
  }

  @bound
  includeWithPlusSign(value) {
    return value === "15" ? `+ ${value}` : value;
  }
  //TODO: Check if the value "15" needs to be hardcoded

  @bound
  setMapData(map) {
    this.map = map;
  }

  @bound
  clearRegionsValue() {
    this.setState({ selectedPolygons: {} });
  }

  @bound
  handleLocationInputChange(result, latLng) {
    if (this.map) {
      const { lat, lng } = latLng;
      this.map.flyTo([lat, lng], 12);

      const includedPolygons = leafletPip.pointInLayer([lng, lat], this.map);
      if (includedPolygons.length) {
        const polygon = includedPolygons[0];
        const selectedPolygons = {
          [polygon.feature.properties["osm-relation-id"]]: {
            name: polygon.feature.properties.name
          }
        };
        const address = parseAddressParts(result.address_components);
        address.formattedAddress = result.formatted_address;
        this.setState({ selectedPolygons, address });
      }
    }
  }

  @bound
  handlePolygonClick(e) {
    const { jobTypeSell } = this.state;
    if (jobTypeSell === true) return;

    const polygonId = e.layer.feature.properties["osm-relation-id"];
    let selectedPolygons = Object.assign(this.state.selectedPolygons);
    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    } else {
      selectedPolygons[polygonId] = { name: e.layer.feature.properties.name };
    }
    this.setState({ selectedPolygons });
  }

  @bound
  handleSubmit(e) {
    const { validateFieldsAndScroll } = this.props.form;
    const { jobs } = this.props;
    const {
      jobKey,
      job,
      selectedServices,
      servicesRange,
      address,
      jobTypeSell
    } = this.state;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let jobData = Object.assign(job, values);
        const priceRange = PRICE_RANGES.find(price => {
          return price.key === jobData.priceRange;
        });
        if (jobTypeSell) jobData.address = address;
        jobData.priceRangeHigh = priceRange.high;
        jobData.priceRangeLow = priceRange.low;
        jobData.servicesRange = servicesRange;
        jobData.services = createObjectFromArray(selectedServices);
        jobData.propertyFeatures = createObjectFromArray(
          jobData.propertyFeatures
        );
        delete jobData["priceRange"];

        this.props.editJob(jobData, jobKey, jobs, null);
      }
    });
  }

  //TODO: Remove arrow functions from render()
  render() {
    const { intl, form } = this.props;
    const {
      selectedPolygons,
      serviceRangeOrExact,
      jobTypeSell,
      priceRangeDefault,
      selectedServices,
      selectedFeatures,
      servicesRange,
      propertyType,
      address,
      bathrooms,
      bedrooms
    } = this.state;

    return (
      <div className="edit-job-container">
        <Helmet title={translate(intl, "helmet.editJob")} />
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Row>
            <FormItem
              label={translate(
                intl,
                jobTypeSell ? "enterAddress" : "selectRegion"
              )}
              style={{ marginBottom: "0px" }}
              colon={false}
            />
            {jobTypeSell ? (
              <LocationSearch
                defaultAddress={address.formattedAddress}
                onChange={this.clearRegionsValue}
                onLocationSelect={this.handleLocationInputChange}
              />
            ) : null}

            <FormItem label={null} colon={false}>
              {form.getFieldDecorator("regions", {
                initialValue: selectedPolygons,
                rules: [
                  {
                    required: true,
                    message: jobTypeSell ? "error.addressIsRequired" : null
                  },
                  {
                    validator: (rule, value, cb) => {
                      Object.keys(value).length > 0
                        ? cb()
                        : cb(translate(intl, "error.addressIsRequired"));
                    }
                  }
                ]
              })(
                <div>
                  <PolygonMap
                    mapId={"EditJobPolygonMap"}
                    defaultCenter={{ lat: 43.6567919, lng: -79.4609302 }}
                    defaultZoom={8}
                    polygonLayers={this.mergePolygonLayers()}
                    selectedPolygons={selectedPolygons}
                    form={form}
                    formFieldName={"regions"}
                    onPolygonClick={this.handlePolygonClick}
                    sendMapDataToParent={this.setMapData}
                  />
                </div>
              )}

              {jobTypeSell
                ? null
                : Object.keys(selectedPolygons).map(id => {
                    return (
                      <div key={id}>
                        <span>{selectedPolygons[id].name}</span>
                        <Button value={id} onClick={this.handleRemoveRegion}>
                          {translate(intl, "button.remove")}
                        </Button>
                      </div>
                    );
                  })}
            </FormItem>
          </Row>

          <Row>
            <FormItem label={translate(intl, "priceRangeInMind")} colon={false}>
              {form.getFieldDecorator("priceRange", {
                rules: [
                  {
                    required: true,
                    message: translate(intl, "error.priceRangeIsRequired")
                  }
                ]
              })(
                <PriceRanges
                  onPriceRangeChange={this.setPriceRange}
                  selectedPriceRange={priceRangeDefault}
                />
              )}
            </FormItem>
          </Row>

          <Row>
            <FormItem label={translate(intl, "propertyType")} colon={false}>
              {form.getFieldDecorator("propertyType", {
                initValue: propertyType,
                rules: [
                  {
                    required: true,
                    message: translate(intl, "error.propertyTypeIsRequired")
                  }
                ]
              })(
                <PropertyTypes
                  selectedPropertyType={propertyType}
                  onPropertyTypeChange={this.setPropertyType}
                />
              )}
            </FormItem>
          </Row>

          <Row>
            <FormItem
              label={translate(intl, "selectPropertyFeatures")}
              colon={false}
            >
              {form.getFieldDecorator("propertyFeatures", {
                rules: [
                  {
                    required: false
                  }
                ]
              })(
                <PropertyFeatures
                  selectedFeatures={selectedFeatures}
                  onFeaturesChange={this.setPropertyFeatures}
                />
              )}
            </FormItem>
          </Row>

          {jobTypeSell ? (
            <Row>
              <FormItem label={translate(intl, "bedrooms")} colon={false}>
                {form.getFieldDecorator("bedrooms", {
                  initialValue: bedrooms,
                  rules: [
                    {
                      required: true,
                      message: translate(intl, "error.bedroomsIsRequired")
                    }
                  ]
                })(
                  <InputNumber
                    min={0}
                    max={15}
                    formatter={this.includeWithPlusSign}
                  />
                )}
              </FormItem>
            </Row>
          ) : null}

          {jobTypeSell ? (
            <Row>
              <FormItem label={translate(intl, "bathrooms")} colon={false}>
                {form.getFieldDecorator("bathrooms", {
                  initialValue: bathrooms,
                  rules: [
                    {
                      required: true,
                      message: translate(intl, "error.bathroomsIsRequired")
                    }
                  ]
                })(
                  <InputNumber
                    min={0}
                    max={15}
                    formatter={this.includeWithPlusSign}
                  />
                )}
              </FormItem>
            </Row>
          ) : null}

          <Collapse
            accordion
            activeKey={serviceRangeOrExact}
            onChange={this.handleServiceRangeOrExactChange}
          >
            <Panel header={translate(intl, "selectServicesRange")} key="range">
              <Slider
                style={{ width: "80%", margin: "30px 10%" }}
                min={1}
                max={5}
                dots={true}
                marks={{
                  1: translate(intl, "maxCashback"),
                  5: translate(intl, "maxServices")
                }}
                defaultValue={servicesRange}
                onChange={this.handleServicesRangeChange}
              />
            </Panel>

            <Panel header={translate(intl, "selectExactServices")} key="exact">
              <Row>
                <Services
                  serviceType={jobTypeSell ? "sell" : "buy"}
                  selectedServices={selectedServices}
                  onServiceClick={this.handleServicesChange}
                />
              </Row>
            </Panel>
          </Collapse>

          <FormItem>
            <Button type="primary" htmlType="submit">
              {translate(intl, "button.submit")}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(injectIntl(EditJob));
