export const SELECT_DASHBORD_LABOR_PROJECTIONS_LOCATION = 'SELECT_DASHBORD_LABOR_PROJECTIONS_LOCATION';

export function selectDashboardLaborProjectionsLocation(location) {
  return {
    type: SELECT_DASHBORD_LABOR_PROJECTIONS_LOCATION,
    payload: location,
  };
}
