import React, { Component } from "react";
import { withRouter } from "react-router";

import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import * as Routes from "../../routes/routes";
import { Steps, Modal, Button, Progress } from "antd";

import ActivityIndicator from "../../components/activity-indicator";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { translate } from "../../utilities/locale";
import { isAgent } from "../../utilities/route-verification";
import LicenceForm from "../../components/forms/agent/licence-form";

import CongratulationsIcon from "../../assets/images/congratulations_icon.svg";

// Standard proposal steps
import Step1 from "../../components/standard-proposal-flow-steps/step1";
import Step2 from "../../components/standard-proposal-flow-steps/step2";
import Step3 from "../../components/standard-proposal-flow-steps/step3";
import Step4 from "../../components/standard-proposal-flow-steps/step4";
import Step5 from "../../components/standard-proposal-flow-steps/step5";

import Background from "../../components/background";
import BackgroundImage from "../../assets/images/backgrounds/Agent_flow.jpg";

import { BUSINESS_PROFILE_CREATED } from "../../../core/api-transform/users";
import {
  checkForCached,
  cacheItem,
  removeCachedItem
} from "../../utilities/cache-handler";

import "./styles.scss";
import { BUY, SELL } from "../../../core/constants/shared";
import { getProvinceCode } from "../../../core/utilities/get-province-code";
import {
  AGENT_TYPE,
  PROPERTY_TYPES,
  LOCATIONS,
  DEFAULT_COMMISSIONS,
  SERVICES
} from "../../../core/api-transform/users";
import { TABLET, MOBILE } from "../../../core/constants/breakpoints";
import Devices from "../../components/breakpoints/devices";
import Desktop from "../../components/breakpoints/desktop";

import {
  AGENT_STANDARD_PROPOSAL_FLOW_START,
  AGENT_STANDARD_PROPOSAL_FLOW_SUBMIT
} from "../../utilities/google-tag-variable";
import { gtmEvent } from "../../utilities/gtm-event";

@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
class StandardProposalFlow extends Component {
  state = {
    showSuccessModal: false,
    showCancelModal: false,
    standardProposalFields: {
      [AGENT_TYPE]: [BUY, SELL],
      [PROPERTY_TYPES]: [],
      [LOCATIONS]: {},
      [DEFAULT_COMMISSIONS]: {},
      [SERVICES]: {},
      [BUSINESS_PROFILE_CREATED]: true,
      bound: {},
      viewportCordinates: {},
      address: {},
      tagline: "",
      personalizedMessage: "",
      state: ""
    },
    isPolygonSelected: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    match: PropTypes.object,
    history: PropTypes.object,
    polygons: PropTypes.object.isRequired,
    setStandardProposal: PropTypes.func,
    getSignedInUserNode: PropTypes.func,
    getPolygonBoundaries: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    businessProfileCreated: PropTypes.bool,
    hasLicenceData: PropTypes.bool,
    currentBreakPoint: PropTypes.string,
    agentProvinceOrState: PropTypes.string
  };

  // Navigation
  // ==============
  goToStep(stepNumber, stageNumber) {
    this.props.history.push(
      Routes.url.standardProposalFlow
        .replace(":step?", stepNumber)
        .replace(":stage?", stageNumber || "")
    );
  }

  @bound
  goPreviousStep(stage) {
    const thisStep = parseInt(this.props.match.params.step);
    const prevStep = thisStep - 1;

    if (prevStep > 0) {
      this.goToStep(prevStep, stage);
    }
  }

  @bound
  goNextStep(value) {
    const step = this.props.match.params.step;
    const thisStep = step ? parseInt(step) : 1;

    //Only for the map location step
    step === 2 && this.setFields({ locationInput: value });

    this.goToStep(thisStep + 1);
  }

  @bound
  resetLocation() {
    this.setFields({ locations: {} });
  }

  componentDidMount() {
    // Load stored fields
    const standardProposalFields = checkForCached("standardProposalFields");
    if (standardProposalFields) {
      this.setState({ standardProposalFields });
    }
    // Only fire GTM event once.
    if (parseInt(this.props.match.params.step) <= 1) {
      gtmEvent({ name: AGENT_STANDARD_PROPOSAL_FLOW_START });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.step &&
      (this.props.match.params.step !== prevProps.match.params.step ||
        this.props.match.params.stage !== prevProps.match.params.stage)
    ) {
      // Jump to top of screen;
      window.scrollTo(0, 0);
    }

    // Proposal has been stored.
    // Do something!
    if (
      prevProps.businessProfileCreated !== this.props.businessProfileCreated &&
      this.props.businessProfileCreated
    ) {
      this.props.getSignedInUserNode(this.props.currentUser);
      // Open modal
      this.setState({ showSuccessModal: true });
    }
  }

  componentWillUnmount() {
    removeCachedItem("standardProposalFields");
  }

