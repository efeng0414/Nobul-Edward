import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../../utilities/locale";
import NobulAdvantagesCard from "../../../components/nobul-advantages-card";
import CompetitorsCard from "../../../components/competitors-card";

import "./styles.scss";

@injectIntl
class HowNobulIsDifferent extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { intl } = this.props;

    return (
      <div className="nobul-different">
        <div className="nobul-different__wrapper">
          <div className="nobul-different__header">
            <h1>{translate(intl, "home-page.howNobulIsDifferent")}</h1>
          </div>
          <section className="nobul-different__content">
            <div className="nobul-different__card nobul-different__card--nobul">
              <NobulAdvantagesCard intl={intl} />
            </div>
            <div className="nobul-different__card nobul-different__card--others">
              <CompetitorsCard intl={intl} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default HowNobulIsDifferent;
