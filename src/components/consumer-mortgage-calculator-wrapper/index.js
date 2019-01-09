import React, { Component } from "react";
import { intlShape } from "react-intl";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import { bound } from "class-bind";

import { TABLET, MOBILE } from "../../../core/constants/breakpoints";
import Devices from "../../components/breakpoints/devices";
import Desktop from "../../components/breakpoints/desktop";
import BoxCollapsible from "../../components/box-collapsible";
import ConsumerMortgageCalculator from "../../components/consumer-mortgage-calculator";

class ConsumerMortgageCalculatorWrapper extends Component {
  state = {
    displayMortgageCalculator: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    mortgageDefaultInput: PropTypes.number
  };

  @bound
  toggleDisplayMortgageCalculator() {
    this.setState({
      displayMortgageCalculator: !this.state.displayMortgageCalculator
    });
  }

  render() {
    return (
      <div>
        <Desktop>
          <BoxCollapsible className="box-collapsible--calculator">
            <ConsumerMortgageCalculator
              intl={this.props.intl}
              defaultValue={this.props.mortgageDefaultInput}
            />
          </BoxCollapsible>
        </Desktop>

        <Devices sizes={[MOBILE, TABLET]}>
          <div className="box-modal-calculator">
            <Button onClick={this.toggleDisplayMortgageCalculator} />
            <Modal
              visible={this.state.displayMortgageCalculator}
              footer={null}
              onCancel={this.toggleDisplayMortgageCalculator}
              className="mortgage-calculator-modal"
            >
              <ConsumerMortgageCalculator
                intl={this.props.intl}
                defaultValue={this.props.mortgageDefaultInput}
              />
            </Modal>
          </div>
        </Devices>
      </div>
    );
  }
}

export default ConsumerMortgageCalculatorWrapper;
