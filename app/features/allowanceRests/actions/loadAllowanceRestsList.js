import {http} from '../../shared/services';

export const LOAD_ALLOWANCE_RESTS_LIST = 'LOAD_ALLOWANCE_RESTS_LIST';
export const LOAD_ALLOWANCE_RESTS_LIST_PENDING = `${LOAD_ALLOWANCE_RESTS_LIST}_PENDING`;
export const LOAD_ALLOWANCE_RESTS_LIST_FULFILLED = `${LOAD_ALLOWANCE_RESTS_LIST}_FULFILLED`;
export const LOAD_ALLOWANCE_RESTS_LIST_REJECTED = `${LOAD_ALLOWANCE_RESTS_LIST}_REJECTED`;

export function loadAllowanceRestsList() {
  return {
    type: LOAD_ALLOWANCE_RESTS_LIST,
    payload: http.get('allowance-rests/list'),
  };
}
