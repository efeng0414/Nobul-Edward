import { connect } from "react-redux";
import AppointmentForm from "./component";
import { postEventThunk } from "../../../core/thunk/events";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  postEvent: ({ offerId, eventData }) =>
    dispatch(postEventThunk({ offerId, eventData }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
