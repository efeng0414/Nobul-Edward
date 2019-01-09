import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Input, Form } from "antd";

import { translate } from "../../../../../utilities/locale";

import { TAGLINE } from "../../../../../../core/api-transform/offers";

const FormItem = Form.Item;
const TaglineFormItem = ({ intl, tagline, getFieldDecorator }) => (
  <FormItem
    colon={false}
    label={translate(intl, "offerSettings.tagline")}
    className="tagline"
  >
    {getFieldDecorator(TAGLINE, {
      initialValue: tagline,
      rules: [
        {
          required: true,
          message: translate(intl, "error.taglineIsRequired")
        }
      ]
    })(<Input maxLength={50} />)}
    <div className="chars">
      {translate(intl, "offerSettings.characters", {
        number: "50"
      })}
    </div>
  </FormItem>
);

TaglineFormItem.propTypes = {
  intl: intlShape.isRequired,
  tagline: PropTypes.string,
  getFieldDecorator: PropTypes.any
};

export default TaglineFormItem;
