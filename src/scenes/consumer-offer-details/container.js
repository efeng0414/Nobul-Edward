import React, { Component } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { Modal, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { bound } from "class-bind";

import ActivityIndicator from "../../components/activity-indicator";
import { translate } from "../../utilities/locale";
import {
  OFFER_OPEN,
  OFFER_ACCEPTED,
  REJECT_OFFER
} from "../../../core/constants/offers";
import {
  EVENT_TYPE_INPERSON,
  EVENT_TYPE_PHONE_CALL
} from "../../../core/constants/events";
import {
  STATUS,
  IS_FAVORITE,
  JOB_ID,
  PERSONALIZED_MESSAGE
} from "../../../core/api-transform/offers";
import { NAME } from "../../../core/api-transform/jobs";

import ConsumerOfferDetailsServices from "../../components/consumer-offer-details-services";
import ConsumerOfferDetailsAgent from "../../components/consumer-offer-details-agent";
import ConsumerOfferAcceptOrReject from "../../components/consumer-offer-accept-or-reject";
import ConsumerOfferDetailsButtons from "../../components/consumer-offer-details-buttons";
import ConsumerOfferDetailsOfferStatus from "../../components/consumer-offer-details-offer-status";
import ConsumerFavoriteOffer from "../../components/consumer-favorite-offer";
import ConsumerStories from "../../components/consumer-stories";
import ConsumerOfferCongratulations from "../../components/consumer-offer-congratulations";
import AppointmentForm from "../../components/appointment-form";
import EventModalCongratulations from "../../components/event-modal-congratulations";
import NobulTip from "../../components/nobul-tip";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import { url } from "../../routes/myNobul";
import Devices from "../../components/breakpoints/devices";
import Desktop from "../../components/breakpoints/desktop";
import { TABLET, MOBILE } from "../../../core/constants/breakpoints";

import "./styles.scss";

class CustomerOfferDetails extends Component {
  state = {
    jobType: "",
    offerId: "",
    confirmationModalVisible: false,
    action: "",
    updatedOfferStatus: "",
    isFavorite: false,
    showButton: false,
    offerCongratulationModalVisible: false,
    meetingModalVisible: false,
    meetingCongratulationModalVisible: false,
    resetFormValue: false,
    shouldShowScheduleMeetingButton: true
  };

  static propTypes = {
    intl: PropTypes.any,
    getOfferDetail: PropTypes.func,
    offer: PropTypes.object,
    match: PropTypes.object,
    acceptOffer: PropTypes.func,
    rejectOffer: PropTypes.func,
    setFavoriteOffer: PropTypes.func,
    agentProfile: PropTypes.object,
    getAgentWithAvatar: PropTypes.func,
    getJobDetail: PropTypes.func,
    jobDetail: PropTypes.object,
    currentUser: PropTypes.object,
    events: PropTypes.object
  };

  static defaultProps = {
    getOfferDetail: () => {},
    offer: { jobId: "" },
    match: {},
    events: {},
    acceptOffer: () => {},
    rejectOffer: () => {},
    setFavoriteOffer: () => {},
    agentProfile: { agentInformation: { brokerageName: "" } },
    getAgentWithAvatar: () => {},
    getJobDetail: () => {},
    jobDetail: { name: "" },
    currentUser: {}
  };

  @bound
  buttonClickHandle({ action }) {
    this.setState({
      confirmationModalVisible: true,
      showButton: false,
      action,
      shouldShowScheduleMeetingButton: action !== REJECT_OFFER
    });
  }

  @bound
  showButton(offer) {
    this.setState({
      showButton: offer[STATUS] === OFFER_OPEN
    });
  }

  @bound
  closeConfirmationModal() {
    this.setState({
      confirmationModalVisible: false
    });
  }

  @bound
  closeOfferCongratulationModal() {
    this.setState({
      offerCongratulationModalVisible: false
    });
  }

  @bound
  confirmationModalCancelHandle() {
    this.setState({
      showButton: true
    });
    this.closeConfirmationModal();
  }

  @bound
  offerHandle(action) {
    this.setState({
      updatedOfferStatus: action,
      offerCongratulationModalVisible: true
    });

    this.closeConfirmationModal();
  }

  @bound
  handleFavoriteStatus(isFavorite) {
    const { jobType, offerId } = this.state;
    const { setFavoriteOffer } = this.props;
    setFavoriteOffer({ jobType, offerId, isFavorite });
    this.setState({
      isFavorite
    });
  }

  @bound
  closeMeetingModal() {
    this.setState({
      meetingModalVisible: false,
      resetFormValue: true
    });
  }

  @bound
  meetingModalCancelHandle() {
    this.closeMeetingModal();
  }

  @bound
  closeMeetingCongratulationModal() {
    this.setState({
      meetingCongratulationModalVisible: false
    });
  }

  @bound
  scheduleMeetingHandle() {
    this.setState({
      meetingModalVisible: true,
      resetFormValue: false
    });
  }

  @bound
  scheduleMeetingSubmitHandle() {
    this.closeMeetingModal();
    this.setState({
      shouldShowScheduleMeetingButton: false,
      meetingCongratulationModalVisible: true
    });
  }

  componentDidMount() {
    const { match, getOfferDetail, offer } = this.props;
    const { jobType, offerId } = match.params;

    getOfferDetail({ jobType, offerId });
    this.showButton(offer);

    this.setState({
      jobType,
      offerId,
      isFavorite: offer[IS_FAVORITE]
    });
  }

  @bound
  disableScheduleMeetingButton(eventObj) {
    const event = eventObj[1];
    const {
      params: { offerId = "" }
    } = this.props.match;
    const eventTypes = [EVENT_TYPE_INPERSON, EVENT_TYPE_PHONE_CALL];

    if (event.offerId === offerId && eventTypes.includes(event.eventType)) {
      this.setState({ shouldShowScheduleMeetingButton: false });
    }
  }

  @bound
  shouldDisableScheduleMeetingButton() {
    Object.entries(this.props.events).map(this.disableScheduleMeetingButton);
  }

  componentDidUpdate(prevProps) {
    const { offer } = this.props;

    this.state.shouldShowScheduleMeetingButton &&
      Object.keys(this.props.events).length &&
      this.shouldDisableScheduleMeetingButton();

    if (prevProps.offer.agentId === offer.agentId) {
      return;
    }

    const offerStatus = offer[STATUS];
    const jobId = offer[JOB_ID];
    this.props.getAgentWithAvatar({ agentId: offer.agentId });
    this.props.getJobDetail({ jobType: this.state.jobType, jobId });
    this.showButton(offer);

    this.setState({
      isFavorite: offer.isFavorite,
      shouldShowScheduleMeetingButton: [OFFER_OPEN, OFFER_ACCEPTED].includes(
        offerStatus
      )
    });
  }

  @bound
  getAgentName() {
    const { firstName, lastName } = this.props.agentProfile.agentInformation;
    return `${firstName} ${lastName}`;
  }

  render() {
    const { intl } = this.props;
    const {
      isLoading,
      jobType,
      offerId,
      action,
      updatedOfferStatus,
      isFavorite,
      showButton
    } = this.state;

    const { agentInformation } = this.props.agentProfile;

    const { offer } = this.props;
    const offerStatus = offer[STATUS];
    const jobId = offer[JOB_ID];

    const { jobDetail } = this.props;
    const jobName = jobDetail[NAME];

    return (
      <ActivityIndicator spinning={isLoading} type="loading">
        <MyDashboardMeta titleKey="helmet.myDashboard.proposalDetails" />
        <div className="offer-details">
          <Breadcrumb separator=">" className="offer-details-breadcrumb">
            <Breadcrumb.Item>
              <Link to={url.jobs}>{translate(intl, "myPostings")}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`${url.partialConsumerJobDetails}/${jobType}/${jobId}`}>
                {jobName}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to={url.consumerJobOffers
                  .replace(":jobType", jobType)
                  .replace(":jobId", jobId)}
              >
                {translate(intl, "proposals")}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={url.jobs}>
                <span>{translate(intl, "offer.agentsFrom")}</span>
                <span className="offer-details-breadcrumb-brokerage">
                  {agentInformation.brokerageName}
                </span>
                <span>{translate(intl, "offer.proposal")}</span>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="offer-details-proposal">
            <div className="offer-details-proposal-details">
              <div className="offer-details-proposal-details-header">
                <h3>{translate(intl, "offer.proposalDetails")}</h3>
                <Desktop>
                  <ConsumerFavoriteOffer
                    isFavorite={isFavorite}
                    handleFavoriteStatus={this.handleFavoriteStatus}
                    showFavoriteIcon
                  />
                </Desktop>
              </div>
              <ConsumerOfferDetailsServices
                intl={intl}
                jobType={jobType}
                offer={offer}
              />
            </div>
            <div className="offer-details-proposal-yellow-column">
              <Devices sizes={[MOBILE, TABLET]}>
                <ConsumerFavoriteOffer
                  isFavorite={isFavorite}
                  handleFavoriteStatus={this.handleFavoriteStatus}
                  showFavoriteIcon
                />
              </Devices>
              {showButton ? (
                <ConsumerOfferDetailsButtons
                  intl={intl}
                  buttonClickHandle={this.buttonClickHandle}
                />
              ) : (
                <ConsumerOfferDetailsOfferStatus
                  intl={intl}
                  offerStatus={offerStatus}
                  updatedOfferStatus={updatedOfferStatus}
                />
              )}
            </div>
          </div>
          <div className="offer-details-tip">
            <NobulTip
              message={translate(intl, "toolTipTitle")}
              description={translate(intl, "toolTipOfferDescription")}
              visible={showButton}
            />
          </div>
          <div className="offer-details-grid">
            <div className="offer-details-grid-learning">
              <div>
                <h6>{translate(intl, "learningCenter")}</h6>
                <ConsumerStories intl={intl} />
              </div>
            </div>
            <div className="offer-details-grid-agent">
              <h6>{translate(intl, "aboutTheAgent")}</h6>
              <ConsumerOfferDetailsAgent
                intl={intl}
                agentProfile={this.props.agentProfile}
                scheduleMeetingHandle={this.scheduleMeetingHandle}
                message={offer[PERSONALIZED_MESSAGE]}
                shouldShowScheduleMeetingButton={
                  this.state.shouldShowScheduleMeetingButton
                }
              />
            </div>
          </div>
          <Modal
            title={translate(intl, "offer.confirmation")}
            visible={this.state.confirmationModalVisible}
            footer={null}
            onCancel={this.confirmationModalCancelHandle}
          >
            <ConsumerOfferAcceptOrReject
              intl={intl}
              jobType={jobType}
              offerId={offerId}
              action={action}
              acceptOffer={this.props.acceptOffer}
              rejectOffer={this.props.rejectOffer}
              offerHandle={this.offerHandle}
            />
          </Modal>
          <Modal
            visible={this.state.offerCongratulationModalVisible}
            footer={null}
            onCancel={this.closeOfferCongratulationModal}
          >
            <ConsumerOfferCongratulations
              intl={intl}
              offerStatus={updatedOfferStatus}
            />
          </Modal>
          <Modal
            title={translate(intl, "appointmentForm.title")}
            visible={this.state.meetingModalVisible}
            footer={null}
            onCancel={this.meetingModalCancelHandle}
          >
            <AppointmentForm
              offerId={this.state.offerId}
              agentId={this.props.offer.agentId}
              consumerId={this.props.currentUser.uid}
              scheduleMeetingSubmitHandle={this.scheduleMeetingSubmitHandle}
              resetFormValue={this.state.resetFormValue}
            />
          </Modal>
          <Modal
            visible={this.state.meetingCongratulationModalVisible}
            footer={null}
            onCancel={this.closeMeetingCongratulationModal}
          >
            <EventModalCongratulations
              intl={intl}
              proposedUserName={this.getAgentName()}
              textLocaleKey={"appointment.meetingScheduleSentSuccessfully"}
            />
          </Modal>
        </div>
      </ActivityIndicator>
    );
  }
}

export default injectIntl(CustomerOfferDetails);
