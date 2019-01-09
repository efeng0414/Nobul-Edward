import React from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

import { translate } from "../../../../../utilities/locale";
import { AGENT_PERSONAL_MESSAGE_LIMIT } from "../../../../../../core/constants/agents";

import { PERSONALIZED_MESSAGE } from "../../../../../../core/api-transform/offers";

const FormItem = Form.Item;
const { TextArea } = Input;

const MessageFormItem = ({ intl, personalizedMessage, getFieldDecorator }) => (
  <FormItem
    colon={false}
    label={translate(intl, "offerSettings.messageToClient")}
    className="offer-settings__message"
  >
    {getFieldDecorator(PERSONALIZED_MESSAGE, {
      initialValue: personalizedMessage,
      rules: [
        {
          required: true,
          message: translate(intl, "error.personalizedMessageIsRequired")
        }
      ]
    })(<TextArea maxLength={AGENT_PERSONAL_MESSAGE_LIMIT} />)}
    <div className="chars">
      {translate(intl, "offerSettings.characters", {
        number: AGENT_PERSONAL_MESSAGE_LIMIT
      })}
    </div>
  </FormItem>
);

MessageFormItem.propTypes = {
  intl: intlShape.isRequired,
  personalizedMessage: PropTypes.string,
  getFieldDecorator: PropTypes.any
};

export default MessageFormItem;
