import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import { PROPERTY_FEATURES_IMAGES } from "../../utilities/property-data-web";
import "./styles.scss";

class PropertyFeaturesIconList extends PureComponent {
  state = {
    showAll: !this.props.showMaximum
  };

  @bound
  showAll(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ showAll: true });
  }

  @bound
  renderListItem(key, index) {
    let item = null;
    if (this.state.showAll || index < this.props.showMaximum) {
      item = (
        <img
          key={index}
          src={PROPERTY_FEATURES_IMAGES[key]}
          alt={translate(this.props.intl, key)}
        />
      );
    } else if (index === this.props.showMaximum) {
      const remaining = Object.keys(this.props.propertyFeatures).length - index;
      item = (
        <button key={"button"} onClick={this.showAll}>
          + {remaining}
        </button>
      );
    }

    return item;
  }

  render() {
    return (
      <div className="property-features-icon-list">
        {Object.keys(this.props.propertyFeatures).map(this.renderListItem)}
      </div>
    );
  }
}

PropertyFeaturesIconList.propTypes = {
  propertyFeatures: PropTypes.object,
  intl: PropTypes.any.isRequired,
  showMaximum: PropTypes.number
};

PropertyFeaturesIconList.defaultProps = {
  propertyFeatures: {}
};

export default PropertyFeaturesIconList;
