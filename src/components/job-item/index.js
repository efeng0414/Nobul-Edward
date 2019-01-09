import React, { Component } from "react";
import { Link } from "react-router-dom";
import PencilIcon from "react-icons/lib/ti/pencil";
import { Card, Avatar, Modal, Button } from "antd";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import TrashIcon from "react-icons/lib/fa/trash-o";
import { bound } from "class-bind";

import {
  MAX_CURRENT_LISTING_PRICE,
  MAX_DISPLAY_PRICE
} from "../../../core/constants/shared";
import {
  JOB_CLOSED,
  JOB_OPEN,
  JOB_EXPIRED,
  JOB_DRAFT
} from "../../../core/constants/jobs";
import PropertyCriteria from "../property-criteria";
import PropertyFeaturesIconList from "../property-features-icon-list";
import EditJobTitle from "../../components/edit-job-title";
import { NAME, JOB_TYPE, BUY } from "../../../core/api-transform/jobs";
import { PROPERTY_MAP } from "../../utilities/constants";
import { translate } from "../../utilities/locale";
import { formatTimestampDate } from "../../../core/utilities/date";
import { getCountryFromJob } from "../../../core/utilities/location";
import Currency from "../currency";

import "./styles.scss";

class JobItem extends Component {
  state = {
    jobTitle: "",
    modalVisible: false,
    resetTitleInput: false,
    deletePostingModalVisible: false
  };

  static propTypes = {
    job: PropTypes.object,
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired,
    deleteJob: PropTypes.func,
    updateJob: PropTypes.func,
    consumerCity: PropTypes.string,
    cardLink: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {}
  };

