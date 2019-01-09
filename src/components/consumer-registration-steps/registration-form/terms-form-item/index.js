import React from "react";
import PropTypes from "prop-types";
import { Form, Checkbox } from "antd";
import TermsAndConditions from "../../../signup-terms-and-conditions";
import ConsentForNews from "../../../consent-for-news";

const { Item: FormItem } = Form;
const { Group: CheckboxGroup } = Checkbox;

const TermsFormItem = ({
  getFieldDecorator,
  termsFieldName,
  consentFieldName,
  intl,
  consentForNewsValue,
  termsValidator: validator
}) => (
  <div className="consumer-registration-form-item consumer-registration-form-checkboxes">
    <FormItem>
      {getFieldDecorator(termsFieldName, {
        rules: [{ validator }]
      })(
        <CheckboxGroup>
          <div className="consumer-registration-accept-terms-group">
            <Checkbox value="accept_term">
              <TermsAndConditions intl={intl} />
            </Checkbox>
          </div>
        </CheckboxGroup>
      )}
      {getFieldDecorator(consentFieldName)(
        <CheckboxGroup>
          <div className="consumer-registration-accept-terms-group">
            <Checkbox value={consentForNewsValue}>
              <ConsentForNews intl={intl} />
            </Checkbox>
          </div>
        </CheckboxGroup>
      )}
    </FormItem>
  </div>
);

TermsFormItem.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  termsFieldName: PropTypes.string.isRequired,
  consentFieldName: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  consentForNewsValue: PropTypes.string,
  termsValidator: PropTypes.func.isRequired
};

export default TermsFormItem;
