import {http} from '../../../shared/services';

export const LOAD_TASK = 'LOAD_KRONOS_TASK';
export const LOAD_TASK_PENDING = `${LOAD_TASK}_PENDING`;
export const LOAD_TASK_REJECTED = `${LOAD_TASK}_REJECTED`;
export const LOAD_TASK_FULFILLED = `${LOAD_TASK}_FULFILLED`;

export function loadTask(id, endpointId) {
  if (!endpointId) {
    return {
      type: LOAD_TASK,
      payload: http.get(`/kronos/task/${id}`),
    };
  }

  return {
    type: LOAD_TASK,
    payload: http.get(`/kronos/endpoint/${endpointId}/task/${id}`),
  };
}
