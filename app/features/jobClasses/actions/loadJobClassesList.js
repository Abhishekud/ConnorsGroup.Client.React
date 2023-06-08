import {http} from '../../shared/services';

export const LOAD_JOB_CLASSES_LIST = 'LOAD_JOB_CLASSES_LIST';
export const LOAD_JOB_CLASSES_LIST_PENDING = `${LOAD_JOB_CLASSES_LIST}_PENDING`;
export const LOAD_JOB_CLASSES_LIST_FULFILLED = `${LOAD_JOB_CLASSES_LIST}_FULFILLED`;
export const LOAD_JOB_CLASSES_LIST_REJECTED = `${LOAD_JOB_CLASSES_LIST}_REJECTED`;

export function loadJobClassesList() {
  return {
    type: LOAD_JOB_CLASSES_LIST,
    payload: http.get('job-classes/list'),
  };
}
