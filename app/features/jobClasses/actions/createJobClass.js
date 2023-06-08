import {http} from '../../shared/services';

export const CREATE_JOB_CLASS = 'CREATE_JOB_CLASS';
export const CREATE_JOB_CLASS_PENDING = `${CREATE_JOB_CLASS}_PENDING`;
export const CREATE_JOB_CLASS_FULFILLED = `${CREATE_JOB_CLASS}_FULFILLED`;
export const CREATE_JOB_CLASS_REJECTED = `${CREATE_JOB_CLASS}_REJECTED`;

export function createJobClass(model) {
  return {
    type: CREATE_JOB_CLASS,
    payload: http.post('job-classes', model),
  };
}
