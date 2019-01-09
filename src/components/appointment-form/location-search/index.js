import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";

import { translate } from "../../../utilities/locale";
import { AppointmentFormFieldKeys } from "../../../utilities/forms";
import LocationSearchInput from "../../location-search";

class LocationSearch extends Component {
  static propTypes = {
    setFieldsValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    onLocationSelect: PropTypes.func,
    onLocationChange: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    resetLocationValue: PropTypes.bool.isRequired
  };

  static defaultProps = {
    onLocationSelect: () => {}
  };

  @bound
  onLocationSelect(value) {
    this.props.onLocationSelect(value);
    this.props.setFieldsValue({
      [AppointmentFormFieldKeys.LOCATION_SEARCH]: value
    });
  }

  render() {
    return (
      <Form.Item
        label={translate(
          this.props.intl,
          "appointmentForm.locationSearch.label"
        )}
      >
        {this.props.getFieldDecorator(
          AppointmentFormFieldKeys.LOCATION_SEARCH,
          {
            defaultValue: "",
            rules: [
              {
                required: true,
                message: translate(
                  this.props.intl,
                  "appointmentForm.locationSearch.validationMessage"
                )
              }
            ]
          }
        )(
          <LocationSearchInput
            onChange={this.props.onLocationChange}
            onLocationSelect={this.onLocationSelect}
            resetLocationValue={this.props.resetLocationValue}
          />
        )}
      </Form.Item>
    );
  }
}

export default injectIntl(LocationSearch);
