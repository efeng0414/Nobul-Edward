import React, { Component } from "react";
import PropTypes from "prop-types";
import HeartIcon from "react-icons/lib/fa/heart-o";
import "./styles.scss";

class ConsumerFavoriteOffer extends Component {
  state = {
    active: false
  };

  clickHandle = e => {
    e.stopPropagation();
    let { active } = this.state;
    this.setState({
      active: !active
    });
    this.props.handleFavoriteStatus(!active);
  };

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      active: isFavorite
    });
  }

  componentDidUpdate(prevProps) {
    const { isFavorite } = this.props;
    if (prevProps.isFavorite === isFavorite) {
      return;
    }

    this.setState({
      active: isFavorite
    });
  }

  render() {
    const { active } = this.state;
    const { showFavoriteIcon } = this.props;

    return (
      <div className="favorite-icon">
        {showFavoriteIcon && (
          <HeartIcon
            size={20}
            className={active ? "red-heart" : "blue-heart"}
            onClick={e => this.clickHandle(e)}
          />
        )}
      </div>
    );
  }
}

ConsumerFavoriteOffer.propTypes = {
  isFavorite: PropTypes.bool,
  intl: PropTypes.any,
  handleFavoriteStatus: PropTypes.func,
  showFavoriteIcon: PropTypes.bool
};

ConsumerFavoriteOffer.defaultProps = {
  isFavorite: false,
  handleFavoriteStatus: () => {},
  showFavoriteIcon: false
};

export default ConsumerFavoriteOffer;
