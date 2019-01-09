import React from "react";

import moment from "moment";
import { timestampToMoment } from "../../../core/utilities/agreements";
import { translate } from "../../utilities/locale";
import PropTypes from "prop-types";
import {
  Input,
  InputNumber,
  Form,
  DatePicker,
  Radio,
  Button,
  Icon,
  Upload
} from "antd";
import { phonePrefixDropdown } from "../../utilities/forms";

// Constants shared by all agent form components.
const FormItem = Form.Item;
const defaultFieldProps = {
  fieldLayout: PropTypes.any,
  value: PropTypes.string,
  form: PropTypes.any,
  intl: PropTypes.object,
  disableFilled: PropTypes.bool
};

{
  /* Form wrapper */
}
export const AgreementFields = props => {
  const {
    form = {},
    fieldLayout = {},
    intl,
    disableFilled = false,
    children
  } = props;
  const renderChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        form,
        fieldLayout,
        intl,
        disableFilled
      });
    } else {
      return child;
    }
  });
  return <div>{renderChildren}</div>;
};

AgreementFields.propTypes = {
  fieldLayout: PropTypes.any,
  form: PropTypes.any,
  intl: PropTypes.object,
  children: PropTypes.any,
  disableFilled: PropTypes.bool
};

{
  /* Client name */
}
export const ClientName = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "clientName")}
      hasFeedback
    >
      {getFieldDecorator("clientName", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.clientNameIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
ClientName.propTypes = defaultFieldProps;

{
  /* Client name */
}
export const SecondClientName = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "secondClientName")}
      hasFeedback
    >
      {getFieldDecorator("secondClientName", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.clientNameIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
SecondClientName.propTypes = defaultFieldProps;

{
  /* Agent name */
}
export const AgentName = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem {...fieldLayout} label={translate(intl, "agentName")} hasFeedback>
      {getFieldDecorator("agentName", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.agentNameIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
AgentName.propTypes = defaultFieldProps;

{
  /* Brokerage phone */
}
export const BrokeragePhone = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  const isDisabled = disableFilled && !!value;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "brokeragePhone")}
      hasFeedback
    >
      {getFieldDecorator("brokeragePhone", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.phoneIsRequired")
          },
          {
            max: 12,
            message: translate(intl, "error.phoneIsInvalid")
          }
        ]
      })(
        <Input
          addonBefore={phonePrefixDropdown(getFieldDecorator, isDisabled)}
          style={{ width: "100%" }}
          disabled={isDisabled}
        />
      )}
    </FormItem>
  );
};
BrokeragePhone.propTypes = defaultFieldProps;

{
  /* Buyer phone */
}
export const ClientPhone = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  const isDisabled = disableFilled && !!value;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "clientPhone")}
      hasFeedback
    >
      {getFieldDecorator("clientPhone", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.phoneIsRequired")
          },
          {
            max: 12,
            message: translate(intl, "error.phoneIsInvalid")
          }
        ]
      })(
        <Input
          addonBefore={phonePrefixDropdown(getFieldDecorator, isDisabled)}
          style={{ width: "100%" }}
          disabled={isDisabled}
        />
      )}
    </FormItem>
  );
};
ClientPhone.propTypes = defaultFieldProps;

{
  /* Second  Buyer phone */
}
export const SecondClientPhone = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  const isDisabled = disableFilled && !!value;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "secondClientPhone")}
      hasFeedback
    >
      {getFieldDecorator("secondClientPhone", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.phoneIsRequired")
          }
        ]
      })(
        <Input
          addonBefore={phonePrefixDropdown(getFieldDecorator, isDisabled)}
          style={{ width: "100%" }}
          disabled={isDisabled}
        />
      )}
    </FormItem>
  );
};
SecondClientPhone.propTypes = defaultFieldProps;

