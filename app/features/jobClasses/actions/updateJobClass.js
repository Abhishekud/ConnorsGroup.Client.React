import {http} from '../../shared/services';

export const UPDATE_JOB_CLASS = 'UPDATE_JOB_CLASS';
export const UPDATE_JOB_CLASS_PENDING = `${UPDATE_JOB_CLASS}_PENDING`;
export const UPDATE_JOB_CLASS_FULFILLED = `${UPDATE_JOB_CLASS}_FULFILLED`;
export const UPDATE_JOB_CLASS_REJECTED = `${UPDATE_JOB_CLASS}_REJECTED`;

export function updateJobClass(jobClass) {
  return {
    type: UPDATE_JOB_CLASS,
    payload: http.put(`job-classes/${jobClass.get('id')}`, jobClass),
  };
}
