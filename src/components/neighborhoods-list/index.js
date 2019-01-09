import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import { Icon } from "antd";

import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import CloseIcon from "react-icons/lib/io/close-round";

import { bound } from "class-bind";

import "./styles.scss";

const MAX_NEIGHBORHOODS_SHOWN = 6; // Max shown before collapsing to dropdown.

class NeighborhoodsList extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    selectedPolygons: PropTypes.object,
    onRemoveRegion: PropTypes.func,
    title: PropTypes.string
  };

  state = {
    shown: false
  };

  @bound
  toggleCheckbox() {
    this.setState({ shown: !this.state.shown });
  }

  @bound
  getItemLayout(id) {
    return (
      <div key={id} className="neighborhood-list__item">
        <span>{this.props.selectedPolygons[id].name}</span>
        {this.props.onRemoveRegion && (
          <button
            value={id}
            onClick={this.props.onRemoveRegion}
            className="neighborhood-list__remove"
          >
            <CloseIcon size="14" />
          </button>
        )}
      </div>
    );
  }

  render() {
    const polygonCount = Object.keys(this.props.selectedPolygons).length;
    const showToggleInterface = polygonCount > MAX_NEIGHBORHOODS_SHOWN;
    const modifierClass =
      showToggleInterface && !this.state.shown
        ? "neighborhood-list__holder--hidden"
        : "neighborhood-list__holder--shown";

    return (
      <div className="neighborhood-list">
        {showToggleInterface && (
          <div className="neighborhood-list__toggle-holder">
            <button
              onClick={this.toggleCheckbox}
              aria-pressed={this.state.shown}
              title={translate(this.props.intl, "showNeighborhoods")}
              className="neighborhood-list__toggle"
            >
              {this.state.shown && <Icon type="minus" />}
              {!this.state.shown && <Icon type="plus" />}
              <span>{translate(this.props.intl, "showNeighborhoods")}</span>
            </button>
            <span className="neighborhood-list__toggle-text">
              {translate(this.props.intl, "selectedNeighborhoods", {
                count: polygonCount
              })}
            </span>
          </div>
        )}

        <div className={`neighborhood-list__holder ${modifierClass}`}>
          {Object.keys(this.props.selectedPolygons).map(this.getItemLayout)}
        </div>
      </div>
    );
  }
}

export default injectIntl(NeighborhoodsList);
