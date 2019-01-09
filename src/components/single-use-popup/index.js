import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { Modal, Button } from "antd";
import { checkForCached, cacheItem } from "../../utilities/cache-handler";
import "./styles.scss";
/*
 * Show a modal only once.
 * Sets a a cookie when the user dismisses it.
 **/
class SingleUsePopup extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    name: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
  };

  state = {
    shown: true
  };

  @bound
  closeModal() {
    cacheItem(this.props.name, "true");
    this.setState({ shown: false });
  }

  render() {
    return (
      !checkForCached(this.props.name) && (
        <Modal
          title={this.props.title}
          visible={this.state.shown}
          footer={null}
          closable={false}
          className="single-popup"
        >
          {this.props.children}
          <Button type="primary" onClick={this.closeModal}>
            {this.props.buttonText}
          </Button>
        </Modal>
      )
    );
  }
}

export default SingleUsePopup;
