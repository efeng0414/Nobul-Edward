import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { injectIntl, intlShape } from "react-intl";
import { Modal } from "antd";
import { bound } from "class-bind";
import { withRouter } from "react-router-dom";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import { translate } from "../../utilities/locale";
import Box from "../../components/box";
import LicenceForm from "../../components/forms/agent/licence-form";
import HomepageTitle from "../../components/homepage-title";
import HomepageWrapper from "../../components/homepage-wrapper";

import {
  HOME_PROPOSAL_HOVER,
  HOME_PROPOSAL,
  HOME_SEARCH,
  HOME_SEARCH_HOVER,
  AGENT_HOME_PAGE_BACKGROUND
} from "../../utilities/images";
import * as Routes from "../../routes/routes";
import HomeBoxIcon from "../../components/home-box-icon";
import { AGENT_LICENCE_INFO_STANDARD_PROPOSAL } from "../../utilities/google-tag-variable";
import "./styles.scss";

@withRouter
@validateUser({ fn: isAgent })
@injectIntl
class AgentHome extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    promptLoginOnMount: PropTypes.bool,
    promptLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    currentUserId: PropTypes.string,
    isAgent: PropTypes.bool.isRequired,
    businessProfileCreated: PropTypes.bool.isRequired,
    hasLicenceData: PropTypes.bool.isRequired
  };

  static defaultProp = {
    currentUserId: "",
    promptLoginOnMount: false
  };

  state = {
    showLicenceModal: false
  };

  componentDidMount() {
    this.props.promptLoginOnMount && this.props.promptLogin();
    this.props.isAgent &&
      this.props.businessProfileCreated &&
      this.props.history.push(Routes.url.marketPlace);
  }

  @bound
  handleMarketplace(event) {
    event.preventDefault();
    this.props.history.push(Routes.url.marketPlace);
  }

  @bound
  handleStandardProposal(event) {
    event.preventDefault();

    if (this.props.hasLicenceData) {
      this.goToStandardProposal();
    } else {
      this.setState({
        showLicenceModal: true
      });
    }
  }

  @bound
  goToStandardProposal() {
    this.props.history.push(
      Routes.url.standardProposalFlow
        .replace(":step?", "1")
        .replace(":stage?", "")
    );
  }

  @bound
  closeModal() {
    this.setState({ showLicenceModal: false });
  }

  render() {
    return (
      <HomepageWrapper backgroundImage={AGENT_HOME_PAGE_BACKGROUND}>
        <Helmet>
          <title>{translate(this.props.intl, "helmet.home")}</title>
          <meta
            name="description"
            content={translate(this.props.intl, "helmet.homeDescription")}
          />
        </Helmet>

        <Modal
          visible={this.state.showLicenceModal}
          onCancel={this.closeModal}
          footer={null}
        >
          <LicenceForm
            showCompleteProfileText
            GTM_EVENT={AGENT_LICENCE_INFO_STANDARD_PROPOSAL}
            afterSubmit={this.goToStandardProposal}
          />
        </Modal>

        <HomepageTitle title={translate(this.props.intl, "home.agentTitle")} />

        <div className="home-actions">
          <Box
            icon={
              <HomeBoxIcon
                iconSrc={HOME_PROPOSAL}
                hoverIconSrc={HOME_PROPOSAL_HOVER}
              />
            }
            title={translate(this.props.intl, "home.setStandardProposal")}
            onClick={this.handleStandardProposal}
            description={translate(this.props.intl, "home.proposalDescription")}
            className="box-home"
          />
          <Box
            icon={
              <HomeBoxIcon
                iconSrc={HOME_SEARCH}
                hoverIconSrc={HOME_SEARCH_HOVER}
              />
            }
            title={translate(this.props.intl, "home.setBrowseMarketplace")}
            onClick={this.handleMarketplace}
            description={translate(
              this.props.intl,
              "home.marketplaceDescription"
            )}
            className="box-home"
          />
        </div>
      </HomepageWrapper>
    );
  }
}

export default AgentHome;
