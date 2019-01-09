import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
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
import ProofBanner from "../../components/proof-banner";

import "./styles.scss";

@requireAuth({ allowAnonymous: true })
@injectIntl
class Landing4 extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired,
    clearCachedListings: PropTypes.func.isRequired,
    setBrowseLocation: PropTypes.func.isRequired
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
        <Helmet title={translate(this.props.intl, "home")} />
        <div className="landing__container">
          <div className="landing__content">
            <h2 className="landing__title">
              {translate(this.props.intl, "landing3.search.title")}
            </h2>
            <LocationSelector
              onLocationSelect={this.onLocationInputChange}
              mapNavigate={this.mapNavigate}
              searchClick={this.mapNavigate}
              buttonClassName="googletag-consumer-search-real-estate"
            />
            <h2 className="landing__or">
              {translate(this.props.intl, "landing3.or")}
            </h2>
            <div>
              <div className="landing__button">
                <Link
                  to={`${Routes.url.getStarted}?${LANDING_PAGE_QUERY_PARAM}`}
                >
                  {translate(this.props.intl, "landing4.findAgent")}
                </Link>
              </div>
              <h2>{translate(this.props.intl, "landing4.getStarted")}</h2>
            </div>
          </div>
        </div>
        <ProofBanner />
      </div>
    );
  }
}

export default Landing4;
