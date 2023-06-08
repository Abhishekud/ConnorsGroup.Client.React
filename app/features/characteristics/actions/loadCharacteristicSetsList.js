import {http} from '../../shared/services';

export const LOAD_CHARACTERISTIC_SETS_LIST = 'LOAD_CHARACTERISTIC_SETS_LIST';
export const LOAD_CHARACTERISTIC_SETS_LIST_PENDING = `${LOAD_CHARACTERISTIC_SETS_LIST}_PENDING`;
export const LOAD_CHARACTERISTIC_SETS_LIST_FULFILLED = `${LOAD_CHARACTERISTIC_SETS_LIST}_FULFILLED`;
export const LOAD_CHARACTERISTIC_SETS_LIST_REJECTED = `${LOAD_CHARACTERISTIC_SETS_LIST}_REJECTED`;

export function loadCharacteristicSetsList(departmentId) {
  return {
    type: LOAD_CHARACTERISTIC_SETS_LIST,
    payload: http.get(`characteristic-sets/list-for-department/${departmentId}`),
  };
}
