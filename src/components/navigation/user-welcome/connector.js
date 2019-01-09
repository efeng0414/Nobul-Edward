import { connect } from "react-redux";
import UserWelcome from "./component";

const mapStateToProps = state => ({
  userProfile: state.authentication.profile,
  avatarUrl: state.authentication.avatarUrl
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserWelcome);
