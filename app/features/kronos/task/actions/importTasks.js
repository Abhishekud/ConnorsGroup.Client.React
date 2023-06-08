import {http} from '../../../shared/services';

export const IMPORT_KRONOS_TASKS = 'IMPORT_KRONOS_TASKS';
export const IMPORT_KRONOS_TASKS_PENDING = `${IMPORT_KRONOS_TASKS}_PENDING`;
export const IMPORT_KRONOS_TASKS_FULFILLED = `${IMPORT_KRONOS_TASKS}_FULFILLED`;
export const IMPORT_KRONOS_TASKS_REJECTED = `${IMPORT_KRONOS_TASKS}_REJECTED`;

export function importTasks(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_KRONOS_TASKS,
    payload: http.post('kronos/task/import', data),
  };
}
