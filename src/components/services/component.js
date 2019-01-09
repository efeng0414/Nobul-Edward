import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, Form } from "antd";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";

import ActivityIndicator from "../../components/activity-indicator";
import { translate } from "../../utilities/locale";
import { SERVICES_EXACT, BUY, SELL } from "../../../core/constants/shared";
import {
  SERVICES_GROUPS_BUY,
  SERVICES_GROUPS_SELL
} from "../../../core/constants/services";
import Service from "./service";
import {
  SERVICES_CHECKBOXES,
  SERVICES_GROUPS,
  SERVICES_ACCORDION
} from "../../utilities/constants";
import { getServicesList } from "../../utilities/services";
import ServiceGroups from "./service-groups";
import ServiceAccordion from "./service-accordion";

import "./styles.scss";

const FormItem = Form.Item;

@injectIntl
class Services extends Component {
  static propTypes = {
    serviceType: PropTypes.string,
    intl: intlShape.isRequired,
    onServiceClick: PropTypes.func,
    getServices: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    services: PropTypes.any,
    selectedServices: PropTypes.object,
    getFieldDecorator: PropTypes.any,
    value: PropTypes.array,
    layout: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    layout: SERVICES_CHECKBOXES,
    onServiceClick: () => {},
    className: "services",
    services: { [BUY]: {}, [SELL]: {} }
  };

  state = { services: {} };

  @bound
  onServiceChange(services) {
    this.props.onServiceClick(services);

    // pass value to Form (if nexted in form item)
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(services);
    }
  }

  componentDidMount() {
    if (this.props.getServices) {
      this.props.getServices({
        serviceType: this.props.serviceType,
        intl: this.props.intl,
        translate
      });
    } else {
      this.setServicesList({ serviceType: this.props.serviceType });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.serviceType &&
      prevProps.serviceType !== this.props.serviceType
    ) {
      if (this.props.getServices) {
        this.props.getServices({
          serviceType: this.props.serviceType,
          intl: this.props.intl,
          translate
        });
      } else {
        this.setServicesList();
      }
    }
  }
  setServicesList({ serviceType }) {
    this.setState({
      services: getServicesList({
        serviceType,
        intl: this.props.intl
      })
    });
  }

  transformIntoArray(services) {
    const isArray = Array.isArray(services);
    const isObject = services === Object(services);

    return isArray ? services : isObject ? Object.keys(services) : [];
  }

  @bound
  getServicesGroups(services) {
    const WrapperComponent =
      this.props.layout === SERVICES_GROUPS ? ServiceGroups : ServiceAccordion;

    return (
      <WrapperComponent
        serviceType={this.props.serviceType}
        serviceGroup={
          this.props.serviceType === BUY
            ? SERVICES_GROUPS_BUY
            : SERVICES_GROUPS_SELL
        }
        services={services}
        intl={this.props.intl}
      />
    );
  }

  @bound
  renderServices(propService = {}) {
    if (Object.keys(propService).length === 0) return;

    const isLoading = this.props.services.isLoading || false;
    const transformedServices = this.transformIntoArray(
      this.props.selectedServices || this.props.value
    );

    var servicesComponent = (layout => {
      switch (layout) {
        case SERVICES_GROUPS:
        case SERVICES_ACCORDION: {
          const services = {};
          Object.values(propService).map(
            ({ value, label, tooltip }) =>
              (services[value] = { label, tooltip })
          );

          return this.getServicesGroups(services);
        }
        default:
          return Object.values(propService).map(({ value, label, tooltip }) => (
            <Service
              key={value}
              value={value}
              label={label}
              tooltip={tooltip}
              serviceType={this.props.serviceType}
            />
          ));
      }
    })(this.props.layout);

    return (
      <ActivityIndicator spinning={isLoading} type="Loading...">
        <Checkbox.Group
          onChange={this.onServiceChange}
          disabled={this.props.disabled}
          defaultValue={transformedServices}
        >
          {servicesComponent}
        </Checkbox.Group>
      </ActivityIndicator>
    );
  }

  render() {
    return (
      <FormItem className={this.props.className}>
        {this.props.getFieldDecorator
          ? this.props.getFieldDecorator(SERVICES_EXACT, {
              rules: [
                {
                  required: false
                }
              ]
            })(
              this.renderServices(
                this.state.services ||
                  this.props.services[this.props.serviceType]
              )
            )
          : this.renderServices(
              this.state.services || this.props.services[this.props.serviceType]
            )}
      </FormItem>
    );
  }
}

export default Services;
