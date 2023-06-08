import {http} from '../../shared/services';

export const LOAD_PART_FIELDS_LIST = 'LOAD_PART_FIELDS_LIST';
export const LOAD_PART_FIELDS_LIST_PENDING = `${LOAD_PART_FIELDS_LIST}_PENDING`;
export const LOAD_PART_FIELDS_LIST_FULFILLED = `${LOAD_PART_FIELDS_LIST}_FULFILLED`;
export const LOAD_PART_FIELDS_LIST_REJECTED = `${LOAD_PART_FIELDS_LIST}_REJECTED`;

export function loadPartFieldsList() {
  return {
    type: LOAD_PART_FIELDS_LIST,
    payload: http.get('part-fields/list'),
  };
}
