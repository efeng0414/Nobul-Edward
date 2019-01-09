import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

class FeatureComponent extends PureComponent {
  static propTypes = {
    featureImage: PropTypes.string.isRequired,
    stepImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="feature">
        <img
          src={this.props.featureImage}
          alt={this.props.title}
          className="feature__featureImage"
        />
        <img
          src={this.props.stepImage}
          alt={this.props.title}
          className="feature__stepImage"
        />
        <b className="feature__title">{this.props.title}</b>
        <p className="feature__description">{this.props.description}</p>
      </div>
    );
  }
}

export default FeatureComponent;
