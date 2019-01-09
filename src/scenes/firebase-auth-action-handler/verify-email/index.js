import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";
import * as Routes from "../../../routes/routes";
import { translate } from "../../../utilities/locale";
import { connect } from "react-redux";
import axios from "axios";

import {
  getAllConsumerPendingJobs,
  updateJobAsync
} from "../../../../core/thunk/jobs";
import { JOB_OPEN } from "../../../../core/constants/jobs";
import "./styles.scss";

@injectIntl
class VerifyEmail extends Component {
  static propTypes = {
    actionCode: PropTypes.string.isRequired,
    firebaseApp: PropTypes.object.isRequired,
    updateJobAsync: PropTypes.func.isRequired,
    getAllConsumerPendingJobs: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    intl: intlShape.isRequired
  };

  state = {
    success: false,
    error: false,
    hasTriggeredFetchJobs: false
  };

  componentDidMount() {
    this.props.firebaseApp
      .auth()
      .checkActionCode(this.props.actionCode)
      .then(resp => {
        const email = resp.data.email;

        this.props.firebaseApp
          .auth()
          .applyActionCode(this.props.actionCode)
          .then(() => {
            this.sendWelcomeEmail({ email });

            this.setState({ success: true });
          })
          .catch(error => this.setState({ error }));
      });
  }

  componentDidUpdate() {
    if (!this.state.hasTriggeredFetchJobs && this.props.currentUserId) {
      this.setState({ hasTriggeredFetchJobs: true });
      this.updateJobStatus();
    }
  }

  sendWelcomeEmail({ email }) {
    // Send welcome email
    // Only happens once, no need for redux or anything
    const apiURL = `${process.env.FIREBASE_FUNCTIONS_BASE_URL}/sendWelcomeEmailEndpoint`; // eslint-disable-line

    return axios({
      method: "post",
      url: apiURL,
      data: {
        email
      },
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  updateJobStatus() {
    this.props
      .getAllConsumerPendingJobs(this.props.currentUserId)
      .then(response => {
        // Get the first job id since there can't be more
        // than one jobs at this time
        const jobId = Object.keys(response.payload)[0];
        const { jobType } = response.payload[jobId];
        const jobData = { jobType, status: JOB_OPEN };
        this.props.updateJobAsync({ jobData, jobId });
      });
  }

  render() {
    return (
      <div className="verify-your-email">
        <h1>{translate(this.props.intl, "authAction.verifyEmail.title")}</h1>
        {this.state.success && (
          <p>
            {`${translate(this.props.intl, "authAction.verifyEmail.success")} `}
            <Link to={Routes.url.homeWithLogin} className="login">
              {translate(
                this.props.intl,
                "authAction.verifyEmail.success.login"
              )}
            </Link>.
          </p>
        )}
        {this.state.error && (
          <p>{translate(this.props.intl, "authAction.verifyEmail.error")}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.authentication.currentUser.uid,
  pendingConfirmationJobs: state.jobs.pendingConfirmation
});

const mapDispatchToProps = dispatch => ({
  getAllConsumerPendingJobs: userId =>
    dispatch(getAllConsumerPendingJobs(userId)),

  updateJobAsync: ({ jobData, jobId }) =>
    dispatch(updateJobAsync({ jobData, jobId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
