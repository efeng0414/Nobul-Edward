import React, { Component } from "react";
import Helmet from "react-helmet";
import { Steps } from "antd";
import { intlShape, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { getUserPostingUrl } from "../../routes/myNobul";
import * as Routes from "../../routes/routes";
import CreateSellJobStep1 from "../../components/create-sell-job-steps/step1";
import CreateSellJobStep2 from "../../components/create-sell-job-steps/step2";
import CreateSellJobStep3 from "../../components/create-sell-job-steps/step3";
import CreateSellJobStep4 from "../../components/create-sell-job-steps/step4";
import CreateBuyJobStep5 from "../../components/create-buy-job-steps/step5";
import {
  PROPERTY_TYPES,
  PROPERTY_PRICE_RANGE
} from "../../../core/data/propertyData";
import { getObjectByKey } from "../../../core/utilities/misc";
import Desktop from "../../components/breakpoints/desktop";
import Devices from "../../components/breakpoints/devices";
import { MOBILE, TABLET } from "../../../core/constants/breakpoints";
import {
  PRICE_RANGE_FIELD,
  PROPERTY_TYPE_FIELD,
  CREATED_ON_WEB,
  SELL,
  SERVICES_EXACT,
  BATHROOMS,
  BEDROOMS,
  DESCRIPTION
} from "../../../core/constants/shared";
import { JOB_DRAFT, JOB_OPEN, JOB } from "../../../core/constants/jobs";
import ActivityIndicator from "../../components/activity-indicator";
import Background from "../../components/background";
import ConsumerSellJobBackground from "../../assets/images/backgrounds/consumer-sell.jpg";
import { translate } from "../../utilities/locale";
import { createObjectFromArray } from "../../../core/utilities/array-to-object";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isConsumer } from "../../utilities/route-verification";
import ConsumerJobCongratulations from "../../components/consumer-job-congratulations";
import ProgressBar from "../../components/progress-bar";
import NobulTip from "../../components/nobul-tip";
import { gtmEvent } from "../../utilities/gtm-event";
import {
  ANONYMOUS_REGISTER_SELL_POSTING_REDIRECT,
  SELL_POSTING_STEP_1_CLICK,
  SELL_POSTING_STEP_2_CLICK,
  SELL_POSTING_STEP_3_CLICK,
  SELL_POSTING_STEP_4_CLICK,
  SELL_POSTING_STEP_5_CLICK,
  SELL_POSTING_CREATED_LOGGED_IN_POSTING_FLOW,
  SELL_POSTING_CREATED_ANONYMOUS_POSTING_FLOW
} from "../../utilities/google-tag-variable";
import { addDefaultNameToJob } from "../../utilities/add-default-name-to-job";
import ConsumerJobLoginRegister from "../../components/consumer-job-login-register";
import Login from "../../components/login";

import "./styles.scss";

const Step = Steps.Step;
const steps = {
  step1: { key: 1, localeId: "propertyType", screens: 2 },
  step2: { key: 2, localeId: "location", screens: 1 },
  step3: { key: 3, localeId: "features", screens: 2 },
  step4: { key: 4, localeId: "benefits", screens: 2 },
  step5: { key: 5, localeId: "personalize", screens: 1 }
};

@injectIntl
@requireAuth({ allowAnonymous: true })
@validateUser({ fn: isConsumer })
class CreateSellJob extends Component {
  state = {
    currentStep: 1,
    currentScreen: 1,
    fields: {
      [BATHROOMS]: 0,
      [BEDROOMS]: 0,
      [SERVICES_EXACT]: [],
      [DESCRIPTION]: ""
    },
    selectedPropertyClass: "",
    serviceRange: 3,
    showCongratulationsModal: false,
    showAnonymousUserModal: false,
    showLoginModal: false,
    fromAnonymousUser: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.jobs.success &&
      prevProps.jobs.success !== this.props.jobs.success
    ) {
      gtmEvent({
        name: this.state.fromAnonymousUser
          ? SELL_POSTING_CREATED_ANONYMOUS_POSTING_FLOW
          : SELL_POSTING_CREATED_LOGGED_IN_POSTING_FLOW
      });

      this.setState({
        showCongratulationsModal: true
      });
    }

