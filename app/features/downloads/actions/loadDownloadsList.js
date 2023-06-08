import {http} from '../../shared/services';

export const LOAD_DOWNLOADS_LIST = 'LOAD_DOWNLOADS_LIST';
export const LOAD_DOWNLOADS_LIST_PENDING = `${LOAD_DOWNLOADS_LIST}_PENDING`;
export const LOAD_DOWNLOADS_LIST_FULFILLED = `${LOAD_DOWNLOADS_LIST}_FULFILLED`;
export const LOAD_DOWNLOADS_LIST_REJECTED = `${LOAD_DOWNLOADS_LIST}_REJECTED`;

export function loadDownloadsList(filter, sort) {
  return {
    type: LOAD_DOWNLOADS_LIST,
    payload: http.post('downloads/list', {filter, sort}),
  };
}
