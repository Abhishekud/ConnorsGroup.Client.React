import {fromJS} from 'immutable';

export const FILTER_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST = 'FILTER_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST';

export function filterDashboardLaborProjectionsStandardsList(filter) {
  return {
    type: FILTER_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST,
    payload: fromJS(filter),
  };
}
