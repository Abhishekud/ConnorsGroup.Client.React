import {Map} from 'immutable';
import {
  GET_DASHBOARD_STATS_FULFILLED,
  SELECT_DASHBORD_LABOR_PROJECTIONS_LOCATION,
  SELECT_DASHBORD_LABOR_PROJECTIONS_DEPARTMENT,
  CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENT,
  CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA,
  SELECT_TREEMAP_OR_TABLE_TAB,
  SET_NAVIGATION_BAR_SCROLL_POSITION,
  SELECT_NAVIGATION_BAR_ITEM,
  SELECT_DASHBORD_LABOR_PROJECTIONS_LEVEL_OPTION_ID,
  GET_DASHBOARD_LABOR_PROJECTIONS_TOP_LEVEL_FULFILLED,
  GET_DASHBOARD_LABOR_PROJECTIONS_SUB_LEVEL_FULFILLED,
  GET_DASHBOARD_LABOR_PROJECTIONS_TOP_LEVEL_PENDING,
  GET_DASHBOARD_LABOR_PROJECTIONS_SUB_LEVEL_PENDING,
  GET_TOTAL_LABOR_HOURS_PENDING,
  GET_TOTAL_LABOR_HOURS_FULFILLED,
  GET_TOTAL_LABOR_HOURS_REJECTED,
  RESET_IS_ACTIVE_BACKGROUND_JOBS_UPDATED,
  RELOAD_DASHBOARD_DATA_BY_KEY,
} from '../../actions';
import {POLL_BACKGROUND_JOBS_FULFILLED} from '../../../shared/actions';
import {LOCATIONS_STANDARDS, CALCULATE_LABOR} from '../../../shared/constants/backgroundJobs';
import {TREEMAP} from '../../constants/tabs';

