import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Input } from "antd";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import ModalFooter from "./modal-footer";

import "./styles.scss";

@injectIntl
class ShareListingModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    link: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
  };

  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        onCancel={this.props.toggleModal}
        footer={
          <ModalFooter
            onCancelClick={this.props.toggleModal}
            cancelText={translate(this.props.intl, "button.cancel")}
          />
        }
        className="share-listing-popup"
      >
        <p>{translate(this.props.intl, "shareListingModal.title")}</p>
        <Input type="text" value={this.props.link} readOnly />
      </Modal>
    );
  }
}

export default ShareListingModal;
