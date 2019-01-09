import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import requireAuth from "../../utilities/require-auth";
import { translate } from "../../utilities/locale";
import FindAgentAndBrowse from "./find-agent-and-browse";
import HowNobulWorks from "./how-nobul-works";
import HowNobulIsDifferent from "./how-nobul-is-different";
import WhyPeopleLoveNobul from "./why-people-love-nobul";

import "./styles.scss";

@requireAuth({ allowAnonymous: true })
@injectIntl
class HomePage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    promptLoginOnMount: PropTypes.bool,
    promptLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    clearCachedListings: PropTypes.func.isRequired,
    setBrowseLocation: PropTypes.func.isRequired,
    currentBreakPoint: PropTypes.string
  };

  static defaultProps = {
    promptLoginOnMount: false,
    currentBreakPoint: ""
  };

  @bound
  isAgentButtonActive() {
    return this.props.history.location.state
      ? this.props.history.location.state.isAgentButtonActive
      : false;
  }

  componentDidMount() {
    this.props.promptLoginOnMount && this.props.promptLogin();
  }

  render() {
    return (
      <div>
        <Helmet title={translate(this.props.intl, "home")} />
        <FindAgentAndBrowse
          intl={this.props.intl}
          history={this.props.history}
          clearCachedListings={this.props.clearCachedListings}
          setBrowseLocation={this.props.setBrowseLocation}
          currentBreakPoint={this.props.currentBreakPoint}
          isAgentButtonActive={this.isAgentButtonActive()}
        />
        <HowNobulWorks
          intl={this.props.intl}
          history={this.props.history}
          location={this.props.location}
        />
        <HowNobulIsDifferent
          intl={this.props.intl}
          history={this.props.history}
        />
        <WhyPeopleLoveNobul
          intl={this.props.intl}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default HomePage;
