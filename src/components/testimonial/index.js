import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";

import "./styles.scss";

class Testimonial extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    qualification: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="testimonial">
        <div className="testimonial__top">
          <div className="testimonial__image">
            <Avatar size={110} src={this.props.image} />
          </div>
          <div className="testimonial__title">
            <b className="testimonial__header">{this.props.title}</b>
            <div className="testimonial__qualification">
              {this.props.qualification}
            </div>
          </div>
        </div>
        <p className="testimonial__description">{this.props.description}</p>
      </div>
    );
  }
}

export default Testimonial;
