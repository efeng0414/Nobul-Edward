import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { withRouter } from "react-router-dom";
import { translate } from "../../utilities/locale";
import Box from "../../components/box";
import {
  HOME_PAGE_BUY_SELL_BG_CLASS,
  HOME_PAGE_BROWSE_BG_CLASS,
  HOME_PAGE_LEARN_BG_CLASS
} from "../../utilities/constants";
import {
  HOME_BUY_SELL,
  HOME_BROWSE,
  HOME_BROWSE_HOVER,
  HOME_LEARN,
  HOME_LEARN_HOVER,
  HOME_BUY_SELL_HOVER,
  CONSUMER_HOME_PAGE_BACKGROUND
} from "../../utilities/images";
import * as Routes from "../../routes/routes";
import HomeBoxIcon from "../../components/home-box-icon";
import ProofBanner from "../../components/proof-banner";
import HomepageTitle from "../../components/homepage-title";
import HomepageWrapper from "../../components/homepage-wrapper";

import "./styles.scss";

@withRouter
@injectIntl
class ConsumerHome extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    promptLoginOnMount: PropTypes.bool,
    promptLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentUserId: PropTypes.string
  };

  static defaultProp = {
    promptLoginOnMount: false,
    currentUserId: ""
  };

  componentDidMount() {
    this.props.promptLoginOnMount && this.props.promptLogin();
  }

  @bound
  handleBuyOrSell(event) {
    event.preventDefault();
    this.props.history.push(`${Routes.url.getStarted}`);
  }

  @bound
  handleBrowse(event) {
    event.preventDefault();
    this.props.history.push(Routes.url.browseListings);
  }

  @bound
  handleLearn(event) {
    event.preventDefault();
    window.open(Routes.externalLinks.learnRealEstate, "_blank");
  }
  render() {
    return (
      <div>
        <HomepageWrapper
          backgroundImage={CONSUMER_HOME_PAGE_BACKGROUND}
          className="background--tint"
        >
          <Helmet title={translate(this.props.intl, "home")} />

          <HomepageTitle
            title={translate(this.props.intl, "home.consumerTitle")}
          />

          <div className="home-actions">
            <Box
              icon={
                <HomeBoxIcon
                  iconSrc={HOME_BUY_SELL}
                  hoverIconSrc={HOME_BUY_SELL_HOVER}
                />
              }
              title={translate(this.props.intl, "home.buyOrSell")}
              description={translate(
                this.props.intl,
                "home.buyOrSellDescription"
              )}
              onClick={this.handleBuyOrSell}
              backgroundClass={HOME_PAGE_BUY_SELL_BG_CLASS}
              className="box-home"
            />
            <Box
              icon={
                <HomeBoxIcon
                  iconSrc={HOME_BROWSE}
                  hoverIconSrc={HOME_BROWSE_HOVER}
                />
              }
              title={translate(this.props.intl, "home.browse")}
              description={translate(this.props.intl, "home.browseDescription")}
              onClick={this.handleBrowse}
              backgroundClass={HOME_PAGE_BROWSE_BG_CLASS}
              className="box-home"
            />
            <Box
              icon={
                <HomeBoxIcon
                  iconSrc={HOME_LEARN}
                  hoverIconSrc={HOME_LEARN_HOVER}
                />
              }
              title={translate(this.props.intl, "home.learn")}
              description={translate(this.props.intl, "home.learnDescription")}
              onClick={this.handleLearn}
              backgroundClass={HOME_PAGE_LEARN_BG_CLASS}
              className="box-home"
            />
          </div>
        </HomepageWrapper>
        <ProofBanner />
      </div>
    );
  }
}

export default ConsumerHome;
