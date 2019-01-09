import { connect } from "react-redux";
import StandardOfferSettingsForm from "./container";

import {
  updateStandardBuyOffer,
  updateStandardSellOffer
} from "../../../../../core/thunk/authentication";
import { setAutoBidAsync } from "../../../../../core/thunk/autoBids";
import { getBrowsePriceStepsId } from "../../../../../core/utilities/misc";
import { getPolygonBoundaries } from "../../../../../core/thunk/polygons";
import { updateCurrentUserRegionsThunk } from "../../../../../core/thunk/authentication";
import { BUY, SELL } from "../../../../../core/constants/shared";
import { getAutoBidKeyFromState } from "../../../../utilities/auto-bid-data-from-state";
import {
  AUTOBID_PROPERTY_TYPE,
  SERVICES,
  REBATE_COMMISSION_PERCENTAGE,
  LISTING_COMMISSION_PERCENTAGE,
  COOPERATING_COMMISSION_PERCENTAGE,
  PERSONALIZED_MESSAGE,
  LOCATIONS,
  TAGLINE
} from "../../../../../core/api-transform/users";

const mapStateToProps = state => ({
  locations: state.authentication.locations,
  propertyTypes: state.authentication.propertyTypes,
  buyAutoBidPropertyTypes:
    getAutoBidKeyFromState({
      jobType: BUY,
      authentication: state.authentication,
      key: AUTOBID_PROPERTY_TYPE
    }) || [],
  sellAutoBidPropertyTypes:
    getAutoBidKeyFromState({
      jobType: SELL,
      authentication: state.authentication,
      key: AUTOBID_PROPERTY_TYPE
    }) || [],
  currentUser: state.authentication.currentUser,
  sellPriceRange: state.authentication.sellPriceRange,
  buyPriceRange: state.authentication.buyPriceRange,
  defaultCommissions: state.authentication.defaultCommissions,
  services: state.authentication.services,
  personalizedMessage: state.authentication.personalizedMessage,
  tagline: state.authentication.tagline,
  isPremium: true, // REMOVE_PREMIUM state.authentication.isPremium,
  polygons: state.polygons,
  provinceOrState: state.authentication.profile.provinceOrState,
  autoBidBuyServices:
    getAutoBidKeyFromState({
      jobType: BUY,
      authentication: state.authentication,
      key: SERVICES
    }) || {},
  autoBidSellServices:
    getAutoBidKeyFromState({
      jobType: SELL,
      authentication: state.authentication,
      key: SERVICES
    }) || {},
  autoBidRebateCommissionPercentage:
    getAutoBidKeyFromState({
      jobType: BUY,
      authentication: state.authentication,
      key: REBATE_COMMISSION_PERCENTAGE
    }) || 0,
  autoBidListingCommissionPercentage:
    getAutoBidKeyFromState({
      jobType: SELL,
      authentication: state.authentication,
      key: LISTING_COMMISSION_PERCENTAGE
    }) || 0,
  autoBidCooperatingCommissionPercentage:
    getAutoBidKeyFromState({
      jobType: SELL,
      authentication: state.authentication,
      key: COOPERATING_COMMISSION_PERCENTAGE
    }) || 0,
  autoBidBuyTagline:
    getAutoBidKeyFromState({
      jobType: BUY,
      authentication: state.authentication,
      key: TAGLINE
    }) || "",
  autoBidSellTagline:
    getAutoBidKeyFromState({
      jobType: SELL,
      authentication: state.authentication,
      key: TAGLINE
    }) || "",
  autoBidBuyPersonalizedMessage:
    getAutoBidKeyFromState({
      jobType: BUY,
      authentication: state.authentication,
      key: PERSONALIZED_MESSAGE
    }) || "",
  autoBidSellPersonalizedMessage:
    getAutoBidKeyFromState({
      jobType: SELL,
      authentication: state.authentication,
      key: PERSONALIZED_MESSAGE
    }) || "",
  autoBidBuySelectedPolygons:
    getAutoBidKeyFromState({
      jobType: BUY,
      authentication: state.authentication,
      key: LOCATIONS
    }) || {},
  autoBidSellSelectedPolygons:
    getAutoBidKeyFromState({
      jobType: SELL,
      authentication: state.authentication,
      key: LOCATIONS
    }) || {},
  priceRangeLow: parseInt(
    getBrowsePriceStepsId({
      price: state.authentication.priceRangeLow || 0
    })
  ),
  priceRangeHigh: parseInt(
    getBrowsePriceStepsId({
      price: state.authentication.priceRangeHigh || 0
    })
  )
});

const mapDispatchToProps = dispatch => ({
  updateStandardBuyOffer: ({ agentData }) =>
    dispatch(updateStandardBuyOffer({ agentData })),
  updateStandardSellOffer: ({ agentData }) =>
    dispatch(updateStandardSellOffer({ agentData })),
  getPolygonBoundaries: ({ provinceOrState }) =>
    dispatch(getPolygonBoundaries({ provinceOrState })),
  updateCurrentUserRegionsThunk: ({ selectedPolygons }) =>
    dispatch(updateCurrentUserRegionsThunk({ selectedPolygons })),
  postAutoBids: autoBidData => dispatch(setAutoBidAsync(autoBidData))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  StandardOfferSettingsForm
);
