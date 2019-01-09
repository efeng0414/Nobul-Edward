import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Breadcrumb } from "antd";
import { intlShape } from "react-intl";
import { translate } from "../../../utilities/locale";
import ContractsList from "../../../components/contracts-list";
import MyDashboardMeta from "../../../components/my-dashboard-meta";
import "./styles.scss";

class ActionRequiredScreen extends PureComponent {
  render() {
    return (
      <div className="contract-screens">
        <MyDashboardMeta titleKey="helmet.myDashboard.contract.actionRequired" />
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            {translate(this.props.intl, "agreements.contracts")}
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {translate(this.props.intl, "agreements.actionRequired")}
          </Breadcrumb.Item>
        </Breadcrumb>
        <h6>{translate(this.props.intl, "agreements.documents")}</h6>
        <ContractsList
          intl={this.props.intl}
          agreements={this.props.agreements}
          contractType={this.props.contractType}
          buttonClickHandle={this.props.buttonClickHandle}
          userType={this.props.userType}
        />
      </div>
    );
  }
}

ActionRequiredScreen.propTypes = {
  intl: intlShape.isRequired,
  buyContracts: PropTypes.object,
  sellContracts: PropTypes.object,
  clickAddSignature: PropTypes.func,
  agreements: PropTypes.object.isRequired,
  contractType: PropTypes.string.isRequired,
  buttonClickHandle: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired
};

export default ActionRequiredScreen;
