import {http} from '../../shared/services';

export const LOAD_ALLOWANCES_LIST = 'LOAD_ALLOWANCES_LIST';
export const LOAD_ALLOWANCES_LIST_PENDING = `${LOAD_ALLOWANCES_LIST}_PENDING`;
export const LOAD_ALLOWANCES_LIST_FULFILLED = `${LOAD_ALLOWANCES_LIST}_FULFILLED`;
export const LOAD_ALLOWANCES_LIST_REJECTED = `${LOAD_ALLOWANCES_LIST}_REJECTED`;

export function loadAllowancesList() {
  return {
    type: LOAD_ALLOWANCES_LIST,
    payload: http.get('allowances/list'),
  };
}
