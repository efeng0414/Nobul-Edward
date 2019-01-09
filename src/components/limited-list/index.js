import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import { LIMITED_LIST_DEFAULT_ELEMS } from "../../utilities/constants";
import "./styles.scss";

class LimitedList extends PureComponent {
  state = {
    showAll: false
  };

  @bound
  toggleShowAll(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ showAll: !this.state.showAll });
  }

  @bound
  renderListItem(dataElem, index) {
    let item = null;
    if (this.state.showAll || index < this.props.showMaximum) {
      item = (
        <li key={index} className="limited-list__item">
          {this.props.datakey ? dataElem[this.props.datakey] : dataElem}
        </li>
      );
    } else if (index === this.props.showMaximum) {
      const remaining = Object.keys(this.props.data).length - index;
      item = (
        <li key={index}>
          <button onClick={this.toggleShowAll} className="limited-list__button">
            {remaining} {translate(this.props.intl, "more")}
          </button>
        </li>
      );
    }

    return item;
  }

  render() {
    return (
      <div className="limited-list">
        <ul className="limited-list__list">
          {this.props.data.map(this.renderListItem)}
        </ul>
        {this.state.showAll && (
          <button onClick={this.toggleShowAll} className="limited-list__button">
            {translate(this.props.intl, "button.hide")}
          </button>
        )}
      </div>
    );
  }
}

LimitedList.propTypes = {
  data: PropTypes.array.isRequired,
  intl: PropTypes.any.isRequired,
  datakey: PropTypes.string,
  showMaximum: PropTypes.number
};

LimitedList.defaultProps = {
  datakey: "",
  showMaximum: LIMITED_LIST_DEFAULT_ELEMS
};

export default LimitedList;
