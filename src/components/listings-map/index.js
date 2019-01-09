import React, { Component } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import supercluster from "supercluster";
import { bound } from "../../../node_modules/class-bind";
import { url } from "../../routes/routes";
import { fetchMultipleDetailsAndFeatureImages } from "../../../core/firebase/listings";
import ActivityIndicator from "../../components/activity-indicator";
import singleListingPin from "../../assets/images/single-pin.svg";
import singleListingPinSelected from "../../assets/images/map_icon_selected.svg";
import ListingMapPreviewList from "../../components/listing-map-preview-list";
import { OSM_TILE_SERVER } from "../../../core/constants/polygonMap";
import { POPUP_TOP, POPUP_BOTTOM } from "../../../core/constants/shared";
import { CONSUMER_SEARCH_REAL_ESTATE_CLICK_PIN } from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";
import "./styles.scss";

const BATCH_SIZE = 5;
const POPUP_WIDTH = 400;
class ListingsMap extends Component {
  state = {
    isHoveringPopup: false,
    showPopup: false,
    popupOffset: { x: 0, y: 0 },
    isPopupLoading: false,
    hoverId: undefined,
    popupPosition: "",
    clusterListings: [],
    clusterListingDetails: [],
    propertyCount: 0
  };

  static propTypes = {
    mapId: PropTypes.string.isRequired,
    listings: PropTypes.array,
    isLoading: PropTypes.bool,
    onMapMove: PropTypes.func,
    sendMapDataToParent: PropTypes.func,
    history: PropTypes.object,
    defaultBounds: PropTypes.array,
    getListingData: PropTypes.func,
    currentUser: PropTypes.object.isRequired,
    buyJobs: PropTypes.object.isRequired,
    provinceOrState: PropTypes.string.isRequired
  };

  _mounted = false;
  map = null;
  markers = null;
  clusterIndex = null;
  numMarkers = 0;
  isMapMoving = false;

  componentDidMount() {
    this._mounted = true;
    const { defaultBounds } = this.props;
    this.map = L.map(this.props.mapId).fitBounds(defaultBounds);

    L.tileLayer(OSM_TILE_SERVER, {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: process.env.MAPBOX_ACCESS_TOKEN // eslint-disable-line
    }).addTo(this.map);

    this.markers = L.geoJson(null, {
      pointToLayer: this.createClusterIcon
    })
      .addTo(this.map)
      .on("click", this.markerClick);

    this.map.on("mouseout", this.closePopup);
    this.map.on("moveend", this.handleMoveEnd);
    this.map.on("movestart", () => {
      this.isMapMoving = true;
      this.closePopup();
    });

    const elem = L.DomUtil.get("mapPopup");
    L.DomEvent.on(elem, "mousewheel", L.DomEvent.stopPropagation);
    L.DomEvent.disableScrollPropagation(elem);
  }

  componentDidUpdate = () => {
    const { listings } = this.props;
    if (
      listings.length !== this.numMarkers &&
      !this.props.isLoading &&
      !this.isMapMoving
    ) {
      this.numMarkers = listings.length;
      this.clusterIndex = supercluster({
        log: false,
        radius: 100,
        maxZoom: 18
      }).load(listings);
      this.renderClusters();
      if (this.props.sendMapDataToParent) {
        this.props.sendMapDataToParent(this.map, this.clusterIndex);
      }
    }
  };

  componentWillUnmount() {
    this._mounted = false;
    this.map.off("mouseout", this.closePopup);
    this.map.off("move", this.closePopup);
    this.map.off("moveend", this.handleMoveEnd);
    this.markers.off("click", this.markerClick);
    this.markers.off("mouseover", this.handleMouseOver);
    this.markers.off("mouseout", this.closePopupTimeout);
  }

  @bound
  handleMoveEnd(e) {
    this.isMapMoving = false;
    this.renderClusters();
    this.props.sendMapDataToParent(this.map, this.clusterIndex);
    this.props.onMapMove(e, this.clusterIndex);
  }

