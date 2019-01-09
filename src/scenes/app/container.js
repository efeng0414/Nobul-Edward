import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Layout } from "antd";
import debounce from "lodash.debounce";
import { bound } from "class-bind";
import classnames from "classnames";

import initFirebaseApp from "../../../core/firebase";
import * as Routes from "../../routes/routes";
import Header from "../../components/Header/";
import Footer from "../../components/Footer/";
import HowItWorksModal from "../../components/how-it-works-modal";

import "../../assets/fonts/ITCAvantGardeGothic.scss";
import "./global.scss";

import { StripeProvider } from "react-stripe-elements";
import dualUserTypeScene from "../../utilities/dualUserTypeScene";
import userLocation from "../../utilities/user-location";

export const firebaseApp = initFirebaseApp();

@userLocation
class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    stripe: null
  };

  static propTypes = {
    setCurrentUser: PropTypes.func,
    currentUser: PropTypes.object,
    history: PropTypes.object,
    signOut: PropTypes.func,
    listenForNotifications: PropTypes.func,
    notifications: PropTypes.object,
    onAuthStateChange: PropTypes.func,
    setScreenBreakpoint: PropTypes.func,
    getActiveFeatures: PropTypes.func,
    userLocation: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.onAuthStateChange();
    window.addEventListener(
      "resize",
      debounce(this.handleWindowSizeChange, 500)
    );
    this.setState({
      stripe: window.Stripe(process.env.STRIPE_WINDOW_KEY) // eslint-disable-line
    });
    this.MyNobulToRender = dualUserTypeScene({
      consumerScene: Routes.ConsumerMyNobul,
      agentScene: Routes.AgentMyNobul
    });
    this.handleWindowSizeChange();
    this.props.getActiveFeatures();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser.uid !== this.props.currentUser.uid) {
      this.props.listenForNotifications(this.props.currentUser.uid);
    }

    if (
      (this.props.history.location.pathname !== Routes.url.blockEU ||
        !prevProps.userLocation.is_eu) &&
      this.props.userLocation.is_eu
    ) {
      this.redirectBlockEU();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  @bound
  handleWindowSizeChange() {
    const body = document.querySelector("body");
    // some browser will return the content with quotes
    const currentBreakpoint = window
      .getComputedStyle(body, ":after")
      .content.replace(/"/g, "");
    this.props.setScreenBreakpoint({ currentBreakpoint });
  }

  isLandingPage() {
    return (
      this.props.history.location.pathname.includes(
        Routes.partialUrl.landing
      ) ||
      this.props.history.location.pathname === Routes.url.home ||
      this.props.history.location.pathname === Routes.url.homeWithLogin
    );
  }

  @bound
  isHomePage() {
    return (
      this.props.history.location.pathname === Routes.url.home ||
      this.props.history.location.pathname === Routes.url.homeWithLogin
    );
  }

  @bound
  isBlockEU() {
    return (
      this.props.history.location.pathname === Routes.url.blockEU &&
      this.props.userLocation.is_eu
    );
  }

  @bound
  redirectBlockEU() {
    this.props.history.push(Routes.url.blockEU);
  }

  @bound
  getHeaderClassName() {
    return classnames(
      "layout-header",
      { "landing-page": this.isLandingPage() },
      {
        "landing-2":
          this.isLandingPage() &&
          this.props.history.location.pathname !== Routes.url.landing1
      },
      {
        "new-home-page": this.isHomePage()
      }
    );
  }

  @bound
  showWhiteLogo() {
    return (
      this.props.history.location.pathname === Routes.url.home ||
      this.props.history.location.pathname === Routes.url.landing5 ||
      this.props.history.location.pathname === Routes.url.homeWithLogin
    );
  }

  render() {
    return this.isBlockEU() ? (
      <Routes.BlockEU />
    ) : (
      <StripeProvider stripe={this.state.stripe}>
        <Layout className="layout">
          <Layout.Header className={this.getHeaderClassName()}>
            <Helmet
              htmlAttributes={{ lang: "en", amp: undefined }} // amp takes no value
              titleTemplate="%s | nobul "
              titleAttributes={{ itemprop: "name", lang: "en" }}
              meta={[
                { name: "description", content: "Nobul" },
                {
                  name: "viewport",
                  content: "width=device-width, initial-scale=1"
                }
              ]}
            />
            <Header
              history={this.props.history}
              showTopMenu={!this.isLandingPage() || this.isHomePage()}
              signOut={this.props.signOut}
              isHomePage={this.isHomePage()}
              showWhiteLogo={this.showWhiteLogo()}
            />
          </Layout.Header>
          <div className="content">
            <HowItWorksModal />
            <Switch>
              <Route
                exact
                path={Routes.url.home}
                component={dualUserTypeScene({
                  agentScene: Routes.AgentHomePage,
                  consumerScene: Routes.HomePage,
                  anonymousScene: Routes.HomePage
                })}
              />
              <Route
                exact
                path={Routes.url.homeWithLogin}
                component={props => {
                  const HomeToRender = dualUserTypeScene({
                    agentScene: Routes.AgentHomePage,
                    consumerScene: Routes.HomePage,
                    anonymousScene: Routes.HomePage
                  });
                  return <HomeToRender {...props} promptLoginOnMount />;
                }}
              />
              <Route
                exact
                path={Routes.url.blockEU}
                component={Routes.NotFound}
              />
              <Route
                exact
                path={Routes.url.landing1}
                component={Routes.Landing1}
              />
              <Route
                exact
                path={Routes.url.landing2}
                component={Routes.Landing2}
              />
              <Route
                exact
                path={Routes.url.landing3}
                component={Routes.Landing3}
              />
              <Route
                exact
                path={Routes.url.landing4}
                component={Routes.Landing4}
              />
              <Route
                exact
                path={Routes.url.landing5}
                component={Routes.Landing5}
              />
              <Route
                exact
                path={Routes.url.consumerRegistration}
                component={Routes.ConsumerRegistration}
              />
              <Route
                exact
                path={Routes.url.agentRegistration}
                component={Routes.AgentRegistration}
              />
              <Route
                path={Routes.url.standardProposalFlow}
                component={Routes.StandardProposalFlow}
              />
              <Route
                path={Routes.url.createBuyJob}
                component={Routes.CreateBuyJob}
              />
              <Route
                path={Routes.url.createSellJob}
                component={Routes.CreateSellJob}
              />
              <Route
                path={Routes.url.nobulPremium}
                component={Routes.NobulPremium}
              />
              <Route
                exact
                path={Routes.url.agentSettings}
                component={Routes.AgentSettings}
              />
              <Route
                exact
                path={Routes.url.consumerSettings}
                component={Routes.ConsumerSettings}
              />
              <Route
                exact
                path={Routes.url.agentViewJobDetails}
                component={Routes.AgentJobDetails}
              />
              <Route
                exact
                path={Routes.url.marketPlace}
                component={Routes.MarketPlace}
              />
              <Route
                exact
                path={Routes.url.editJob}
                component={Routes.EditJob}
              />
              <Route
                exact
                path={Routes.url.showDraftJob}
                component={Routes.ShowDraftJob}
              />
              <Route
                exact
                path={Routes.url.agentUpdateOfferDetails}
                component={Routes.AgentUpdateOffersDetails}
              />
              <Route
                path={Routes.url.browseListings}
                component={Routes.BrowseListings}
              />
              <Route
                path={Routes.url.browseListingsMap}
                component={Routes.BrowseListingsMap}
              />
              <Route
                path={Routes.url.listingDetails}
                component={Routes.ListingDetails}
              />
              <Route
                exact
                path={Routes.url.viewAgreement}
                component={Routes.ViewAgreement}
              />
              <Route
                path={Routes.url.myNobul}
                component={this.MyNobulToRender}
              />
              <Route
                path={Routes.url.agentRatingView}
                component={Routes.AgentRatingView}
              />
              <Route
                path={Routes.url.mortgageCalculator}
                component={Routes.MortgageCalculator}
              />
              <Route
                path={Routes.url.getStarted}
                component={Routes.GetStarted}
              />
              <Route
                path={Routes.url.permissionDenied}
                component={Routes.PermissionDenied}
              />
              <Route
                exact
                path={Routes.url.notifications}
                component={Routes.Notifications}
              />
              <Route
                path={Routes.url.authActionHandler}
                component={Routes.FirebaseAuthActionHandler}
              />
              <Route
                path={Routes.url.internalVerification}
                component={
                  process.env.ENV === "dev"
                    ? Routes.InternalVerification
                    : Routes.NotFound
                }
              />
              <Route path={Routes.url.redirect} component={Routes.Redirect} />
              <Route path={Routes.url.error} component={Routes.ErrorPage} />
              <Route component={Routes.NotFound} />
            </Switch>
          </div>
          <Footer />
        </Layout>
      </StripeProvider>
    );
  }
}

export default App;
