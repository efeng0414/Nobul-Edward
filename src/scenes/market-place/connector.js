import { connect } from "react-redux";
import MarketPlace from "./container";

import {
  filterJobsPromise,
  getAllRegionJobsAsync,
  getMultipleMarketplaceJobs
} from "../../../core/thunk/jobs";
import { setMarketplaceJobFilters } from "../../../core/actions/jobs";
import { getPolygonBoundaries } from "../../../core/thunk/polygons";
import { getMultipleConsumersAsync } from "../../../core/thunk/users";

const mapStateToProps = state => {
  return {
    users: state.authentication,
    agentLocations: state.authentication.locations || {},
    jobsIsLoading: state.jobs.isLoading,
    unfilteredRegionJobs: state.jobs.unfilteredRegionJobs || [],
    jobsToLazyLoad: state.jobs.jobsToLazyLoad || [],
    marketplaceJobs: state.jobs.marketplaceJobs || [],
    polygons: state.polygons,
    filters: state.jobs.filters || {},
    consumers: state.users.consumers
  };
};

const mapDispatchToProps = dispatch => ({
  filterJobs: filters => dispatch(filterJobsPromise(filters)),
  setMarketplaceJobFilters: ({ filters }) =>
    dispatch(setMarketplaceJobFilters({ filters })),
  getAllRegionJobs: ({ regions, agentId }) =>
    dispatch(getAllRegionJobsAsync({ regions, agentId })),
  getPolygonBoundaries: ({ provinceOrState }) =>
    dispatch(getPolygonBoundaries({ provinceOrState })),
  getMultipleConsumersAsync: ({ consumerIdArray }) =>
    dispatch(getMultipleConsumersAsync({ consumerIdArray })),
  getMultipleMarketplaceJobs: ({ jobIdsAndTypes, currentAgentId }) =>
    dispatch(getMultipleMarketplaceJobs({ jobIdsAndTypes, currentAgentId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);
