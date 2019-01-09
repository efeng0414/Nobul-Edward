import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import { WHITE_NOBUL_LOGO } from "../../utilities/images";
import "./styles.scss";

@injectIntl
class BlockEU extends Component {
  // TODO
  //Placeholder component... no UI is given yet
  render() {
    return (
      <div className="eu-container">
        <div className="eu-copy">
          <img
            src={WHITE_NOBUL_LOGO}
            alt={translate(this.props.intl, "home")}
          />
          <br />
          <br />
          <br />
          <h2>{translate(this.props.intl, "blockEU.copy1")}</h2>
          <br />
          <h2>{translate(this.props.intl, "blockEU.copy2")}</h2>
          <h2>
            {translate(this.props.intl, "blockEU.copy3")}
            <a href="https://www.corp.nobul.com">corp.nobul.com</a>
          </h2>
        </div>
      </div>
    );
  }
}

export default BlockEU;
