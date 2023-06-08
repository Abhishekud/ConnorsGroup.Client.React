import {fromJS} from 'immutable';

export const SORT_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST = 'SORT_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST';

export function sortDashboardLaborProjectionsDepartmentsList(sort) {
  return {
    type: SORT_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_LIST,
    payload: fromJS(sort),
  };
}
