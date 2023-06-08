import {http} from '../../shared/services';

export const GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS = 'GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS';
export const GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_PENDING = `${GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS}_PENDING`;
export const GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_FULFILLED = `${GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS}_FULFILLED`;
export const GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS_REJECTED = `${GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS}_REJECTED`;

export function getDashboardLaborProjectionsDepartments(locationId) {
  return {
    type: GET_DASHBOARD_LABOR_PROJECTIONS_DEPARTMENTS,
    payload: http.get(`dashboard/location/${locationId}/departments`),
  };
}