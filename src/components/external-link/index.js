import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";

import { translate } from "../../utilities/locale";

@injectIntl
class ExternalLink extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    href: PropTypes.string.isRequired,
    link: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    imageLink: PropTypes.bool
  };

  static defaultProps = {
    link: "",
    src: "",
    alt: "",
    imageLink: false
  };

  render() {
    return (
      <a href={this.props.href} target="_blank" rel="noopener noreferrer">
        {this.props.imageLink ? (
          <img
            src={this.props.src}
            alt={translate(this.props.intl, this.props.alt)}
          />
        ) : (
          translate(this.props.intl, this.props.link)
        )}
      </a>
    );
  }
}

export default ExternalLink;