{
  /* Brokerage name */
}
export const BrokerageName = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "brokerageName")}
      hasFeedback
    >
      {getFieldDecorator("brokerageName", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.brokerageNameIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
BrokerageName.propTypes = defaultFieldProps;

{
  /* Broker fax # */
}
export const BrokerFax = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem {...fieldLayout} label={translate(intl, "brokerFax")} hasFeedback>
      {getFieldDecorator("brokerageFax", {
        initialValue: value,
        rules: [
          {
            message: translate(intl, "error.brokerFaxIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
BrokerFax.propTypes = defaultFieldProps;

{
  /* Brokerage address */
}
export const BrokerageAddress = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "brokerageAddress")}
      hasFeedback
    >
      {getFieldDecorator("brokerageAddress", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.propertyAddressIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
BrokerageAddress.propTypes = defaultFieldProps;

{
  /* Client address */
}
export const ClientAddress = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "clientAddress")}
      hasFeedback
    >
      {getFieldDecorator("clientAddress", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.addressIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
ClientAddress.propTypes = defaultFieldProps;

{
  /* Secondary client address */
}
export const SecondClientAddress = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "clientAddress")}
      hasFeedback
    >
      {getFieldDecorator("clientAddress", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.addressIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
SecondClientAddress.propTypes = defaultFieldProps;

{
  /* Date helper */
}
export const disabledDate = current => {
  // Can not select days before today
  return (
    current &&
    current <
      moment()
        .add(-1, "days")
        .endOf("day")
  );
};

{
  /* Start date */
}
export const StartDate = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem {...fieldLayout} label={translate(intl, "startDate")} hasFeedback>
      {getFieldDecorator("startDate", {
        initialValue: value ? timestampToMoment(value) : null,
        rules: [
          {
            required: true,
            message: translate(intl, "error.dateIsRequired")
          }
        ]
      })(
        <DatePicker
          showTime
          disabledDate={disabledDate}
          disabled={disableFilled && !!value}
        />
      )}
    </FormItem>
  );
};
StartDate.propTypes = { ...defaultFieldProps, value: PropTypes.any };

{
  /* Expiry date */
}
export const ExpiryDate = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "expiryDate")}
      hasFeedback
    >
      {getFieldDecorator("expiryDate", {
        initialValue: value ? timestampToMoment(value) : null,
        rules: [
          {
            required: true,
            message: translate(intl, "error.expiryDateIsRequired")
          }
        ]
      })(
        <DatePicker
          showTime
          disabledDate={disabledDate}
          disabled={disableFilled && !!value}
        />
      )}
    </FormItem>
  );
};
ExpiryDate.propTypes = { ...defaultFieldProps, value: PropTypes.any };

{
  /* Property type */
}
export const PropertyType = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "selectPropertyType")}
      hasFeedback
    >
      {getFieldDecorator("propertyType", {
        initialValue: value,
        rules: [
          {
            message: translate(intl, "error.propertyTypeIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
PropertyType.propTypes = defaultFieldProps;

{
  /* Property area */
}
export const PropertyArea = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "propertyArea")}
      hasFeedback
    >
      {getFieldDecorator("propertyArea", {
        initialValue: value,
        rules: [
          {
            message: translate(intl, "error.propertyAreaIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
PropertyArea.propTypes = defaultFieldProps;

{
  /* Property address */
}
export const PropertyAddress = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "propertyAddress")}
      hasFeedback
    >
      {getFieldDecorator("propertyAddress", {
        initialValue: value,
        rules: [
          {
            message: translate(intl, "error.propertyAddressIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
PropertyAddress.propTypes = defaultFieldProps;

{
  /* MLS or exclusive */
}
export const MlsOrExclusive = props => {
  const { form = {}, fieldLayout = {}, intl } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem {...fieldLayout} label={translate(intl, "listingType")}>
      {getFieldDecorator("listingType", {
        rules: [
          {
            required: true,
            message: translate(intl, "error.listingTypeIsRequired")
          }
        ]
      })(
        <Radio.Group>
          <Radio.Button value="mls">
            {translate(intl, "button.mls")}
          </Radio.Button>
          <Radio.Button value="exclusive">
            {translate(intl, "button.exclusive")}
          </Radio.Button>
        </Radio.Group>
      )}
    </FormItem>
  );
};
MlsOrExclusive.propTypes = defaultFieldProps;

{
  /* Holdover period */
}
export const HoldoverPeriod = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "holdoverPeriod")}
      hasFeedback
    >
      {getFieldDecorator("holdoverPeriod", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.holdoverPeriodIsRequired")
          }
        ]
      })(<InputNumber min={0} disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
HoldoverPeriod.propTypes = { ...defaultFieldProps, value: PropTypes.number };

{
  /* Commission */
}
export const Commission = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "commission")}
      hasFeedback
    >
      {getFieldDecorator("commission", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.commissionIsRequired")
          }
        ]
      })(
        <InputNumber step="0.01" min={0} disabled={disableFilled && !!value} />
      )}
    </FormItem>
  );
};
Commission.propTypes = { ...defaultFieldProps, value: PropTypes.number };

{
  /* Price */
}
export const Price = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "propertyPrice")}
      hasFeedback
    >
      {getFieldDecorator("propertyPrice", {
        initialValue: value,
        rules: []
      })(
        <Input
          step="0.01"
          min={0}
          disabled={disableFilled && !!value}
          addonBefore="$"
          type="number"
        />
      )}
    </FormItem>
  );
};
Price.propTypes = { ...defaultFieldProps, value: PropTypes.number };

