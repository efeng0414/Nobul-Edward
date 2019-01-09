import React, { PureComponent } from "react";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import NobulImage from "../../assets/images/nobul_1_white.png";

import "./styles.scss";

class NobulAdvantagesCard extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired
  };

  @bound
  listContent(_, index) {
    return (
      <li key={index}>
        {translate(this.props.intl, `advantages-${index + 1}`)}
      </li>
    );
  }

  render() {
    return (
      <div className="nobul-advantages">
        <section className="nobul-advantages__header">
          <img
            src={NobulImage}
            alt={"nobul logo"}
            className={"nobul-advantages__image"}
          />
        </section>
        <section className="nobul-advantages__body">
          <ul className="nobul-advantages__list">
            {Array.apply(null, Array(6)).map(this.listContent)}
          </ul>
        </section>
      </div>
    );
  }
}

export default NobulAdvantagesCard;