    const changedScreen =
      prevState.currentScreen !== this.state.currentScreen ||
      prevState.currentStep !== this.state.currentStep;
    changedScreen && window.scroll(0, 0);
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
    const numberOfScreens = this.determineScreenCount();

    if (currentScreen === numberOfScreens) {
      switch (currentStep) {
        case 1:
          gtmEvent({ name: SELL_POSTING_STEP_1_CLICK });
          break;
        case 2:
          gtmEvent({ name: SELL_POSTING_STEP_2_CLICK });
          break;
        case 3:
          gtmEvent({ name: SELL_POSTING_STEP_3_CLICK });
          break;
        case 4:
          gtmEvent({ name: SELL_POSTING_STEP_4_CLICK });
          break;
        case 5:
          gtmEvent({ name: SELL_POSTING_STEP_5_CLICK });
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
  determineScreenCount() {
    const { currentStep } = this.state;
    if (
      this.props.currentBreakPoint === MOBILE &&
      (currentStep === 2 || currentStep === 4)
    ) {
      return 2;
    } else {
      return steps[`step${currentStep}`].screens;
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
      serviceRange: value
    });
  }

  @bound
  setSelectedPolygons(selectedPolygons) {
    const { fields } = this.state;
    fields.regions = selectedPolygons;
    this.setState({ fields });
  }

  @bound
  handleAddressInputChange(address) {
    const { fields } = this.state;
    fields.address = address;
    this.setState({ fields });
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
  getJobPostingParameters({ isDraft = false }) {
    const { fields } = this.state;
    const priceRange = fields.priceRange;

    return {
      createdOn: CREATED_ON_WEB,
      jobType: SELL,
      propertyType: fields.propertyType,
      propertyFeatures: createObjectFromArray(fields.propertyFeatures),
      bathrooms: fields.propertyBathrooms,
      bedrooms: fields.propertyBedrooms,
      priceRangeLow: PROPERTY_PRICE_RANGE[priceRange[0]].numericValue,
      priceRangeHigh: PROPERTY_PRICE_RANGE[priceRange[1]].numericValue,
      status: isDraft ? JOB_DRAFT : JOB_OPEN,
      address: fields.address,
      regions: fields.regions,
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
      name: ANONYMOUS_REGISTER_SELL_POSTING_REDIRECT
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
      .getAllConsumerSellJobs({
        userId: this.props.users.currentUser.uid
      })
      .then(() => {
        const jobParams = this.getJobPostingParameters({ isDraft });
        const job = addDefaultNameToJob({
          intl: this.props.intl,
          jobs: this.props.jobs.sell,
          job: jobParams
        });
        this.props.saveJob(SELL, job);
      });
  }

  @bound
  closeCongratulationsModal() {
    this.props.history.push(
      getUserPostingUrl({ jobId: this.props.newJob.jobId, jobType: SELL })
    );
  }

  @bound
  getClassName() {
    return this.state.currentStep === 2
      ? "create-sell-job__content--full"
      : "create-sell-job__content--center";
  }

  render() {
    const {
      currentStep,
      currentScreen,
      fields,
      selectedPropertyClass
    } = this.state;
    const {
      propertyType,
      priceRange,
      regions,
      address,
      propertyFeatures,
      propertyBedrooms,
      propertyBathrooms,
      servicesExact,
      description
    } = fields;
    const { intl } = this.props;
    return (
      <Background
        image={ConsumerSellJobBackground}
        className={
          currentStep === 2 ? "create-job__background--without-padding" : null
        }
      >
        <div
          className={
            currentStep === 2
              ? "create-sell-job create-sell-job__step2"
              : "create-sell-job"
          }
        >
          {currentStep >= 1 && (
            <div>
              {currentStep === 2 &&
                currentScreen === 1 &&
                this.props.currentBreakPoint === MOBILE && (
                  <NobulTip
                    message={translate(this.props.intl, "toolTipTitle")}
                    description={translate(this.props.intl, "sellJobTip")}
                    visible={true}
                  />
                )}
              <Devices sizes={[MOBILE, TABLET]}>
                <div className="create-sell-job__progress-bar">
                  <ProgressBar currentStep={currentStep} numberOfSteps={6} />
                </div>
              </Devices>
            </div>
          )}
          <ActivityIndicator spinning={this.props.jobs.isLoading} type="saving">
            <Helmet>
              <title>{translate(intl, "helmet.createSellJob")}</title>
              <meta
                name="description"
                content={translate(intl, "helmet.createSellJobDescription")}
              />
            </Helmet>

            <Desktop>
              {currentStep >= 1 && (
                <div className="create-sell-job__steps-wrapper">
                  <div className="create-sell-job__steps-with-heading">
                    <Steps
                      className="create-sell-job__steps"
                      current={currentStep - 1}
                    >
                      {Object.keys(steps).map(item => (
                        <Step
                          key={steps[item].key}
                          title={translate(intl, steps[item].localeId)}
                        />
                      ))}
                    </Steps>
                    {currentStep === 2 && (
                      <h1>{translate(this.props.intl, "sellAddress")}</h1>
                    )}
                  </div>
                </div>
              )}
            </Desktop>
            <div className="create-sell-job__content">
              <div className={this.getClassName()}>
                {currentStep === 1 && (
                  <CreateSellJobStep1
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    currentScreen={currentScreen}
                    intl={intl}
                    fields={{ propertyType, priceRange }}
                    currentBreakPoint={this.props.currentBreakPoint}
                  />
                )}
                {currentStep === 2 && (
                  <CreateSellJobStep2
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    intl={intl}
                    fields={{ address }}
                    currentScreen={currentScreen}
                    polygons={this.props.polygons}
                    getPolygonBoundaries={this.props.getPolygonBoundaries}
                    selectedPolygons={regions}
                    address={address}
                    onAddressSelect={this.handleAddressInputChange}
                    onRemoveRegion={this.handleRemoveRegion}
                    setSelectedPolygons={this.setSelectedPolygons}
                    currentBreakPoint={this.props.currentBreakPoint}
                  />
                )}
                {currentStep === 3 && (
                  <CreateSellJobStep3
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
                    currentBreakPoint={this.props.currentBreakPoint}
                  />
                )}
                {currentStep === 4 && (
                  <CreateSellJobStep4
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    currentScreen={currentScreen}
                    onServiceRangeChange={this.handleServiceRangeChange}
                    intl={intl}
                    fields={{
                      servicesExact
                    }}
                    currentBreakPoint={this.props.currentBreakPoint}
                  />
                )}
                {currentStep === 5 && (
                  <CreateBuyJobStep5
                    handleNextStep={this.handleNextStep}
                    handlePreviousStep={this.handlePreviousStep}
                    currentScreen={currentScreen}
                    fields={{ description }}
                    gtmClassName="googletag-consumer-sell-real-estate-end"
                    currentBreakPoint={this.props.currentBreakPoint}
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

CreateSellJob.propTypes = {
  intl: intlShape.isRequired,
  jobs: PropTypes.object.isRequired,
  saveJob: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  getAllConsumerSellJobs: PropTypes.func.isRequired,
  getPolygonBoundaries: PropTypes.func.isRequired,
  history: PropTypes.any.isRequired,
  polygons: PropTypes.object.isRequired,
  currentBreakPoint: PropTypes.string.isRequired,
  newJob: PropTypes.object,
  isAnonymousUser: PropTypes.bool.isRequired
};

export default CreateSellJob;
