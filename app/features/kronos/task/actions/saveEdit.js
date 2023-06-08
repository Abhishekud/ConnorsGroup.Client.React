import {http} from '../../../shared/services';

export const SAVE_EDIT = 'SAVE_EDIT_KRONOS_TASK';
export const SAVE_EDIT_FULFILLED = `${SAVE_EDIT}_FULFILLED`;
export const SAVE_EDIT_PENDING = `${SAVE_EDIT}_PENDING`;
export const SAVE_EDIT_REJECTED = `${SAVE_EDIT}_REJECTED`;

export function saveEdit(task) {
  return {
    type: SAVE_EDIT,
    payload: http.post('/kronos/task/update', task),
  };
}

