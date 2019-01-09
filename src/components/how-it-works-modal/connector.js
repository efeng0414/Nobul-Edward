import { connect } from "react-redux";
import HowItWorksModal from "./component";
import { closeHowItWorksModal } from "../../../core/actions/anonymousEventListeners";

const mapStateToProps = state => ({
  isModalOpen: state.anonymousEventListeners.howItWorksModal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeHowItWorksModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorksModal);
