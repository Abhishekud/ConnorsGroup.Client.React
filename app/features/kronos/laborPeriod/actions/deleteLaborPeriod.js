import {http} from '../../../shared/services';

export const DELETE = 'DELETE_KRONOS_LABOR_PERIOD';
export const DELETE_PENDING = `${DELETE}_PENDING`;
export const DELETE_FULFILLED = `${DELETE}_FULFILLED`;
export const DELETE_REJECTED = `${DELETE}_REJECTED`;

export function deleteLaborPeriod(id) {
  return {
    type: DELETE,
    payload: http.delete(`kronos/laborperiod/${id}`),
  };
}
