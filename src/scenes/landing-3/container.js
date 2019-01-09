import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import * as Routes from "../../routes/routes";
import { translate } from "../../utilities/locale";
import requireAuth from "../../utilities/require-auth";
import { LANDING_PAGE_QUERY_PARAM } from "../../utilities/constants";
import { url } from "../../routes/routes";
import { getProvinceOrStateFromPlaces } from "../../../core/utilities/parse-places-result";
import { saveSessionItem } from "../../utilities/cache-handler";
import LocationSelector from "../../components/location-selector";
import Devices from "../../components/breakpoints/devices";
import Desktop from "../../components/breakpoints/desktop";
import { MOBILE, TABLET } from "../../../core/constants/breakpoints";
import VISUAL from "../../assets/images/landing-page/visual-3.png";
import "./styles.scss";

@requireAuth({ allowAnonymous: true })
@injectIntl
class Landing3 extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    location: "",
    userLocation: "",
    provinceOrState: "",
    userLocationError: false
  };

  @bound
  onLocationInputChange(address) {
    this.setState({
      location: address.geometry.viewport,
      provinceOrState: getProvinceOrStateFromPlaces(address)
    });
  }

  @bound
  mapNavigate() {
    if (this.state.location) {
      saveSessionItem("browseListingSearchLocation", this.state.location);
      this.props.clearCachedListings();
      this.props.setBrowseLocation({
        provinceOrState: this.state.provinceOrState
      });
      this.props.history.push({
        pathname: url.browseListingsMap,
        search: this.state.provinceOrState,
        state: { location: this.state.location }
      });
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-container">
          <div className="landing-content">
            <h2 className="landing-title">
              {translate(this.props.intl, "landing3.search.title")}
            </h2>
            <LocationSelector
              onLocationSelect={this.onLocationInputChange}
              mapNavigate={this.mapNavigate}
              searchClick={this.mapNavigate}
              buttonClassName="googletag-consumer-search-real-estate"
            />
            <Devices sizes={[MOBILE, TABLET]}>
              <div className="landing-visual--mobile">
                <img className="landing-visual-image" src={VISUAL} />
              </div>
            </Devices>
            <Desktop>
              <h2 className="landing-or">
                {translate(this.props.intl, "landing3.or")}
              </h2>
            </Desktop>
            <div className="landing-get-started">
              <h2>{translate(this.props.intl, "landing3.getStarted.title")}</h2>
              <div className="landing-button-container">
                <Link
                  className="landing-button"
                  to={`${Routes.url.getStarted}?${LANDING_PAGE_QUERY_PARAM}`}
                >
                  {translate(this.props.intl, "landing.button")}
                </Link>
              </div>
            </div>
          </div>
          <Desktop>
            <div className="landing-visual">
              <img className="landing-visual-image" src={VISUAL} />
            </div>
          </Desktop>
        </div>
      </div>
    );
  }
}

export default Landing3;
