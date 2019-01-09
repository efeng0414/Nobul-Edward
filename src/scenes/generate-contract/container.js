import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { Tabs, Button, Card } from "antd";

import * as Routes from "../../routes/routes";
import { Link } from "react-router-dom";
import { translate } from "../../utilities/locale";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { BUY, SELL } from "../../../core/constants/shared";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { NO_CONTRACT_ICON } from "../../utilities/images";
import { renderOfferItemMap } from "./utilities";
import "./styles.scss";

class GenerateContractScreen extends PureComponent {
  componentDidMount() {
    if (this.props.currentUser.uid) {
      this.props.getAgentBuyOffersNeedingContracts({
        userId: this.props.currentUser.uid
      });

      this.props.getAgentSellOffersNeedingContracts({
        userId: this.props.currentUser.uid
      });
    }
  }

  renderTabs() {
    return (
      <div>
        <MyDashboardMeta titleKey="helmet.myDashboard.contract.generate" />
        <Tabs>
          <Tabs.TabPane
            tab={translate(this.props.intl, "buyerContracts")}
            key="1"
          >
            <div className="contracts-generate">
              {Object.values(this.props.buyOffers).map(renderOfferItemMap[BUY])}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={translate(this.props.intl, "sellerContracts")}
            key="2"
          >
            <div className="contracts-generate">
              {Object.values(this.props.sellOffers).map(
                renderOfferItemMap[SELL]
              )}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

  renderEmpty() {
    // TODO: Get proper content and image friom Vinutha
    return (
      <div className="contracts-generate-blank">
        <Card className="contracts-generate-blank-card">
          <img src={NO_CONTRACT_ICON} />
          <h3>{translate(this.props.intl, "contracts.noneHeader")}</h3>
          <p>{translate(this.props.intl, "contracts.noneParagraph1")}</p>
          <p>{translate(this.props.intl, "contracts.noneParagraph2")}</p>
          <Link to={Routes.url.marketPlace}>
            <Button type="primary">
              {translate(this.props.intl, "contracts.noneButton")}
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  render() {
    const hasOffers =
      !objectIsEmpty(this.props.buyOffers) ||
      !objectIsEmpty(this.props.sellOffers);

    return hasOffers ? this.renderTabs() : this.renderEmpty();
  }
}

GenerateContractScreen.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
  currentUser: PropTypes.object,
  buyOffers: PropTypes.object,
  sellOffers: PropTypes.object,
  getAgentBuyOffersNeedingContracts: PropTypes.func,
  getAgentSellOffersNeedingContracts: PropTypes.func
};

export default injectIntl(GenerateContractScreen);
