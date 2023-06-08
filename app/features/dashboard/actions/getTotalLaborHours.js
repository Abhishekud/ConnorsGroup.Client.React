import {http} from '../../shared/services';

export const GET_TOTAL_LABOR_HOURS = 'GET_TOTAL_LABOR_HOURS';
export const GET_TOTAL_LABOR_HOURS_PENDING = `${GET_TOTAL_LABOR_HOURS}_PENDING`;
export const GET_TOTAL_LABOR_HOURS_FULFILLED = `${GET_TOTAL_LABOR_HOURS}_FULFILLED`;
export const GET_TOTAL_LABOR_HOURS_REJECTED = `${GET_TOTAL_LABOR_HOURS}_REJECTED`;

export function getTotalLaborHours() {
  return {
    type: GET_TOTAL_LABOR_HOURS,
    payload: http.get('dashboard/labor-hours'),
  };
}
