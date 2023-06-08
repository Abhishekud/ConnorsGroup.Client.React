import {http} from '../../../shared/services';

export const DELETE = 'DELETE_KRONOS_LABOR_DRIVER';
export const DELETE_PENDING = `${DELETE}_PENDING`;
export const DELETE_FULFILLED = `${DELETE}_FULFILLED`;
export const DELETE_REJECTED = `${DELETE}_REJECTED`;

export function deleteLaborDriver(id) {
  return {
    type: DELETE,
    payload: http.delete(`kronos/labordriver/${id}`),
  };
}
