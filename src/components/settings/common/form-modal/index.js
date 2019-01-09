import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import ModalFooter from "./modal-footer";
import "./styles.scss";

const FormModal = ({
  isModalOpen,
  onUpdateClick,
  activeFieldKey,
  toggleModal,
  children,
  hideFooter
}) => (
  <Modal
    className="account-settings-modal"
    visible={isModalOpen}
    width={380}
    footer={
      !hideFooter && (
        <ModalFooter
          onUpdateClick={onUpdateClick}
          activeFieldKey={activeFieldKey}
        />
      )
    }
    onCancel={toggleModal}
  >
    <div className="settings-modal-body">{children}</div>
  </Modal>
);

FormModal.propTypes = {
  isModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired,
  activeFieldKey: PropTypes.string.isRequired,
  hideFooter: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired
};

FormModal.defaultProps = {
  isModalOpen: false,
  hideFooter: false
};

export default FormModal;
