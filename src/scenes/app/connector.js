import { connect } from "react-redux";
import { withRouter } from "react-router";
import App from "./container";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
