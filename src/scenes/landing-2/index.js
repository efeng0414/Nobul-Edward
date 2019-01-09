import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import * as Routes from "../../routes/routes";
import { translate } from "../../utilities/locale";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { url } from "../../routes/routes";
import MOBILE_VISUAL from "../../assets/images/landing-page/mobile_background.svg";
import "./styles.scss";

@withRouter
@injectIntl
class Landing2 extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    currentUser: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    usersIsLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    !this.props.usersIsLoading &&
      !objectIsEmpty(this.props.currentUser) &&
      this.props.history.push(url.home);
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="landing">
        <div className="landing-container">
          <div className="landing-content">
            <h1 className="landing-title">
              {translate(intl, "landing2.title")}
            </h1>
            <Link
              className="landing-button"
              to={{
                pathname: Routes.url.home,
                search: this.props.location.search
              }}
            >
              {translate(intl, "landing.button")}
            </Link>
          </div>
          <img className="landing-image" src={MOBILE_VISUAL} width="100%" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  usersIsLoading: state.users.isLoading
});

export default connect(mapStateToProps)(Landing2);
