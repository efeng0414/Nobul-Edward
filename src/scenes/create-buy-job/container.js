import React, { Component } from "react";
import Helmet from "react-helmet";
import { Steps } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { steps } from "./utilities";
import Desktop from "../../components/breakpoints/desktop";
import Devices from "../../components/breakpoints/devices";
import { MOBILE, TABLET } from "../../../core/constants/breakpoints";
import { getUserPostingUrl } from "../../routes/myNobul";
import * as Routes from "../../routes/routes";
import CreateBuyJobStep1 from "../../components/create-buy-job-steps/step1";
import CreateBuyJobStep2 from "../../components/create-buy-job-steps/step2";
import CreateBuyJobStep3 from "../../components/create-buy-job-steps/step3";
import CreateBuyJobStep4 from "../../components/create-buy-job-steps/step4";
import CreateBuyJobStep5 from "../../components/create-buy-job-steps/step5";
import {
  PROPERTY_TYPES,
  PROPERTY_PRICE_RANGE
} from "../../../core/data/propertyData";
import { getObjectByKey } from "../../../core/utilities/misc";
import {
  PRICE_RANGE_FIELD,
  PROPERTY_TYPE_FIELD,
  CREATED_ON_WEB,
  REGIONS_FIELD,
  BUY,
  SERVICES_EXACT,
  BEDROOMS,
  BATHROOMS,
  DESCRIPTION
} from "../../../core/constants/shared";
import { JOB_DRAFT, JOB_OPEN, JOB } from "../../../core/constants/jobs";
import ActivityIndicator from "../../components/activity-indicator";
import Background from "../../components/background";
import ConsumerBuyJobBackground from "../../assets/images/backgrounds/consumer-buy.jpg";
import ConsumerBuyJobBackgroundMobile from "../../assets/images/backgrounds/consumer-buy-mobile.jpg";
import ontarioPolygons from "../../../core/data/polygon-boundaries/data-ontario-level-6.json";
import torontoPolygons from "../../../core/data/polygon-boundaries/data-toronto-neighbourhoods.json";
import { translate } from "../../utilities/locale";
import { createObjectFromArray } from "../../../core/utilities/array-to-object";
import requireAuth from "../../utilities/require-auth";
import { isConsumer } from "../../utilities/route-verification";
import validateUser from "../../utilities/validate-user";
import ConsumerJobCongratulations from "../../components/consumer-job-congratulations";
import ProgressBar from "../../components/progress-bar";
import { gtmEvent } from "../../utilities/gtm-event";
import {
  ANONYMOUS_REGISTER_BUY_POSTING_REDIRECT,
  BUY_POSTING_STEP_1_CLICK,
  BUY_POSTING_STEP_2_CLICK,
  BUY_POSTING_STEP_3_CLICK,
  BUY_POSTING_STEP_4_CLICK,
  BUY_POSTING_STEP_5_CLICK,
  BUY_POSTING_CREATED_LOGGED_IN_POSTING_FLOW,
  BUY_POSTING_CREATED_ANONYMOUS_POSTING_FLOW
} from "../../utilities/google-tag-variable";
import { addDefaultNameToJob } from "../../utilities/add-default-name-to-job";
import ConsumerJobLoginRegister from "../../components/consumer-job-login-register";
import Login from "../../components/login";

import "./styles.scss";

//TO-DO: Rename steps to be more descriptive rather than using step 1, 2, 3, etc.

const Step = Steps.Step;

@injectIntl
@requireAuth({ allowAnonymous: true })
@validateUser({ fn: isConsumer })
class CreateBuyJob extends Component {
  state = {
    currentStep: 1,
    currentScreen: 1,
    fields: {
      [BATHROOMS]: 0,
      [BEDROOMS]: 0,
      [SERVICES_EXACT]: [],
      [DESCRIPTION]: "",
      [REGIONS_FIELD]: {}
    },
    serviceRange: 3,
    selectedPropertyClass: "",
    showCongratulationsModal: false,
    showAnonymousUserModal: false,
    showLoginModal: false,
    isPolygonSelected: false,
    fromAnonymousUser: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.jobs.success &&
      prevProps.jobs.success !== this.props.jobs.success
    ) {
      gtmEvent({
        name: this.state.fromAnonymousUser
          ? BUY_POSTING_CREATED_ANONYMOUS_POSTING_FLOW
          : BUY_POSTING_CREATED_LOGGED_IN_POSTING_FLOW
      });

      this.setState({
        showCongratulationsModal: true
      });
    }

