import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { intlShape, injectIntl } from "react-intl";
import { bound } from "class-bind";
import * as Routes from "../../routes/routes";
import Background from "../../components/background";
import Box from "../../components/box";
import HomeBoxIcon from "../../components/home-box-icon";
import HomepageTitle from "../../components/homepage-title";
import { translate } from "../../utilities/locale";
import requireAuth from "../../utilities/require-auth";
import GetStartedImage from "../../assets/images/backgrounds/consumer-home.jpg";
import { isConsumer } from "../../utilities/route-verification";
import validateUser from "../../utilities/validate-user";
import {
  BUY_SELECT,
  SELL_SELECT,
  SELL_NOT_SELECT,
  BUY_NOT_SELECT
} from "../../utilities/images";

import "./styles.scss";
// TODO: change the boxes icons

@injectIntl
@requireAuth({ allowAnonymous: true })
@validateUser({ fn: isConsumer })
class GetStarted extends PureComponent {
  state = {
    modalVisibility: false
  };

  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object
  };

  @bound
  handleRegister(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: Routes.url.consumerRegistration
    });
  }

  @bound
  handleCancel(e) {
    e.preventDefault();
    this.setState({
      modalVisibility: false
    });
  }

  @bound
  handleBuy(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: Routes.url.createBuyJob
    });
  }

  @bound
  handleSell(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: Routes.url.createSellJob
    });
  }

  render() {
    const { intl } = this.props;
    return (
      <Background
        image={GetStartedImage}
        className="home-page background--tint"
      >
        <div className="get-started">
          <Helmet title="Get Started" />

          <HomepageTitle
            title={translate(this.props.intl, "getStarted.title")}
          />

          <div className="home-actions">
            <Box
              icon={
                <HomeBoxIcon
                  iconSrc={BUY_NOT_SELECT}
                  hoverIconSrc={BUY_SELECT}
                />
              }
              title={translate(this.props.intl, "consumer.buy")}
              onClick={this.handleBuy}
              description={translate(this.props.intl, "consumer.createPost")}
              className="box-home"
            />
            <Box
              icon={
                <HomeBoxIcon
                  iconSrc={SELL_NOT_SELECT}
                  hoverIconSrc={SELL_SELECT}
                />
              }
              title={translate(this.props.intl, "consumer.sell")}
              onClick={this.handleSell}
              description={translate(this.props.intl, "consumer.createPost")}
              className="box-home"
            />
          </div>
        </div>
      </Background>
    );
  }
}

export default GetStarted;
