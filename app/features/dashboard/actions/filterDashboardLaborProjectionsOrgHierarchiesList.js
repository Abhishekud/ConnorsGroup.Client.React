import {fromJS} from 'immutable';

export const FILTER_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST = 'FILTER_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST';

export function filterDashboardLaborProjectionsOrgHierarchiesList(filter) {
  return {
    type: FILTER_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST,
    payload: fromJS(filter),
  };
}
