import {http} from '../../shared/services';

export const LOAD_PARTS_LIST = 'LOAD_PARTS_LIST';
export const LOAD_PARTS_LIST_PENDING = `${LOAD_PARTS_LIST}_PENDING`;
export const LOAD_PARTS_LIST_FULFILLED = `${LOAD_PARTS_LIST}_FULFILLED`;
export const LOAD_PARTS_LIST_REJECTED = `${LOAD_PARTS_LIST}_REJECTED`;

export function loadPartsList(partFamilyId) {
  return {
    type: LOAD_PARTS_LIST,
    payload: http.get(`part-families/${partFamilyId}/parts/list`),
  };
}
