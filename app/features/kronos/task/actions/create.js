import {http} from '../../../shared/services';

export const CREATE = 'CREATE_KRONOS_TASK';
export const CREATE_PENDING = `${CREATE}_PENDING`;
export const CREATE_FULFILLED = `${CREATE}_FULFILLED`;
export const CREATE_REJECTED = `${CREATE}_REJECTED`;

export function create(task) {
  return {
    type: CREATE,
    payload: http.post('/kronos/task', task),
  };
}
