import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { Menu, Dropdown, Icon, Button } from "antd";
import { bound } from "class-bind";
import PropTypes from "prop-types";

import { translate } from "../../utilities/locale";
import { getSearchParamObject } from "../../utilities/get-search-params";
import requireAuth from "../../utilities/require-auth";
import ConsumerJobList from "../../components/consumer-job-list";
import { JOB_TYPE } from "../../../core/api-transform/jobs";
import { BUY, SELL } from "../../../core/api-transform/offers";
import { sortByDate } from "../../../core/utilities/sorting-notifications";
import MyDashboardMeta from "../../components/my-dashboard-meta";

import "./styles.scss";

@withRouter
@injectIntl
@requireAuth()
class ConsumerJobs extends Component {
  static propTypes = {
    buyJobs: PropTypes.any,
    sellJobs: PropTypes.any,
    intl: PropTypes.any,
    getAllConsumerBuyJobs: PropTypes.func,
    getAllConsumerSellJobs: PropTypes.func,
    authUserId: PropTypes.string.isRequired,
    deleteJobAsync: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    updateJobAsync: PropTypes.func.isRequired
  };

  state = {
    buyerPostingsVisible: true,
    sellerPostingsVisible: false,
    sortText: "",
    isBuyJobsSorted: false,
    isSellJobsSorted: false,
    isBuyJobsDescending: true,
    isSellJobsDescending: true,
    sortedBuyJobs: [],
    sortedSellJobs: []
  };

  componentDidMount() {
    const { getAllConsumerBuyJobs, getAllConsumerSellJobs, intl } = this.props;
    getAllConsumerBuyJobs(this.props.authUserId);
    getAllConsumerSellJobs(this.props.authUserId);

    getSearchParamObject({
      searchParamString: this.props.location.search
    }).sell && this.showSellerPostings();

    this.setState({
      sortText: translate(intl, "sortBy")
    });
  }

  @bound
  showSellerPostings() {
    this.setState({
      buyerPostingsVisible: false
    });
  }

  @bound
  showBuyerPostings() {
    this.setState({
      buyerPostingsVisible: true
    });
  }

  @bound
  sortListings(event) {
    const jobType = event.item.props.type[0];
    let sortedListings = [];

    if (jobType === BUY) {
      sortedListings = sortByDate({
        unsortedObjects: this.props.buyJobs,
        descending: this.state.isBuyJobsDescending
      });

      this.setState({
        isBuyJobsDescending: !this.state.isBuyJobsDescending,
        sortedBuyJobs: sortedListings,
        isBuyJobsSorted: true
      });
    } else {
      sortedListings = sortByDate({
        unsortedObjects: this.props.sellJobs,
        descending: this.state.isSellJobsDescending
      });

      this.setState({
        isSellJobsDescending: !this.state.isSellJobsDescending,
        sortedSellJobs: sortedListings,
        isSellJobsSorted: true
      });
    }
  }

  @bound
  getJobArray({ jobs }) {
    return Object.entries(jobs).map(([key, values]) => ({
      ...values,
      id: key
    }));
  }

  @bound
  updateJob({ jobData, jobId }) {
    this.props.updateJobAsync({ jobData, jobId });

    jobData[JOB_TYPE] === BUY
      ? this.props.getAllConsumerBuyJobs(this.props.authUserId)
      : this.props.getAllConsumerSellJobs(this.props.authUserId);
  }

  render() {
    const { sellJobs, buyJobs, intl } = this.props;
    const selectedKeys = this.state.buyerPostingsVisible ? [BUY] : [SELL];

    return (
      <div className="postings">
        <MyDashboardMeta titleKey="helmet.myDashboard.postings" />
        <div className="postings-tabs">
          <Dropdown
            overlay={
              <Menu onClick={this.sortListings}>
                <Menu.Item key="sortByDate" type={selectedKeys}>
                  {translate(intl, "sortByDate")}
                </Menu.Item>
              </Menu>
            }
          >
            <Button style={{ marginLeft: 8 }}>
              {this.state.sortText} <Icon type="down" />
            </Button>
          </Dropdown>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[BUY]}
            selectedKeys={selectedKeys}
          >
            <Menu.Item key={BUY} onClick={this.showBuyerPostings}>
              {translate(intl, "buyerPostings")}
              <span>({Object.keys(buyJobs).length})</span>
            </Menu.Item>
            <Menu.Item key={SELL} onClick={this.showSellerPostings}>
              {translate(intl, "sellerPostings")}
              <span>({Object.keys(sellJobs).length})</span>
            </Menu.Item>
          </Menu>
        </div>

        {this.state.buyerPostingsVisible ? (
          <ConsumerJobList
            intl={this.props.intl}
            jobs={
              this.state.isBuyJobsSorted
                ? this.state.sortedBuyJobs
                : this.getJobArray({ jobs: buyJobs })
            }
            deleteJob={this.props.deleteJobAsync}
            updateJob={this.updateJob}
          />
        ) : (
          <ConsumerJobList
            intl={this.props.intl}
            jobs={
              this.state.isSellJobsSorted
                ? this.state.sortedSellJobs
                : this.getJobArray({ jobs: sellJobs })
            }
            deleteJob={this.props.deleteJobAsync}
            updateJob={this.updateJob}
          />
        )}
      </div>
    );
  }
}

export default ConsumerJobs;
