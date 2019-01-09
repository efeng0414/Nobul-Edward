import React from "react";
import { Card, Button } from "antd";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";

import { translate } from "../../utilities/locale";
import { url } from "../../routes/myNobul";

import "./styles.scss";

const MarketingGetStarted = ({ intl }) => (
  <div className="marketing-get-started">
    <Card>
      <div className="marketing-get-started-title">
        {translate(intl, "offerDetail.whatIsNextTitle")}
      </div>
      <div className="marketing-get-started-steps">
        <ul>
          <li>{translate(intl, "offerDetail.whatIsNextStep1")}</li>
          <li>{translate(intl, "offerDetail.whatIsNextStep2")}</li>
          <li>{translate(intl, "offerDetail.whatIsNextStep3")}</li>
          <li>{translate(intl, "offerDetail.whatIsNextStep4")}</li>
          <ul>
            <li>{translate(intl, "offerDetail.whatIsNextStep4-1")}</li>
            <li>{translate(intl, "offerDetail.whatIsNextStep4-2")}</li>
          </ul>
          <li>{translate(intl, "offerDetail.whatIsNextStep5")}</li>
          <li>{translate(intl, "offerDetail.whatIsNextStep6")}</li>
        </ul>
        <div className="marketing-get-started-steps-note">
          {translate(intl, "offerDetail.clickBelow")}
        </div>
        <div className="marketing-get-started-steps-action">
          <Link to={url.contractGenerate}>
            <Button type="primary">
              {translate(intl, "offerDetail.getStarted")}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  </div>
);

MarketingGetStarted.propTypes = {
  intl: intlShape.isRequired
};

export default MarketingGetStarted;
