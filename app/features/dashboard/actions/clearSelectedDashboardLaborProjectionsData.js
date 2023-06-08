export const CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA = 'CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA';

export function clearSelectedDashboardLaborProjectionsData(isPageLoading) {
  return {
    type: CLEAR_SELECTED_DASHBOARD_LABOR_PROJECTIONS_DATA,
    payload: {isPageLoading},
  };
}
