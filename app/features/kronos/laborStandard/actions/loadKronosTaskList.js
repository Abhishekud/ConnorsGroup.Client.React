import {http} from '../../../shared/services';

export const LOAD_TASKS_LIST = 'LOAD_KRONOS_TASKS_LIST';
export const LOAD_TASKS_LIST_PENDING = `${LOAD_TASKS_LIST}_PENDING`;
export const LOAD_TASKS_LIST_REJECTED = `${LOAD_TASKS_LIST}_REJECTED`;
export const LOAD_TASKS_LIST_FULFILLED = `${LOAD_TASKS_LIST}_FULFILLED`;

export function loadKronosTasksList() {
  return {
    type: LOAD_TASKS_LIST,
    payload: http.get('/kronos/task/select-list'),
  };
}
