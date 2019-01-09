import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./styles.scss";

class CharacterCounter extends PureComponent {
  static propTypes = {
    limit: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired
  };
  render() {
    return (
      <div className="character-counter">
        <p className="character-counter-text">
          {this.props.length} / {this.props.limit}
        </p>
      </div>
    );
  }
}

export default CharacterCounter;