    const changedScreen =
      prevState.currentScreen !== this.state.currentScreen ||
      prevState.currentStep !== this.state.currentStep;
    changedScreen && this.props.scroll(0, 0);
  }

  @bound
  handleNextStep(values) {
    const fields = this.state.fields;
    Object.entries(values).forEach(([key, value]) => {
      switch (key) {
        case PRICE_RANGE_FIELD: {
          fields.priceRange = value;
          break;
        }
        case PROPERTY_TYPE_FIELD: {
          fields.propertyType = value;
          this.setState({
            selectedPropertyClass: getObjectByKey({
              array: PROPERTY_TYPES,
              key: "value",
              value
            }).propertyClass
          });
          break;
        }
        default: {
          fields[key] = value;
          break;
        }
      }
    });

    const { currentScreen, currentStep } = this.state;
    const numberOfScreens = this.getNumberOfScreens();

    if (currentScreen === numberOfScreens) {
      switch (currentStep) {
        case 1:
          gtmEvent({ name: BUY_POSTING_STEP_1_CLICK });
          break;
        case 2:
          gtmEvent({ name: BUY_POSTING_STEP_2_CLICK });
          break;
        case 3:
          gtmEvent({ name: BUY_POSTING_STEP_3_CLICK });
          break;
        case 4:
          gtmEvent({ name: BUY_POSTING_STEP_4_CLICK });
          break;
        case 5:
          gtmEvent({ name: BUY_POSTING_STEP_5_CLICK });
          break;
      }
      this.setState({ fields, currentStep: currentStep + 1, currentScreen: 1 });
    } else {
      this.setState({ fields, currentScreen: currentScreen + 1 });
    }

    if (currentStep === 5 && currentScreen === numberOfScreens)
      this.handleSaveJob({ isDraft: false });
  }

  @bound
  getNumberOfScreens() {
    if (
      this.props.currentBreakPoint === MOBILE &&
      this.state.currentScreen === 3
    ) {
      return 2;
    } else {
      return steps[`step${this.state.currentStep}`].screens;
    }
  }

  @bound
  handlePreviousStep() {
    const { currentScreen, currentStep } = this.state;
    const numberOfScreens =
      currentStep > 1 ? steps[`step${currentStep - 1}`].screens : 1;

    if (currentScreen === 1)
      this.setState({
        currentStep: currentStep - 1,
        currentScreen: numberOfScreens
      });
    else this.setState({ currentScreen: currentScreen - 1 });
  }

  @bound
  handleServiceRangeChange(value) {
    this.setState({
      servicesRange: value
    });
  }

  @bound
  setSelectedPolygons(selectedPolygons) {
    const { fields } = this.state;
    fields.regions = selectedPolygons;
    this.setState({ fields });
  }

  @bound
  handlePolygonClick(e) {
    const { fields } = this.state;
    const { regions = {} } = fields;
    const polygonId = e.layer.feature.properties["polygonId"];
    let selectedPolygons = Object.assign(regions);

    if (selectedPolygons[polygonId]) {
      delete selectedPolygons[polygonId];
    } else {
      selectedPolygons[polygonId] = {
        name: e.layer.feature.properties.name,
        country: e.layer.feature.properties.country,
        province: e.layer.feature.properties.provinceOrState
      };
    }
    fields.regions = selectedPolygons;
    this.setState({
      fields,
      isPolygonSelected: !this.state.isPolygonSelected
    });
  }

  @bound
  handleRemoveRegion(e) {
    const { fields } = this.state;
    const { regions = {} } = fields;
    const polygonId = e.currentTarget.value;
    let selectedPolygons = Object.assign(regions);
    delete selectedPolygons[polygonId];
    fields.regions = selectedPolygons;
    this.setState({ fields });
  }

  @bound
  handlePolygonMouseOver(polygonId) {
    let isPolygonSelected = false;

    if (this.state.fields.regions) {
      isPolygonSelected = Object.keys(this.state.fields.regions).some(
        selectedPolygonId => selectedPolygonId === polygonId
      );
    }

    this.setState({
      isPolygonSelected
    });
  }

  @bound
  mergePolygonLayers() {
    return {
      [ontarioPolygons.layerId]: ontarioPolygons,
      [torontoPolygons.layerId]: torontoPolygons
    };
  }

  @bound
  getJobPostingParameters({ isDraft = false }) {
    const { fields } = this.state;
    const priceRange = fields.priceRange;

    return {
      createdOn: CREATED_ON_WEB,
      jobType: BUY,
      propertyType: fields.propertyType,
      propertyFeatures: createObjectFromArray(fields.propertyFeatures),
      bathrooms: fields.propertyBathrooms,
      bedrooms: fields.propertyBedrooms,
      priceRangeLow: PROPERTY_PRICE_RANGE[priceRange[0]].numericValue,
      priceRangeHigh: PROPERTY_PRICE_RANGE[priceRange[1]].numericValue,
      regions: fields.regions,
      status: isDraft ? JOB_DRAFT : JOB_OPEN,
      consumerId: this.props.users.currentUser.uid,
      servicesRange: fields.servicesRange,
      services: createObjectFromArray(fields.servicesExact),
      description: fields.description || "",
      name: JOB
    };
  }

  @bound
  redirectToLogin() {
    this.toggleShowAnonymousUserModal();
    this.toggleLoginModal();
  }

  @bound
  redirectToRegister() {
    const jobParams = this.getJobPostingParameters({ isDraft: false });
    this.props.history.push({
      pathname: Routes.url.consumerRegistration,
      state: { jobParams }
    });
    gtmEvent({
      name: ANONYMOUS_REGISTER_BUY_POSTING_REDIRECT
    });
  }

  @bound
  handleAnonymousModalClose() {
    this.toggleShowAnonymousUserModal();
    this.props.history.push({
      pathname: Routes.url.home
    });
  }

  @bound
  toggleShowAnonymousUserModal() {
    this.setState({
      showAnonymousUserModal: !this.state.showAnonymousUserModal
    });
  }

  @bound
  toggleLoginModal() {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    });
  }

  @bound
  onLogin() {
    this.handleSaveJob({ isDraft: false });
    this.toggleLoginModal();
  }

  @bound
  handleSaveJob({ isDraft = false }) {
    if (this.props.isAnonymousUser) {
      this.setState({
        showAnonymousUserModal: true,
        fromAnonymousUser: true
      });
      return;
    }

    this.props
      .getAllConsumerBuyJobs({
        userId: this.props.users.currentUser.uid
      })
      .then(() => {
        const jobParams = this.getJobPostingParameters({ isDraft });
        const job = addDefaultNameToJob({
          intl: this.props.intl,
          jobs: this.props.jobs.buy,
          job: jobParams
        });
        this.props.saveJob(BUY, job);
      });
  }

  @bound
  closeCongratulationsModal() {
    this.props.history.push(
      getUserPostingUrl({ jobId: this.props.newJob.jobId, jobType: BUY })
    );
  }

  @bound
  determineClassName() {
    return this.state.currentStep === 2
      ? "create-buy-job__content--full"
      : "create-buy-job__content--center";
  }

  @bound
  renderStep() {
    return Object.keys(steps).map(item => (
      <Step
        key={steps[item].key}
        title={translate(this.props.intl, steps[item].localeId)}
      />
    ));
  }

  render() {
    const {
      currentStep,
      currentScreen,
      fields,
      selectedPropertyClass
    } = this.state;
    const { intl, users } = this.props;

    const {
      propertyType,
      priceRange,
      propertyFeatures,
      propertyBedrooms,
      propertyBathrooms,
      regions,
      description
    } = fields;

    return (
      <Background
        image={
          this.props.currentBreakPoint === MOBILE
            ? ConsumerBuyJobBackgroundMobile
            : ConsumerBuyJobBackground
        }
        className={
          currentStep === 2 ? "create-job__background--without-padding" : null
        }
      >
        <div
          className={
            currentStep === 2
              ? "create-buy-job create-buy-job__step2"
              : "create-buy-job"
          }
        >
          {currentStep >= 1 && (
            <Devices sizes={[MOBILE, TABLET]}>
              <div className="create-buy-job__progress-bar">
                <ProgressBar currentStep={currentStep} numberOfSteps={6} />
              </div>
            </Devices>
          )}
          <ActivityIndicator spinning={this.props.jobs.isLoading} type="saving">
            <Helmet>
              <title>{translate(intl, "helmet.createBuyJob")}</title>
              <meta
                name="description"
                content={translate(intl, "helmet.createBuyJobDescription")}
              />
            </Helmet>

            <Desktop>
              {currentStep >= 1 && (
                <div className="create-buy-job__steps-wrapper">
                  <div className="create-buy-job__steps-with-heading">
                    <Steps
                      className="create-buy-job__steps"
                      current={currentStep - 1}
                    >
                      {this.renderStep()}
                    </Steps>
                    {currentStep === 2 && (
                      <h1>
                        {translate(
                          this.props.intl,
                          "createBuyJob.chooseNeighborhood"
                        )}
                      </h1>
                    )}
                  </div>
                </div>
              )}
            </Desktop>
            <div className="create-buy-job__content">
              <div className={this.determineClassName()}>
                {currentStep === 1 && (
                  <CreateBuyJobStep1
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    currentScreen={currentScreen}
                    intl={intl}
                    fields={{
                      propertyType,
                      priceRange
                    }}
                    currentBreakPoint={this.props.currentBreakPoint}
                  />
                )}
                {currentStep === 2 && (
                  <CreateBuyJobStep2
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    intl={intl}
                    currentScreen={currentScreen}
                    polygons={this.props.polygons}
                    getPolygonBoundaries={this.props.getPolygonBoundaries}
                    selectedPolygons={regions}
                    onPolygonClick={this.handlePolygonClick}
                    onRemoveRegion={this.handleRemoveRegion}
                    setSelectedPolygons={this.setSelectedPolygons}
                    defaultAddress={
                      this.state.fields.locationInput &&
                      this.state.fields.locationInput.formatted_address
                    }
                    handlePolygonMouseOver={this.handlePolygonMouseOver}
                    isPolygonSelected={this.state.isPolygonSelected}
                    currentBreakPoint={this.props.currentBreakPoint}
                    currentUserProfile={users || null}
                  />
                )}
                {currentStep === 3 && (
                  <CreateBuyJobStep3
                    currentBreakPoint={this.props.currentBreakPoint}
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    currentScreen={currentScreen}
                    selectedPropertyClass={selectedPropertyClass}
                    intl={intl}
                    fields={{
                      propertyFeatures,
                      propertyBedrooms,
                      propertyBathrooms
                    }}
                  />
                )}
                {currentStep === 4 && (
                  <CreateBuyJobStep4
                    currentBreakPoint={this.props.currentBreakPoint}
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    onServiceRangeChange={this.handleServiceRangeChange}
                    currentScreen={currentScreen}
                    intl={intl}
                    fields={{
                      servicesExact: this.state.fields.servicesExact,
                      servicesRange: this.state.servicesRange
                    }}
                  />
                )}
                {currentStep === 5 && (
                  <CreateBuyJobStep5
                    currentBreakPoint={this.props.currentBreakPoint}
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    currentScreen={currentScreen}
                    fields={{ description }}
                    gtmClassName="googletag-consumer-buy-real-estate-end"
                  />
                )}
              </div>
            </div>
            <ConsumerJobCongratulations
              visible={this.state.showCongratulationsModal}
              onCancel={this.closeCongratulationsModal}
              intl={this.props.intl}
            />
            <ConsumerJobLoginRegister
              visible={this.state.showAnonymousUserModal}
              onCancel={this.handleAnonymousModalClose}
              onLogin={this.redirectToLogin}
              onRegister={this.redirectToRegister}
              intl={this.props.intl}
            />
            <Login
              isLoginVisible={this.state.showLoginModal}
              onLoginCancel={this.toggleLoginModal}
              history={this.props.history}
              intl={this.props.intl}
              onJoinNobulFromLogin={this.redirectToRegister}
              onLogin={this.onLogin}
            />
          </ActivityIndicator>
        </div>
      </Background>
    );
  }
}

CreateBuyJob.propTypes = {
  intl: intlShape.isRequired,
  jobs: PropTypes.object,
  saveJob: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  polygons: PropTypes.object.isRequired,
  getAllConsumerBuyJobs: PropTypes.func.isRequired,
  getPolygonBoundaries: PropTypes.func.isRequired,
  history: PropTypes.any,
  currentBreakPoint: PropTypes.string,
  scroll: PropTypes.func,
  newJob: PropTypes.object,
  isAnonymousUser: PropTypes.bool
};

CreateBuyJob.defaultProps = {
  intl: {},
  jobs: {},
  users: {},
  scroll: window.scroll.bind(window),
  newJob: {},
  isAnonymousUser: true
};

export default CreateBuyJob;
