import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "antd";
import { translate } from "../../../utilities/locale";
import AgentServices from "../agent-services";

const RadioGroup = Radio.Group;

export const DidAgentDeliverSwitch = ({ onChange, labelText, intl }) => (
  <Form.Item>
    <label className="block">{labelText}</label>
    <AgentServices intl={intl} />
    <RadioGroup onChange={onChange}>
      <Radio value={true}>{translate(intl, "rateAgents.yes")}</Radio>
      <Radio value={false}>{translate(intl, "rateAgents.no")}</Radio>
    </RadioGroup>
  </Form.Item>
);

DidAgentDeliverSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

export default DidAgentDeliverSwitch;
