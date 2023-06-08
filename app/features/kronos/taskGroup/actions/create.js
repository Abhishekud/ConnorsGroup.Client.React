import {http} from '../../../shared/services';

export const CREATE = 'CREATE_KRONOS_TASK_GROUP';
export const CREATE_PENDING = `${CREATE}_PENDING`;
export const CREATE_FULFILLED = `${CREATE}_FULFILLED`;
export const CREATE_REJECTED = `${CREATE}_REJECTED`;

export function create(taskGroup) {
  return {
    type: CREATE,
    payload: http.post('/kronos/taskgroup', taskGroup),
  };
}
