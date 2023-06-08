import {http} from '../../../shared/services';

export const DELETE = 'DELETE_KRONOS_TASK';
export const DELETE_PENDING = `${DELETE}_PENDING`;
export const DELETE_FULFILLED = `${DELETE}_FULFILLED`;
export const DELETE_REJECTED = `${DELETE}_REJECTED`;

export function deleteTask(taskId) {
  return {
    type: DELETE,
    payload: http.delete(`kronos/task/${taskId}`),
  };
}


