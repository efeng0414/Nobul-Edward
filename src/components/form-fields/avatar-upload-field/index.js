import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { Form, Upload, Icon, message } from "antd";
import { bound } from "class-bind";
import { getFormLayout } from "../../../utilities/forms";
import { translate } from "../../../utilities/locale";
import { getBase64 } from "../../../../core/utilities/getBase64";

import {
  AVATAR_FILE_TYPE_JPEG,
  AVATAR_FILE_TYPE_JPG,
  AVATAR_FILE_TYPE_BMP,
  AVATAR_FILE_TYPE_PNG,
  MAX_AVATAR_SIZE
} from "../../../../core/constants/avatar";

import "./styles.scss";

const FormItem = Form.Item;
class AvatarUploadField extends Component {
  state = {
    avatarUploadUrl: false
  };

  static propTypes = {
    form: PropTypes.any,
    required: PropTypes.bool,
    intl: intlShape.isRequired,
    isUpdatingAvatar: PropTypes.bool
  };

  static defaultProps = {
    form: {},
    isUpdatingAvatar: false
  };

  @bound
  validateAvatarUpload(event) {
    const { file } = event;
    const { intl } = this.props;
    const isValidImgType = [
      AVATAR_FILE_TYPE_JPEG,
      AVATAR_FILE_TYPE_JPG,
      AVATAR_FILE_TYPE_BMP,
      AVATAR_FILE_TYPE_PNG
    ].includes(file.type);
    const isLt2M = file.size < MAX_AVATAR_SIZE;
    if (!isValidImgType) {
      message.error(translate(intl, "error.avatarFileType"));
    }
    if (!isLt2M) {
      message.error(translate(intl, "error.avatarMaxSize"));
    }
    if (isValidImgType && isLt2M) {
      return event;
    }
  }

  @bound
  handleAvatarChange(info) {
    const { file = {} } = info;
    const isValidImgType = [
      AVATAR_FILE_TYPE_JPEG,
      AVATAR_FILE_TYPE_JPG,
      AVATAR_FILE_TYPE_BMP,
      AVATAR_FILE_TYPE_PNG
    ].includes(file.type);
    const isLt2M = file.size < MAX_AVATAR_SIZE;
    if (isValidImgType && isLt2M) {
      getBase64({
        img: file,
        callback: avatarUploadUrl =>
          this.setState({
            avatarUploadUrl
          })
      });
    }
  }

  render() {
    const { avatarUploadUrl } = this.state;
    const fieldLayout = getFormLayout();

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="avatar-upload-field">
        <FormItem {...fieldLayout}>
          {this.props.form.getFieldDecorator("avatarImage", {
            getValueFromEvent: this.validateAvatarUpload,
            rules: [
              {
                required: this.props.required,
                message: translate(
                  this.props.intl,
                  "error.profilePictureRequired"
                )
              }
            ]
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action=""
              beforeUpload={cancelUpload}
              onChange={this.handleAvatarChange}
            >
              {avatarUploadUrl ? (
                <img
                  className="agent-profile-avatar-preview"
                  src={avatarUploadUrl}
                  alt={translate(this.props.intl, "agent.avatarAlt")}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          )}
          <label htmlFor="avatarImage">
            {translate(this.props.intl, "profilePicture")}
            {this.props.required && <span className="required">*</span>}
          </label>
        </FormItem>
      </div>
    );
  }
}

// this function is needed as a prop to beforeUpload for the Upload component
// returning false from this function will cancel the automatic file upload
const cancelUpload = () => false;

export default injectIntl(AvatarUploadField);
