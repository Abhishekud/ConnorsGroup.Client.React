import {http} from '../../../shared/services';

export const LOAD_TASK_GROUPS_LIST = 'LOAD_TASK_GROUPS_LIST';
export const LOAD_TASK_GROUPS_LIST_PENDING = `${LOAD_TASK_GROUPS_LIST}_PENDING`;
export const LOAD_TASK_GROUPS_LIST_REJECTED = `${LOAD_TASK_GROUPS_LIST}_REJECTED`;
export const LOAD_TASK_GROUPS_LIST_FULFILLED = `${LOAD_TASK_GROUPS_LIST}_FULFILLED`;

export function loadTaskGroupsList() {
  return {
    type: LOAD_TASK_GROUPS_LIST,
    payload: http.get('/kronos/taskgroup/select-list'),
  };
}
