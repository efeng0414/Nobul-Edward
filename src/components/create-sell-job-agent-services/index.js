import React from "react";
import { Slider, Row, Button, Collapse } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";

import Services from "../../components/services";
import { translate } from "../../utilities/locale";

const Panel = Collapse.Panel;

const CreateSellJobAgentServices = props => {
  const { intl } = props;

  return (
    <div>
      <Collapse accordion>
        <Panel header={translate(intl, "selectServicesRange")} key="range">
          <Slider
            style={{ width: "80%", margin: "30px 10%" }}
            min={1}
            max={5}
            dots={true}
            marks={{
              1: translate(intl, "maxCashback"),
              5: translate(intl, "maxServices")
            }}
            defaultValue={3}
            onChange={props.onServicesRangeChange}
          />
        </Panel>

        <Panel header={translate(intl, "selectExactServices")} key="exact">
          <Row>
            <Services
              serviceType="sell"
              onServiceClick={props.onServicesChange}
            />
          </Row>
        </Panel>
      </Collapse>
      <Button onClick={props.onSaveDraft}>
        {translate(intl, "saveDraft")}
      </Button>
      <Button type="primary" onClick={props.onSaveJob}>
        {translate(intl, "button.submit")}
      </Button>
    </div>
  );
};

CreateSellJobAgentServices.propTypes = {
  intl: intlShape.isRequired,
  onServicesRangeChange: PropTypes.func,
  onServicesChange: PropTypes.func,
  onSaveDraft: PropTypes.func,
  onSaveJob: PropTypes.func
};

export default injectIntl(CreateSellJobAgentServices);
