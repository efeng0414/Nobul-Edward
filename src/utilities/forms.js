import React from "react";
import { Select } from "antd";
import PrefixSelector from "../components/prefix-selector";

// returns the form layout for responsive layouts
export const getFormLayout = (offset = false, left = false, center = false) => {
  const defaultProps = {
    labelCol: {
      xs: {
        span: 12
      },
      sm: {
        span: left ? 6 : 12
      }
    },
    wrapperCol: {
      xs: {
        span: 12
      },
      sm: {
        span: left ? 6 : 12
      }
    }
  };

  if (offset) {
    defaultProps.wrapperCol.xs.offset = 0;
    defaultProps.wrapperCol.sm.offset = 6;
  } else if (center) {
    defaultProps.wrapperCol.xs.offset = 1;
    defaultProps.wrapperCol.sm.offset = 4;
  }
  return defaultProps;
};

// Returns a dropdown of phone prefixes.
export const phonePrefixDropdown = (getFieldDecorator, disabled) => {
  return getFieldDecorator("prefix", {
    initialValue: "1"
  })(<PrefixSelector disabled={disabled} />);
};

// Generates an array of select options
export const generateSelectOptions = stringArray => {
  const options = [];

  stringArray.map(string => {
    return options.push(<Select.Option key={string}>{string}</Select.Option>);
  });

  return options;
};

export const AppointmentFormFieldKeys = {
  EVENT_TITLE: "eventTitle",
  LOCATION_SEARCH: "locationSearch",
  DATE_PICKER: "eventDate",
  START_TIME_PICKER: "eventStartTime",
  END_TIME_PICKER: "eventEndTime",
  PHONE_NUMBER: "phoneNumber",
  PHONE_NUMBER_PREFIX: "phonePrefix",
  EVENT_TYPE_SELECT: "eventTypeSelect",
  EVENT_COMMENT: "eventComment"
};

export const proposeNewTimeFormFieldKeys = {
  TIME_PICKER: "timePicker"
};
