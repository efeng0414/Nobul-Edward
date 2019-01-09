import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import { Button, Modal, Form } from "antd";
import { translate } from "../../../utilities/locale";
import AvatarUploadField from "../../form-fields/avatar-upload-field";

@Form.create({})
class EditAvatarAgent extends Component {
  static propTypes = {
    closeEditAvatar: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    form: PropTypes.object,
    uid: PropTypes.string.isRequired,
    updateAgentAvatar: PropTypes.func.isRequired,
    updateCurrentAvatar: PropTypes.func.isRequired
  };

  @bound
  onCloseClick() {
    this.props.closeEditAvatar();
  }

  @bound
  handleAgentAvatarChange(event) {
    event.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props
          .updateAgentAvatar({
            uid: this.props.uid,
            file: values.avatarImage.file
          })
          .then(this.props.updateCurrentAvatar);
      }
    });
  }

  render() {
    return (
      <div className="edit-avatar">
        <Modal
          visible={true}
          onCancel={this.onCloseClick}
          footer={null}
          title={translate(this.props.intl, "changeProfilePicture")}
          centered
          className="edit-avatar-modal"
        >
          <div className="edit-avatar-modal-form">
            <Form layout="horizontal" onSubmit={this.handleAgentAvatarChange}>
              <AvatarUploadField form={this.props.form} isUpdatingAvatar />
              <Button type="primary" htmlType="submit">
                {translate(this.props.intl, "button.saveAvatar")}
              </Button>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default EditAvatarAgent;
