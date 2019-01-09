import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "../../../node_modules/class-bind";
import * as Routes from "../../routes/myNobul";

import ActivityIndicator from "../../components/activity-indicator";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import {
  CONTRACTS_STATUS_SENT,
  CONTRACTS_STATUS_DELIVERED,
  ENVELOPE_STATUS_COMPLETED,
  CONTRACTS_TYPE_COMPLETED,
  CONTRACTS_TYPE_ACTION_REQUIRED,
  CONTRACTS_TYPE_WAITING
} from "../../../core/constants/contracts";
import { STATUS, ENVELOPE_STATUS } from "../../../core/api-transform/contracts";
import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME
} from "../../../core/api-transform/users";
import { filterByMultipleValues } from "../../../core/utilities/filter-data";
// Get screens
import GenerateContractScreen from "../generate-contract";
import ActionRequiredScreen from "./screens/actionRequired";
import CompletedContractsScreen from "./screens/completedContracts";
import WaitingScreen from "./screens/waiting";

import { AGENT_USER_TYPE } from "../../../core/constants/users";
import { contractPaths } from "../../routes/myNobul";

class Contracts extends Component {
  state = {
    loadingData: true
  };

  @bound
  filterAgreements({ agreements, statusArray, objectKey }) {
    if (!agreements) return {};
    return Object.entries(agreements)
      .filter(([key, value]) => !statusArray.includes(value[objectKey]))
      .reduce((agreement, [key, value]) => {
        return {
          ...agreement,
          [key]: value
        };
      }, {});
  }

  @bound
  getWaitingForOthersAgreements(completedStatus, actionRequiredStatus) {
    const unCompletedAgreements = this.filterAgreements({
      agreements: this.props.agreements,
      statusArray: completedStatus,
      objectKey: ENVELOPE_STATUS
    });

    return this.filterAgreements({
      agreements: unCompletedAgreements,
      statusArray: actionRequiredStatus,
      objectKey: STATUS
    });
  }

  @bound
  buttonClickHandle({ envelopeId, contractType }) {
    let directTo;

    switch (contractType) {
      case CONTRACTS_TYPE_ACTION_REQUIRED:
        this.props.getUsersAgreementStatusesAsync({
          userId: this.props.currentUser.uid,
          userType: `${this.props.userType}s`
        });
        if (this.props.userType === AGENT_USER_TYPE) {
          directTo = contractPaths.completed;
        } else {
          directTo = contractPaths.waitingForOthers;
        }
        break;
      case CONTRACTS_TYPE_COMPLETED:
        directTo = contractPaths.completed;
        break;
      default:
        directTo = contractPaths.actionRequired;
        break;
    }

    const agreementData = {
      name: `${this.props.userProfile[FIRST_NAME]} ${
        this.props.userProfile[LAST_NAME]
      }`,
      email: this.props.currentUser[EMAIL],
      userId: this.props.currentUser.uid,
      envelopeId,
      directTo
    };

    this.props.viewAgreementAsync({ agreementData }).then(() => {
      window.open(this.props.agreementURL, "_self");
    });
  }

  componentDidMount() {
    this.props
      .getUsersAgreementStatusesAsync({
        userId: this.props.currentUser.uid,
        userType: `${this.props.userType}s`
      })
      .then(() => {
        this.setState({ loadingData: false });
      });
  }

  render() {
    const { intl } = this.props;
    const screenPath = this.props.match.params.path;
    let Component = null;

    const actionRequiredStatus = [
      CONTRACTS_STATUS_SENT,
      CONTRACTS_STATUS_DELIVERED
    ];
    const completedStatus = [ENVELOPE_STATUS_COMPLETED];

    switch (screenPath) {
      case Routes.contractPaths.completed:
        Component = (
          <CompletedContractsScreen
            intl={this.props.intl}
            agreements={filterByMultipleValues({
              filterValues: completedStatus,
              entities: this.props.agreements,
              databaseKey: ENVELOPE_STATUS
            })}
            contractType={CONTRACTS_TYPE_COMPLETED}
            buttonClickHandle={this.buttonClickHandle}
            userType={this.props.userType}
          />
        );
        break;
      case Routes.contractPaths.waitingForOthers:
        Component = (
          <WaitingScreen
            intl={this.props.intl}
            agreements={this.getWaitingForOthersAgreements(
              completedStatus,
              actionRequiredStatus
            )}
            contractType={CONTRACTS_TYPE_WAITING}
            buttonClickHandle={this.buttonClickHandle}
            userType={this.props.userType}
          />
        );
        break;
      case Routes.contractPaths.actionRequired:
        Component = (
          <ActionRequiredScreen
            intl={this.props.intl}
            agreements={filterByMultipleValues({
              filterValues: actionRequiredStatus,
              entities: this.props.agreements,
              databaseKey: STATUS
            })}
            contractType={CONTRACTS_TYPE_ACTION_REQUIRED}
            buttonClickHandle={this.buttonClickHandle}
            userType={this.props.userType}
          />
        );
        break;
      case Routes.contractPaths.generate:
        Component = <GenerateContractScreen />;
        break;
    }
    return (
      <ActivityIndicator
        spinning={
          this.props.isLoading ||
          this.props.agreementIsLoading ||
          this.state.loadingData
        }
        type="loading"
      >
        <MyDashboardMeta titleKey="helmet.myDashboard.contracts" />
        {Component}
      </ActivityIndicator>
    );
  }
}

Contracts.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
  currentUser: PropTypes.object,
  userProfile: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired,
  agreements: PropTypes.object.isRequired,
  getUsersAgreementStatusesAsync: PropTypes.func.isRequired,
  viewAgreementAsync: PropTypes.func.isRequired,
  agreementURL: PropTypes.any,
  isLoading: PropTypes.bool,
  agreementIsLoading: PropTypes.bool
};

export default injectIntl(Contracts);
