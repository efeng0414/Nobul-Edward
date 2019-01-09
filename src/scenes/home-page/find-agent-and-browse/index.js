import React, { Component } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../../utilities/locale";
import requireAuth from "../../../utilities/require-auth";
import { url } from "../../../routes/routes";
import { getProvinceOrStateFromPlaces } from "../../../../core/utilities/parse-places-result";
import { saveSessionItem } from "../../../utilities/cache-handler";
import { MOBILE, TABLET } from "../../../../core/constants/breakpoints";
import LocationSelector from "../../../components/location-selector";
import ProofBanner from "../../../components/proof-banner";
import ConsumerLandingType from "../../../components/consumer-landing-type";

import "./styles.scss";

@requireAuth({ allowAnonymous: true })
@injectIntl
class FindAgentAndBrowse extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired,
    clearCachedListings: PropTypes.func.isRequired,
    setBrowseLocation: PropTypes.func.isRequired,
    currentBreakPoint: PropTypes.string,
    isAgentButtonActive: PropTypes.bool
  };

  static defaultProps = {
    isAgentButtonActive: false
  };

  state = {
    location: "",
    userLocation: "",
    provinceOrState: "",
    userLocationError: false,
    isBrowseButtonActive: !this.props.isAgentButtonActive,
    isAgentButtonActive: this.props.isAgentButtonActive
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

  @bound
  setBrowseButtonActive() {
    this.setState({
      isBrowseButtonActive: true,
      isAgentButtonActive: false
    });
  }

  @bound
  setAgentButtonActive() {
    this.setState({
      isAgentButtonActive: true,
      isBrowseButtonActive: false
    });
  }

  @bound
  isHomePage() {
    return this.props.history.location.pathname === url.home;
  }

  render() {
    const isMobile =
      this.props.currentBreakPoint === MOBILE ||
      this.props.currentBreakPoint === TABLET;

    return (
      <div className="find-and-browse">
        <Helmet title={translate(this.props.intl, "home")} />
        <div className="find-and-browse__container">
          <div className="find-and-browse__content">
            <h2 className="find-and-browse__title">
              {this.state.isBrowseButtonActive
                ? translate(this.props.intl, "home-page.browse.title")
                : translate(this.props.intl, "home-page.search.title")}
            </h2>
            <div className="find-and-browse__buttons">
              <div
                className={
                  this.state.isBrowseButtonActive
                    ? "find-and-browse__button"
                    : "find-and-browse__button find-and-browse__button-agent--active"
                }
                onClick={this.setAgentButtonActive}
              >
                <Button>
                  {translate(this.props.intl, "home-page.findAgent")}
                </Button>
              </div>
              <div
                className={
                  this.state.isBrowseButtonActive
                    ? "find-and-browse__button find-and-browse__button-browse--active"
                    : "find-and-browse__button"
                }
                onClick={this.setBrowseButtonActive}
              >
                <Button>
                  {translate(this.props.intl, "home-page.browse")}
                </Button>
              </div>
            </div>
            {this.state.isBrowseButtonActive ? (
              <LocationSelector
                onLocationSelect={this.onLocationInputChange}
                mapNavigate={this.mapNavigate}
                searchClick={this.mapNavigate}
                buttonClassName="googletag-consumer-search-real-estate"
              />
            ) : (
              <ConsumerLandingType />
            )}
          </div>
          <ProofBanner isMobile={isMobile} />
        </div>
      </div>
    );
  }
}

export default FindAgentAndBrowse;
