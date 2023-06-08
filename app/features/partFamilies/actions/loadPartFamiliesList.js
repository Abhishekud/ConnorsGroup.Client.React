import {http} from '../../shared/services';

export const LOAD_PART_FAMILIES_LIST = 'LOAD_PART_FAMILIES_LIST';
export const LOAD_PART_FAMILIES_LIST_PENDING = `${LOAD_PART_FAMILIES_LIST}_PENDING`;
export const LOAD_PART_FAMILIES_LIST_FULFILLED = `${LOAD_PART_FAMILIES_LIST}_FULFILLED`;
export const LOAD_PART_FAMILIES_LIST_REJECTED = `${LOAD_PART_FAMILIES_LIST}_REJECTED`;

export function loadPartFamiliesList() {
  return {
    type: LOAD_PART_FAMILIES_LIST,
    payload: http.get('part-families/list'),
  };
}
