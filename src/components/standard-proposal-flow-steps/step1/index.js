import React, { Component } from "react";
import { Button, Checkbox } from "antd";
import PropTypes from "prop-types";
import { translate } from "../../../utilities/locale";
import { intlShape } from "react-intl";
import { bound } from "class-bind";
import { RESIDENTIAL } from "../../../../core/constants/shared";
import Box from "../../box";
import PropertyIcon from "react-icons/lib/io/ios-home-outline";
import { PROPERTY_TYPES } from "../../../../core/api-transform/users";

import "../styles.scss";
class Step1 extends Component {
  state = { residentialClicked: false };

  static propTypes = {
    intl: intlShape.isRequired,
    onChange: PropTypes.func,
    goNextStep: PropTypes.func,
    cachedPropertyType: PropTypes.array
  };

  static defaultProps = {
    cachedPropertyType: []
  }

  componentDidMount() {
    if(this.props.cachedPropertyType.includes(RESIDENTIAL)) {
      this.setState({residentialClicked: true})
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.cachedPropertyType !== this.props.cachedPropertyType) {
      if(this.props.cachedPropertyType.includes(RESIDENTIAL)) {
        this.setState({residentialClicked: true})
      }
    }
  }

  @bound
  handleSubmit() {
    this.props.onChange(
      { [PROPERTY_TYPES]: [RESIDENTIAL] },
      this.props.goNextStep()
    );
  }

  @bound
  toggleBox() {
    this.setState({ residentialClicked: !this.state.residentialClicked });
  }

  render() {
    return (
      <div className="standard-proposal-step">
        <h1>{translate(this.props.intl, "proposal.typeOfProperties")}</h1>

        <div className="standard-proposal-boxes">
          <Box
            icon={<PropertyIcon />}
            title={translate(this.props.intl, "residential")}
            className={
              this.state.residentialClicked ? "box-selected" : "box-clickable"
            }
            backgroundClass={this.state.residentialClicked ? "blue" : ""}
            onClick={this.toggleBox}
          />
          <Box
            icon={<PropertyIcon />}
            title={translate(this.props.intl, "commercial")}
            disabled={true}
            className={"box-disabled"}
          >
            <p className="small">{translate(this.props.intl, "comingSoon")}</p>
          </Box>
        </div>

        <div className="standard-proposal-navigation">
          <Button
            type="primary"
            size="large"
            onClick={this.handleSubmit}
            disabled={!this.state.residentialClicked}
          >
            {translate(this.props.intl, "button.next")}
          </Button>
        </div>
      </div>
    );
  }
}

export default Step1;
