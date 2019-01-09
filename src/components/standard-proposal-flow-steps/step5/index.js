import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Input } from "antd";
import { intlShape } from "react-intl";
import { withRouter } from "react-router";

import { translate } from "../../../utilities/locale";
import * as Routes from "../../../routes/routes";
import NobulTip from "../../../components/nobul-tip";
import CharacterCounter from "../../../components/character-counter";
import { TABLET, MOBILE } from "../../../../core/constants/breakpoints";
import Desktop from "../../../components/breakpoints/desktop";
import Devices from "../../../components/breakpoints/devices";

import "../styles.scss";
import { bound } from "class-bind";
import { AGENT_PERSONAL_MESSAGE_LIMIT } from "../../../../core/constants/agents";

class Step5 extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object.isRequired,
    tagline: PropTypes.string,
    personalizedMessage: PropTypes.string,
    goPreviousStep: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    agentType: PropTypes.array,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    currentBreakPoint: PropTypes.string
  };

  state = {
    taglineLength: 0,
    descriptionLength: 0
  };

  goToStage(stage) {
    this.props.history.push(
      Routes.url.standardProposalFlow
        .replace(":step?", this.props.match.params.step)
        .replace(":stage?", stage)
    );
  }

  handleSubmit = e => {
    const { validateFieldsAndScroll } = this.props.form;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (parseInt(this.props.match.params.stage) === 2) {
          this.props.submit({ ...values });
        } else {
          this.props.onChange({ ...values });
          this.goToStage(2);
        }
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.stage &&
      prevProps.match.params.stage !== this.props.match.params.stage
    ) {
      this.setDescriptions();
    }
  }

  componentDidMount() {
    this.setDescriptions();
  }

  setDescriptions() {
    this.props.form.setFieldsValue({
      personalizedMessage: this.props.personalizedMessage || "",
      tagline: this.props.tagline || ""
    });

    this.setState({
      taglineLength: (this.props.tagline && this.props.tagline.length) || 0,
      descriptionLength:
        (this.props.personalizedMessage &&
          this.props.personalizedMessage.length) ||
        0
    });
  }

  @bound
  goPreviousStep() {
    if (parseInt(this.props.match.params.stage) === 2) {
      this.goToStage(1);
    } else {
      this.props.goPreviousStep(this.props.agentType.length);
    }
  }

  @bound
  handlePreviousStep() {
    const { getFieldsValue } = this.props.form;

    let formValues = getFieldsValue();
    this.props.onChange(formValues);
    this.goPreviousStep();
  }

  @bound
  validateTagline(_, value, callback) {
    this.setState({
      taglineLength: value.length
    });
    if (!value || value.length === 0) {
      callback(translate(this.props.intl, "error.taglineIsRequired"));
    } else if (value.length > 50) {
      callback(translate(this.props.intl, "error.taglineMaxCharacters"));
    } else {
      callback();
    }
  }

  @bound
  validateDescription(_, value, callback) {
    this.setState({
      descriptionLength: value.length
    });
    if (!value || value.length === 0) {
      callback(
        translate(this.props.intl, "error.personalizedMessageIsRequired")
      );
    } else if (value.length > AGENT_PERSONAL_MESSAGE_LIMIT) {
      callback(
        translate(this.props.intl, "error.personalizedMessageMaxCharacters")
      );
    } else {
      callback();
    }
  }

  renderTagLine() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const buttonSize =
      this.props.currentBreakPoint === MOBILE ? "large" : undefined;

    return (
      <div>
        <div className="standard-proposal-tag-line">
          <h1>{translate(this.props.intl, "proposal.tagLineTitle")}</h1>
          <h4>{translate(this.props.intl, "proposal.tagLineSubTitle")}</h4>
          <Desktop>
            <FormItem>
              {getFieldDecorator("tagline", {
                rules: [{ validator: this.validateTagline }]
              })(
                <Input
                  placeholder={translate(
                    this.props.intl,
                    "proposal.tagLineText"
                  )}
                />
              )}
            </FormItem>
          </Desktop>
          <Devices sizes={[MOBILE, TABLET]}>
            <FormItem>
              {getFieldDecorator("tagline", {
                rules: [{ validator: this.validateTagline }]
              })(
                <Input.TextArea
                  placeholder={translate(
                    this.props.intl,
                    "proposal.tagLineText"
                  )}
                />
              )}
            </FormItem>
          </Devices>
          <CharacterCounter limit={50} length={this.state.taglineLength} />
          <NobulTip
            message={translate(this.props.intl, "toolTipTitle")}
            description={translate(this.props.intl, "proposal.tagLineTooltip")}
            visible={true}
          />
        </div>
        <div className="standard-proposal-navigation">
          <Button
            size={buttonSize}
            onClick={this.props.onCancel}
            className="standard-proposal-cancel"
          >
            {translate(this.props.intl, "button.cancel")}
          </Button>
          <Button
            size={buttonSize}
            onClick={this.handlePreviousStep}
            type="white"
          >
            {translate(this.props.intl, "button.back")}
          </Button>
          <Button size="large" type="primary" htmlType="submit">
            {translate(this.props.intl, "button.next")}
          </Button>
        </div>
      </div>
    );
  }

  renderDescription() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const buttonSize =
      this.props.currentBreakPoint === MOBILE ? "large" : undefined;

    return (
      <div>
        <div className="standard-proposal-description">
          <h1>{translate(this.props.intl, "proposal.descriptionTitle")} </h1>
          <h4>{translate(this.props.intl, "proposal.descriptionSubTitle")} </h4>
          <FormItem>
            {getFieldDecorator("personalizedMessage", {
              rules: [{ validator: this.validateDescription }]
            })(
              <Input.TextArea
                placeholder={translate(
                  this.props.intl,
                  "proposal.descriptionText"
                )}
              />
            )}
          </FormItem>
          <CharacterCounter
            limit={AGENT_PERSONAL_MESSAGE_LIMIT}
            length={this.state.descriptionLength}
          />
          <NobulTip
            message={translate(this.props.intl, "toolTipTitle")}
            description={translate(
              this.props.intl,
              "proposal.descriptionTooltip"
            )}
            visible={true}
          />
        </div>
        <div className="standard-proposal-navigation">
          <Button
            size={buttonSize}
            onClick={this.props.onCancel}
            className="standard-proposal-cancel"
          >
            {translate(this.props.intl, "button.cancel")}
          </Button>
          <Button
            size={buttonSize}
            onClick={this.handlePreviousStep}
            type="white"
          >
            {translate(this.props.intl, "button.back")}
          </Button>
          <Button size="large" type="primary" htmlType="submit">
            {translate(this.props.intl, "button.submit")}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    let Component = null;
    const stage = this.props.match.params.stage;
    switch (parseInt(stage)) {
      case 2:
        Component = this.renderDescription();
        break;
      default:
        Component = this.renderTagLine();
        break;
    }

    return (
      <div className="standard-proposal-step">
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {Component}
        </Form>
      </div>
    );
  }
}

export default Form.create()(withRouter(Step5));
