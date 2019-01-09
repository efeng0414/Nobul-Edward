import React, { PureComponent } from "react";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import { translate } from "../../utilities/locale";
import { PROOF_IMAGES } from "../../utilities/images";
import { textKeys, renderProofImage } from "./utilities";
import "./styles.scss";

@injectIntl
class ProofBanner extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    isMobile: PropTypes.bool
  };

  static defaultProps = {
    isMobile: false
  };

  @bound
  renderTextItem(key) {
    return (
      <p className="proof-banner__text-item" key={key}>
        {translate(this.props.intl, key)}
      </p>
    );
  }

  render() {
    return (
      <div className="proof-banner">
        <div className="proof-banner__inner">
          {!this.props.isMobile && (
            <h5 className="proof-banner__text">
              {textKeys.map(this.renderTextItem)}
            </h5>
          )}
          <div className="proof-banner__logos">
            {PROOF_IMAGES.map(renderProofImage)}
          </div>
        </div>
      </div>
    );
  }
}

export default ProofBanner;
