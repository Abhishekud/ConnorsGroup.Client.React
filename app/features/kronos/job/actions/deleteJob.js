import {http} from '../../../shared/services';

export const DELETE = 'DELETE_KRONOS_JOB';
export const DELETE_FULFILLED = `${DELETE}_FULFILLED`;
export const DELETE_REJECTED = `${DELETE}_REJECTED`;
export const DELETE_PENDING = `${DELETE}_PENDING`;

export function deleteJob(id) {
  return {
    type: DELETE,
    payload: http.delete(`kronos/job/${id}`),
  };
}


