import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";
import { Card, Button, Form } from "antd";
import { bound } from "class-bind";
import Services from "../../components/services";
import ServiceRangePicker from "../../components/service-range-picker";
import { translate } from "../../utilities/locale";
import ConsumerJobCongratulations from "../consumer-job-congratulations";
import CreatePostingStepsImage from "../../assets/images/create_posting_steps.svg";
import "./styles.scss";
import Login from "../../components/login";
import ConsumerJobLoginRegister from "../../components/consumer-job-login-register";
import { gtmEvent } from "../../utilities/gtm-event";
import { PROPERTY_DETAILS_POSTING_CLICKED } from "../../utilities/google-tag-variable";
@Form.create({})
class HireAgentCard extends PureComponent {
  static propTypes = {
    listingId: PropTypes.string,
    intl: intlShape.isRequired,
    submitPostingJob: PropTypes.func.isRequired,
    onServicesChange: PropTypes.func.isRequired,
    onServicesRangeChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    showCongratulations: PropTypes.bool.isRequired,
    currentUserId: PropTypes.string,
    onCongratulationsClose: PropTypes.func.isRequired,
    userType: PropTypes.string,
    showAnonymousUserModal: PropTypes.bool.isRequired,
    showLoginModal: PropTypes.bool.isRequired,
    handleAnonymousModalClose: PropTypes.func.isRequired,
    redirectToLogin: PropTypes.func.isRequired,
    redirectToRegister: PropTypes.func.isRequired,
    toggleLoginModal: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
    isSavingJob: PropTypes.bool
  };

  static defaultProps = {
    listingId: "",
    intl: {},
    currentUserId: "",
    userType: "",
    showAnonymousUserModal: false,
    showCongratulations: false,
    showLoginModal: false
  };

  @bound
  handleSubmit() {
    gtmEvent({
      name: PROPERTY_DETAILS_POSTING_CLICKED
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitPostingJob({ text: values });
      }
    });
  }

  render() {
    return (
      <Card className="hire-agent-card">
        <div className="hire-agent-card-title-card">
          <div className="box">
            <h1 className="box-title">
              {translate(
                this.props.intl,
                "listingDetails.hireAgentCard.box.title"
              )}
            </h1>
            <h4>
              {translate(
                this.props.intl,
                "listingDetails.hireAgentCard.box.title.2"
              )}
            </h4>
            <h3 className="box-subtitle">
              {translate(
                this.props.intl,
                "listingDetails.hireAgentCard.box.subtitle.start"
              )}
              <span className="box-number">
                {translate(
                  this.props.intl,
                  "listingDetails.hireAgentCard.box.subtitle.number"
                )}
              </span>
              {translate(
                this.props.intl,
                "listingDetails.hireAgentCard.box.subtitle.end"
              )}
            </h3>
          </div>
        </div>
        <div className="steps-image-container">
          <img className="steps-image" alt="" src={CreatePostingStepsImage} />
        </div>
        <div className="create-posting-form">
          <div className="form-row">
            <h4 className="title">
              <span className="form-number">1</span>
              {translate(
                this.props.intl,
                "listingDetails.hireAgentCardSubTitle1"
              )}
            </h4>
            <div className="service-range-picker-container">
              <ServiceRangePicker
                minVal={1}
                maxVal={5}
                defaultVal={3}
                onChange={this.props.onServicesRangeChange}
                intl={this.props.intl}
                labelKey={"buyer"}
              />
            </div>
          </div>
          <hr className="dashed-line" />
          <div className="form-row">
            <h4 className="title">
              <span className="form-number">2</span>
              {translate(
                this.props.intl,
                "listingDetails.hireAgentCardSubTitle2"
              )}
            </h4>
            <Services
              serviceType="buy"
              onServiceClick={this.props.onServicesChange}
            />
          </div>

          <div className="form-row form-row-button">
            <Button
              size="large"
              type="primary"
              onClick={this.handleSubmit}
              disabled={this.props.isSavingJob}
            >
              {translate(this.props.intl, "listingDetails.createPosting")}
            </Button>
          </div>
        </div>
        <ConsumerJobCongratulations
          intl={this.props.intl}
          visible={this.props.showCongratulations}
          onCancel={this.props.onCongratulationsClose}
        />
        <ConsumerJobLoginRegister
          visible={this.props.showAnonymousUserModal}
          onCancel={this.props.handleAnonymousModalClose}
          onLogin={this.props.redirectToLogin}
          onRegister={this.props.redirectToRegister}
          intl={this.props.intl}
        />
        <Login
          isLoginVisible={this.props.showLoginModal}
          onLoginCancel={this.props.toggleLoginModal}
          history={this.props.history}
          intl={this.props.intl}
          onJoinNobulFromLogin={this.props.redirectToRegister}
          onLogin={this.props.onLogin}
        />
      </Card>
    );
  }
}

export default HireAgentCard;
