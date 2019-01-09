import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { translate } from "../../utilities/locale";
import Helmet from "react-helmet";
import { Alert } from "antd";

import { url } from "../../routes/routes";
import Background from "../../components/background";
import LocationSelector from "../../components/location-selector";

import BackgroundImage from "../../assets/images/backgrounds/consumer-buy.jpg";
import { saveSessionItem } from "../../utilities/cache-handler";
import { getProvinceOrStateFromPlaces } from "../../../core/utilities/parse-places-result";
import requireAuth from "../../utilities/require-auth";
import "./styles.scss";

@requireAuth({ allowAnonymous: true })
class BrowseListings extends Component {
  static propTypes = {
    history: PropTypes.object,
    intl: PropTypes.any,
    setUserGeolocation: PropTypes.func,
    users: PropTypes.object,
    setReverseGeolocationAsync: PropTypes.func,
    clearCachedListings: PropTypes.func.isRequired,
    setBrowseLocation: PropTypes.func.isRequired
  };

  state = {
    location: "",
    userLocation: "",
    userLocationError: false
  };

  onLocationInputChange = address => {
    this.setState({
      location: address.geometry.viewport,
      address: address.formatted_address,
      provinceOrState: getProvinceOrStateFromPlaces(address)
    });
  };

  mapNavigate = () => {
    if (this.state.location) {
      saveSessionItem("browseListingSearchLocation", this.state.location);
      this.props.clearCachedListings();
      this.props.setBrowseLocation({
        provinceOrState: this.state.provinceOrState
      });
      this.props.history.push({
        pathname: url.browseListingsMap,
        search: this.state.provinceOrState,
        state: { location: this.state.location, address: this.state.address }
      });
    }
  };

  componentDidMount() {
    const { currentUserLocation } = this.props.users;
    if (currentUserLocation !== undefined) {
      const { latitude, longitude } = this.props.users.currentUserLocation;
      const { setReverseGeolocationAsync } = this.props;
      const { reverseGeolocation } = this.props.users;

      this.props.setUserGeolocation();
      latitude && longitude && setReverseGeolocationAsync(latitude, longitude);

      this.setState({
        userLocation: reverseGeolocation
      });
    }
    if ("geolocation" in navigator) {
      const options = {
        timeout: 10000
      };
      navigator.geolocation.getCurrentPosition(
        position => {
          const { coords } = position;
          const latLng = {
            lat: coords.latitude,
            lng: coords.longitude
          };
          saveSessionItem("userGeoLocation", latLng);
          this.props.setUserGeolocation(latLng);
        },
        () => {},
        options
      );
    }
  }

  render() {
    const { intl } = this.props;
    return (
      <Background image={BackgroundImage}>
        {this.state.userLocationError && (
          <Alert
            closable
            message={translate(intl, "error.locationIsRequired")}
            type="error"
          />
        )}
        <Helmet title={translate(intl, "helmet.browseListings")} />
        <div className="browse-listings">
          <h1>{translate(intl, "browseListings.title")}</h1>
          <LocationSelector
            onLocationSelect={this.onLocationInputChange}
            mapNavigate={this.mapNavigate}
            searchClick={this.mapNavigate}
            buttonClassName="googletag-consumer-search-real-estate"
          />
        </div>
      </Background>
    );
  }
}

export default injectIntl(BrowseListings);
