import React, { Component } from "react";
import { Select } from "antd";
import PropTypes from "prop-types";
import AgentOfferItem from "../agent-offer-item";
import { translate } from "../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import {
  OFFER_OPEN,
  OFFER_ACCEPTED,
  OFFER_REJECTED,
  OFFER_WITHDRAWN,
  OFFER_PENDING_VERIFICATION
} from "../../../core/constants/offers";
import { SHOW_ALL, DATE } from "../../../core/constants/shared";
import { getJobType } from "./utilities";
import { sortByDate } from "../../../core/utilities/sorting-notifications";
import "./styles.scss";

const { Option } = Select;
class AgentOfferList extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    getOffersJobDetails: PropTypes.func,
    offerList: PropTypes.array,
    jobType: PropTypes.string,
    isPremium: PropTypes.bool,
    getOfferCount: PropTypes.func,
    preventLoad: PropTypes.bool
  };

  static defaultProps = {
    getOffersJobDetails: () => {},
    preventLoad: true
  };

  state = {
    status: SHOW_ALL,
    list: this.props.offerList,
    isDescending: false
  };

  componentDidMount() {
    this.props.getOffersJobDetails({
      offers: this.props.offerList,
      jobType: this.props.jobType
    });
  }

  @bound
  handleStatusChange(status) {
    const filteredItems =
      status === SHOW_ALL
        ? this.props.offerList
        : this.props.offerList.filter(item => status === item.status);

    this.props.getOfferCount({
      jobType: this.props.jobType,
      offerCount: filteredItems.length
    });

    this.setState({
      status,
      list: filteredItems
    });
  }

  @bound
  handleDateSort() {
    this.setState({
      list: sortByDate({
        unsortedObjects: this.props.offerList,
        descending: this.state.isDescending
      }),
      isDescending: !this.state.isDescending
    });
  }

  @bound
  renderAgentOfferItem(jobDetails) {
    return (
      <AgentOfferItem
        className="agent-list-item"
        isPremium={this.props.isPremium}
        key={jobDetails.id}
        offerDetail={jobDetails}
        jobType={getJobType({ jobDetails, jobTypeProp: this.props.jobType })}
        preventLoad={this.props.preventLoad}
      />
    );
  }

  renderFilterDropdown({ intl }) {
    const options = [
      { [SHOW_ALL]: "showAll" },
      { [OFFER_OPEN]: "offerOpen" },
      { [OFFER_ACCEPTED]: "offerAccepted" },
      { [OFFER_REJECTED]: "offerRejected" },
      { [OFFER_WITHDRAWN]: "offerWithdrawn" },
      { [OFFER_PENDING_VERIFICATION]: "offerPendingVerification" }
    ];

    return options.map(item => {
      const [label, val] = Object.entries(item)[0];
      return (
        <Option key={val} value={label}>
          {translate(intl, val)}
        </Option>
      );
    });
  }

  render() {
    return (
      <div className="offer-list">
        <div className="offer-list-filter">
          <Select onSelect={this.handleDateSort} defaultValue={DATE}>
            <Option value={DATE}>
              {translate(this.props.intl, "sortByDate")}
            </Option>
          </Select>
          <Select
            className="offer-status-select"
            onChange={this.handleStatusChange}
            defaultValue={translate(this.props.intl, "offerStatus")}
          >
            {this.renderFilterDropdown({ intl: this.props.intl })}
          </Select>
        </div>

        <div className="agent-list">
          {this.state.list.map(this.renderAgentOfferItem)}
        </div>
      </div>
    );
  }
}

export default injectIntl(AgentOfferList);
