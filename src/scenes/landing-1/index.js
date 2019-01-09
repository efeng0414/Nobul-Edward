import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";
import * as Routes from "../../routes/routes";
import { connect } from "react-redux";
import { translate } from "../../utilities/locale";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { url } from "../../routes/routes";
import LandingHeroVideo from "./landing-hero-video";
import "./styles.scss";

@withRouter
@injectIntl
class Landing1 extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    currentUser: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    usersIsLoading: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    !this.props.usersIsLoading &&
      objectIsEmpty(this.props.currentUser) &&
      this.props.history.push(url.home);
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="landing">
        <div className="landing__wrapper">
          <section className="landing__hero">
            <div className="landing__hero__text">
              <h1>{translate(intl, "landing.heading")}</h1>
              <p className="landing__hero__para">
                {translate(intl, "landing.paragraph")}
              </p>
              <Link
                className="landing__button"
                to={{
                  pathname: Routes.url.getStarted,
                  search: this.props.location.search
                }}
              >
                {translate(intl, "landing.button")}
              </Link>
            </div>
            <LandingHeroVideo />
          </section>

          <section>
            <h2>{translate(intl, "landing.features.title")}</h2>
            <div className="landing__features">
              <div className="landing__feature">
                <b className="landing__feature__title">
                  {translate(intl, "landing.feature.1.title")}
                </b>
                <p className="landing__feature__description">
                  {translate(intl, "landing.feature.1.description")}
                </p>
              </div>
              <div className="landing__feature">
                <b className="landing__feature__title">
                  {translate(intl, "landing.feature.2.title")}
                </b>
                <p className="landing__feature__description">
                  {translate(intl, "landing.feature.2.description")}
                </p>
              </div>
              <div className="landing__feature">
                <b className="landing__feature__title">
                  {translate(intl, "landing.feature.3.title")}
                </b>
                <p className="landing__feature__description">
                  {translate(intl, "landing.feature.3.description")}
                </p>
              </div>
              <div className="landing__feature">
                <b className="landing__feature__title">
                  {translate(intl, "landing.feature.4.title")}
                </b>
                <p className="landing__feature__description">
                  {translate(intl, "landing.feature.4.description")}
                </p>
              </div>
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

export default connect(mapStateToProps)(Landing1);
