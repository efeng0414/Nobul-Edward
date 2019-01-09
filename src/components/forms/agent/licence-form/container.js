import React, { Component } from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { Button, Form, Upload } from "antd";
import { bound } from "class-bind";

import AvatarUploadField from "../../../form-fields/avatar-upload-field";
import TextField from "../../../form-fields/text-field";

import LicenceFormFields from "./fields";

import Devices from "../../../breakpoints/devices";
import Desktop from "../../../breakpoints/desktop";
import { MOBILE, TABLET } from "../../../../../core/constants/breakpoints";

import { getFormLayout } from "../../../../utilities/forms";
import { translate } from "../../../../utilities/locale";

import { checkIfProvinceIsSupported } from "../../../../../core/utilities/arello";
import { findArelloLicence } from "../../../../../core/firebase/arello";
import LicenseIcon from "../../../../assets/images/license_icon.svg";

import { gtmEvent } from "../../../../utilities/gtm-event";

import "../../common/styles.scss";

const FormItem = Form.Item;
const Dragger = Upload.Dragger;

@injectIntl
@Form.create({})
class LicenceForm extends Component {
  state = {
    licenseUpload: false,
    licenseVerificationStatus: "unverified",
    licenseExpirationDate: "-",
    licenseImageValidate: false,
    licenceImageError: false,
    isLoading: false,
    fileList: []
  };

  static propTypes = {
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    afterSubmit: PropTypes.func,
    addAgentVerificationData: PropTypes.func.isRequired,
    backButtonFunction: PropTypes.func,
    backButtonText: PropTypes.string,
    submitButtonText: PropTypes.string,
    currentUserProfile: PropTypes.object,
    currentUserVerification: PropTypes.object,
    GTM_EVENT: PropTypes.string,
    showCompleteProfileText: PropTypes.bool
  };

  static defaultProps = {
    currentUserProfile: {},
    currentUserVerification: {},
    backButtonFunction: () => {},
    afterSubmit: () => {},
    backButtonText: ""
  };

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });

        // Arello
        return new Promise((resolve, reject) => {
          const provinceIsSupported = checkIfProvinceIsSupported(
            values.licenseProvince
          );

          if (provinceIsSupported && !this.state.licenseUpload) {
            const { licenseNumber, province } = values;
            findArelloLicence(
              province,
              licenseNumber,
              this.props.currentUserProfile.lastName
            )
              .then(results => {
                if (results.data.error) {
                  reject();
                } else {
                  let licenseExpirationDate = results.data.licenseExpirationDate
                    ? results.data.licenseExpirationDate
                    : "-";
                  this.setState({
                    licenseExpirationDate,
                    licenseVerificationStatus: "verified"
                  });
                  resolve();
                }
              })
              .catch(results => {
                reject(new Error(results.data.error));
              });
          } else {
            resolve();
          }
        })
          .then(() => {
            const {
              licenseExpirationDate,
              licenseVerificationStatus
            } = this.state;
            values.licenseExpiryDate = licenseExpirationDate;
            values.licenseStatus = licenseVerificationStatus;
            this.setState({
              licenseImageValidate: false,
              licenceImageError: false,
              isLoading: false
            });

            this.props
              .addAgentVerificationData({
                verificationData: { ...values, ...this.state }
              })
              .then(() => this.props.afterSubmit());
          })
          .then(
            () =>
              this.props.GTM_EVENT &&
              gtmEvent({
                name: this.props.GTM_EVENT
              })
          )
          .catch(() => {
            this.setState(
              {
                licenseImageValidate: true,
                licenceImageError: true,
                isLoading: false
              },
              () => {
                this.props.form.validateFields(["licenseImage"], {
                  force: true
                });
              }
            );
          });
      }
    });
  }

  @bound
  handleProvinceChange(value) {
    const { validateFields } = this.props.form;
    const provinceIsSupported = checkIfProvinceIsSupported(value);
    this.setState({ licenseImageValidate: !provinceIsSupported }, () => {
      validateFields(["licenseImage"], { force: true });
    });
  }

  proplicense = {
    action: "",
    onRemove: () => {
      return this.setState({ licenseUpload: false, fileList: [] });
    },
    beforeUpload: () => {
      this.setState({ licenseUpload: true });
      return false;
    },
    onChange: info => {
      const fileList = info.fileList
        .slice(-1)
        .map(file => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        })
        .filter(file => {
          if (file.response) {
            return file.response.status === "success";
          }
          return true;
        })
        .map((item, index) => ({
          ...item,
          uid: index
        }));

      this.setState({ fileList });
    }
  };

  render() {
    const fieldLayout = getFormLayout();
    return (
      <div className="licence-form">
        {this.props.showCompleteProfileText && (
          <div className="licence-form__header">
            <h5 className="licence-form__title">
              {translate(this.props.intl, "licenceForm.title")}
            </h5>
            <p className="licence-form__blurb">
              {translate(this.props.intl, "licenceForm.blurb")}
            </p>
          </div>
        )}

        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <AvatarUploadField form={this.props.form} required />

          <h5 className="agent-reg-step2-form__title">Brokerage information</h5>

          <LicenceFormFields
            form={this.props.form}
            handleProvinceChange={this.handleProvinceChange}
            validationData={{
              ...this.props.currentUserProfile,
              ...this.props.currentUserVerification
            }}
          />

          <TextField
            required
            form={this.props.form}
            label={translate(this.props.intl, "agent.licenseNumber")}
            name={"licenseNumber"}
            className="licence-form__licence-number"
          />

          <FormItem
            required
            {...fieldLayout}
            label={translate(this.props.intl, "agent.licenseUpload")}
            className="licence-form__licence-upload"
          >
            {this.props.form.getFieldDecorator("licenseImage", {
              rules: [
                {
                  required: this.state.licenseImageValidate,
                  message: translate(
                    this.props.intl,
                    this.state.licenceImageError
                      ? "error.licenseNotFound"
                      : "error.licenseUploadIsRequired"
                  )
                }
              ]
            })(
              <Dragger
                {...this.proplicense}
                className="licence-form__dragger"
                fileList={this.state.fileList}
              >
                <img src={LicenseIcon} alt="" />
                <p className="licence-form__license-copy">
                  <strong>
                    <Desktop>
                      {translate(
                        this.props.intl,
                        "agent.licenseUploadDragDrop"
                      )}
                    </Desktop>
                    <Devices sizes={[MOBILE, TABLET]}>
                      {translate(this.props.intl, "agent.licenseUploadMobile")}{" "}
                      <span className="licence-form__license-copy-button">
                        {translate(this.props.intl, "browse")}
                      </span>
                    </Devices>
                  </strong>
                </p>
              </Dragger>
            )}
          </FormItem>

          <div className="licence-form__buttons">
            {this.props.backButtonFunction &&
              this.props.backButtonText && (
                <Button
                  type="default"
                  onClick={this.props.backButtonFunction}
                  className="licence-form__buttons-back"
                >
                  {this.props.backButtonText}
                </Button>
              )}

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="googletag-agent-signup-step-3"
            >
              {this.props.submitButtonText ||
                translate(this.props.intl, "button.submit")}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default LicenceForm;
