import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import JobItem from "../job-item";
import { getUserPostingUrl } from "../../routes/myNobul";
import "./styles.scss";

class ConsumerJobList extends PureComponent {
  @bound
  renderJobItem(job) {
    return (
      <div className="consumer-job-card" key={job.id}>
        <JobItem
          job={job}
          intl={this.props.intl}
          deleteJob={this.props.deleteJob}
          updateJob={this.props.updateJob}
          history={history}
          cardLink={getUserPostingUrl({ jobId: job.id, jobType: job.jobType })}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="consumer-job-list">
        {this.props.jobs.map(this.renderJobItem)}
      </div>
    );
  }
}

ConsumerJobList.propTypes = {
  jobs: PropTypes.any,
  deleteJob: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default ConsumerJobList;
