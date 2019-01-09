import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { bound } from "class-bind";
import { intlShape, injectIntl } from "react-intl";
import Leaflet from "leaflet";
import { translate } from "../../utilities/locale";
import PageCurrency from "../currency/page";
import "./styles.scss";
import "leaflet/dist/leaflet.css";
import { OSM_TILE_SERVER } from "../../../core/constants/polygonMap";
import searchLocationIcon from "../../assets/images/single-pin.svg";

@injectIntl
class PropertyOverviewCard extends Component {
  static propTypes = {
    propertyDetailsCardInformation: PropTypes.object,
    intl: intlShape.isRequired,
    masterlist: PropTypes.array.isRequired
  };

  static defaultProps = {
    propertyDetailsCardInformation: {}
  };

  map = null;

  @bound
  getMap() {
    const listingDetailsFromMasterlist = this.props.masterlist.find(
      ({ properties: { listingId } }) =>
        listingId === this.props.propertyDetailsCardInformation.uid
    );

    const listingLatLng =
      listingDetailsFromMasterlist &&
      [...listingDetailsFromMasterlist.geometry.coordinates].reverse();

    this.searchLocationPin = Leaflet.icon({
      iconUrl: searchLocationIcon,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    if (document.getElementById("location-map") && !this.map && listingLatLng) {
      this.map = Leaflet.map("location-map").setView(listingLatLng, 12);
      Leaflet.marker(listingLatLng, {
        icon: this.searchLocationPin
      }).addTo(this.map);
      Leaflet.tileLayer(OSM_TILE_SERVER, {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: "mapbox.streets",
        accessToken: process.env.MAPBOX_ACCESS_TOKEN
      }).addTo(this.map);
    }
  }

  componentDidMount() {
    this.getMap();
  }

  componentDidUpdate() {
    this.getMap();
  }

  render() {
    const {
      MLS,
      address,
      price,
      city,
      provinceOrState,
      country,
      postalCode,
      propertyType,
      brokerage
    } = this.props.propertyDetailsCardInformation;

    return (
      <Card
        loading={!Object.keys(this.props.propertyDetailsCardInformation).length}
      >
        <div className="property-overview-card">
          <div id="location-map" className="location-map" />
          <div className="property-overview-card__data">
            <div>
              <div className="property-overview-card__subheader ">
                {translate(this.props.intl, "listingDetails.price")}
              </div>
              <PageCurrency value={price} />
            </div>
            <div>
              <div className="property-overview-card__subheader ">
                {translate(this.props.intl, "listingDetails.address")}
              </div>
              {`${address} ${city} ${provinceOrState} ${country} ${postalCode}`}
            </div>
          </div>

          <div className="property-overview-card__data">
            <div>
              <div className="property-overview-card__subheader ">
                {translate(this.props.intl, "listingDetails.propertyType")}
              </div>
              {`${propertyType}`}
            </div>
            <div>
              <div className="property-overview-card__subheader ">
                {translate(this.props.intl, "listingDetails.brokerage")}
              </div>
              {`${brokerage}`}
            </div>
            <div>
              <div className="property-overview-card__subheader ">
                {translate(this.props.intl, "listingDetails.mlsNumber")}
              </div>
              {`${MLS}`}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default PropertyOverviewCard;
