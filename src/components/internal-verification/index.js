import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bound } from "class-bind";
import requireAuth from "../../utilities/require-auth";
import validateUser from "../../utilities/validate-user";
import { isAgent } from "../../utilities/route-verification";
import { updateAgentVerification } from "../../../core/firebase/users";
import { STATUS, VERIFIED } from "../../../core/api-transform/users";

import "./styles.scss";

@requireAuth()
@validateUser({ fn: isAgent })
class InternalVerification extends PureComponent {
  state = {
    isVerified: false
  };

  static propTypes = {
    authentication: PropTypes.object
  };

  @bound
  onClickVerify() {
    const agentId = this.props.authentication.currentUser.uid;
    const verificationUpdate = {
      [STATUS]: VERIFIED
    };
    updateAgentVerification({
      agentId,
      values: verificationUpdate
    })
      .then(() => this.setState({ isVerified: true }))
      .catch(() => {
        alert("Something went wrong. Please try again later");
      });
  }

  render() {
    return (
      <div className="verification">
        {this.state.isVerified ? (
          <div className="verification__text">
            Your agent account has been succesfully verified. Happy testing!
          </div>
        ) : (
          <div className="verification__button">
            <button onClick={this.onClickVerify}>
              Click here to verify yourself
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(InternalVerification);
