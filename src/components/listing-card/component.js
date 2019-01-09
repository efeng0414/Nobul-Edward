import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Modal } from "antd";
import { bound } from "class-bind";
import { Link } from "react-router-dom";
import HighlightedDetails from "./highlighted-details";
import ListingDetails from "./listing-details";
import FeatureCount from "./feature-count";
import ListingOptions from "./listing-options";
import CoverImage from "./cover-image";
import TagListingDropdown from "../tag-listing-dropdown";
import { DEFAULT_LISTING_IMAGE } from "../../utilities/images";
import ShareListingModal from "../share-listing-modal";
import { url } from "../../routes/routes";
import { getProvinceCode } from "../../../core/utilities/get-province-code";
import "./styles.scss";

class ListingCard extends Component {
  static propTypes = {
    featureImageUrl: PropTypes.string,
    price: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    setPropertyAsFavorite: PropTypes.func,
    removePropertyAsFavorite: PropTypes.func,
    city: PropTypes.string.isRequired,
    provinceOrState: PropTypes.string.isRequired,
    bathrooms: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    bedrooms: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    MLS: PropTypes.string.isRequired,
    brokerage: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
    uid: PropTypes.string.isRequired,
    className: PropTypes.string,
    isTagged: PropTypes.bool,
    history: PropTypes.object,
    triggerLogin: PropTypes.func,
    favoriteList: PropTypes.object,
    setFavorite: PropTypes.func,
    location: PropTypes.object.isRequired,
    users: PropTypes.object,
    loginTrigger: PropTypes.bool,
    googleTagShareProperty: PropTypes.func,
    googleTagFavoriteProperty: PropTypes.func,
    googleTagTagProperty: PropTypes.func,
    googleTagClickProperty: PropTypes.func
  };

  static defaultProps = {
    featureImageUrl: DEFAULT_LISTING_IMAGE,
    isFavorite: false,
    currentUser: {
      uid: ""
    },
    setPropertyAsFavorite: () => {},
    removePropertyAsFavorite: () => {},
    googleTagShareProperty: () => {},
    googleTagFavoriteProperty: () => {},
    googleTagTagProperty: () => {},
    googleTagClickProperty: () => {},
    bathrooms: false,
    bedrooms: false,
    className: "",
    isTagged: false,
    city: ""
  };

  state = {
    isFavorite:
      this.props.isFavorite ||
      this.props.favoriteList.hasOwnProperty(this.props.uid),
    isTagged: this.props.isTagged,
    isTagListingModalVisible: false,
    isShareListingModalVisible: false
  };

  @bound
  onFavoriteOutlineClick(event) {
    this.props.googleTagFavoriteProperty();
    event.stopPropagation();
    const isUserLogged = !!this.props.currentUser.uid;

    if (isUserLogged) {
      this.props.setPropertyAsFavorite({
        uid: this.props.currentUser.uid,
        listing: [
          this.props.uid,
          getProvinceCode({ provinceOrState: this.props.provinceOrState })
        ]
      });
    } else {
      const favoriteList = this.props.favoriteList;
      !this.props.favoriteList.hasOwnProperty(this.props.uid) &&
        (this.props.favoriteList[this.props.uid] = true) &&
        this.props.setFavorite({ favoriteList });
      this.props.triggerLogin({ trigger: true });
    }

    this.setState({
      isFavorite: true
    });
  }

  @bound
  onFavoriteFillClick(event) {
    event.stopPropagation();
    const isUserLogged = !!this.props.currentUser.uid;

    if (isUserLogged) {
      this.props.removePropertyAsFavorite({
        uid: this.props.currentUser.uid,
        creaId: this.props.uid
      });
    } else {
      const favoriteList = this.props.favoriteList;
      favoriteList.hasOwnProperty(this.props.uid) &&
        delete favoriteList[this.props.uid] &&
        this.props.setFavorite({ favoriteList });
    }

    this.setState({
      isFavorite: false
    });
  }

  @bound
  toggleTagListingModal() {
    !this.state.isTagListingModalVisible && this.props.googleTagTagProperty();
    const isTagListingModalVisible = !this.state.isTagListingModalVisible;
    this.setState({ isTagListingModalVisible });
  }

  @bound
  toggleShareListingModal() {
    !this.state.isShareListingModalVisible &&
      this.props.googleTagShareProperty();

    this.setState({
      isShareListingModalVisible: !this.state.isShareListingModalVisible
    });
  }

  @bound
  toggleIsTagged() {
    const isTagged = !this.state.isTagged;
    this.setState({ isTagged });
  }

  componentDidUpdate(prevProps) {
    const isUserLogged = !!this.props.currentUser.uid;

    const isAnonymousUserCloseLogin =
      !isUserLogged && prevProps.loginTrigger && !this.props.loginTrigger;

    if (isAnonymousUserCloseLogin) {
      this.setState({
        isFavorite: false
      });
      const favoriteList = this.props.favoriteList;
      favoriteList.hasOwnProperty(this.props.uid) &&
        delete favoriteList[this.props.uid] &&
        this.props.setFavorite({ favoriteList });
    }
  }

  @bound
  constructListingDetailsUrl() {
    return `${process.env.BASE_DOMAIN}${url.listingDetails}`.replace(
      ":listingId",
      this.props.uid
    );
  }

  render() {
    const listingUrl = {
      pathname: url.listingDetails.replace(":listingId", this.props.uid),
      search: getProvinceCode({
        provinceOrState: this.props.provinceOrState
      }),
      state: {
        listingId: this.props.uid.listingId,
        prevHref: this.props.location.pathname
      }
    };

    return (
      <Card
        bordered={false}
        cover={CoverImage({
          featureImageUrl: this.props.featureImageUrl,
          googleTagClickProperty: this.props.googleTagClickProperty,
          listingUrl: listingUrl
        })}
        className={`listing-card ${this.props.className}`}
      >
        <ShareListingModal
          isVisible={this.state.isShareListingModalVisible}
          toggleModal={this.toggleShareListingModal}
          link={this.constructListingDetailsUrl()}
        />
        <Modal
          footer={<div />}
          visible={this.state.isTagListingModalVisible}
          maskClosable={true}
          destroyOnClose={true}
          onCancel={this.toggleTagListingModal}
          className="listing-card-modal"
        >
          <TagListingDropdown
            history={this.props.history}
            cancelModal={this.toggleTagListingModal}
            listingId={this.props.uid}
            onItemClick={this.toggleIsTagged}
            provinceOrState={this.props.provinceOrState}
          />
        </Modal>
        <Link
          to={listingUrl}
          target="_blank"
          onClick={this.props.googleTagClickProperty}
          className="no-hover"
        >
          <FeatureCount
            bedrooms={this.props.bedrooms}
            bathrooms={this.props.bathrooms}
          />
          <HighlightedDetails
            address={this.props.address}
            price={this.props.price}
          />
          <ListingDetails
            location={this.props.city}
            MLS={this.props.MLS}
            brokerage={this.props.brokerage}
          />
        </Link>
        <ListingOptions
          onFavoriteOutlineClick={this.onFavoriteOutlineClick}
          onFavoriteFillClick={this.onFavoriteFillClick}
          onShareIconClick={this.toggleShareListingModal}
          isFavorite={this.state.isFavorite}
          tagListingOnClick={this.toggleTagListingModal}
          isTagged={this.state.isTagged}
        />
      </Card>
    );
  }
}

export default ListingCard;
