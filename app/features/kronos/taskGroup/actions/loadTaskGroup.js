import {http} from '../../../shared/services';

export const LOAD_TASK_GROUP = 'LOAD_KRONOS_TASK_GROUP';
export const LOAD_TASK_GROUP_PENDING = `${LOAD_TASK_GROUP}_PENDING`;
export const LOAD_TASK_GROUP_REJECTED = `${LOAD_TASK_GROUP}_REJECTED`;
export const LOAD_TASK_GROUP_FULFILLED = `${LOAD_TASK_GROUP}_FULFILLED`;

export function loadTaskGroup(id, endpointId) {
  if (!endpointId) {
    return {
      type: LOAD_TASK_GROUP,
      payload: http.get(`/kronos/taskgroup/${id}`),
    };
  }

  return {
    type: LOAD_TASK_GROUP,
    payload: http.get(`/kronos/endpoint/${endpointId}/taskgroup/${id}`),
  };
}
