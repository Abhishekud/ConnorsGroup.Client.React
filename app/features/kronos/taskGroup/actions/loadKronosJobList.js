import {http} from '../../../shared/services';

export const LOAD_KRONOS_JOBS_LIST = 'LOAD_KRONOS_JOBS_LIST';
export const LOAD_KRONOS_JOBS_LIST_PENDING = `${LOAD_KRONOS_JOBS_LIST}_PENDING`;
export const LOAD_KRONOS_JOBS_LIST_REJECTED = `${LOAD_KRONOS_JOBS_LIST}_REJECTED`;
export const LOAD_KRONOS_JOBS_LIST_FULFILLED = `${LOAD_KRONOS_JOBS_LIST}_FULFILLED`;

export function loadKronosJobList() {
  return {
    type: LOAD_KRONOS_JOBS_LIST,
    payload: http.get('/kronos/job/list'),
  };
}
