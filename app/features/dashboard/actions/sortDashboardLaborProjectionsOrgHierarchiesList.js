import {fromJS} from 'immutable';

export const SORT_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST = 'SORT_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST';

export function sortDashboardLaborProjectionsOrgHierarchiesList(sort) {
  return {
    type: SORT_DASHBOARD_LABOR_PROJECTIONS_ORG_HIERARCHIES_LIST,
    payload: fromJS(sort),
  };
}
