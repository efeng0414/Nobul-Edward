import React, { Component } from "react";
import Helmet from "react-helmet";
import { Table, Divider, Button } from "antd";
import { injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import {
  CREATED_AT,
  JOB_TYPE,
  PRICE_RANGE_LOW,
  PRICE_RANGE_HIGH,
  PROPERTY_TYPE,
  STATUS
} from "../../../core/api-transform/jobs";
import { JOB_DRAFT_DELETED, JOB_OPEN } from "../../../core/constants/jobs";
import { translate } from "../../utilities/locale";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isConsumer } from "../../utilities/route-verification";

@requireAuth()
@validateUser({ fn: isConsumer })
@injectIntl
class ShowDraftJob extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    jobs: PropTypes.object,
    currentUser: PropTypes.object,
    authUserId: PropTypes.string.isRequired,
    getAllConsumerDraftJobs: PropTypes.func,
    editJob: PropTypes.func
  };

  componentDidMount() {
    this.props.getAllConsumerDraftJobs(this.props.authUserId);
  }

  handleConfirmDraft(record) {
    let { key } = record;
    let jobData = { ...this.props.jobs.draft[key], [STATUS]: JOB_OPEN };
    let jobs = { ...this.props.jobs };
    this.props.editJob(jobData, key, jobs, true);
  }

  handleDeleteDraft(record) {
    let { key } = record;
    let jobData = {
      ...this.props.jobs.draft[key],
      [STATUS]: JOB_DRAFT_DELETED
    };
    let jobs = { ...this.props.jobs };
    this.props.editJob(jobData, key, jobs, true);
  }

  render() {
    const { draft } = this.props.jobs;
    const columns = [
      {
        title: translate(this.props.intl, JOB_TYPE),
        dataIndex: "jobType",
        key: JOB_TYPE,
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: translate(this.props.intl, PRICE_RANGE_HIGH),
        dataIndex: "priceRangeHigh",
        key: PRICE_RANGE_HIGH
      },
      {
        title: translate(this.props.intl, PRICE_RANGE_LOW),
        dataIndex: "priceRangeLow",
        key: PRICE_RANGE_LOW
      },
      {
        title: translate(this.props.intl, PROPERTY_TYPE),
        dataIndex: "propertyType",
        key: PROPERTY_TYPE
      },
      {
        title: translate(this.props.intl, CREATED_AT),
        dataIndex: "createdAt",
        key: CREATED_AT
      },
      {
        title: translate(this.props.intl, "action"),
        key: "action",
        render: record => {
          return (
            <span>
              <Button
                onClick={() => {
                  this.handleConfirmDraft(record);
                }}
              >
                Confirm
              </Button>
              <Divider type="vertical" />
              <Button>Edit</Button>
              <Divider type="vertical" />
              <Button
                onClick={() => {
                  this.handleDeleteDraft(record);
                }}
              >
                Delete
              </Button>
            </span>
          );
        }
      }
    ];
    const data = Object.keys(draft).map(key => {
      let obj = {};
      obj["key"] = key;
      obj[JOB_TYPE] = translate(this.props.intl, draft[key].jobType) || "";
      obj[PRICE_RANGE_HIGH] = draft[key].priceRangeHigh || 0;
      obj[PRICE_RANGE_LOW] = draft[key].priceRangeLow || 0;
      obj[PROPERTY_TYPE] =
        translate(this.props.intl, draft[key].propertyType) || "";
      obj[CREATED_AT] = new Date(draft[key].createdAt).toDateString() || "";
      return obj;
    });

    return (
      <div className="showDraftJob">
        <Helmet title={translate(this.props.intl, "helmet.showDraftJob")} />
        <h2>{translate(this.props.intl, "helmet.showDraftJob")}</h2>
        <Table
          loading={this.props.jobs.isLoading}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

export default ShowDraftJob;
