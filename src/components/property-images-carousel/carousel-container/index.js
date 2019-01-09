import React from "react";
import PropTypes from "prop-types";
import { Carousel } from "antd";
import Mobile from "../../../components/breakpoints/mobile";
import Devices from "../../../components/breakpoints/devices";
import { TABLET, DESKTOP } from "../../../../core/constants/breakpoints";
import { LEFT_ARROW, RIGHT_ARROW } from "../utilities";
import CarouselArrow from "../carousel-arrow";

const CarouselContainer = ({
  images,
  setImage,
  setCarousel,
  previous,
  next
}) => (
  <div className="carousel-container">
    <CarouselArrow key="left" direction={LEFT_ARROW} onClick={previous} />
    <CarouselArrow key="right" direction={RIGHT_ARROW} onClick={next} />
    <Devices sizes={[DESKTOP, TABLET]}>
      <Carousel
        className="property-images-grid"
        dots={false}
        onChange={setImage}
        ref={setCarousel}
        slidesToShow={5}
      >
        {images}
      </Carousel>
    </Devices>
    <Mobile>
      <Carousel
        className="property-images-grid"
        dots={false}
        onChange={setImage}
        ref={setCarousel}
        slidesToShow={2}
      >
        {images}
      </Carousel>
    </Mobile>
  </div>
);

CarouselContainer.propTypes = {
  images: PropTypes.array.isRequired,
  setImage: PropTypes.func.isRequired,
  setCarousel: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
};

export default CarouselContainer;