{
  /* PriceRange */
}
export const PriceRange = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "selectPriceRange")}
      hasFeedback
    >
      {getFieldDecorator("priceRange", {
        initialValue: value,
        rules: []
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
PriceRange.propTypes = { ...defaultFieldProps, value: PropTypes.number };

{
  /* Cooperating Commission */
}
export const CooperatingCommission = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "cooperatingCommission")}
      hasFeedback
    >
      {getFieldDecorator("cooperatingCommission", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.cooperatingCommissionisRequired")
          }
        ]
      })(
        <InputNumber step="0.01" min={0} disabled={disableFilled && !!value} />
      )}
    </FormItem>
  );
};
CooperatingCommission.propTypes = {
  ...defaultFieldProps,
  value: PropTypes.number
};

{
  /* Listing Commission */
}
export const ListingCommission = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "listingCommissionField")}
      hasFeedback
    >
      {getFieldDecorator("listingCommission", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.listingCommissionisRequired")
          }
        ]
      })(
        <InputNumber step="0.01" min={0} disabled={disableFilled && !!value} />
      )}
    </FormItem>
  );
};
ListingCommission.propTypes = { ...defaultFieldProps, value: PropTypes.number };

{
  /* Upload */
}
export const UploadDocument = props => {
  const {
    form = {},
    fieldLayout = {},
    processFile,
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;

  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "uploadAgreement")}
      hasFeedback
    >
      {getFieldDecorator("uploadAgreement", {
        rules: [
          {
            required: true,
            message: translate(intl, "error.uploadAgreementIsRequired")
          }
        ]
      })(
        <Upload
          name="uploadAgreement"
          beforeUpload={processFile}
          action="javascript:return false;"
        >
          <Button disabled={disableFilled}>
            <Icon type="upload" /> {translate(intl, "clickToUpload")}
          </Button>
        </Upload>
      )}
    </FormItem>
  );
};
UploadDocument.propTypes = {
  ...defaultFieldProps,
  processFile: PropTypes.func
};