  @bound
  editTitle(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      modalVisible: true,
      resetTitleInput: false
    });
  }

  @bound
  handleSubmit({ newTitle }) {
    this.closeModal();
    const jobData = {
      [JOB_TYPE]: this.props.job.jobType,
      [NAME]: newTitle[NAME]
    };
    this.props.updateJob({ jobData, jobId: this.props.job.id });
  }

  @bound
  closeModal() {
    this.setState({
      modalVisible: false,
      resetTitleInput: true
    });
  }

  @bound
  closeDeleteConfirmationModal() {
    this.setState({
      deletePostingModalVisible: false
    });
  }

  @bound
  deleteJob(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      deletePostingModalVisible: true
    });
  }

  @bound
  formatPriceDisplay({ priceRangeLow, priceRangeHigh }) {
    const country = getCountryFromJob({ jobDetail: this.props.job });

    if (
      priceRangeLow === priceRangeHigh &&
      priceRangeLow === MAX_CURRENT_LISTING_PRICE
    ) {
      return (
        <span>
          <Currency value={priceRangeHigh} currency={country} />+
        </span>
      );
    }
    if (priceRangeLow === priceRangeHigh) {
      return <Currency value={priceRangeHigh} currency={country} />;
    }
    if (priceRangeHigh === MAX_CURRENT_LISTING_PRICE) {
      return (
        <span>
          <Currency value={priceRangeLow} currency={country} /> -
          <Currency value={MAX_DISPLAY_PRICE} currency={country} />+
        </span>
      );
    }
    return (
      <span>
        <Currency value={this.props.job.priceRangeLow} currency={country} /> -
        <Currency value={this.props.job.priceRangeHigh} currency={country} />
      </span>
    );
  }

  @bound
  lookFor() {
    return this.props.job.jobType === BUY
      ? translate(this.props.intl, "lookingBuy")
      : translate(this.props.intl, "lookingSell");
  }

  @bound
  confirmDeleteJob() {
    this.props
      .deleteJob({
        jobType: this.props.job.jobType,
        jobId: this.props.job.id
      })
      .then(this.closeDeleteConfirmationModal);
  }

  render() {
    const bath = this.props.job.bathrooms || 0;
    const bed = this.props.job.bedrooms || 0;
    const title = this.props.job.name
      ? this.props.job.name
      : translate(this.props.intl, "defaultTitle");
    const offerCount = !this.props.job.offerCount
      ? 0
      : this.props.job.offerCount;

    const priceRange = this.formatPriceDisplay({
      priceRangeLow: this.props.job.priceRangeLow,
      priceRangeHigh: this.props.job.priceRangeHigh
    });

    const jobItemClass = `job-item ${this.props.job.status === JOB_CLOSED &&
      "status-closed"}`;

    const showDeleteIcon = [
      JOB_OPEN,
      JOB_CLOSED,
      JOB_DRAFT,
      JOB_EXPIRED
    ].includes(this.props.job.status);

    return (
      <div className={jobItemClass}>
        {this.props.updateJob && (
          <Modal
            title={translate(this.props.intl, "editPostingTitle")}
            visible={this.state.modalVisible}
            footer={null}
            onCancel={this.closeModal}
          >
            <EditJobTitle
              intl={this.props.intl}
              submitNewTitle={this.handleSubmit}
              closeModal={this.closeModal}
              title={title}
              resetTitle={this.state.resetTitleInput}
            />
          </Modal>
        )}
        <Link to={this.props.cardLink} onClick={this.props.onClick}>
          <Card bordered={false}>
            <div className="job-item-agent-tools">
              {/* Listing date */}
              <div className={"job-item-date"}>
                {formatTimestampDate({
                  timestamp: this.props.job.createdAt,
                  dateFormat: "MMM DD, YYYY"
                })}
              </div>

              {/* consumers only - job status and delete*/}
              {this.props.deleteJob &&
                this.props.job.status === JOB_OPEN && (
                  <p className={"job-item-proposal-with-numbers"}>
                    {`${offerCount} ${translate(this.props.intl, "proposals")}`}
                  </p>
                )}
              {this.props.deleteJob && (
                <div className="job-item-proposal-status">
                  <p
                    className={`job-item-proposal-status-${
                      this.props.job.status
                    }`}
                  >
                    {translate(this.props.intl, `${this.props.job.status}`)}
                  </p>
                </div>
              )}

              {this.props.deleteJob &&
                (this.props.job.status === JOB_OPEN ||
                  this.props.job.status === JOB_EXPIRED) && (
                  <button
                    className="job-item-trash-icon"
                    onClick={this.deleteJob}
                  >
                    <TrashIcon size={16} />
                  </button>
                )}
            </div>

            {/* Headline information */}
            <div className="job-item-header">
              <Avatar
                className="job-item-icon"
                src={
                  PROPERTY_MAP[
                    this.props.job.status === JOB_CLOSED
                      ? JOB_CLOSED
                      : this.props.job.jobType
                  ][this.props.job.propertyType]
                }
              />
              <div className="job-item-title">
                {this.props.updateJob
                  ? this.props.job.name
                  : translate(this.props.intl, `${this.props.job.jobType}er`)}
                {this.props.updateJob && (
                  <button onClick={this.editTitle}>
                    <PencilIcon size="20" />
                  </button>
                )}
              </div>
              {this.props.job.status === JOB_CLOSED ? (
                <span className="job-item-summery-closed">
                  {translate(this.props.intl, "dealClosed") +
                    formatTimestampDate({
                      timestamp: this.props.job.updatedAt,
                      dateFormat: "MMM DD, YYYY"
                    })}
                </span>
              ) : (
                <span className="job-item-summary">
                  {this.lookFor()}
                  <span className="job-item-summary-type">
                    {translate(this.props.intl, [this.props.job.propertyType])}
                  </span>
                </span>
              )}
            </div>

            {/* Property type and neighborhood */}
            <PropertyCriteria
              job={this.props.job}
              intl={this.props.intl}
              priceRange={priceRange}
              bath={bath}
              bed={bed}
            />

            {/* Property icons */}
            <PropertyFeaturesIconList
              propertyFeatures={this.props.job.propertyFeatures}
              showMaximum={4}
              intl={this.props.intl}
            />
          </Card>
        </Link>
        <Modal
          visible={this.state.deletePostingModalVisible}
          onCancel={this.closeDeleteConfirmationModal}
          footer={[
            <Button key="submit" type="primary" onClick={this.confirmDeleteJob}>
              {translate(this.props.intl, "consumer.yes")}
            </Button>
          ]}
          className="confirm-posting-delete-modal"
        >
          {translate(this.props.intl, "confirmDeletePosting")}
        </Modal>
      </div>
    );
  }
}

export default JobItem;
