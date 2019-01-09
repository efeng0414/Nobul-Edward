import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { connect } from "react-redux";
import LandingHeroVideo from "./landing-hero-video";
import FeatureComponent from "./feature-component";
import { translate } from "../../../utilities/locale";
import { bound } from "class-bind";

import "./styles.scss";

class HowNobulWorks extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    usersIsLoading: PropTypes.bool.isRequired
  };

  @bound
  renderFeatures(_, index) {
    return (
      <FeatureComponent
        key={index}
        featureImage={require(`../../../assets/images/home_step_${index +
          1}.svg`)}
        stepImage={require(`../../../assets/images/number_${index + 1}.svg`)}
        title={translate(this.props.intl, `home-page.${index + 1}.title`)}
        description={translate(
          this.props.intl,
          `home-page.${index + 1}.description`
        )}
      />
    );
  }

  render() {
    return (
      <div className="how-it-works">
        <div className="how-it-works__wrapper">
          <section className="how-it-works__hero">
            <div className="how-it-works__header">
              <h1>{translate(this.props.intl, "home-page.howNobulWorks")}</h1>
            </div>
            <LandingHeroVideo />
          </section>

          <section className="how-it-works__bottom">
            <div className="how-it-works__features">
              {Array.apply(null, Array(4)).map(this.renderFeatures)}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  usersIsLoading: state.users.isLoading
});

export default connect(mapStateToProps)(HowNobulWorks);
