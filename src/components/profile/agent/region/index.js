import React, { Component } from "react";
import { Form, Button, Checkbox } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import { translate } from "../../../../utilities/locale";
import PolygonMap from "../../../../components/polygon-map";
import ontarioPolygons from "../../../../../core/data/polygon-boundaries/data-ontario-level-6.json";
import torontoPolygons from "../../../../../core/data/polygon-boundaries/data-toronto-neighbourhoods.json";
import { bound } from "../../../../../node_modules/class-bind";

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPolygons: props.locations ? props.locations : {}
    };
  }

  static propTypes = {
    form: PropTypes.any,
    goPreviousStep: PropTypes.func,
    intl: intlShape.isRequired,
    handlePolygonClick: PropTypes.func,
    updateUserRegionAndPropertyType: PropTypes.func,
    locations: PropTypes.object,
    areas: PropTypes.object
  };

  handleSubmit = e => {
    const { form = {} } = this.props;
    const { selectedPolygons = {} } = this.state;
    const { validateFieldsAndScroll } = form;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const agentData = {
          selectedPolygons: selectedPolygons,
          propertyType: values.propertyType
        };
        this.props.updateUserRegionAndPropertyType(agentData);
      }
    });
  };

  @bound
  handlePolygonClick(e) {
    const polygonId = e.layer.feature.properties["osm-relation-id"];
    let selectedPolygons = Object.assign(this.state.selectedPolygons);
    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    } else {
      const { layer = {} } = e;
      const { feature = {} } = layer;
      const { properties = {} } = feature;
      const { name = {} } = properties;
      selectedPolygons[polygonId] = { name: name };
    }
    this.setState({ selectedPolygons });
  }

  componentDidMount() {
    const { form = {}, areas = {} } = this.props;
    let propertyType = [];
    if (Object.keys(areas).length > 0) {
      propertyType = Object.keys(areas).map(key => key.toString());
    }
    form.setFieldsValue({
      propertyType: propertyType
    });
  }

  mergePolygonLayers() {
    return {
      [ontarioPolygons.layerId]: ontarioPolygons,
      [torontoPolygons.layerId]: torontoPolygons
    };
  }

  render() {
    const { intl, form = {} } = this.props;
    const { selectedPolygons = {} } = this.state;
    const { getFieldDecorator } = form;
    const FormItem = Form.Item;

    return (
      <div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            label={translate(intl, "selectNeighbourhood")}
            colon={false}
          >
            <PolygonMap
              mapId={"jobFilterMap"}
              defaultCenter={{ lat: 43.6567919, lng: -79.4609302 }}
              defaultZoom={8}
              polygonLayers={this.mergePolygonLayers()}
              selectedPolygons={selectedPolygons}
              onPolygonClick={this.handlePolygonClick}
            />

            {Object.keys(selectedPolygons).map(id => {
              return (
                <div className="region-name-container" key={id}>
                  <span>{selectedPolygons[id].name}</span>
                </div>
              );
            })}
          </FormItem>

          <FormItem label={translate(intl, "agent.propertyTypeTitle")}>
            {getFieldDecorator("propertyType", {
              rules: [
                {
                  required: true,
                  message: translate(intl, "error.propertyTypeRequired")
                }
              ]
            })(
              <Checkbox.Group>
                <Checkbox value="buy">{translate(intl, "buy")}</Checkbox>
                <Checkbox value="sell">{translate(intl, "sell")}</Checkbox>
              </Checkbox.Group>
            )}
          </FormItem>

          <div>
            <Button type="primary" htmlType="submit">
              {translate(intl, "button.submit")}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Region);
