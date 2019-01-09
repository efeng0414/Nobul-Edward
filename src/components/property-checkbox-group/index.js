import React, { Component } from "react";
import { Radio } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import PropTypes from "prop-types";

import { CREATE_PROPERTY_TYPES } from "../../utilities/property-data-web";

import "./styles.scss";

const RadioGroup = Radio.Group;

class PropertyCheckboxGroup extends Component {
  state = {
    selectedProperty: this.props.selectedPropertyType || ""
  };

  @bound
  onPropertyTypeChange(e) {
    this.setState({ selectedProperty: e.target.value });
    this.props.onPropertyTypeChange(e.target.value);
  }

  @bound
  getImg(propertyType) {
    if (this.state.selectedProperty !== propertyType.value) {
      return propertyType.grey;
    } else {
      return propertyType[this.props.type];
    }
  }

  @bound
  renderProperties(propertyType) {
    return (
      <Radio key={propertyType.value} value={propertyType.value}>
        <div>
          <img className="propertyTypeIcon" src={this.getImg(propertyType)} />
        </div>
      </Radio>
    );
  }

  render() {
    return (
      <div className="create-posting-property-checkbox-group">
        <RadioGroup onChange={this.onPropertyTypeChange}>
          {CREATE_PROPERTY_TYPES.map(this.renderProperties)}
        </RadioGroup>
      </div>
    );
  }
}

PropertyCheckboxGroup.propTypes = {
  intl: intlShape.isRequired,
  selectedPropertyType: PropTypes.any,
  onPropertyTypeChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default injectIntl(PropertyCheckboxGroup);
