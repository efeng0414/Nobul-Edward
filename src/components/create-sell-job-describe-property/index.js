import React from "react";
import { Form, Row, Button, InputNumber } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";

import LocationSearch from "../../components/location-search";
import PolygonMap from "../../components/polygon-map";
import PropertyFeatures from "../../components/property-features";
import PriceRanges from "../../components/price-ranges";
import PropertyTypes from "../../components/property-types";
import { translate } from "../../utilities/locale";

const FormItem = Form.Item;

const CreateBuyJobDescribeProperty = props => {
  const {
    intl,
    form,
    mapId,
    polygonLayers,
    selectedPolygons,
    sendMapDataToParent,
    onSubmit,
    onClearSelectedPolygons,
    onLocationInputChange
  } = props;

  const setPropertyType = value => form.setFieldsValue({ propertyType: value });
  const setPriceRange = value => form.setFieldsValue({ priceRange: value });
  const setPropertyFeatures = value =>
    form.setFieldsValue({ propertyFeatures: value });
  const clearRegionsValue = () => {
    onClearSelectedPolygons();
    form.resetFields(["regions"]);
  };

  return (
    <Form
      layout="horizontal"
      onSubmit={e => {
        onSubmit(e, form);
      }}
    >
      <Row>
        <FormItem
          label={translate(intl, "enterAddress")}
          style={{ marginBottom: "0px" }}
          colon={false}
        />
        <LocationSearch
          onChange={clearRegionsValue}
          onLocationSelect={onLocationInputChange}
        />
        <FormItem label={null} colon={false}>
          {form.getFieldDecorator("regions", {
            initialValue: {},
            rules: [
              {
                required: true,
                message: "error.addressIsRequired"
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
                mapId={mapId}
                defaultCenter={{ lat: 43.6567919, lng: -79.4609302 }}
                defaultZoom={8}
                polygonLayers={polygonLayers}
                selectedPolygons={selectedPolygons}
                form={form}
                formFieldName={"regions"}
                sendMapDataToParent={sendMapDataToParent}
              />
            </div>
          )}
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
          })(<PriceRanges onPriceRangeChange={setPriceRange} />)}
        </FormItem>
      </Row>

      <Row>
        <FormItem label={translate(intl, "propertyType")} colon={false}>
          {form.getFieldDecorator("propertyType", {
            rules: [
              {
                required: true,
                message: translate(intl, "error.propertyTypeIsRequired")
              }
            ]
          })(<PropertyTypes onPropertyTypeChange={setPropertyType} />)}
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
          })(<PropertyFeatures onFeaturesChange={setPropertyFeatures} />)}
        </FormItem>
      </Row>
      <Row>
        <FormItem label={translate(intl, "bedrooms")} colon={false}>
          {form.getFieldDecorator("bedrooms", {
            rules: [
              {
                required: true,
                message: translate(intl, "error.bedroomsIsRequired")
              }
            ]
          })(<InputNumber min={0} max={15} formatter={includeWithPlusSign} />)}
        </FormItem>
      </Row>

      <Row>
        <FormItem label={translate(intl, "bathrooms")} colon={false}>
          {form.getFieldDecorator("bathrooms", {
            rules: [
              {
                required: true,
                message: translate(intl, "error.bathroomsIsRequired")
              }
            ]
          })(<InputNumber min={0} max={15} formatter={includeWithPlusSign} />)}
        </FormItem>
      </Row>

      <Button type="primary">{translate(intl, "selectAgentServices")}</Button>
    </Form>
  );
};

const includeWithPlusSign = value => {
  return value === "15" ? `+ ${value}` : value;
};

CreateBuyJobDescribeProperty.propTypes = {
  mapId: PropTypes.string,
  polygonLayers: PropTypes.object,
  selectedPolygons: PropTypes.object,
  form: PropTypes.any,
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLocationInputChange: PropTypes.func,
  onClearSelectedPolygons: PropTypes.func,
  sendMapDataToParent: PropTypes.func
};

export default Form.create()(injectIntl(CreateBuyJobDescribeProperty));
