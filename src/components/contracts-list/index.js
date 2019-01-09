import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import ContractsItem from "../contracts-item";

import "./styles.scss";

class ContractsList extends PureComponent {
  render() {
    return (
      <div className="contract-list">
        {Object.keys(this.props.agreements).map(agreementId => (
          <ContractsItem
            key={agreementId}
            agreement={this.props.agreements[agreementId]}
            intl={this.props.intl}
            contractType={this.props.contractType}
            buttonClickHandle={this.props.buttonClickHandle}
            userType={this.props.userType}
          />
        ))}
      </div>
    );
  }
}

ContractsList.propTypes = {
  intl: intlShape.isRequired,
  agreements: PropTypes.object.isRequired,
  contractType: PropTypes.string.isRequired,
  buttonClickHandle: PropTypes.func,
  userType: PropTypes.string.isRequired
};

export default ContractsList;
