import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import JobItem from "../job-item";
import { EDIT } from "../../../core/constants/shared";
import "./styles.scss";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { url } from "../../routes/routes";

import ActivityIndicator from "../../components/activity-indicator";
import { gtmEvent } from "../../utilities/gtm-event";
import { AGENT_MARKETPLACE_CLICK_POSTING } from "../../utilities/google-tag-variable";

@injectIntl
class JobList extends PureComponent {
  constructor(props) {
    super(props);
    this.scroll = React.createRef();
  }

  static propTypes = {
    jobs: PropTypes.array,
    loadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
    showModal: PropTypes.func,
    type: PropTypes.string,
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    consumers: PropTypes.object,
    shouldResetPageNumber: PropTypes.bool.isRequired
  };

  @bound
  btnLabel() {
    return this.props.type === EDIT
      ? translate(this.props.intl, "button.edit")
      : translate(this.props.intl, "button.makeOffer");
  }

  @bound
  trackClick() {
    return gtmEvent({ name: AGENT_MARKETPLACE_CLICK_POSTING });
  }

  @bound
  isDisabled(job) {
    const agentOffer =
      job &&
      job.agents &&
      Object.keys(job.agents).filter(id => id === this.props.currentUser.uid);
    return this.props.type !== EDIT && agentOffer && agentOffer.length > 0;
  }

  @bound
  renderJobItem(job, key) {
    return (
      <JobItem
        key={key}
        job={job}
        jobKey={key}
        intl={this.props.intl}
        buttonClick={this.props.showModal}
        buttonLabel={this.btnLabel()}
        history={history}
        type={this.props.type}
        disabled={this.isDisabled(job)}
        consumerCity={
          this.props.consumers[job.consumerId] &&
          this.props.consumers[job.consumerId].city
        }
        cardLink={url.agentViewJobDetails
          .replace(":jobType", job.jobType)
          .replace(":jobId", job.key)}
        onClick={this.trackClick}
      />
    );
  }

  @bound
  resetPageLoadNumber(num) {
    this.scroll.current.pageLoaded = num;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldResetPageNumber !== this.props.shouldResetPageNumber) {
      this.resetPageLoadNumber(0);
    }
  }

  render() {
    return (
      <div>
        {objectIsEmpty(this.props.jobs) && (
          <p>{translate(this.props.intl, "marketPlaceNoJobs")}</p>
        )}
        <InfiniteScroll
          className="jobs-list"
          initialLoad={false}
          pageStart={0}
          loadMore={this.props.loadMore}
          hasMore={this.props.hasMore}
          ref={this.scroll}
        >
          {this.props.jobs.map(this.renderJobItem)}
        </InfiniteScroll>

        {this.props.isLoading && (
          <div className="jobs-list__spinner">
            <ActivityIndicator spinning type="Loading" />
          </div>
        )}
      </div>
    );
  }
}

export default JobList;
