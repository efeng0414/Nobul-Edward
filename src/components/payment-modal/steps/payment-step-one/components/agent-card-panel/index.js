import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "antd";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import { translate } from "../../../../../../utilities/locale";
import { SELECT_CARD } from "../../../../../../utilities/constants";

import "./styles.scss";

class AgentCardPanel extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    userId: PropTypes.string.isRequired,
    nodeId: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
    lastFourDigits: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    nextStep: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    transactionNeeded: PropTypes.bool
  };

  static defaultProps = {
    transactionNeeded: true,
    userId: "",
    nodeId: "",
    cardType: "",
    lastFourDigits: "",
    expiryDate: "",
    deleteCard: () => {},
    nextStep: () => {}
  };

  state = {
    selected: false
  };

  @bound
  handleCreditCardSelect() {
    this.props.transactionNeeded &&
      this.setState({
        selected: !this.state.selected
      });
  }

  @bound
  clickDelete() {
    this.props.deleteCard({ nodeId: this.props.nodeId });
  }

  @bound
  handleNextClick() {
    this.props.nextStep({ source: SELECT_CARD });
  }

  render() {
    return (
      <div>
        {this.props.transactionNeeded && (
          <p className="card-list__title">
            {translate(this.props.intl, "offer.selectCardTitle")}
          </p>
        )}
        <div className="card-list">
          <div
            className="card-list__item"
            onClick={this.handleCreditCardSelect}
            style={{ backgroundColor: this.state.selected ? "#f1f1f1" : null }}
          >
            <div className="card-list__brand">{this.props.cardType}</div>
            <div className="card-list__digits">
              <p>
                <span className="card-list__hidden-digits">
                  &#9899; &#9899; &#9899; &#9899;
                </span>
                {this.props.lastFourDigits}
              </p>
            </div>
          </div>
          <div>
            <button className="card-list__button" onClick={this.clickDelete}>
              <Icon className="card-list_icon" type="delete" />
            </button>
          </div>
        </div>
        {this.state.selected && (
          <Button onClick={this.handleNextClick} className="card-list__next">
            {translate(this.props.intl, "button.next")}
          </Button>
        )}
      </div>
    );
  }
}

export default injectIntl(AgentCardPanel);
