import React, { PureComponent } from "react";
import { Dropdown, Menu, Icon } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import {
  OFFER_OPEN,
  OFFER_REJECTED,
  OFFER_UNREAD,
  OFFER_FAVORITE
} from "../../../core/constants/offers";
import { ALL } from "../../../core/constants/shared";
import {
  CONSUMER_HAS_READ,
  IS_FAVORITE,
  STATUS
} from "../../../core/api-transform/offers";

import "./styles.scss";

class ConsumerOfferFilter extends PureComponent {
  static propTypes = {
    intl: PropTypes.any,
    onFilterChange: PropTypes.func
  };

  static defaultProps = {
    onFilterChange: () => {}
  };

  @bound
  handleFilter(menuItemClicked) {
    let filterBy = {};
    switch (menuItemClicked.key) {
      case OFFER_UNREAD:
        filterBy = { [CONSUMER_HAS_READ]: false };
        break;
      case OFFER_FAVORITE:
        filterBy = { [IS_FAVORITE]: true };
        break;
      case ALL:
        filterBy = {};
        break;
      default:
        filterBy = { [STATUS]: menuItemClicked.key };
        break;
    }
    this.props.onFilterChange({ filter: filterBy });
  }

  componentWillUnmount() {
    this.props.onFilterChange({ filter: {} });
  }

  render() {
    const { intl } = this.props;
    const menu = (
      <Menu className="offer-filters-overlay-menu" onClick={this.handleFilter}>
        <Menu.Item key={ALL}>{translate(intl, "offerAll")}</Menu.Item>
        <Menu.Item key={OFFER_UNREAD}>
          {translate(intl, "offerUnread")}
        </Menu.Item>
        <Menu.Item key={OFFER_FAVORITE}>
          {translate(intl, "offerFavorite")}
        </Menu.Item>
        <Menu.Item key={OFFER_REJECTED}>
          {translate(intl, "offerRejected")}
        </Menu.Item>
        <Menu.Item key={OFFER_OPEN}>{translate(intl, "offerOpen")}</Menu.Item>
      </Menu>
    );

    return (
      <div className="offer-filters">
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <a className="offer-filters-overlay" href="#">
            {translate(intl, "offerFilter")} <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default ConsumerOfferFilter;
