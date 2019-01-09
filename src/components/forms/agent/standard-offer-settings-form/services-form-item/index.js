import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form } from "antd";

import Services from "../../../../services";
import { translate } from "../../../../../utilities/locale";
import { SERVICES_ACCORDION } from "../../../../../utilities/constants";

import { SERVICES } from "../../../../../../core/api-transform/offers";

const FormItem = Form.Item;
const ServicesFormItem = ({ intl, jobType, services, getFieldDecorator }) => {
  const rawServices = services[jobType];
  const initialServices =
    rawServices && rawServices.constructor === Array
      ? rawServices
      : Object.keys(rawServices || {});

  return (
    <FormItem colon={false} label={translate(intl, "offerSettings.services")}>
      {getFieldDecorator(SERVICES, {
        initialValue: initialServices
      })(
        <Services
          serviceType={jobType}
          intl={intl}
          selectedServices={services[jobType]}
          layout={SERVICES_ACCORDION}
          className={"services services-accordion"}
        />
      )}
    </FormItem>
  );
};

ServicesFormItem.propTypes = {
  intl: intlShape.isRequired,
  jobType: PropTypes.string,
  services: PropTypes.any,
  getFieldDecorator: PropTypes.any
};

export default ServicesFormItem;
