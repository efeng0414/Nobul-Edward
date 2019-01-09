import React, { Component } from "react";
import { Carousel, Card } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { intlShape } from "react-intl";
import { Link } from "react-router-dom";

import { translate } from "../../utilities/locale";
import { url } from "../../routes/routes";
import ActivityIndicator from "../../components/activity-indicator";
import { fetchMultipleFeatureImageUrls } from "../../../core/firebase/listings";
import CarouselArrow from "./carousel-arrow";

import "./styles.scss";

class JobTaggedListings extends Component {
  state = {
    listingImages: []
  };

  static propTypes = {
    taggedListings: PropTypes.object,
    isLoading: PropTypes.bool,
    intl: intlShape.isRequired,
    slidesToShow: PropTypes.number
  };

  static defaultProps = {
    taggedListings: {},
    isLoading: false,
    slidesToShow: 7
  };

  @bound
  next() {
    this.carousel.next();
  }

  @bound
  previous() {
    this.carousel.prev();
  }

  @bound
  getListingDetailsURL({ listingId, provinceOrState }) {
    return `${url.listingDetails.replace(
      ":listingId",
      listingId
    )}?${provinceOrState}`;
  }

  //TODO-Robbie: Use object.entries here to get the region of the tagged listings as well
  componentDidMount() {
    const { taggedListings } = this.props;
    const taggedListingsIds = [];
    const listingImages = [];

    Object.keys(taggedListings).map(listingId =>
      taggedListingsIds.push(listingId)
    );
    // TODO-Robbie: Check this out and delete
    if (taggedListingsIds.length > 0) {
      fetchMultipleFeatureImageUrls(Object.entries(taggedListings)).then(
        results => {
          results.forEach(listing => {
            const listingId =
              listing && Object.keys(listing) && Object.keys(listing)[0];
            if (listingId) {
              const provinceOrState = Object.entries(taggedListings).find(
                taggedListing => {
                  return taggedListing[0] === listingId;
                }
              )[1];

              listingImages.push({
                id: listingId,
                provinceOrState,
                url: listing[listingId].featureImageUrl
              });
            }
          });
          this.setState({ listingImages });
        }
      );
    }
  }

  @bound
  renderCarouselImages(listingImages) {
    return (
      listingImages &&
      listingImages.map(image => {
        return (
          <div key={image.id}>
            <Link
              to={`${this.getListingDetailsURL({
                listingId: image.id,
                provinceOrState: image.provinceOrState
              })}`}
            >
              <img src={image.url} />
            </Link>
          </div>
        );
      })
    );
  }

  render() {
    const { listingImages } = this.state;
    const props = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow:
        listingImages.length > this.props.slidesToShow
          ? this.props.slidesToShow
          : listingImages.length - 1,
      slidesToScroll: 1
    };
    const { isLoading, intl } = this.props;
    const listImagesExist = listingImages.length > 0;

    return (
      <div className="posting-tag-properties-container">
        <Card bordered={false}>
          {isLoading ? (
            <ActivityIndicator
              spinning={isLoading}
              type={translate(intl, "loading")}
            />
          ) : (
            <div className="posting-tag-properties-carousel">
              {listImagesExist && (
                <React.Fragment>
                  <CarouselArrow
                    key="left"
                    direction="left"
                    onClick={this.previous}
                  />
                  <CarouselArrow
                    key="right"
                    direction="right"
                    onClick={this.next}
                  />
                  <Carousel
                    className="tagged-properties-image-grid"
                    ref={node => (this.carousel = node)}
                    {...props}
                  >
                    {this.renderCarouselImages(listingImages)}
                  </Carousel>
                </React.Fragment>
              )}
            </div>
          )}
        </Card>
      </div>
    );
  }
}

export default JobTaggedListings;
