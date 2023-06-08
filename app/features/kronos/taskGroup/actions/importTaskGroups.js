import {http} from '../../../shared/services';

export const IMPORT_KRONOS_TASK_GROUPS = 'IMPORT_KRONOS_TASK_GROUPS';
export const IMPORT_KRONOS_TASK_GROUPS_PENDING = `${IMPORT_KRONOS_TASK_GROUPS}_PENDING`;
export const IMPORT_KRONOS_TASK_GROUPS_FULFILLED = `${IMPORT_KRONOS_TASK_GROUPS}_FULFILLED`;
export const IMPORT_KRONOS_TASK_GROUPS_REJECTED = `${IMPORT_KRONOS_TASK_GROUPS}_REJECTED`;

export function importTaskGroups(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_KRONOS_TASK_GROUPS,
    payload: http.post('kronos/taskgroup/import', data),
  };
}
