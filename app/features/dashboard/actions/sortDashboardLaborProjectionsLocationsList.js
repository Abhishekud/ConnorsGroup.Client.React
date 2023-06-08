import {fromJS} from 'immutable';

export const SORT_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST = 'SORT_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST';

export function sortDashboardLaborProjectionsLocationsList(sort) {
  return {
    type: SORT_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST,
    payload: fromJS(sort),
  };
}
