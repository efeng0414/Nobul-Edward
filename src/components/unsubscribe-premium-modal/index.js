import React, { PureComponent } from "react";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import { Modal, Button, Row, Col } from "antd";
import "./styles.scss";

class UnsubscribePremiumModal extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    unsubscribeFromStripePlanAsync: PropTypes.func,
    userId: PropTypes.string,
    subscriptionId: PropTypes.string,
    visibility: PropTypes.bool,
    toggleVisibility: PropTypes.func,
    isPremium: PropTypes.bool
  };

  static defaultProps = {
    isPremium: false
  };

  state = {
    currentStep: 1
  };

  @bound
  handleUnsubscribe() {
    this.setState({
      currentStep: 2
    });
    this.props.unsubscribeFromStripePlanAsync(
      this.props.userId,
      this.props.subscriptionId
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isPremium !== prevProps.isPremium &&
      this.props.isPremium === true
    )
      this.setState({ currentStep: 1 });
  }

  render() {
    return (
      <Modal
        className="unsubscribe"
        title={translate(
          this.props.intl,
          "subscriptionSettings.unsubscribePremiumAccount"
        )}
        visible={this.props.visibility}
        onCancel={this.props.toggleVisibility}
        footer={[null, null]}
      >
        {this.state.currentStep === 1 && (
          <div>
            <p className="unsubscribe-text">
              {translate(
                this.props.intl,
                "subscriptionSettings.unsubscribePremiumAccountWarning"
              )}
            </p>
            <div className="unsubscribe-footer">
              <Row>
                <Col span={6}>
                  <Button onClick={this.handleUnsubscribe}>
                    {translate(
                      this.props.intl,
                      "subscriptionSettings.unsubscribePremiumAccountYes"
                    )}
                  </Button>
                </Col>
                <Col span={6}>
                  <Button onClick={this.props.toggleVisibility}>
                    {translate(
                      this.props.intl,
                      "subscriptionSettings.unsubscribePremiumAccountNo"
                    )}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        )}
        {this.state.currentStep === 2 && (
          <div>
            <p className="unsubscribe-text">
              {translate(
                this.props.intl,
                "subscriptionSettings.unsubscribePremiumAccountComplete"
              )}
            </p>
            <div className="unsubscribe-footer">
              <Row>
                <Col span={12}>
                  <Button onClick={this.props.toggleVisibility}>
                    {translate(this.props.intl, "button.done")}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Modal>
    );
  }
}

export default injectIntl(UnsubscribePremiumModal);
