import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Modal, Tabs } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import { introContent, tabsPaneMap } from "./utilities";
import "./styles.scss";

@injectIntl
class HowItWorksModal extends PureComponent {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    intl: intlShape.isRequired
  };

  static defaultProps = {
    isModalOpen: false
  };

  @bound
  renderListItem(textKey) {
    return <li key={textKey}>{translate(this.props.intl, textKey)}</li>;
  }

  @bound
  renderParagraph(textKey, index) {
    return <p key={index}>{translate(this.props.intl, textKey)}</p>;
  }

  @bound
  renderTabPane({ titleKey, contentList }, index) {
    return (
      <Tabs.TabPane
        tab={translate(this.props.intl, `howItWorks.${titleKey}.title`)}
        key={index}
      >
        <ol type="1" className="tab-content">
          {contentList.map(this.renderListItem)}
        </ol>
      </Tabs.TabPane>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.isModalOpen}
        onCancel={this.props.closeModal}
        footer={null}
        width={700}
        className="how-it-works-modal"
      >
        <Helmet>
          <title>{translate(this.props.intl, "helmet.howItWorks")}</title>
          <meta
            name="description"
            content={translate(this.props.intl, "helmet.howItWorksDescription")}
          />
        </Helmet>
        <div className="intro-content">
          <h1>{translate(this.props.intl, "howItWorks.title")}</h1>
          {introContent.map(this.renderParagraph)}
        </div>
        <div className="tab-section">
          <Tabs defaultActiveKey="0">
            {tabsPaneMap.map(this.renderTabPane)}
          </Tabs>
        </div>
      </Modal>
    );
  }
}

export default HowItWorksModal;
