import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import { translate } from "../../../../utilities/locale";

const { Item: FormItem } = Form;

const ButtonGroupFormItem = ({ formHasSubmitted, intl, signUpUser }) => (
  <div className="consumer-registration-button-group">
    <FormItem>
      <Button
        className="consumer-registration-button-item button-next"
        type="primary"
        size="large"
        htmlType="submit"
        onClick={signUpUser}
        disabled={formHasSubmitted}
      >
        {formHasSubmitted
          ? translate(intl, "button.submitted")
          : translate(intl, "button.signUp")}
      </Button>
    </FormItem>
  </div>
);

ButtonGroupFormItem.propTypes = {
  formHasSubmitted: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired
};

export default ButtonGroupFormItem;
