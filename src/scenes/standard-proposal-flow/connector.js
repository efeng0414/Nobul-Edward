import { connect } from "react-redux";
import StandardProposalFlow from "./container";

import { checkLicenceData } from "../../utilities/check-licence-data";

import { BUSINESS_PROFILE_CREATED } from "../../../core/api-transform/users";
import { setStandardProposalAsync } from "../../../core/thunk/users";
import { getSignedInUserNode } from "../../../core/thunk/authentication";
import { getPolygonBoundaries } from "../../../core/thunk/polygons";

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  businessProfileCreated: !!state.authentication[BUSINESS_PROFILE_CREATED],
  polygons: state.polygons,
  isLoading: state.authentication.currentUser
    ? state.authentication.currentUser.isLoading
    : false,
  hasLicenceData: checkLicenceData({
    verification: state.authentication.verification
  }),
  currentBreakPoint: state.breakpoints.currentBreakPoint,
  agentProvinceOrState: state.authentication.profile
    ? state.authentication.profile.provinceOrState
    : ""
});

const mapDispatchToProps = dispatch => ({
  setStandardProposal: (uid, standardProposal) => {
    dispatch(setStandardProposalAsync(uid, standardProposal));
  },
  getSignedInUserNode: user => dispatch(getSignedInUserNode(user)),
  getPolygonBoundaries: ({ provinceOrState }) =>
    dispatch(getPolygonBoundaries({ provinceOrState }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  StandardProposalFlow
);
