import {fromJS} from 'immutable';

export const FILTER_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST = 'FILTER_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST';

export function filterDashboardLaborProjectionsDepartmentsList(filter) {
  return {
    type: FILTER_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST,
    payload: fromJS(filter),
  };
}
