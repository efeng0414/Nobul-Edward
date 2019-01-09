import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import { Card, Button } from "antd";
import { bound } from "../../../node_modules/class-bind";

import {
  AGENT_NAME,
  CLIENT_NAME,
  COUNTRY,
  REGION,
  ENVELOPE_ID,
  TYPE
} from "../../../core/api-transform/contracts";
import {
  CONTRACTS_TYPE_COMPLETED,
  CONTRACTS_TYPE_ACTION_REQUIRED
} from "../../../core/constants/contracts";
import { CONSUMER_USER_TYPE } from "../../../core/constants/users";
import { BUY } from "../../../core/constants/shared";

import ContractIcon from "../../assets/images/contract_icon.svg";
import CompletedIcon from "../../assets/images/contract_completed.svg";
import ActionRequiredIcon from "../../assets/images/contract_action_required.svg";
import InProgressIcon from "../../assets/images/contract_in_progress.svg";
import "./styles.scss";

class ContractsItem extends PureComponent {
  @bound
  getActionAndButton({ contractType }) {
    const { intl } = this.props;
    let action = "";
    let button = "";
    let icon = "";

    switch (contractType) {
      case CONTRACTS_TYPE_ACTION_REQUIRED:
        action = translate(intl, "agreements.needToSign");
        button = translate(intl, "button.addSignature");
        icon = ActionRequiredIcon;
        break;
      case CONTRACTS_TYPE_COMPLETED:
        action = translate(intl, "agreements.completed");
        button = translate(intl, "button.view");
        icon = CompletedIcon;
        break;
      default:
        action = translate(intl, "agreements.waiting");
        button = translate(intl, "button.view");
        icon = InProgressIcon;
        break;
    }

    return { action, button, icon };
  }

  @bound
  handleClick() {
    this.props.buttonClickHandle({
      envelopeId: this.props.agreement[ENVELOPE_ID],
      contractType: this.props.contractType
    });
  }

  render() {
    const { intl } = this.props;

    const action = this.getActionAndButton({
      contractType: this.props.contractType
    });

    return (
      <Card bordered={false} className="contract-item">
        <img src={ContractIcon} alt={translate(intl, "agreements.alt")} />
        <div className="contract-item__text">
          <p>
            {this.props.agreement[TYPE] === BUY
              ? translate(intl, "agreements.buyerRepresentation")
              : translate(intl, "agreements.listingRepresentation")}
          </p>
          <p>{translate(intl, "agreements.documents")}</p>
        </div>
        <div className="contract-item__table">
          <div className="contract-item__table__item">
            <p>{translate(intl, "province")} :</p>
            <p>
              <span>{this.props.agreement[REGION]},</span>
              <span>{this.props.agreement[COUNTRY]}</span>
            </p>
          </div>
          {this.props.userType === CONSUMER_USER_TYPE ? (
            <div className="contract-item__table__item">
              <p>{translate(intl, "agreements.agent")} :</p>
              <p>
                <span>{this.props.agreement[AGENT_NAME]}</span>
              </p>
            </div>
          ) : (
            <div className="contract-item__table__item">
              <p>{translate(intl, "agreements.client")} :</p>
              <p>
                <span>{this.props.agreement[CLIENT_NAME]}</span>
              </p>
            </div>
          )}
        </div>
        <div className="contract-item__action">
          <p>
            <img src={action.icon} alt={translate(intl, "agreements.alt")} />
            <span>{action.action}</span>
          </p>
        </div>
        {this.props.buttonClickHandle && (
          <Button
            className="contract-item__button"
            type="primary"
            onClick={this.handleClick}
          >
            {action.button}
          </Button>
        )}
      </Card>
    );
  }
}

ContractsItem.propTypes = {
  intl: intlShape.isRequired,
  agreement: PropTypes.object.isRequired,
  contractType: PropTypes.string.isRequired,
  buttonClickHandle: PropTypes.func,
  userType: PropTypes.string.isRequired
};

export default ContractsItem;