  @bound
  renderClusters() {
    const bounds = this.map.getBounds();
    const bbox = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth()
    ];
    const zoom = this.map.getZoom();
    this.markers.clearLayers();
    const clusters = this.clusterIndex.getClusters(bbox, zoom);
    this.markers.addData(clusters);
  }

  @bound
  isTaggedListing({ listingId }) {
    const isUserLogged = !!this.props.currentUser.uid;

    return isUserLogged
      ? Object.values(this.props.buyJobs).some(({ taggedListings = {} }) =>
          Object.keys(taggedListings).includes(listingId)
        )
      : isUserLogged;
  }

  @bound
  createClusterIcon(feature, latlng) {
    const isCluster = !!feature.properties.cluster;
    if (!isCluster) {
      const icon = this.isTaggedListing({
        listingId: feature.properties.listingId
      })
        ? L.icon({
            iconUrl: singleListingPinSelected,
            iconSize: [50, 50],
            iconAnchor: [25, 50]
          })
        : L.icon({
            iconUrl: singleListingPin,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
          });

      return L.marker(latlng, { icon: icon })
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.closePopupTimeout);
    } else {
      const minClusterSize = 30;
      const count = feature.properties.point_count;

      const markerRadius = minClusterSize + Math.sqrt(count) * 0.5;
      const markerStyle = `width:${markerRadius}px; height:${markerRadius}px`;

      const icon = L.divIcon({
        html: `<div style="${markerStyle}"><span style="line-height:${markerRadius}px;">${count}</span></div>`,
        className: "marker-cluster",
        iconSize: L.point(markerRadius, markerRadius)
      });
      return L.marker(latlng, { icon: icon })
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.closePopupTimeout);
    }
  }

  @bound
  getOffset(properties, containerPoint) {
    const bufferWidth = 10;
    const { width, height } = this.mapReference.getBoundingClientRect();
    let popupOffset = {};

    const propertyCount = properties.listingId ? 1 : properties.point_count;

    this.setState({
      propertyCount
    });

    switch (propertyCount) {
      case 1:
        popupOffset.y =
          containerPoint.y > height / 2
            ? containerPoint.y - 150
            : containerPoint.y + 10;
        break;
      case 2:
        popupOffset.y =
          containerPoint.y > height / 2
            ? containerPoint.y - 230
            : containerPoint.y + 25;
        break;
      default:
        popupOffset.y =
          containerPoint.y > height / 2
            ? containerPoint.y - 320
            : containerPoint.y + 15;
    }

    popupOffset.x = containerPoint.x - POPUP_WIDTH / 2;

    if (popupOffset.x > width - POPUP_WIDTH + bufferWidth) {
      popupOffset.x += width - (popupOffset.x + POPUP_WIDTH) - bufferWidth;
    } else if (popupOffset.x < 0) {
      popupOffset.x += -popupOffset.x + bufferWidth;
    }

    return popupOffset;
  }

  @bound
  markerClick(e) {
    const { feature } = e.layer;
    const { properties } = feature;
    const { listingId = "" } = properties;

    if (properties.cluster) {
      const clusterId = properties.cluster_id;

      // Fit the map to the bounding box of the visible cluster children.
      const newChildren = this.clusterIndex.getChildren(clusterId);
      const boundingBox = {
        left: newChildren[0].geometry.coordinates[0],
        top: newChildren[0].geometry.coordinates[1],
        right: newChildren[0].geometry.coordinates[0],
        bottom: newChildren[0].geometry.coordinates[1]
      };

      // Calculate the box coordinates
      newChildren.map(child => { // eslint-disable-line
        const coords = child.geometry.coordinates;
        const lng = coords[0];
        const lat = coords[1];

        if (lat < boundingBox.top) {
          boundingBox.top = lat;
        }

        if (lat > boundingBox.bottom) {
          boundingBox.bottom = lat;
        }

        if (lng < boundingBox.left) {
          boundingBox.left = lng;
        }

        if (lng > boundingBox.right) {
          boundingBox.right = lng;
        }
      });

      // Fit map to box
      this.map.fitBounds([
        [boundingBox.bottom, boundingBox.left],
        [boundingBox.top, boundingBox.right]
      ]);
    } else {
      this.props.history.push({
        pathname: url.listingDetails.replace(":listingId", listingId),
        search: this.props.provinceOrState,
        state: { listingId: listingId }
      });

      gtmEvent({ name: CONSUMER_SEARCH_REAL_ESTATE_CLICK_PIN });
    }
  }

  @bound
  handleMouseOver(e) {
    const { properties } = e.target.feature;
    const { containerPoint = {} } = e;
    let clusterListings = [];
    let hoverId = "";

    const { height } = this.mapReference.getBoundingClientRect();

    const popupPosition =
      containerPoint.y > height / 2 ? POPUP_BOTTOM : POPUP_TOP;

    if (properties.cluster) {
      hoverId = properties.cluster_id;
      const children = this.clusterIndex.getLeaves(
        properties.cluster_id,
        Infinity
      );
      children.forEach(child => {
        clusterListings.push(child.properties.listingId);
      });
    } else {
      hoverId = properties.listingId;
      clusterListings.push(properties.listingId);
    }

    const popupOffset = this.getOffset(properties, containerPoint);

    this.setState({
      hoverId,
      isPopupLoading: true,
      showPopup: true,
      popupOffset,
      popupPosition,
      clusterListings
    });

    const page1 = clusterListings.slice(0, BATCH_SIZE);
    fetchMultipleDetailsAndFeatureImages(
      page1,
      this.props.provinceOrState
    ).then(data => {
      if (this._mounted) {
        const { hoverId: currentHoverId } = this.state;
        // only setState if we are still hovering the same cluster
        if (hoverId === currentHoverId) {
          this.setState({
            clusterListingDetails: data,
            isPopupLoading: false
          });
        }
      }
    });
  }

  //call this function on cluster mouseout
  //used to NOT close the popup if mouse moves from cluster to popup
  //during the timeout handlePopupMouseEnter will fire and set isHoveringPopup=true
  @bound
  closePopupTimeout() {
    setTimeout(this.closePopup, 10);
  }

  @bound
  closePopup() {
    const { isHoveringPopup } = this.state;
    if (!isHoveringPopup) {
      this.setState({
        hoverId: undefined,
        clusterListings: [],
        showPopup: false,
        clusterListingDetails: []
      });
    }
  }

  @bound
  handleListingsLoad(pageNum) {
    this.setState({ isPopupLoading: true });

    const totalListings = this.state.clusterListings.slice(0);
    const index = pageNum * BATCH_SIZE;
    const nextPage = totalListings.splice(index, BATCH_SIZE);

    fetchMultipleDetailsAndFeatureImages(nextPage).then(data => {
      if (this.state.isHoveringPopup) {
        const mergedListings = [...this.state.clusterListingDetails, ...data];
        this.setState({
          clusterListingDetails: mergedListings,
          isPopupLoading: false
        });
      }
    });
  }

  @bound
  handlePopupMouseLeave() {
    this.setState({ isHoveringPopup: false }, this.closePopup);
  }

  @bound
  handlePopupMouseEnter() {
    this.setState({ isHoveringPopup: true });
  }

  render() {
    return (
      <ActivityIndicator spinning={this.props.isLoading} type="Loading">
        <div
          id={this.props.mapId}
          className="listing-map"
          ref={mapReference => (this.mapReference = mapReference)}
        >
          <div id="mapPopup">
            {this.state.showPopup && (
              <div
                className="listing-map-popup"
                style={{
                  top: `${this.state.popupOffset.y}px`,
                  left: `${this.state.popupOffset.x}px`
                }}
                onMouseEnter={this.handlePopupMouseEnter}
                onMouseLeave={this.handlePopupMouseLeave}
              >
                <ListingMapPreviewList
                  isLoading={this.state.isPopupLoading}
                  hasMore={
                    this.state.clusterListingDetails.length !==
                    this.state.clusterListings.length
                  }
                  listings={this.state.clusterListingDetails}
                  onListingsLoad={this.handleListingsLoad}
                  popupPosition={this.state.popupPosition}
                  provinceOrState={this.props.provinceOrState}
                  propertyCount={this.state.propertyCount}
                />
              </div>
            )}
          </div>
        </div>
      </ActivityIndicator>
    );
  }
}

export default ListingsMap;
