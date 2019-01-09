import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkIfProvinceIsSupported } from "../../core/utilities/arello";
import { cacheItem, checkForCached } from "./cache-handler";
import { DEFAULT_COUNTRY, DEFAULT_REGION } from "../../core/constants/shared";
import { createObjectFromSearchParams } from "./url";

const isDev = process.env.NODE_ENV === "development";

export const createLocationClasses = userLocation => {
  // Create location classes
  const locationClasses = [];
  userLocation &&
    Object.keys(userLocation).map(
      key =>
        userLocation[key] &&
        typeof userLocation[key] === "string" &&
        locationClasses.push(
          `location-${key}-${userLocation[key].replace(
            /\s/g,
            ""
          )}`.toLowerCase()
        )
    );
  return locationClasses;
};

const IP_LOCATION = "IPLocation";

const mapStateToProps = state => ({
  isLoading: state.authentication.isLoading,
  userProfile: state.authentication.profile,
  userType: state.authentication.userType,
  userId: state.authentication.currentUser.uid
});

export const userLocation = WrappedComponent => {
  class UserLocation extends Component {
    static propTypes = {
      isLoading: PropTypes.bool,
      userProfile: PropTypes.object,
      userId: PropTypes.string,
      userType: PropTypes.string,
      fetch: PropTypes.func
    };

    static defaultProps = {
      isLoading: true,
      userProfile: {},
      userId: "",
      userType: "",
      fetch: window.fetch ? window.fetch.bind(window) : () => Promise.resolve()
    };

    static WrappedComponent = WrappedComponent;

    state = {
      userLocation: {
        is_eu: undefined,
        country: this.props.userProfile.country || DEFAULT_COUNTRY,
        city: this.props.userProfile.city,
        state: this.props.userProfile.provinceOrState || DEFAULT_REGION,
        latlng: {}
      }
    };

    _mounted = false;

    componentDidMount() {
      this._mounted = true;
      !this.props.isLoading && this.getUserLocation();
    }

    componentDidUpdate(prevProps) {
      (this.props.userId !== prevProps.userId ||
        this.props.isLoading !== prevProps.isLoading) &&
        this.getUserLocation();
    }

    componentWillUnmount() {
      this._mounted = false;
    }

    setUserLocation({ is_eu, city, country, provinceOrState, latlng = {} }) {
      this._mounted &&
        this.setState({
          userLocation: {
            is_eu,
            city,
            country,
            state: provinceOrState,
            latlng,
            isRegionSupported: checkIfProvinceIsSupported(provinceOrState)
          }
        });

      return true;
    }

    getStoredLocation() {
      const storedLocation = checkForCached(IP_LOCATION);
      return storedLocation && this.setUserLocation(storedLocation);
    }

    getIPLocation() {
      return this.props.fetch
        .call(
          window,
          process.env.IP_LOCATOR_URL // eslint-disable-line
        )
        .then(response => response.json())
        .then(res => {
          const locationObject = {
            is_eu: res.is_eu,
            city: res.city,
            country: res.country_code,
            provinceOrState: res.region_code,
            latlng: {
              lat: res.latitude,
              lng: res.longitude
            }
          };
          cacheItem(IP_LOCATION, locationObject);
          this.setUserLocation(locationObject);
        })
        .catch(console.error);
    }

    getLocationFromUrl() {
      const locationObj = createObjectFromSearchParams();
      return locationObj.country ? locationObj : {};
    }

    getUserLocation() {
      if (isDev && Object.keys(this.getLocationFromUrl()).length > 0) {
        this.setUserLocation(this.getLocationFromUrl());
      } else if (this.props.userType !== "") {
        const { city, country, provinceOrState } = this.props.userProfile;
        if (!country) {
          return this.getStoredLocation() || this.getIPLocation();
        }

        this.setUserLocation({
          is_eu: false, // "EU" is not an option yet in the signup, so this will always be false
          city,
          country,
          provinceOrState
        });
      } else {
        return this.getStoredLocation() || this.getIPLocation();
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          userLocation={this.state.userLocation}
        />
      );
    }
  }

  return UserLocation;
};

export default component => connect(mapStateToProps)(userLocation(component));