  @bound
  goToMarketplace() {
    this.props.history.push(Routes.url.marketPlace);
  }

  @bound
  closeCancelModal() {
    this.setState({ showCancelModal: false });
  }

  @bound
  showCancelModal() {
    this.setState({ showCancelModal: true });
  }

  // Maps
  // ==============

  @bound
  handlePolygonClick(e) {
    const polygonId = e.layer.feature.properties["polygonId"];
    const provinceOrState = getProvinceCode({
      provinceOrState: e.layer.feature.properties.provinceOrState
    });
    let selectedPolygons = Object.assign(
      this.state.standardProposalFields.locations
    );
    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    } else {
      selectedPolygons[polygonId] = {
        name: e.layer.feature.properties.name,
        country: e.layer.feature.properties.country,
        province: e.layer.feature.properties.provinceOrState
      };
    }
    this.setFields({
      locations: selectedPolygons,
      state: provinceOrState
    });

    this.setState({
      isPolygonSelected: !this.state.isPolygonSelected
    });
  }

  @bound
  setSelectedPolygons(selectedPolygons) {
    this.setFields({ locations: selectedPolygons });
  }

  @bound
  removeSelectedPolygon(event) {
    const { locations } = this.state.standardProposalFields;
    delete locations[event.currentTarget.value];
    this.setFields({ locations });
  }
  // Data functions
  // ===============
  @bound
  setCommissions(newCommissions) {
    this.setFields({ [DEFAULT_COMMISSIONS]: newCommissions.commission });
  }

  @bound
  setServices(newServices) {
    const services = this.state.standardProposalFields.services;
    Object.keys(newServices).map(key => {
      return (services[key] = newServices[key]);
    });
    this.setFields({ services });
  }

  @bound
  setFields(stepFields, callback) {
    this.setState(
      {
        standardProposalFields: {
          ...this.state.standardProposalFields,
          ...stepFields
        }
      },
      () => {
        // Store fields in case user refreshes page
        cacheItem("standardProposalFields", this.state.standardProposalFields);
        if (callback) callback();
      }
    );
  }

  @bound
  submitFields(additionalFields) {
    this.setFields(additionalFields, () => {
      // GTM event
      gtmEvent({ name: AGENT_STANDARD_PROPOSAL_FLOW_SUBMIT });

      let filterProposalState = this.filterProposalStateData();
      return this.props.setStandardProposal(
        this.props.currentUser.uid,
        filterProposalState
      );
    });
  }

  @bound
  filterProposalStateData() {
    //this will remove function form properties and its chain
    let cleanObjProps = JSON.parse(
      JSON.stringify(this.state.standardProposalFields)
    );

    //removing extra fields before storing proposal
    delete cleanObjProps["address"];
    delete cleanObjProps["viewportCordinates"];
    delete cleanObjProps["boundaries"];

    return cleanObjProps;
  }

  @bound
  handlePolygonMouseOver(polygonId) {
    let isPolygonSelected = false;

    if (this.state.standardProposalFields.locations) {
      isPolygonSelected = Object.keys(
        this.state.standardProposalFields.locations
      ).some(selectedPolygonId => selectedPolygonId === polygonId);
    }

    this.setState({
      isPolygonSelected
    });
  }

  @bound
  determineClassName(currentStep) {
    return currentStep === 2
      ? "standard-proposal__content--full"
      : "standard-proposal__content--center";
  }

  render() {
    const isLoading = false;
    const currentStep = parseInt(this.props.match.params.step);

    let Component = null;
    switch (currentStep) {
      case 2:
        // Locations and region
        Component = (
          <Step2
            intl={this.props.intl}
            goPreviousStep={this.goPreviousStep} // To Buy or sell
            goNextStep={this.goNextStep}
            getPolygonBoundaries={this.props.getPolygonBoundaries}
            polygons={this.props.polygons}
            selectedPolygons={this.state.standardProposalFields.locations}
            handlePolygonClick={this.handlePolygonClick}
            onCancel={this.showCancelModal}
            setSelectedPolygons={this.setSelectedPolygons}
            onRemoveRegion={this.removeSelectedPolygon}
            resetLocation={this.resetLocation}
            currentBreakPoint={this.props.currentBreakPoint}
            cachedProposalFields={this.state.standardProposalFields}
            agentProvinceOrState={this.props.agentProvinceOrState}
            isPolygonSelected={this.state.isPolygonSelected}
            handlePolygonMouseOver={this.handlePolygonMouseOver}
            defaultAddress={
              this.state.standardProposalFields.locationInput &&
              this.state.standardProposalFields.locationInput.locationInput
                .formatted_address
            }
          />
        );
        break;
      case 3:
        // Serivces
        Component = (
          <Step3
            intl={this.props.intl}
            goPreviousStep={this.goPreviousStep} // To locations and region
            goNextStep={this.goNextStep}
            onChange={this.setServices}
            agentType={this.state.standardProposalFields.agentType}
            services={this.state.standardProposalFields.services}
            onCancel={this.showCancelModal}
            currentBreakPoint={this.props.currentBreakPoint}
          />
        );
        break;
      case 4:
        // Commissions
        Component = (
          <Step4
            intl={this.props.intl}
            goPreviousStep={this.goPreviousStep} // To services
            goNextStep={this.goNextStep}
            onChange={this.setCommissions}
            commission={this.state.standardProposalFields.defaultCommissions}
            province={""} // Get from profile
            country={""} // Get from profile
            agentType={this.state.standardProposalFields.agentType}
            onCancel={this.showCancelModal}
            currentBreakPoint={this.props.currentBreakPoint}
          />
        );
        break;
      case 5:
        // Tag line and about
        Component = (
          <Step5
            intl={this.props.intl}
            goPreviousStep={this.goPreviousStep} // To commissions
            submit={this.submitFields}
            onChange={this.setFields}
            tagline={this.state.standardProposalFields.tagline}
            personalizedMessage={
              this.state.standardProposalFields.personalizedMessage
            }
            agentType={this.state.standardProposalFields.agentType}
            onCancel={this.showCancelModal}
            currentBreakPoint={this.props.currentBreakPoint}
          />
        );
        break;
      default:
        // Buy or sell
        Component = (
          <Step1
            intl={this.props.intl}
            goNextStep={this.goNextStep}
            onChange={this.setFields}
            agentType={this.state.standardProposalFields.agentType}
            cachedPropertyType={this.state.standardProposalFields.propertyTypes}
          />
        );
    }

    const steps = {
      step1: { key: 1, localeId: "propertyClass" },
      step2: { key: 2, localeId: "location" },
      step3: { key: 3, localeId: "consumerServices" },
      step4: { key: 4, localeId: "commission" },
      step5: { key: 5, localeId: "aboutYou" }
    };

    return (
      <ActivityIndicator spinning={isLoading} type="saving">
        <Background
          image={BackgroundImage}
          className={currentStep === 2 ? "background--without-padding" : null}
        >
          <div
            className={
              currentStep === 2
                ? "standard-proposal standard-proposal__step2"
                : "standard-proposal"
            }
          >
            <Helmet
              title={translate(this.props.intl, "helmet.agentRegistration")}
            />

            {!this.props.hasLicenceData && (
              <Modal
                visible={true}
                footer={null}
                closable={true}
                onCancel={this.props.history.goBack}
              >
                <LicenceForm showCompleteProfileText />
              </Modal>
            )}

            {currentStep >= 1 && (
              <Desktop>
                <div className="standard-proposal__steps-wrapper">
                  <div className="standard-proposal__steps-with-heading">
                    <Steps
                      current={currentStep - 1}
                      progressDot={false}
                      className="standard-proposal__steps"
                    >
                      {Object.keys(steps).map(item => (
                        <Steps.Step
                          key={steps[item].key}
                          title={translate(
                            this.props.intl,
                            steps[item].localeId
                          )}
                        />
                      ))}
                    </Steps>
                    {currentStep === 2 && (
                      <h1>
                        {translate(
                          this.props.intl,
                          "marketplaceChooseFirstRegion"
                        )}
                      </h1>
                    )}
                  </div>
                </div>
              </Desktop>
            )}

            {currentStep >= 1 && (
              <Devices sizes={[MOBILE, TABLET]}>
                <Progress
                  percent={Math.round(
                    currentStep * 100 / Object.keys(steps).length
                  )}
                />
              </Devices>
            )}
            <div className="standard-proposal__content">
              <div className={this.determineClassName(currentStep)}>
                {Component}
              </div>
            </div>
          </div>
        </Background>

        <Modal
          visible={this.state.showSuccessModal}
          footer={null}
          closable={false}
          className="standard-proposal-modal"
        >
          <img
            src={CongratulationsIcon}
            alt={translate(this.props.intl, "offer.congratulations")}
          />
          <h3>{translate(this.props.intl, "proposal.congratulations")}</h3>
          <p>
            {translate(this.props.intl, "proposal.congratulationsParagraph")}
          </p>
          <Button type="primary" onClick={this.goToMarketplace}>
            {translate(this.props.intl, "button.continue")}
          </Button>
        </Modal>

        <Modal
          title={translate(this.props.intl, "proposal.cancelTitle")}
          footer={null}
          visible={this.state.showCancelModal}
          onCancel={this.closeCancelModal}
          className="standard-proposal-modal"
        >
          <p className="standard-proposal-cancel-text">
            {translate(this.props.intl, "proposal.cancelText")}
          </p>
          <Button type="primary" onClick={this.goToMarketplace}>
            {translate(this.props.intl, "leavePage")}
          </Button>
        </Modal>
      </ActivityIndicator>
    );
  }
}

export default injectIntl(withRouter(StandardProposalFlow));
