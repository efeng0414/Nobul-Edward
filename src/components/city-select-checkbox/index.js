import React, { PureComponent } from "react";
import { Checkbox } from "antd";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";

import "./styles.scss";

@injectIntl
class CitySelectCheckbox extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    onClick: PropTypes.func,
    isChecked: PropTypes.bool
  };

  static defaultProps = {
    isChecked: false
  };

  render() {
    return (
      <label className="city-select-checkbox">
        <Checkbox onClick={this.props.onClick} checked={this.props.isChecked} />
        <span>{translate(this.props.intl, "selectToronto")}</span>
      </label>
    );
  }
}

export default CitySelectCheckbox;
