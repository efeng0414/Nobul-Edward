import React, { Component } from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";
import "./styles.scss";

import { bound } from "class-bind";

class NobulTip extends Component {
  state = {
    visible: this.props.visible
  };

  @bound
  close(e) {
    this.setState({ visible: false });
    e.preventDefault();
    e.stopPropagation();
  }

  @bound
  renderSentence(sentence) {
    return <p className="nobul-tip-message">{sentence}</p>;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible
      });
    }
  }

  render() {
    const visibleClass = this.state.visible
      ? "nobul-tip-visible"
      : "nobul-tip-closed";

    const isParagraph = typeof this.props.description !== "string";

    return this.props.visible ? (
      <div className={`nobul-tip ${visibleClass}`}>
        <div className="nobul-tip-inner">
          <button className="nobul-tip-close" onClick={this.close}>
            <Icon type="close" />
          </button>
          <div className="nobul-tip-icon-holder">
            <Icon type="exclamation" />
            <p>{this.props.message}</p>
          </div>
          {isParagraph ? (
            <div>{this.props.description.map(this.renderSentence)}</div>
          ) : (
            <p className="nobul-tip-message">{this.props.description}</p>
          )}
        </div>
      </div>
    ) : null;
  }
}

NobulTip.propTypes = {
  message: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  visible: PropTypes.bool.isRequired
};

export default NobulTip;