const initialState = Map({
  loading: false,
  stats: Map({
    locationCount: 0,
    departmentCount: 0,
    standardCount: 0,
    statusCounts: [],
    laborProjectionsLastUpdated: null,
    totalLaborHours: 0,
  }),
  selectedLocationId: null,
  selectedLocationName: null,
  selectedLocationProfileName: null,
  selectedDepartmentId: null,
  selectedDepartmentName: null,
  selectedLocationDescription: null,
  selectedTab: TREEMAP,
  selectedLevelOptionId: 0,
  navbarScrollPosition: 0,
  navbarSelectedValue: 0,
  allowAutoScroll: true,
  backgroundJobStarted: false,
  activeBackgroundJobs: false,
  isGridDataLoading: true,
  isTotalLaborHoursLoading: true,
  isActiveBackgroundJobsUpdated: false,
  dashboardReloadKey: 1,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_LABOR_PROJECTIONS_TOP_LEVEL_PENDING:
    case GET_DASHBOARD_LABOR_PROJECTIONS_SUB_LEVEL_PENDING: {
      return state.set('isGridDataLoading', true);
    }

    case GET_DASHBOARD_STATS_FULFILLED: {
      const {locationCount, departmentCount, standardCount} = action.payload.data;
      return state.withMutations(map =>
        map.set('loading', false)
          .setIn(['stats', 'locationCount'], locationCount)
          .setIn(['stats', 'departmentCount'], departmentCount)
          .setIn(['stats', 'standardCount'], standardCount)
      );
    }

    case GET_TOTAL_LABOR_HOURS_PENDING:
      return state.set('isTotalLaborHoursLoading', true);

    case GET_TOTAL_LABOR_HOURS_FULFILLED: {
      const {totalLaborHours, laborProjectionsLastUpdated} = action.payload.data;
      return state.withMutations(map =>
        map.set('backgroundJobStarted', false)
          .set('isTotalLaborHoursLoading', false)
          .setIn(['stats', 'totalLaborHours'], totalLaborHours)
          .setIn(['stats', 'laborProjectionsLastUpdated'], laborProjectionsLastUpdated)
      );
    }

    case GET_TOTAL_LABOR_HOURS_REJECTED:
      return state.set('isTotalLaborHoursLoading', false);

    case SELECT_DASHBORD_LABOR_PROJECTIONS_LEVEL_OPTION_ID: {
      const {levelOptionId, scrollPosition} = action.payload;
      return state.withMutations(map =>
        map.set('selectedLevelOptionId', levelOptionId)
          .set('navbarScrollPosition', scrollPosition));
    }

    case SELECT_DASHBORD_LABOR_PROJECTIONS_LOCATION:
      return state.withMutations(map =>
        map.set('selectedLocationId', action.payload.get('id'))
          .set('selectedLocationName', action.payload.get('name'))
          .set('selectedLocationDescription', action.payload.get('description'))
          .set('selectedLocationProfileName', action.payload.get('locationProfileName')));

    case SELECT_DASHBORD_LABOR_PROJECTIONS_DEPARTMENT:
      return state.withMutations(map =>
        map.set('selectedDepartmentId', action.payload.get('id'))
          .set('selectedDepartmentName', action.payload.get('name')));

    case CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENT:
      return state.withMutations(map =>
        map.set('selectedDepartmentId', null)
          .set('selectedDepartmentName', null));

    case CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA:
      return state.withMutations(map => {
        map.set('selectedLocationId', null)
          .set('selectedLocationName', null)
          .set('selectedLocationProfileName', null)
          .set('selectedDepartmentId', null)
          .set('selectedDepartmentName', null)
          .set('navbarScrollPosition', 0)
          .set('allowAutoScroll', true);
        if (!action.payload.isPageLoading) {
          // if reset location button is clicked or bacckground job started.
          map.set('selectedLevelOptionId', 0);
        }
      });

    case GET_DASHBOARD_LABOR_PROJECTIONS_TOP_LEVEL_FULFILLED:{
      return state.withMutations(map =>
        map.set('selectedLocationId', null)
          .set('selectedLocationName', null)
          .set('selectedLocationProfileName', null)
          .set('selectedDepartmentId', null)
          .set('selectedDepartmentName', null)
          .set('selectedLevelOptionId', null))
        .set('isGridDataLoading', false);
    }

    case SELECT_TREEMAP_OR_TABLE_TAB:
      return state.set('selectedTab', action.payload);

    case SET_NAVIGATION_BAR_SCROLL_POSITION:
      return state.withMutations(map =>
        map.set('allowAutoScroll', false)
          .set('navbarScrollPosition', action.payload));

    case SELECT_NAVIGATION_BAR_ITEM:
      return state.withMutations(map =>
        map.set('allowAutoScroll', true)
          .set('navbarSelectedValue', action.payload));

    case GET_DASHBOARD_LABOR_PROJECTIONS_SUB_LEVEL_FULFILLED:
      return state.withMutations(map =>
        map.set('allowAutoScroll', true)
          .set('navbarSelectedValue', action.payload.data.orgHierarchyLevel.number)
          .set('isGridDataLoading', false));

    case POLL_BACKGROUND_JOBS_FULFILLED: {
      const {activeJobs, backgroundJobTypes} = action.payload.data;

      if (backgroundJobTypes.includes(LOCATIONS_STANDARDS) || backgroundJobTypes.includes(CALCULATE_LABOR)) {
        return state.withMutations(map => {
          if (activeJobs) map.set('backgroundJobStarted', true);
          map.set('activeBackgroundJobs', activeJobs)
            .set('isActiveBackgroundJobsUpdated', true);
        });
      }
      return state;
    }

    case RESET_IS_ACTIVE_BACKGROUND_JOBS_UPDATED: {
      return state.set('isActiveBackgroundJobsUpdated', initialState.get('isActiveBackgroundJobsUpdated'));
    }

    case RELOAD_DASHBOARD_DATA_BY_KEY:{
      return state.set('dashboardReloadKey', state.get('dashboardReloadKey') + 1);
    }

    default:
      return state;
  }
}
