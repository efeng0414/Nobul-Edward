import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { List } from "antd";
import { bound } from "../../../node_modules/class-bind";
import ActivityIndicator from "../../components/activity-indicator";
import ListingMapPreviewCard from "../../components/listing-map-preview-card";
import { POPUP_TOP } from "../../../core/constants/shared";
import "./styles.scss";

class ListingMapPreviewList extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    listings: PropTypes.array,
    onListingsLoad: PropTypes.func,
    hasMore: PropTypes.bool,
    popupPosition: PropTypes.string.isRequired,
    provinceOrState: PropTypes.string.isRequired,
    propertyCount: PropTypes.number.isRequired
  };

  static defaultProps = {
    listings: []
  };

  @bound
  getClassName() {
    if (this.props.propertyCount > 3) {
      return this.props.popupPosition === POPUP_TOP
        ? "preview-list__scroll preview-list__scroll--bottom"
        : "preview-list__scroll preview-list__scroll--top";
    } else {
      return this.props.popupPosition === POPUP_TOP
        ? "preview-list__content preview-list__content--bottom"
        : "preview-list__content preview-list__content--top";
    }
  }

  render() {
    return (
      <div className="preview-list">
        <div className={this.getClassName()}>
          <InfiniteScroll
            initialLoad={false}
            hasMore={!this.props.isLoading && this.props.hasMore}
            pageStart={0}
            loadMore={this.props.onListingsLoad}
            useWindow={false}
            threshold={250}
          >
            <List
              dataSource={this.props.listings}
              locale={{ emptyText: "" }}
              split={true}
              renderItem={item => (
                <List.Item key={item.uid}>
                  <ListingMapPreviewCard
                    listing={item}
                    provinceOrState={this.props.provinceOrState}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
          {this.props.isLoading && (
            <ActivityIndicator spinning type="Loading" />
          )}
        </div>
      </div>
    );
  }
}

export default ListingMapPreviewList;
