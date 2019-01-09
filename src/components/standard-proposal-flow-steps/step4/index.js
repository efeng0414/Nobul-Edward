import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Form, Button } from "antd";
import { intlShape } from "react-intl";

import { translate } from "../../../utilities/locale";
import { getStandardCommission } from "../../../../core/utilities/commissions";
import Commission from "../../form-fields/commission";

import "../styles.scss";
import { bound } from "class-bind";
import { DEFAULT_COUNTRY } from "../../../../core/constants/shared";
import { MOBILE } from "../../../../core/constants/breakpoints";

import "../styles.scss";

class Step4 extends Component {
  state = {
    maxSteps: this.props.agentType.length
  };

  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object.isRequired,
    commission: PropTypes.object,
    province: PropTypes.string,
    country: PropTypes.string,
    onChange: PropTypes.func,
    goPreviousStep: PropTypes.func.isRequired,
    goNextStep: PropTypes.func.isRequired,
    agentType: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    currentBreakPoint: PropTypes.string
  };

  handleSubmit = e => {
    const { validateFieldsAndScroll } = this.props.form;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onChange({
          commission: { ...this.props.commission, ...values }
        });
        this.goNextStep();
      }
    });
  };

  handlePreviousStep = () => {
    const { getFieldsValue } = this.props.form;

    let formValues = getFieldsValue();
    this.props.onChange({
      commission: { ...this.props.commission, ...formValues }
    });
    this.goPreviousStep();
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.stage &&
      prevProps.match.params.stage !== this.props.match.params.stage
    ) {
      this.setCommissions();
    }
  }

  componentDidMount() {
    this.setCommissions();
  }

  setCommissions() {
    const { form = {} } = this.props;
    const commission = this.props.commission;

    const defaultCommission = getStandardCommission(
      this.props.province || "",
      this.props.country || DEFAULT_COUNTRY
    );

    const listing = commission.listing || defaultCommission;
    const cooperating = commission.cooperating || defaultCommission;

    // Set this form
    form.setFieldsValue({
      listing,
      cooperating
    });
  }

  @bound
  goNextStep() {
    this.props.goNextStep();
  }

  @bound
  goPreviousStep() {
    this.props.goPreviousStep(this.state.maxSteps); // to services
  }

  sellCommissions() {
    return (
      <div>
        <h1>{translate(this.props.intl, "proposal.listingCommission")}</h1>
        <h4>
          {translate(this.props.intl, "proposal.listingCommissionSubtitle")}
        </h4>
        <div className="standard-proposal-commissions">
          <Commission
            form={this.props.form}
            label={translate(this.props.intl, "listingCommission")}
            name="listing"
            required={true}
          />

          <Commission
            form={this.props.form}
            label={translate(this.props.intl, "cooperatingCommission")}
            name="cooperating"
            required={true}
          />
        </div>
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const buttonSize =
      this.props.currentBreakPoint === MOBILE ? "large" : undefined;

    return (
      <div className="standard-proposal-step standard-proposal-step-commission">
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          {this.sellCommissions()}

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
              {translate(intl, "button.back")}
            </Button>
            <Button type="primary" size="large" htmlType="submit">
              {translate(intl, "button.next")}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(withRouter(Step4));
