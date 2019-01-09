import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import Desktop from "../../components/breakpoints/desktop";

import "./styles.scss";

@injectIntl
class HoverPolygonMessage extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    hoveredPolygonName: PropTypes.string,
    isPolygonSelected: PropTypes.bool,
    showHoveredPolygon: PropTypes.bool
  };

  render() {
    return (
      <div>
        {this.props.showHoveredPolygon && (
          <Desktop>
            <span className="hover-polygon__message">
              (
              {this.props.isPolygonSelected
                ? translate(this.props.intl, "createJob.clickToRemove")
                : translate(this.props.intl, "createJob.clickToAdd")}
              <span className="hover-polygon__name">
                {`"${this.props.hoveredPolygonName}"`}
              </span>
              )
            </span>
          </Desktop>
        )}
      </div>
    );
  }
}

export default HoverPolygonMessage;
