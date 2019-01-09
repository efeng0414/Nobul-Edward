import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";

import "./styles.scss";

class CompetitorsCard extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  @bound
  listContent(_, index) {
    return (
      <li key={index}>
        {translate(this.props.intl, `competitors-${index + 1}`)}
      </li>
    );
  }

  render() {
    return (
      <div className="nobul-competitors">
        <section className="nobul-competitors__header">
          <h2 className="nobul-competitors__header">
            {translate(this.props.intl, "home-page.otherRealEstatePlatforms")}
          </h2>
        </section>
        <section className="nobul-competitors__body">
          <ul className="nobul-competitors__list">
            {Array.apply(null, Array(6)).map(this.listContent)}
          </ul>
        </section>
      </div>
    );
  }
}

export default CompetitorsCard;
