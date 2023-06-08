import {http} from '../../shared/services';

export const DELETE_JOB_CLASS = 'DELETE_JOB_CLASS';
export const DELETE_JOB_CLASS_PENDING = `${DELETE_JOB_CLASS}_PENDING`;
export const DELETE_JOB_CLASS_FULFILLED = `${DELETE_JOB_CLASS}_FULFILLED`;
export const DELETE_JOB_CLASS_REJECTED = `${DELETE_JOB_CLASS}_REJECTED`;

export function deleteJobClass(jobClassId) {
  return {
    type: DELETE_JOB_CLASS,
    payload: http.delete(`job-classes/${jobClassId}`),
  };
}
