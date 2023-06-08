import {fromJS} from 'immutable';

export const SORT_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST = 'SORT_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST';

export function sortDashboardLaborProjectionsStandardsList(sort) {
  return {
    type: SORT_DASHBOARD_LABOR_PROJECTIONS_STANDARDS_LIST,
    payload: fromJS(sort),
  };
}
