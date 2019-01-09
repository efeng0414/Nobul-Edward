import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { getPhotosForProperty } from "../../../core/firebase/listings";
import CarouselContainer from "./carousel-container";
import PropertyImage from "./property-image";
import PrimaryImage from "./primary-image";
import "./styles.scss";

class PropertyImagesCarousel extends Component {
  static propTypes = {
    propertyImagesCardInformation: PropTypes.object,
    provinceOrState: PropTypes.string.isRequired
  };

  static defaultProps = {
    propertyImagesCardInformation: {
      Price: []
    }
  };

  state = {
    photoUrls: [],
    imagesLoaded: false,
    defaultImageUrl: "",
    defaultImagePosition: 0
  };

  @bound
  handleGetPhotosSuccess(urls) {
    this.setState({
      imagesLoaded: true,
      photoUrls: urls,
      defaultImageUrl: urls[this.state.defaultImagePosition]
    });
  }

  @bound
  handleGetPhotosFailure(error) {
    console.error(error);
    this.setState({
      imagesLoaded: true,
      photoUrls: []
    });
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps) {
    this.props.photoCount !== prevProps.photoCount && this.loadImages();
  }

  loadImages() {
    getPhotosForProperty(
      this.props.listingId,
      1,
      this.props.photoCount,
      this.props.provinceOrState
    )
      .then(this.handleGetPhotosSuccess)
      .catch(this.handleGetPhotosFailure);
  }

  @bound
  nextImage() {
    const newImagePosition =
      this.state.defaultImagePosition === this.state.photoUrls.length - 1
        ? 0
        : this.state.defaultImagePosition + 1;
    this.setState({
      defaultImagePosition: newImagePosition
    });
  }

  @bound
  previousImage() {
    const newImagePosition =
      this.state.defaultImagePosition === 0
        ? this.state.photoUrls.length - 1
        : this.state.defaultImagePosition - 1;
    this.setState({
      defaultImagePosition: newImagePosition
    });
  }

  @bound
  setImage(event) {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    this.setState({
      defaultImagePosition: index
    });
    this.carousel.goTo(index);
  }

  @bound
  next() {
    this.carousel.next();
    this.nextImage();
  }

  @bound
  previous() {
    this.carousel.prev();
    this.previousImage();
  }

  @bound
  setCarousel(node) {
    return (this.carousel = node);
  }

  @bound
  renderPropertyImage(photo, index) {
    return (
      <PropertyImage
        key={index}
        index={index}
        setImage={this.setImage}
        defaultImagePosition={this.state.defaultImagePosition}
        photo={photo}
      />
    );
  }

  render() {
    const hasImagesSuccessfullyLoaded = !!this.state.photoUrls.length;
    const images = this.state.photoUrls.map(this.renderPropertyImage);

    return (
      <div className="property-images">
        <PrimaryImage
          {...this.props}
          {...this.state}
          hasImagesSuccessfullyLoaded={hasImagesSuccessfullyLoaded}
        />
        {hasImagesSuccessfullyLoaded && (
          <CarouselContainer
            images={images}
            next={this.next}
            previous={this.previous}
            setCarousel={this.setCarousel}
            setImage={this.setImage}
          />
        )}
      </div>
    );
  }
}

PropertyImagesCarousel.propTypes = {
  photoCount: PropTypes.number,
  listingId: PropTypes.string,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteFillClick: PropTypes.func.isRequired,
  onFavoriteOutlineClick: PropTypes.func.isRequired,
  onShareIconClick: PropTypes.func.isRequired,
  tagListingOnClick: PropTypes.func.isRequired,
  isTagged: PropTypes.bool.isRequired,
  userType: PropTypes.string
};

PropertyImagesCarousel.defaultProps = { photoCount: 0, listingId: "" };

export default PropertyImagesCarousel;