{
  /* Buyers municipality */
}
export const Municipality = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "municipality")}
      hasFeedback
    >
      {getFieldDecorator("clientMunicipality", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.municipalityIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
Municipality.propTypes = defaultFieldProps;

{
  /* Client postcode */
}
export const PostalCode = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "postalCode")}
      hasFeedback
    >
      {getFieldDecorator("clientPostalCode", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.postalCodeIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
PostalCode.propTypes = defaultFieldProps;

{
  /* Second client postcode */
}
export const SecondPostalCode = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "postalCode")}
      hasFeedback
    >
      {getFieldDecorator("postalCode", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.postalCodeIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
SecondPostalCode.propTypes = defaultFieldProps;

{
  /* Buyers postcode */
}
export const CommissionAlternative = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "commissionAlternative")}
      hasFeedback
    >
      {getFieldDecorator("commissionAlternative", {
        initialValue: value
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
CommissionAlternative.propTypes = defaultFieldProps;

{
  /* Form region */
}
export const Region = props => {
  const { value = "" } = props;
  return <Input hidden={true} value={value} name="region" readOnly />;
};
Region.propTypes = defaultFieldProps;

{
  /* Form country */
}
export const Country = props => {
  const { value = "" } = props;
  return <Input hidden={true} value={value} name="country" readOnly />;
};
Country.propTypes = defaultFieldProps;

{
  /* Referral fee */
}
export const ReferralFee = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    onChange = () => true,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "referralFee")}
      hasFeedback
    >
      {getFieldDecorator("referralFee", {
        initialValue: value,
        onChange: onChange,
        rules: [
          {
            required: true,
            message: translate(intl, "error.referralFeeIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
ReferralFee.propTypes = { ...defaultFieldProps, onChange: PropTypes.func };

{
  /* Agreement is vvalid for X days/weeks */
}
export const ValidFor = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem {...fieldLayout} label={translate(intl, "validFor")} hasFeedback>
      {getFieldDecorator("validFor", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.validForIsRequired")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
ValidFor.propTypes = defaultFieldProps;

{
  /* Pay within X days */
}
export const PayWithin = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem {...fieldLayout} label={translate(intl, "payWithin")} hasFeedback>
      {getFieldDecorator("payWithin", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.payWithinIsRequired")
          }
        ]
      })(<InputNumber disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
PayWithin.propTypes = { ...defaultFieldProps, value: PropTypes.number };

{
  /* Schedule data */
}
export const Schedule = props => {
  const { form = {}, value = "", fieldLayout = {}, intl } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "scheduleText")}
      hasFeedback
    >
      {getFieldDecorator("scheduleText", {
        initialValue: value
      })(<Input.TextArea rows={6} />)}
    </FormItem>
  );
};
Schedule.propTypes = defaultFieldProps;

{
  /* Property address */
}
export const BrokerOfRecordName = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "brokerOfRecordName")}
      hasFeedback
    >
      {getFieldDecorator("brokerOfRecordName", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.brokerOfRecordName")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
BrokerOfRecordName.propTypes = defaultFieldProps;

{
  /* Property address */
}
export const BrokerOfRecordEmail = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "brokerOfRecordEmail")}
      hasFeedback
    >
      {getFieldDecorator("brokerOfRecordEmail", {
        initialValue: value,
        rules: [
          {
            required: true,
            message: translate(intl, "error.brokerOfRecordEmail")
          }
        ]
      })(<Input disabled={disableFilled && !!value} />)}
    </FormItem>
  );
};
BrokerOfRecordEmail.propTypes = defaultFieldProps;

export const Rebate = props => {
  const {
    form = {},
    value = "",
    fieldLayout = {},
    disableFilled,
    intl
  } = props;
  const { getFieldDecorator } = form;
  return (
    <FormItem
      {...fieldLayout}
      label={translate(intl, "rebatePercentage")}
      hasFeedback
    >
      {getFieldDecorator("rebateCommission", {
        initialValue: value
      })(
        <InputNumber
          step="0.01"
          min={0}
          max={5}
          disabled={disableFilled && !!value}
        />
      )}
    </FormItem>
  );
};
Rebate.propTypes = { ...defaultFieldProps, value: PropTypes.number };
