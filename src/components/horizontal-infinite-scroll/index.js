import React, { Component } from "react";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import debounce from "lodash.debounce";
import "./styles.scss";

export default class HorizontalInfiniteScroll extends Component {
  static propTypes = {
    listings: PropTypes.array,
    renderItem: PropTypes.func,
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func.isRequired,
    pageStart: PropTypes.number,
    threshold: PropTypes.number,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    listings: [],
    renderItem: () => {},
    hasMore: false,
    pageStart: 0,
    threshold: 250,
    isLoading: false
  };

  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
    this.detachMousewheelListener();
  }

  detachMousewheelListener() {
    this.listingsRef.removeEventListener("mousewheel", this.mousewheelListener);
  }

  detachScrollListener() {
    this.listingsRef.removeEventListener("scroll", this.scrollListener);
    this.listingsRef.removeEventListener("resize", this.scrollListener);
  }

  attachScrollListener() {
    if (this.props.hasMore && this.listingsRef) {
      this.listingsRef.addEventListener(
        "scroll",
        debounce(this.scrollListener, 500)
      );
      this.listingsRef.addEventListener(
        "resize",
        debounce(this.scrollListener, 500)
      );
      this.listingsRef.addEventListener(
        "mousewheel",
        debounce(this.mousewheelListener, 500)
      );
    }
  }

  @bound
  mousewheelListener(event) {
    // Prevents Chrome hangups
    // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
    event.deltaY === 1 && event.preventDefault();
  }

  @bound
  scrollListener() {
    const offset = this.listingsRef.scrollWidth - this.listingsRef.scrollLeft;

    if (
      offset <= this.props.threshold &&
      typeof this.props.loadMore === "function" &&
      !this.props.isLoading
    ) {
      this.props.loadMore((this.pageLoaded += 1));
    }
  }

  render() {
    const cards = this.props.listings.map((item, i) =>
      this.props.renderItem(item, i)
    );

    return (
      <div
        className="cards-wrapper"
        ref={listingsRef => (this.listingsRef = listingsRef)}
      >
        {cards}
      </div>
    );
  }
}
