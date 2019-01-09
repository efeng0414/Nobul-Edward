import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Form, Button } from "antd";
import { intlShape } from "react-intl";

import {
  SERVICES_GROUPS,
  SERVICES_ACCORDION
} from "../../../utilities/constants";
import Services from "../../../components/services";
import NobulTip from "../../../components/nobul-tip";
import { translate } from "../../../utilities/locale";
import { BUY, SELL } from "../../../../core/constants/shared";
import * as Routes from "../../../routes/routes";

import "../styles.scss";
import { bound } from "class-bind";
import { createObjectFromArray } from "../../../../core/utilities/array-to-object";
import { MOBILE } from "../../../../core/constants/breakpoints";

class Step3 extends PureComponent {
  state = {
    servicesForBuyers: [],
    servicesForSellers: [],
    maxSteps: this.props.agentType.length
  };

  static propTypes = {
    intl: intlShape.isRequired,
    onChange: PropTypes.func,
    goPreviousStep: PropTypes.func.isRequired,
    goNextStep: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
    selectedServices: PropTypes.object,
    services: PropTypes.object,
    agentType: PropTypes.array,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    currentBreakPoint: PropTypes.string
  };

  @bound
  handleClickBuyService(service) {
    this.props.onChange({ [BUY]: createObjectFromArray(service) });
  }

  @bound
  handleClickSellService(service) {
    this.props.onChange({ [SELL]: createObjectFromArray(service) });
  }

  goToStage(stage) {
    this.props.history.push(
      Routes.url.standardProposalFlow
        .replace(":step?", this.props.match.params.step)
        .replace(":stage?", stage)
    );
  }

  getCurrentStage({ useMaxAsDefault }) {
    const current = parseInt(this.props.match.params.stage);
    return !isNaN(current)
      ? current
      : useMaxAsDefault
        ? this.state.maxSteps
        : 1;
  }

  @bound
  goNextStep() {
    const thisStage = this.getCurrentStage({ useMaxAsDefault: false });
    if (thisStage >= this.state.maxSteps) {
      this.props.goNextStep();
    } else {
      this.goToStage(thisStage + 1);
    }
  }

  @bound
  goPreviousStep() {
    const thisStage = this.getCurrentStage({ useMaxAsDefault: true });

    if (thisStage === 1 || this.props.match.params.stage === undefined) {
      this.props.goPreviousStep(); // second step of location
    } else {
      this.goToStage(thisStage - 1);
    }
  }

  @bound
  buyServices() {
    return (
      <div className="standard-proposal-step-container">
        <h1>{translate(this.props.intl, "proposal.buyerServices")}</h1>
        <h4>{translate(this.props.intl, "proposal.selectAll")}</h4>
        <Services
          selectedServices={this.props.services[BUY]}
          serviceType={BUY}
          intl={this.props.intl}
          onServiceClick={this.handleClickBuyService}
          layout={
            this.props.currentBreakPoint === MOBILE
              ? SERVICES_ACCORDION
              : SERVICES_GROUPS
          }
        />
        <NobulTip
          message={translate(this.props.intl, "toolTipTitle")}
          description={translate(
            this.props.intl,
            "proposal.buyerServicesTooltip"
          )}
          visible={true}
        />
      </div>
    );
  }

  @bound
  sellServices() {
    return (
      <div className="standard-proposal-step-container">
        <h1>{translate(this.props.intl, "proposal.sellerServices")}</h1>
        <h4>{translate(this.props.intl, "proposal.selectAll")}</h4>
        <Services
          selectedServices={this.props.services[SELL]}
          serviceType={SELL}
          intl={this.props.intl}
          onServiceClick={this.handleClickSellService}
          layout={
            this.props.currentBreakPoint === MOBILE
              ? SERVICES_ACCORDION
              : SERVICES_GROUPS
          }
        />
        <NobulTip
          message={translate(this.props.intl, "toolTipTitle")}
          description={translate(
            this.props.intl,
            "proposal.sellerServicesTooltip"
          )}
          visible={true}
        />
      </div>
    );
  }

  render() {
    const thisStage = this.getCurrentStage({ useMaxAsDefault: false });
    const checkboxesType = this.props.agentType[thisStage - 1];
    const buttonSize =
      this.props.currentBreakPoint === MOBILE ? "large" : undefined;

    return (
      <div className="standard-proposal-step">
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {checkboxesType === BUY && this.buyServices()}
          {checkboxesType === SELL && this.sellServices()}

          <div className="standard-proposal-navigation">
            <Button
              size={buttonSize}
              onClick={this.props.onCancel}
              className="standard-proposal-cancel"
            >
              {translate(this.props.intl, "button.cancel")}
            </Button>
            <Button
              size={buttonSize}
              onClick={this.goPreviousStep}
              type="white"
            >
              {translate(this.props.intl, "button.back")}
            </Button>
            <Button type="primary" size="large" onClick={this.goNextStep}>
              {translate(this.props.intl, "button.next")}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(withRouter(Step3));
