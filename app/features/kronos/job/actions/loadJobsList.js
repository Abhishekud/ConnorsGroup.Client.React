import {http} from '../../../shared/services';

export const LOAD_JOBS_LIST = 'LOAD_JOBS_LIST';
export const LOAD_JOBS_LIST_PENDING = `${LOAD_JOBS_LIST}_PENDING`;
export const LOAD_JOBS_LIST_REJECTED = `${LOAD_JOBS_LIST}_REJECTED`;
export const LOAD_JOBS_LIST_FULFILLED = `${LOAD_JOBS_LIST}_FULFILLED`;

export function loadJobsList() {
  return {
    type: LOAD_JOBS_LIST,
    payload: http.get('/kronos/job/list'),
  };
}
