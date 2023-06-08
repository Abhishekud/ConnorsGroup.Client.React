export const SELECT_DASHBORD_LABOR_PROJECTIONS_DEPARTMENT = 'SELECT_DASHBORD_LABOR_PROJECTIONS_DEPARTMENT';

export function selectDashboardLaborProjectionsDepartment(department) {
  return {
    type: SELECT_DASHBORD_LABOR_PROJECTIONS_DEPARTMENT,
    payload: department,
  };
}
