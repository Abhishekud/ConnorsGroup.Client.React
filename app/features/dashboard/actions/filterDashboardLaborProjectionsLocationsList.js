import {fromJS} from 'immutable';

export const FILTER_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST = 'FILTER_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST';

export function filterDashboardLaborProjectionsLocationsList(filter) {
  return {
    type: FILTER_DASHBOARD_LABOR_PROJECTIONS_LOCATIONS_LIST,
    payload: fromJS(filter),
  };
}
