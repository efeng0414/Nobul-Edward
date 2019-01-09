import React from "react";
import { Form, Button, Modal, Radio, Switch } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import { translate } from "../../utilities/locale";
import PropertyTypes from "../property-types";
import PriceRanges from "../price-ranges";
import PolygonMap from "../polygon-map";
import ontarioPolygons from "../../../core/data/polygon-boundaries/data-ontario-level-6.json";
import torontoPolygons from "../../../core/data/polygon-boundaries/data-toronto-neighbourhoods.json";
import { PRICE, DATE } from "../../../core/constants/shared";

const AgentOffersFilter = props => {
  const {
    intl = {},
    form = {},
    jobsFilters,
    setFilters,
    displayMap,
    setDisplayMap,
    handlePolygonClick,
    deletePolygon,
    enableSort = false
  } = props;
  const FormItem = Form.Item;
  const selectedPolygons = jobsFilters.selectedPolygons || {};

  const handleSortOnChange = e => {
    setFilters("sort", e.target.value);
  };

  const handleSortAscOnChange = e => {
    setFilters("asc", e);
  };

  const deletePolygons = (id, e) => {
    deletePolygon(id);
  };

  return (
    <div className="jobsFilter">
      <h2>{translate(intl, "filters")}</h2>
      <Form layout="horizontal">
        {enableSort ? (
          <div>
            <p>{translate(intl, "sortBy")}</p>
            <div>
              <FormItem>
                {form.getFieldDecorator("sort", { initialValue: PRICE })(
                  <Radio.Group onChange={handleSortOnChange}>
                    <Radio value={PRICE}>{translate(intl, "price")}</Radio>
                    <Radio value={DATE}>{translate(intl, "date")}</Radio>
                  </Radio.Group>
                )}
                <Switch
                  onChange={handleSortAscOnChange}
                  checkedChildren={translate(intl, "asc")}
                  unCheckedChildren={translate(intl, "asc")}
                  defaultChecked
                />
              </FormItem>
            </div>
          </div>
        ) : null}

        <FormItem>
          {Object.keys(selectedPolygons).map(id => {
            return (
              <div className="region" key={id}>
                {selectedPolygons[id].name}
                <i
                  className="anticon anticon-cross"
                  onClick={deletePolygons.bind(this, id)}
                />
              </div>
            );
          })}
          <Button onClick={setDisplayMap.bind(this, true)}>
            {translate(intl, "addRegion")}
          </Button>
        </FormItem>

        <FormItem label={translate(intl, "selectPropertyType")} colon={false}>
          {form.getFieldDecorator("propertyType")(
            <PropertyTypes
              mode="multiple"
              onPropertyTypeChange={setFilters.bind(this, "propertyType")}
            />
          )}
        </FormItem>

        <FormItem label={translate(intl, "selectPriceRange")} colon={false}>
          {form.getFieldDecorator("priceRange")(
            <PriceRanges
              mode="multiple"
              onPriceRangeChange={setFilters.bind(this, "priceRange")}
            />
          )}
        </FormItem>
      </Form>

      <Modal
        visible={displayMap}
        onCancel={setDisplayMap.bind(this, false)}
        width="90%"
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={setDisplayMap.bind(this, false)}
          >
            {translate(intl, "close")}
          </Button>
        ]}
      >
        <div>
          <PolygonMap
            mapId={"jobFilterMap"}
            defaultCenter={{ lat: 43.6567919, lng: -79.4609302 }}
            defaultZoom={8}
            polygonLayers={mergePolygonLayers()}
            selectedPolygons={selectedPolygons}
            onPolygonClick={handlePolygonClick}
          />

          {Object.keys(selectedPolygons).map(id => {
            return (
              <div className="region-name-container" key={id}>
                <span>{selectedPolygons[id].name}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

const mergePolygonLayers = () => {
  return {
    [ontarioPolygons.layerId]: ontarioPolygons,
    [torontoPolygons.layerId]: torontoPolygons
  };
};

AgentOffersFilter.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.object,
  jobsFilters: PropTypes.object,
  setFilters: PropTypes.func,
  displayMap: PropTypes.bool,
  setDisplayMap: PropTypes.func,
  handlePolygonClick: PropTypes.func,
  deletePolygon: PropTypes.func,
  enableSort: PropTypes.bool
};

export default Form.create()(AgentOffersFilter);
