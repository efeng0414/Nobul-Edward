import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import PropTypes from "prop-types";
import { Input, Icon } from "antd";
import { translate } from "../../utilities/locale";

import "./styles.scss";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { allowedSuggestionTypes } from "./utilities";

@injectIntl
class LocationSearch extends React.Component {
  state = { address: "" };

  static propTypes = {
    intl: intlShape.isRequired,
    onLocationSelect: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    defaultAddress: PropTypes.string,
    mapNavigate: PropTypes.func,
    resetLocationValue: PropTypes.bool,
    searchOptions: PropTypes.object,
    typesToBeRemoved: PropTypes.array,
    googleTagLocation: PropTypes.func,
    document: PropTypes.object,
    cachedLocation: PropTypes.object,
    autosize: PropTypes.bool
  };

  static defaultProps = {
    defaultAddress: "",
    searchOptions: {},
    mapNavigate: () => {},
    googleTagLocation: () => {},
    typesToBeRemoved: [],
    document: window.document,
    cachedLocation: {},
    autosize: false
  };

  @bound
  handleChange(address) {
    if (this.props.onChange) {
      this.props.onChange(address);
    }
    this.setState({ address });
  }

  @bound
  initPlacesApi() {
    this.setState({
      placesApiLoaded: true
    });
  }

  @bound
  handleSelect(address) {
    let result;
    geocodeByAddress(address)
      .then(results => {
        this.setState({ address: results[0].formatted_address });
        result = results[0];
        return getLatLng(results[0]);
      })
      .then(latLng => this.props.onLocationSelect(result, latLng))
      .catch(console.error);
  }

  componentDidMount() {
    if (this.props.cachedLocation.result) {
      this.setState({
        address: this.props.cachedLocation.result.formatted_address || ""
      });
    }

    if (!window.google) {
      window.initPlacesApi = this.initPlacesApi;
      const gmapScriptEl = this.props.document.createElement(`script`);
      gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${
        process.env.GOOGLE_PLACES_API_KEY
      }&libraries=places&callback=initPlacesApi`;
      document
        .querySelector(`body`)
        .insertAdjacentElement(`beforeend`, gmapScriptEl);
    } else {
      this.initPlacesApi();
    }
    this.props.defaultAddress && this.handleSelect(this.props.defaultAddress);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cachedLocation !== this.props.cachedLocation) {
      if (this.props.cachedLocation.result) {
        this.setState({
          address: this.props.cachedLocation.result.formatted_address || ""
        });
      }
    }
  }

  render() {
    const { address, placesApiLoaded } = this.state;
    const { intl } = this.props;
    const InputComponent = this.props.autosize ? Input.TextArea : Input;
    const textareaProps = this.props.autosize ? { autosize: true } : {};

    return (
      <div className="location-search">
        {placesApiLoaded && (
          <PlacesAutocomplete
            value={address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            debounce={250}
            searchOptions={this.props.searchOptions}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div className="location-search-autocomplete">
                <InputComponent
                  value={address}
                  onClick={this.props.googleTagLocation}
                  onPressEnter={this.props.mapNavigate}
                  {...getInputProps({
                    placeholder:
                      this.props.placeholder ||
                      translate(intl, "locationPlaceholder"),
                    className: "location-search-autocomplete-input"
                  })}
                  {...textareaProps}
                />

                <div className="location-search-autocomplete-list">
                  {suggestions
                    .filter(
                      allowedSuggestionTypes({
                        typesToBeRemoved: this.props.typesToBeRemoved
                      })
                    )
                    .map(suggestion => {
                      const className = suggestion.active
                        ? "location-search-autocomplete-list-item active"
                        : "location-search-autocomplete-list-item";
                      return (
                        <div
                          key={suggestion.id}
                          {...getSuggestionItemProps(suggestion, {
                            className
                          })}
                        >
                          <span>
                            <Icon
                              //TO DO: find icon for map marker instead of compass
                              type="compass"
                            />
                            {suggestion.description}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
      </div>
    );
  }
}
export default LocationSearch;
