import React, { Component } from "react";
import PropTypes from "prop-types";
import validateUser from "../../utilities/validate-user";
import ActivityIndicator from "../../components/activity-indicator";
import AgentOfferList from "../../components/agent-offer-list";
import requireAuth from "../../utilities/require-auth";
import { Menu, message } from "antd";
import { isAgent } from "../../utilities/route-verification";
import { translate } from "../../utilities/locale";
import { intlShape, injectIntl } from "react-intl";
import { BUY, SELL } from "../../../core/constants/shared";
import { OPEN } from "../../../core/constants/offers";
import { bound } from "class-bind";
import { objectIsEmpty } from "../../../core/utilities/misc";
import { sortByDate } from "../../../core/utilities/sorting-notifications";
import MyDashboardMeta from "../../components/my-dashboard-meta";
import "./styles.scss";

@requireAuth()
@validateUser({ fn: isAgent })
@injectIntl
class AgentOffers extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    getAgentSellOffers: PropTypes.func,
    getAgentBuyOffers: PropTypes.func,
    getAgentAutobidOffers: PropTypes.func,
    getOffersJobDetails: PropTypes.func.isRequired,
    authUserId: PropTypes.string,
    sellProposals: PropTypes.object,
    buyProposals: PropTypes.object,
    autoBid: PropTypes.object,
    isLoading: PropTypes.bool,
    isPremium: PropTypes.bool,
    users: PropTypes.object
  };

  state = {
    screen: "1",
    buyOfferCount: 0,
    sellOfferCount: 0,
    autoBidOfferCount: 0,
    isDescending: true
  };

  componentDidMount() {
    this.props
      .getAgentSellOffers({
        jobType: SELL,
        userId: this.props.authUserId
      })
      .then(() => {
        this.setState({
          sellOfferCount: Object.keys(this.props.sellProposals).length
        });
      })
      .catch(() => {
        message.warning(translate(this.props.intl, "error.CouldNotFindCount"));
      });
    this.props
      .getAgentBuyOffers({
        jobType: BUY,
        userId: this.props.authUserId,
        status: OPEN
      })
      .then(() => {
        this.setState({
          buyOfferCount: Object.keys(this.props.buyProposals).length
        });
      })
      .catch(() => {
        message.warning(translate(this.props.intl, "error.CouldNotFindCount"));
      });
    this.props
      .getAgentAutobidOffers(this.props.authUserId)
      .then(() => {
        this.setState({
          autoBidOfferCount: Object.keys(this.props.autoBid).length
        });
      })
      .catch(() => {
        message.warning(translate(this.props.intl, "error.CouldNotFindCount"));
      });
  }

  @bound
  getOfferCount({ jobType, offerCount }) {
    if (jobType === BUY) {
      this.setState({
        buyOfferCount: offerCount
      });
    } else if (jobType === SELL) {
      this.setState({
        sellOfferCount: offerCount
      });
    } else {
      this.setState({
        autoBidOfferCount: offerCount
      });
    }
  }

  @bound
  changeMenuTab(e) {
    this.setState({
      screen: e.key
    });
  }

  render() {
    return (
      <div className="agent-offers">
        <MyDashboardMeta titleKey="helmet.myDashboard.proposals" />
        <Menu
          className="agent-offers-menu"
          mode="horizontal"
          selectedKeys={[this.state.screen]}
          onClick={this.changeMenuTab}
        >
          <Menu.Item key="1">
            {translate(this.props.intl, "buyProposals")} ({
              this.state.buyOfferCount
            })
          </Menu.Item>
          <Menu.Item key="2">
            {translate(this.props.intl, "sellProposals")} ({
              this.state.sellOfferCount
            })
          </Menu.Item>
          {this.state.autoBidOfferCount && (
            <Menu.Item key="3">
              {translate(this.props.intl, "agent.menuItem.autoBid")} ({
                this.state.autoBidOfferCount
              })
            </Menu.Item>
          )}
        </Menu>
        <div className="agent-offers-list">
          <ActivityIndicator spinning={this.props.isLoading}>
            {this.state.screen === "1" &&
              (objectIsEmpty(this.props.buyProposals) ? (
                <p>{translate(this.props.intl, "offerList.noOffersFound")}</p>
              ) : (
                <AgentOfferList
                  isPremium={this.props.isPremium}
                  offerList={sortByDate({
                    unsortedObjects: this.props.buyProposals,
                    descending: this.state.isDescending
                  })}
                  jobType={BUY}
                  getOffersJobDetails={this.props.getOffersJobDetails}
                  getOfferCount={this.getOfferCount}
                />
              ))}
            {this.state.screen === "2" &&
              (objectIsEmpty(this.props.sellProposals) ? (
                <p>{translate(this.props.intl, "offerList.noOffersFound")}</p>
              ) : (
                <AgentOfferList
                  isPremium={this.props.isPremium}
                  offerList={sortByDate({
                    unsortedObjects: this.props.sellProposals,
                    descending: this.state.isDescending
                  })}
                  jobType={SELL}
                  getOffersJobDetails={this.props.getOffersJobDetails}
                  getOfferCount={this.getOfferCount}
                />
              ))}

            {this.state.screen === "3" &&
              (objectIsEmpty(this.props.autoBid) ? (
                <p>{translate(this.props.intl, "offerList.noOffersFound")}</p>
              ) : (
                <AgentOfferList
                  isPremium={this.props.isPremium}
                  offerList={sortByDate({
                    unsortedObjects: this.props.autoBid,
                    descending: this.state.isDescending
                  })}
                  getOffersJobDetails={this.props.getOffersJobDetails}
                  getOfferCount={this.getOfferCount}
                  preventLoad={false}
                />
              ))}
          </ActivityIndicator>
        </div>
      </div>
    );
  }
}

export default AgentOffers;
